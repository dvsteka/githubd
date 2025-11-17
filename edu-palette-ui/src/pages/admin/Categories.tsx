import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Categories = () => {
  const { toast } = useToast();

  const categories = [
    { id: 1, name: "Web Development", courses: 145, description: "Learn web technologies and frameworks" },
    { id: 2, name: "Design", courses: 89, description: "UI/UX and graphic design courses" },
    { id: 3, name: "Data Science", courses: 67, description: "Analytics, ML, and data processing" },
    { id: 4, name: "Business", courses: 54, description: "Management and business strategy" },
    { id: 5, name: "Marketing", courses: 43, description: "Digital marketing and growth" }
  ];

  const handleAddCategory = () => {
    toast({
      title: "Category Added",
      description: "New category has been created successfully.",
    });
  };

  const handleEditCategory = (categoryId: number) => {
    toast({
      title: "Category Updated",
      description: "Category has been updated successfully.",
    });
  };

  const handleDeleteCategory = (categoryId: number) => {
    toast({
      title: "Category Deleted",
      description: "Category has been removed.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Category Management</h1>
              <p className="text-muted-foreground">Organize courses into categories</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input id="categoryName" placeholder="e.g., Web Development" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryDescription">Description</Label>
                    <Input id="categoryDescription" placeholder="Brief description of the category" />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                    onClick={handleAddCategory}
                  >
                    Create Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Categories Table */}
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Total Courses</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground">{category.description}</TableCell>
                    <TableCell>
                      <span className="font-semibold">{category.courses}</span> courses
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="editName">Category Name</Label>
                                <Input id="editName" defaultValue={category.name} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editDescription">Description</Label>
                                <Input id="editDescription" defaultValue={category.description} />
                              </div>
                              <Button 
                                className="w-full bg-gradient-to-r from-primary to-secondary"
                                onClick={() => handleEditCategory(category.id)}
                              >
                                Update Category
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

export default Categories;
