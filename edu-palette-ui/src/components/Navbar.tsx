import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  useEffect(() => {
    if (!user) {
      const raw = localStorage.getItem("auth:user");
      console.log("Navbar found localStorage auth:user:", raw);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          // proactively sync context via storage write to trigger provider listener
          localStorage.setItem("auth:user", JSON.stringify(parsed));
          console.log("Navbar wrote auth:user to trigger sync", parsed);
        } catch {}
      }
    }
  }, [user]);
  useEffect(() => {
    console.log("Navbar render user:", user);
  }, [user]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <GraduationCap className="h-8 w-8" />
            <span>LearnHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {user.role === "student" && (
                  <>
                    <Link to="/student/dashboard" className="text-foreground hover:text-primary transition-colors">
                      Student Dashboard
                    </Link>
                    <Link to="/student/instructor-contact" className="text-foreground hover:text-primary transition-colors">
                      Instructor Contact
                    </Link>
                  </>
                )}
                {user.role === "instructor" && (
                  <>
                    <Link to="/instructor/dashboard" className="text-foreground hover:text-primary transition-colors">
                      Instructor Dashboard
                    </Link>
                    <Link to="/instructor/create-course" className="text-foreground hover:text-primary transition-colors">
                      Create Course
                    </Link>
                  </>
                )}
                {user.role === "admin" && (
                  <Link to="/admin/dashboard" className="text-foreground hover:text-primary transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                <span className="text-muted-foreground">Hi {user.name}</span>
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Login</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/login">Student Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/instructor/login">Instructor Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/login">Admin Login</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/about"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <>
                  {user.role === "student" && (
                    <>
                      <Link to="/student/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full">Student Dashboard</Button>
                      </Link>
                      <Link to="/student/instructor-contact" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full">Instructor Contact</Button>
                      </Link>
                    </>
                  )}
                  {user.role === "instructor" && (
                    <>
                      <Link to="/instructor/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full">Instructor Dashboard</Button>
                      </Link>
                      <Link to="/instructor/create-course" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full">Create Course</Button>
                      </Link>
                    </>
                  )}
                  <Button variant="ghost" className="w-full" onClick={() => { logout(); setIsOpen(false); }}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">Student Login</Button>
                  </Link>
                  <Link to="/instructor/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">Instructor Login</Button>
                  </Link>
                  <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">Admin Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
