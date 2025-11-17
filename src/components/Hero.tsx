// import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import profileImg from "./profile.jpg";

// const Hero = () => {
//   return (
//     <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="text-center space-y-6 animate-fade-in">
//           {/* Profile image (square) - place public/profile.jpg */}
//           <div className="flex justify-center">
//             <img
//               src={profileImg}
//               alt="Ram Kumar"
//               className="w-60 h-60 object-cover shadow-lg rounded-full"
//             />
//           </div>

//           <div className="space-y-2">
//             <p className="text-lg md:text-xl text-muted-foreground">Hello, I'm</p>
//             <h1 className="text-5xl md:text-7xl font-bold gradient-text">
//               Ram Kumar
//             </h1>
//             <p className="text-2xl md:text-3xl text-foreground/80">
//               B.Tech Software Engineer
//             </p>
//           </div>

//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Passionate about creating innovative solutions and building scalable applications
//           </p>

//           <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
//             <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
//               <a href="#projects">View Projects</a>
//             </Button>

//             {/* Resume button: opens internal Resume page in a new tab */}
//             <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
//               <a href="/resume" target="_blank" rel="noopener noreferrer">Resume</a>
//             </Button>

//             <Button asChild variant="outline" size="lg">
//               <a href="#contact">Get in Touch</a>
//             </Button>
//           </div>

//           <div className="flex items-center justify-center gap-4 pt-8">
//             <Button variant="ghost" size="icon" asChild>
//               <a href="https://github.com/Ram9219" target="_blank" rel="noopener noreferrer" title="GitHub">
//                 <Github className="w-5 h-5" />
//               </a>
//             </Button>
//             <Button variant="ghost" size="icon" asChild>
//               <a href="https://www.linkedin.com/in/ram4409290/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
//                 <Linkedin className="w-5 h-5" />
//               </a>
//             </Button>
//             <Button variant="ghost" size="icon" asChild>
//               <a href="mailto:ramkumar9219447537@gmail.com" title="Email">
//                 <Mail className="w-5 h-5" />
//               </a>
//             </Button>
//           </div>
//         </div>
//       </div>

//       <a
//         href="#about"
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
//         aria-label="Scroll to about"
//         title="Scroll to about"
//       >
//         <ArrowDown className="w-6 h-6 text-muted-foreground" />
//       </a>
//     </section>
//   );
// };

// export default Hero;


import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "./profile.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center space-y-6 animate-fade-in">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={profileImg}
              alt="Ram Kumar"
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 object-cover shadow-lg rounded-full border-4 border-primary/20"
            />
          </div>

          {/* Headings */}
          <div className="space-y-2">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Hello, I'm
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text">
              Ram Kumar
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-foreground/80">
              B.Tech Software Engineer
            </p>
          </div>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-2">
            Passionate about creating innovative solutions and building scalable applications.
          </p>

          {/* Buttons Section */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-sm sm:text-base sm:px-6 sm:py-3"
            >
              <a href="#projects">View Projects</a>
            </Button>

            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-sm sm:text-base sm:px-6 sm:py-3"
            >
              <a href="/resume" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-sm sm:text-base sm:px-6 sm:py-3"
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 pt-6 sm:pt-8">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="w-10 h-10 sm:w-12 sm:h-12 hover:bg-primary/10"
            >
              <a
                href="https://github.com/Ram9219"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="w-10 h-10 sm:w-12 sm:h-12 hover:bg-primary/10"
            >
              <a
                href="https://www.linkedin.com/in/ram4409290/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="w-10 h-10 sm:w-12 sm:h-12 hover:bg-primary/10"
            >
              <a
                href="mailto:ramkumar9219447537@gmail.com"
                title="Email"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about"
        title="Scroll to about"
      >
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
      </a>
    </section>
  );
};

export default Hero;
