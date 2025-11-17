import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [instructors, setInstructors] = useState<Array<{ id: number; name: string; email: string }>>([]);
  const [courses, setCourses] = useState<Array<{ id: number; title: string; description: string; instructorId: number; instructorName: string }>>([]);
  const [count, setCount] = useState<number>(0);
  const [courseCount, setCourseCount] = useState<number>(0);
  const [students, setStudents] = useState<Array<{ id: number; name: string; email: string; lastLoginAt?: string; enrollments: Array<{ courseId: number; courseTitle: string; progress: number }> }>>([]);
  const [openStudent, setOpenStudent] = useState<{ id: number; name: string } | null>(null);

  const loadData = async () => {
    try {
      const [listRes, countRes, courseCountRes, coursesRes, studentsRes] = await Promise.all([
        fetch("http://localhost:8080/api/instructor"),
        fetch("http://localhost:8080/api/instructor/count"),
        fetch("http://localhost:8080/api/courses/count"),
        fetch("http://localhost:8080/api/courses"),
        fetch("http://localhost:8080/api/student/admin/overview"),
      ]);
      if (listRes.ok) {
        const list = await listRes.json();
        setInstructors(list);
      }
      if (countRes.ok) {
        const c = await countRes.json();
        setCount(c);
      }
      if (courseCountRes.ok) {
        const n = await courseCountRes.json();
        setCourseCount(n);
      }
      if (coursesRes.ok) {
        const list = await coursesRes.json();
        setCourses(list);
      }
      if (studentsRes.ok) {
        const list = await studentsRes.json();
        setStudents(list);
      }
    } catch {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const createInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/instructor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setTempPassword(data.temporaryPassword);
      setName("");
      setEmail("");
      loadData();
    } catch {}
  };

  const deleteInstructor = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/instructor/${id}`, { method: "DELETE" });
      if (res.status === 204) {
        setInstructors((prev) => prev.filter((i) => i.id !== id));
        setCount((c) => Math.max(0, c - 1));
      }
    } catch {}
  };

  const deleteCourse = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/courses/${id}`, { method: "DELETE" });
      if (res.status === 204) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        setCourseCount((n) => Math.max(0, n - 1));
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Hello Admin!</h1>
            <p className="text-muted-foreground">Manage instructors</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Add Instructor</h2>
              <form className="space-y-4" onSubmit={createInstructor}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">Save Instructor</Button>
              </form>
              {tempPassword && (
                <div className="mt-4">
                  <p className="text-sm">Temporary password</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Input readOnly value={tempPassword} />
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(tempPassword!)}>Copy</Button>
                  </div>
                </div>
              )}
            </Card>
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Manage Instructors</h2>
                <span className="text-sm text-muted-foreground">Instructors: {count} • Courses: {courseCount}</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-[140px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructors.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell>{i.name}</TableCell>
                      <TableCell>{i.email}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => deleteInstructor(i.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Students</h2>
                <span className="text-sm text-muted-foreground">Total: {students.length}</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead className="w-[140px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell className="text-muted-foreground">{s.lastLoginAt ? new Date(s.lastLoginAt).toLocaleString() : "Never"}</TableCell>
                      <TableCell>{s.enrollments.length}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => setOpenStudent({ id: s.id, name: s.name })}>View Courses</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">All Courses</h2>
                <span className="text-sm text-muted-foreground">Total: {courseCount}</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[140px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-semibold">{c.title}</TableCell>
                      <TableCell>{c.instructorName}</TableCell>
                      <TableCell className="text-muted-foreground">{c.description}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => deleteCourse(c.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
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

export default AdminDashboard;
