import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      category: "Web Development",
      status: "Under Review",
      submittedDate: "2024-01-20",
      price: "$49.99"
    },
    {
      id: 2,
      title: "Advanced Python Programming",
      instructor: "Emma Davis",
      category: "Data Science",
      status: "Under Review",
      submittedDate: "2024-01-19",
      price: "$54.99"
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      instructor: "Sarah Johnson",
      category: "Marketing",
      status: "Approved",
      submittedDate: "2024-01-15",
      price: "$39.99"
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "Mike Wilson",
      category: "Design",
      status: "Rejected",
      submittedDate: "2024-01-18",
      price: "$59.99"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-success text-success-foreground";
      case "Under Review":
        return "bg-warning text-warning-foreground";
      case "Rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted";
    }
  };

  const handleApproveCourse = (courseId: number) => {
    toast({
      title: "Course Approved",
      description: "The course has been approved and published.",
    });
  };

  const handleRejectCourse = (courseId: number) => {
    toast({
      title: "Course Rejected",
      description: "The course has been rejected.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Course Management</h1>
            <p className="text-muted-foreground">Review and manage all platform courses</p>
          </div>

          {/* Search */}
          <Card className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Courses Table */}
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell className="font-semibold text-primary">{course.price}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{course.submittedDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Course Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Title</p>
                                  <p className="font-medium">{course.title}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Instructor</p>
                                  <p className="font-medium">{course.instructor}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Category</p>
                                  <p className="font-medium">{course.category}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Price</p>
                                  <p className="font-medium">{course.price}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Description</p>
                                <p className="text-sm">
                                  This is a comprehensive course covering all aspects of the subject matter.
                                  Students will learn through practical examples and hands-on projects.
                                </p>
                              </div>
                              {course.status === "Under Review" && (
                                <div className="flex gap-2 pt-4">
                                  <Button 
                                    className="flex-1 bg-success hover:bg-success/90"
                                    onClick={() => handleApproveCourse(course.id)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    className="flex-1"
                                    onClick={() => handleRejectCourse(course.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        {course.status === "Under Review" && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApproveCourse(course.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRejectCourse(course.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
