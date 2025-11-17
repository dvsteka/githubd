import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Clock, Users, Star, Award, PlayCircle, FileText, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CourseDetail = () => {
  const course = {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    rating: 4.8,
    students: 12500,
    duration: "40 hours",
    price: "$49.99",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    description: "Master web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your developer career.",
    whatYouLearn: [
      "Build responsive websites with HTML, CSS, and JavaScript",
      "Master modern React development with hooks and context",
      "Create backend APIs with Node.js and Express",
      "Work with databases like MongoDB and PostgreSQL",
      "Deploy applications to production",
      "Build full-stack applications from scratch"
    ]
  };

  const curriculum = [
    {
      section: "Getting Started",
      lessons: [
        { title: "Introduction to Web Development", duration: "15:30", completed: true },
        { title: "Setting Up Your Development Environment", duration: "20:45", completed: true },
        { title: "HTML Fundamentals", duration: "35:20", completed: false }
      ]
    },
    {
      section: "CSS & Styling",
      lessons: [
        { title: "CSS Basics", duration: "28:15", completed: false },
        { title: "Flexbox Layout", duration: "32:40", completed: false },
        { title: "CSS Grid", duration: "30:55", completed: false },
        { title: "Responsive Design", duration: "40:20", completed: false }
      ]
    },
    {
      section: "JavaScript Programming",
      lessons: [
        { title: "JavaScript Fundamentals", duration: "45:30", completed: false },
        { title: "DOM Manipulation", duration: "38:45", completed: false },
        { title: "Async JavaScript", duration: "42:15", completed: false }
      ]
    }
  ];

  const instructor = {
    name: "John Smith",
    title: "Senior Full-Stack Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "10+ years of experience in web development. Worked with Fortune 500 companies and taught over 50,000 students worldwide.",
    courses: 12,
    students: 45000,
    rating: 4.9
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Badge className="bg-white/20 text-white border-0">Bestseller</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold">{course.title}</h1>
                <p className="text-lg opacity-90">{course.description}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-white" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <p className="text-sm opacity-90">Created by {course.instructor}</p>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="p-6 space-y-4 sticky top-24">
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full rounded-lg"
                  />
                  <div className="text-3xl font-bold text-primary">{course.price}</div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-lg h-12">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                  
                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4 text-primary" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>Downloadable resources</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4">
                  {curriculum.map((section, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="text-xl font-semibold mb-4">{section.section}</h3>
                      <div className="space-y-3">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle className="h-5 w-5 text-success" />
                              ) : (
                                <PlayCircle className="h-5 w-5 text-muted-foreground" />
                              )}
                              <span className={lesson.completed ? "text-muted-foreground" : ""}>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor">
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
                    <div className="flex gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={instructor.avatar} />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{instructor.name}</h3>
                        <p className="text-muted-foreground">{instructor.title}</p>
                        <div className="flex gap-4 text-sm">
                          <span>{instructor.courses} Courses</span>
                          <span>{instructor.students.toLocaleString()} Students</span>
                          <span>⭐ {instructor.rating} Rating</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">{instructor.bio}</p>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews">
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                    <p className="text-muted-foreground">Reviews coming soon...</p>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
