import { Code, Rocket, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Code",
      description: "Writing maintainable and efficient code",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Fast Learner",
      description: "Quick to adapt to new technologies",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Problem Solver",
      description: "Creative solutions to complex challenges",
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate software engineer with a strong foundation in computer science
            and a drive to build impactful applications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, index) => (
            <Card
              key={index}
              className="p-6 glass-effect hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto glass-effect p-8 rounded-lg">
          <p className="text-lg leading-relaxed text-foreground/90">
            I'm a B.Tech Software Engineering student with a passion for technology and innovation.
            My journey in software development has equipped me with strong problem-solving skills
            and the ability to work with various programming languages and frameworks. I'm constantly
            learning and exploring new technologies to stay at the forefront of the industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
