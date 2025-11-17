import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronRight, ChevronLeft } from "lucide-react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  const questions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which CSS property is used to change the text color?",
      options: [
        "text-color",
        "font-color",
        "color",
        "text-style"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "What is the correct syntax for referring to an external script called 'app.js'?",
      options: [
        "<script href='app.js'>",
        "<script name='app.js'>",
        "<script src='app.js'>",
        "<script file='app.js'>"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "Which company developed JavaScript?",
      options: [
        "Microsoft",
        "Netscape",
        "Oracle",
        "IBM"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets"
      ],
      correctAnswer: 1
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Web Development Fundamentals Quiz</h1>
                <p className="text-muted-foreground">Answer all questions to complete the quiz</p>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-primary">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </Card>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="font-semibold">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Question Card */}
          <Card className="p-8 mb-6">
            <h2 className="text-xl font-semibold mb-6">
              {questions[currentQuestion].question}
            </h2>

            <RadioGroup
              value={selectedAnswers[currentQuestion]}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentQuestion === questions.length - 1 ? (
              <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
                disabled={!selectedAnswers[currentQuestion]}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Question Navigation */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold mb-4">Question Navigation</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentQuestion ? "default" : selectedAnswers[index] ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestion(index)}
                  className={index === currentQuestion ? "bg-gradient-to-r from-primary to-secondary" : ""}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
