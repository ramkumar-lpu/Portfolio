import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/components/profile.jpg";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 animate-fade-in">
          {/* Profile image (square) - place public/profile.jpg */}
          <div className="flex justify-center">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg">
              <img
                src={profileImg}
                alt="Ram Kumar"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg md:text-xl text-muted-foreground">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              Ram Kumar
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/80">
              B.Tech Software Engineer
            </p>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating innovative solutions and building scalable applications
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="#projects">View Projects</a>
            </Button>

            {/* Resume button: opens internal Resume page in a new tab */}
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="/resume" target="_blank" rel="noopener noreferrer">Resume</a>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-8">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/Ram9219" target="_blank" rel="noopener noreferrer" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/ram4409290/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:ramkumar9219447537@gmail.com" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about"
        title="Scroll to about"
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </a>
    </section>
  );
};

export default Hero;
