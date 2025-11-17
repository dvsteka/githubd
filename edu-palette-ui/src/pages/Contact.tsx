import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Contact</h1>
            <p className="text-muted-foreground">Send us a message and we’ll get back to you.</p>
          </div>
          <Card className="p-6 space-y-4">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Input id="message" placeholder="How can we help?" />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">Send</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;