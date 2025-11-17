import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ManageCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const [courses, setCourses] = useState<Array<{ id: number; title: string; description: string }>>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;
      const res = await fetch(`http://localhost:8080/api/courses/by-instructor/${user.id}`);
      if (res.ok) {
        const list = await res.json();
        setCourses(list);
      }
    };
    load();
  }, [user?.id]);
  const filtered = useMemo(() => courses.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase())), [courses, searchQuery]);

  const openEdit = (course: { id: number; title: string; description: string }) => {
    setEditingId(course.id);
    setEditTitle(course.title);
    setEditDescription(course.description);
    setEditOpen(true);
  };

  const submitEdit = async () => {
    if (!editingId) return;
    const res = await fetch(`http://localhost:8080/api/courses/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, description: editDescription }),
    });
    if (res.ok) {
      setCourses((prev) => prev.map((c) => (c.id === editingId ? { ...c, title: editTitle, description: editDescription } : c)));
      setEditOpen(false);
      setEditingId(null);
    }
  };

  const deleteCourse = async (id: number) => {
    const res = await fetch(`http://localhost:8080/api/courses/${id}`, { method: "DELETE" });
    if (res.ok) setCourses((prev) => prev.filter((c) => c.id !== id));
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-success text-success-foreground";
      case "Under Review":
        return "bg-warning text-warning-foreground";
      case "Draft":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Courses</h1>
            <p className="text-muted-foreground">You have {courses.length} courses</p>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell className="text-muted-foreground">{course.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEdit(course)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteCourse(course.id)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input id="edit-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-desc">Description</Label>
                  <Input id="edit-desc" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
                  <Button onClick={submitEdit}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
