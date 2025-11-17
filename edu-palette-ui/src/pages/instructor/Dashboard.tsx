import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Array<{ id: number; title: string; description: string }>>([]);
  const [students, setStudents] = useState<Array<{ id: number; name: string; email: string; enrollments: Array<{ courseId: number; courseTitle: string; progress: number }> }>>([]);
  const [openStudent, setOpenStudent] = useState<{ id: number; name: string } | null>(null);
  useEffect(() => {
    const load = async () => {
      if (user?.id) {
        const res = await fetch(`http://localhost:8080/api/courses/by-instructor/${user.id}`);
        if (res.ok) {
          const list = await res.json();
          setCourses(list);
        }
        const sr = await fetch(`http://localhost:8080/api/student/instructor/overview/${user.id}`);
        if (sr.ok) {
          const list = await sr.json();
          setStudents(list);
        }
      }
    };
    load();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Hi {user?.name}</h1>
            <Link to="/instructor/create-course">
              <Button className="bg-gradient-to-r from-primary to-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </Link>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Manage Courses</h2>
              <Link to="/instructor/courses">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell className="text-muted-foreground">{course.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Students</h2>
              <span className="text-sm text-muted-foreground">Total: {students.length}</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead className="w-[140px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.enrollments.length}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => setOpenStudent({ id: s.id, name: s.name })}>View Courses</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Dialog open={!!openStudent} onOpenChange={(o) => setOpenStudent(o ? openStudent : null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Enrollments: {openStudent?.name}</DialogTitle>
              </DialogHeader>
              {openStudent && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.find((x) => x.id === openStudent.id)?.enrollments.map((e) => (
                      <TableRow key={e.courseId}>
                        <TableCell className="font-medium">{e.courseTitle}</TableCell>
                        <TableCell>{e.progress}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
