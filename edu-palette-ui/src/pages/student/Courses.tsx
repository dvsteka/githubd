import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Search, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const StudentCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["All", "Web Development", "Design", "Data Science", "Business", "Marketing"];

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      category: "Web Development",
      price: "$49.99",
      rating: 4.8,
      students: 12500,
      duration: "40 hours",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
      level: "Beginner"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Sarah Johnson",
      category: "Design",
      price: "$59.99",
      rating: 4.9,
      students: 8900,
      duration: "30 hours",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Michael Chen",
      category: "Data Science",
      price: "$54.99",
      rating: 4.7,
      students: 15200,
      duration: "35 hours",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop",
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Digital Marketing Fundamentals",
      instructor: "Emma Davis",
      category: "Marketing",
      price: "$39.99",
      rating: 4.6,
      students: 9800,
      duration: "25 hours",
      thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=500&h=300&fit=crop",
      level: "Beginner"
    },
    {
      id: 5,
      title: "Business Strategy & Management",
      instructor: "Robert Wilson",
      category: "Business",
      price: "$44.99",
      rating: 4.5,
      students: 7600,
      duration: "28 hours",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
      level: "Advanced"
    },
    {
      id: 6,
      title: "Advanced React & TypeScript",
      instructor: "Alex Turner",
      category: "Web Development",
      price: "$64.99",
      rating: 4.9,
      students: 11200,
      duration: "45 hours",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
      level: "Advanced"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Explore Courses</h1>
            <p className="text-muted-foreground text-lg">
              Discover new skills and advance your career with our expert-led courses
            </p>
          </div>

          {/* Search and Filter */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category.toLowerCase() || (category === "All" && selectedCategory === "all") ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category === "All" ? "all" : category)}
                  className={selectedCategory === category.toLowerCase() || (category === "All" && selectedCategory === "all") ? "bg-gradient-to-r from-primary to-secondary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-card text-foreground">
                    {course.level}
                  </Badge>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2">{course.category}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">By {course.instructor}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <Link to={`/student/course/${course.id}`}>
                      <Button className="bg-gradient-to-r from-primary to-secondary">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">1</Button>
            <Button className="bg-gradient-to-r from-primary to-secondary">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
