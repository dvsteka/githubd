import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ChevronLeft, ChevronRight, Download, FileText, PlayCircle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const LessonViewer = () => {
  const [notes, setNotes] = useState("");

  const lessons = [
    { id: 1, title: "Introduction to Web Development", duration: "15:30", completed: true },
    { id: 2, title: "Setting Up Your Environment", duration: "20:45", completed: true },
    { id: 3, title: "HTML Fundamentals", duration: "35:20", completed: false },
    { id: 4, title: "CSS Basics", duration: "28:15", completed: false },
  ];

  const currentLesson = lessons[2];

  const resources = [
    { name: "Lesson Slides.pdf", size: "2.4 MB" },
    { name: "Code Examples.zip", size: "1.8 MB" },
    { name: "Cheat Sheet.pdf", size: "850 KB" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Video Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Video Player */}
              <Card className="overflow-hidden">
                <div className="bg-black aspect-video flex items-center justify-center">
                  <PlayCircle className="h-20 w-20 text-white opacity-80" />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{currentLesson.title}</h1>
                    <p className="text-muted-foreground">Duration: {currentLesson.duration}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous Lesson
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                      Next Lesson
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Tabs for Notes and Resources */}
              <Card className="p-6">
                <Tabs defaultValue="notes">
                  <TabsList className="w-full">
                    <TabsTrigger value="notes" className="flex-1">My Notes</TabsTrigger>
                    <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
                    <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                  </TabsList>

                  <TabsContent value="notes" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Take notes while learning</label>
                      <Textarea
                        placeholder="Write your notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[200px]"
                      />
                      <Button className="bg-gradient-to-r from-primary to-secondary">
                        Save Notes
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-3">
                    <h3 className="font-semibold mb-4">Downloadable Resources</h3>
                    {resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{resource.name}</p>
                            <p className="text-sm text-muted-foreground">{resource.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="description">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Lesson Description</h3>
                      <p className="text-muted-foreground">
                        In this lesson, you'll learn the fundamentals of HTML including elements, tags, attributes, and document structure. 
                        We'll cover semantic HTML, forms, and best practices for writing clean, accessible markup.
                      </p>
                      <h4 className="font-semibold mt-4">What you'll learn:</h4>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>HTML document structure</li>
                        <li>Common HTML elements and tags</li>
                        <li>Working with forms and inputs</li>
                        <li>Semantic HTML best practices</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Sidebar - Lesson List */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Course Content</h3>
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        lesson.id === currentLesson.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        ) : (
                          <PlayCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{lesson.title}</p>
                          <p className="text-xs opacity-80 mt-1">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
