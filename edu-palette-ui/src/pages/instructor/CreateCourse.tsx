import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("English");
  const [questions, setQuestions] = useState<Array<{ question: string; options: string[]; correctIndex: number }>>([
    { question: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("CreateCourse file selected:", { name: file.name, size: file.size, type: file.type });
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageBase64(result);
      console.log("CreateCourse imageBase64 length:", result.length);
    };
    reader.readAsDataURL(file);
  };

  const updateQuestion = (idx: number, updater: (q: { question: string; options: string[]; correctIndex: number }) => { question: string; options: string[]; correctIndex: number }) => {
    setQuestions((prev) => prev.map((q, i) => (i === idx ? updater(q) : q)));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { question: "", options: ["", "", "", ""], correctIndex: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast({ title: "Not logged in", description: "Please login as instructor" });
      console.log("CreateCourse submit blocked: no user id");
      return;
    }
    try {
      setSubmitting(true);
      const quizJson = JSON.stringify(questions);
      console.log("CreateCourse submit payload:", { title, descriptionLen: description.length, imageLen: imageBase64.length, instructorId: user.id, quizLen: quizJson.length });
      const res = await fetch("http://localhost:8080/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageBase64, instructorId: user.id, quizJson }),
      });
      console.log("CreateCourse response status:", res.status);
      if (!res.ok) {
        const msg = await res.text();
        toast({ title: "Error", description: msg || "Could not create course" });
        console.log("CreateCourse error response:", msg);
        return;
      }
      const body = await res.json().catch(() => null);
      console.log("CreateCourse success response body:", body);
      toast({ title: "Course Created", description: "Saved successfully" });
      navigate("/instructor/courses");
    } catch {
      toast({ title: "Network error", description: "Please try again" });
      console.log("CreateCourse network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Create New Course</h1>
            <p className="text-muted-foreground">Enter details and submit</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[120px]" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <select id="level" className="border rounded px-3 py-2 w-full" value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageFile">Course Image</Label>
                <Input id="imageFile" type="file" accept="image/*" onChange={onFileChange} />
                {imageBase64 && (
                  <img src={imageBase64} alt="preview" className="mt-2 h-32 object-cover rounded" />
                )}
              </div>
            </Card>
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Quiz Builder</h2>
              {questions.map((q, idx) => (
                <div key={idx} className="space-y-3 border rounded p-4">
                  <div className="space-y-2">
                    <Label htmlFor={`q-${idx}`}>Question {idx + 1}</Label>
                    <Input id={`q-${idx}`} value={q.question} onChange={(e) => updateQuestion(idx, (cur) => ({ ...cur, question: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="space-y-2">
                        <Label htmlFor={`q-${idx}-opt-${oIdx}`}>Option {oIdx + 1}</Label>
                        <Input id={`q-${idx}-opt-${oIdx}`} value={opt} onChange={(e) => updateQuestion(idx, (cur) => {
                          const next = [...cur.options];
                          next[oIdx] = e.target.value;
                          return { ...cur, options: next };
                        })} />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`q-${idx}-correct`}>Correct Option</Label>
                    <select id={`q-${idx}-correct`} className="border rounded px-3 py-2 w-full" value={q.correctIndex} onChange={(e) => updateQuestion(idx, (cur) => ({ ...cur, correctIndex: Number(e.target.value) }))}>
                      <option value={0}>Option 1</option>
                      <option value={1}>Option 2</option>
                      <option value={2}>Option 3</option>
                      <option value={3}>Option 4</option>
                    </select>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addQuestion}>Add Question</Button>
              <Button type="submit" className="bg-gradient-to-r from-primary to-secondary" disabled={submitting}>{submitting ? "Submitting..." : "Submit Course"}</Button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;