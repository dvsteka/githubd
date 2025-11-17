import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Download, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Reports = () => {
  const enrollmentTrend = [
    { month: "Jan", students: 400, instructors: 20 },
    { month: "Feb", students: 550, instructors: 25 },
    { month: "Mar", students: 680, instructors: 28 },
    { month: "Apr", students: 720, instructors: 32 },
    { month: "May", students: 850, instructors: 35 },
    { month: "Jun", students: 920, instructors: 38 }
  ];

  const courseCategoryData = [
    { category: "Web Dev", courses: 145 },
    { category: "Design", courses: 89 },
    { category: "Data Science", courses: 67 },
    { category: "Business", courses: 54 },
    { category: "Marketing", courses: 43 }
  ];

  const revenueDistribution = [
    { name: "Course Sales", value: 45 },
    { name: "Subscriptions", value: 30 },
    { name: "Certifications", value: 15 },
    { name: "Other", value: 10 }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--success))', 'hsl(var(--warning))'];

  const handleDownloadReport = (reportType: string) => {
    console.log(`Downloading ${reportType} report...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
              <p className="text-muted-foreground">Comprehensive platform insights and data</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "Total Revenue", value: "$142,890", change: "+18.3%" },
              { label: "Active Users", value: "15,234", change: "+12.5%" },
              { label: "Course Completion", value: "68%", change: "+5.2%" },
              { label: "Avg. Rating", value: "4.7", change: "+0.3" }
            ].map((metric, index) => (
              <Card key={index} className="p-6">
                <p className="text-muted-foreground text-sm mb-2">{metric.label}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="text-sm text-success mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {metric.change}
                </p>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* User Growth Trend */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">User Growth Trend</h2>
                <Button size="sm" variant="outline" onClick={() => handleDownloadReport('user-growth')}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="instructors" stroke="hsl(var(--secondary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Courses by Category */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Courses by Category</h2>
                <Button size="sm" variant="outline" onClick={() => handleDownloadReport('category')}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="courses" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Revenue Distribution */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Revenue Distribution</h2>
                <Button size="sm" variant="outline" onClick={() => handleDownloadReport('revenue')}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Platform Statistics</h2>
              <div className="space-y-4">
                {[
                  { label: "Total Courses", value: "456", color: "text-primary" },
                  { label: "Total Lessons", value: "8,942", color: "text-secondary" },
                  { label: "Quiz Questions", value: "12,567", color: "text-success" },
                  { label: "Certificates Issued", value: "3,421", color: "text-warning" },
                  { label: "Avg. Course Price", value: "$48.50", color: "text-primary" },
                  { label: "Platform Uptime", value: "99.9%", color: "text-success" }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center pb-3 border-b last:border-0">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
