import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Admin login submit email:", email);
      const res = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("Admin login response status:", res.status);
      if (!res.ok) {
        toast({ title: "Login failed", description: "Invalid credentials" });
        return;
      }
      const data: { id: number; name: string; email: string } = await res.json();
      console.log("Admin login success data:", data);
      login({ role: "admin", id: data.id, name: data.name, email: data.email });
      toast({ title: `Hello ${data.name}!`, description: "Welcome back" });
      navigate("/admin/dashboard");
    } catch {
      toast({ title: "Network error", description: "Please try again later" });
      console.log("Admin login network error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
            <GraduationCap className="h-8 w-8" />
            <span>LearnHub</span>
          </Link>
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage the platform</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">Sign In</Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;