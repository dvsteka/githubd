import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import InstructorLogin from "./pages/instructor/InstructorLogin";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StudentDashboard from "./pages/student/Dashboard";
import StudentCourses from "./pages/student/Courses";
import InstructorContact from "./pages/student/InstructorContact";
import CourseDetail from "./pages/student/CourseDetail";
import LessonViewer from "./pages/student/LessonViewer";
import Quiz from "./pages/student/Quiz";
import StudentProfile from "./pages/student/Profile";
import InstructorDashboard from "./pages/instructor/Dashboard";
import CreateCourse from "./pages/instructor/CreateCourse";

import ManageCourses from "./pages/instructor/ManageCourses";
import Submissions from "./pages/instructor/Submissions";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import Categories from "./pages/admin/Categories";
import Reports from "./pages/admin/Reports";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/instructor/login" element={<InstructorLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/instructor-contact" element={<InstructorContact />} />
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/student/course/:id" element={<CourseDetail />} />
          <Route path="/student/lesson/:id" element={<LessonViewer />} />
          <Route path="/student/quiz/:id" element={<Quiz />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/create-course" element={<CreateCourse />} />
          <Route path="/instructor/courses" element={<ManageCourses />} />
          <Route path="/instructor/submissions" element={<Submissions />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/courses" element={<CourseManagement />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/reports" element={<Reports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
