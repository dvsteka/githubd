import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">About</h1>
            <p className="text-muted-foreground">LearnHub empowers learners with instructor-led courses and interactive quizzes.</p>
          </div>
          <Card className="p-6 space-y-4">
            <p>
              Explore curated content across technology, design, and more. Track progress, attempt quizzes, and grow your skills.
            </p>
            <p>
              Instructors can create courses with images and quizzes. Admins oversee users and courses to keep quality high.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;