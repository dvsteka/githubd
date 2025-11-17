import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InstructorContact = () => {
  const [instructors, setInstructors] = useState<Array<{ id: number; name: string; email: string }>>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:8080/api/instructor");
      if (res.ok) {
        const list = await res.json();
        setInstructors(list);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Instructor Contacts</h1>
            <p className="text-muted-foreground">Reach out to instructors via email</p>
          </div>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructors.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell className="font-medium">{i.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${i.email}`} className="text-primary hover:underline">{i.email}</a>
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

export default InstructorContact;