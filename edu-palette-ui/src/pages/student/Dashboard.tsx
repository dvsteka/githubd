import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Array<{ id: number; title: string; description: string; instructorName: string; imageBase64?: string; quizJson?: string }>>([]);
  const [enrollments, setEnrollments] = useState<Record<number, number>>({});
  const [quizOpen, setQuizOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<{ id: number; title: string; quizJson?: string } | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [parsedQuiz, setParsedQuiz] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:8080/api/courses");
      if (res.ok) {
        const list = await res.json();
        setCourses(list);
      }
      if (user?.id) {
        const er = await fetch(`http://localhost:8080/api/student/enrollments/${user.id}`);
        if (er.ok) {
          const list: Array<{ courseId: number; progress: number }> = await er.json();
          const map: Record<number, number> = {};
          list.forEach((e) => (map[e.courseId] = e.progress));
          setEnrollments(map);
        }
      }
    };
    load();
  }, [user?.id]);

  const enroll = async (courseId: number) => {
    if (!user?.id) return;
    const res = await fetch("http://localhost:8080/api/student/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: user.id, courseId }),
    });
    if (res.ok) setEnrollments((prev) => ({ ...prev, [courseId]: prev[courseId] ?? 0 }));
  };

  const openQuiz = (course: { id: number; title: string; quizJson?: string }) => {
    setActiveCourse(course);
    setAnswers([]);
    try {
      setParsedQuiz(course.quizJson ? JSON.parse(course.quizJson) : []);
    } catch {
      setParsedQuiz([]);
    }
    setQuizOpen(true);
    setShowResults(false);
  };

  const submitQuiz = async () => {
    if (!user?.id || !activeCourse) return;
    const res = await fetch("http://localhost:8080/api/student/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: user.id, courseId: activeCourse.id, answers }),
    });
    if (res.ok) {
      const data: { courseId: number; progress: number } = await res.json();
      setEnrollments((prev) => ({ ...prev, [data.courseId]: data.progress }));
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Hi {user?.name}</h1>
            <p className="text-muted-foreground">Continue your learning journey</p>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Courses</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  {course.imageBase64 && (
                    <img src={course.imageBase64} alt={course.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6 space-y-3">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">By {course.instructorName}</p>
                    {enrollments[course.id] !== undefined ? (
                      <>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{enrollments[course.id]}%</span>
                          </div>
                          <Progress value={enrollments[course.id]} className="h-2" />
                        </div>
                        <Button className="w-full" onClick={() => openQuiz({ id: course.id, title: course.title, quizJson: course.quizJson })}>Attempt Quiz</Button>
                      </>
                    ) : (
                      <Button className="w-full" onClick={() => enroll(course.id)}>Register</Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Dialog open={quizOpen} onOpenChange={(o) => { setQuizOpen(o); if (!o) setShowResults(false); }}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Quiz: {activeCourse?.title}</DialogTitle>
              </DialogHeader>
              {parsedQuiz && parsedQuiz.length > 0 ? (
                <div className="space-y-4">
                  {!showResults ? (
                    <>
                      {parsedQuiz.map((q: any, idx: number) => (
                        <div key={idx} className="space-y-2">
                          <Label>Question {idx + 1}</Label>
                          <p>{q.question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {q.options.map((opt: string, oIdx: number) => (
                              <Button key={oIdx} variant={answers[idx] === oIdx ? "default" : "outline"} onClick={() => setAnswers((prev) => { const next = [...prev]; next[idx] = oIdx; return next; })}>
                                {opt}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <Button onClick={submitQuiz}>Submit Quiz</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {parsedQuiz.map((q: any, idx: number) => (
                        <div key={idx} className="space-y-2">
                          <Label>Question {idx + 1}</Label>
                          <p>{q.question}</p>
                          <p className="text-sm">Your Answer: {typeof answers[idx] === "number" ? q.options[answers[idx]] : "N/A"}</p>
                          <p className="text-sm font-semibold">Correct Answer: {q.options[q.correctIndex]}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No quiz available</p>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
