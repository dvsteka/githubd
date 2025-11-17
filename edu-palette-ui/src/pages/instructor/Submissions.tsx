import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Submissions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const submissions = [
    {
      id: 1,
      student: "Alice Johnson",
      course: "Web Development Bootcamp",
      assignment: "Final Project",
      submittedDate: "2024-01-20",
      status: "Pending",
      score: null
    },
    {
      id: 2,
      student: "Bob Smith",
      course: "React & TypeScript",
      assignment: "Quiz 3",
      submittedDate: "2024-01-19",
      status: "Graded",
      score: 85
    },
    {
      id: 3,
      student: "Carol Davis",
      course: "Web Development Bootcamp",
      assignment: "Module 5 Project",
      submittedDate: "2024-01-18",
      status: "Pending",
      score: null
    },
    {
      id: 4,
      student: "David Wilson",
      course: "Node.js Backend",
      assignment: "API Assignment",
      submittedDate: "2024-01-17",
      status: "Graded",
      score: 92
    }
  ];

  const handleGradeSubmit = (submissionId: number) => {
    toast({
      title: "Grade Submitted",
      description: "Student has been notified of their grade.",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "Graded" 
      ? "bg-success text-success-foreground" 
      : "bg-warning text-warning-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Student Submissions</h1>
            <p className="text-muted-foreground">Review and grade student assignments</p>
          </div>

          {/* Search */}
          <Card className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Submissions Table */}
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.student}</TableCell>
                    <TableCell>{submission.course}</TableCell>
                    <TableCell>{submission.assignment}</TableCell>
                    <TableCell className="text-muted-foreground">{submission.submittedDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {submission.score !== null ? (
                        <span className="font-semibold">{submission.score}%</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Submission</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Student</p>
                                  <p className="font-medium">{submission.student}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Assignment</p>
                                  <p className="font-medium">{submission.assignment}</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Submission Content</Label>
                              <div className="p-4 border rounded-lg bg-muted/50">
                                <p className="text-sm">Student's submitted work will appear here...</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="score">Score (%)</Label>
                              <Input
                                id="score"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Enter score"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="feedback">Feedback</Label>
                              <Textarea
                                id="feedback"
                                placeholder="Provide feedback to the student..."
                                className="min-h-[120px]"
                              />
                            </div>

                            <Button 
                              className="w-full bg-gradient-to-r from-primary to-secondary"
                              onClick={() => handleGradeSubmit(submission.id)}
                            >
                              Submit Grade
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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

export default Submissions;
