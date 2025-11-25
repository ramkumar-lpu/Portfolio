import { useState, useEffect } from "react";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast as sonnerToast } from "@/components/ui/sonner";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "ramkumar9219447537@gmail.com",
      link: "mailto:ramkumar9219447537@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "India",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      link: "https://github.com/Ram9219",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/ram4409290/",
    },
  ];

  // Local state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // EmailJS config
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && typeof emailjs.init === "function") {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // Fallback mailto
  const sendMailFallback = () => {
    const subject = encodeURIComponent(`Website contact from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name || "-"}\nEmail: ${email || "-"}\n\n${message}`
    );
    window.location.href = `mailto:ramkumar9219447537@gmail.com?subject=${subject}&body=${body}`;
  };

  // Main send handler
  const sendMail = async () => {
    if (!name || !email || !message) {
      sonnerToast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: name,
            from_email: email,
            message,
          },
          EMAILJS_PUBLIC_KEY
        );

        sonnerToast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        return;
      }

      sonnerToast("Opening your email client...");
      sendMailFallback();
    } catch (err) {
      sonnerToast.error("Something went wrong. Using email client instead.");
      sendMailFallback();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="container">
        <div className="header-content">
          <h2 className="section-title">
            Get In{" "}
            <span className="gradient-text">
              Touch
            </span>
          </h2>
          <p className="section-description">
            Feel free to reach out for collaborations or just a friendly chat.
          </p>
        </div>

        <div className="contact-content">
          <Card className="contact-card">
            <div className="contact-grid">

              {/* LEFT SIDE */}
              <div className="contact-info">
                <h3 className="info-title">Contact Information</h3>

                {contactInfo.map((info, index) => (
                  <div key={index} className="info-item">
                    <div className="info-icon">
                      <span className="text-primary">{info.icon}</span>
                    </div>
                    <div className="info-content">
                      <p className="info-label">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="info-value link-value"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="info-value">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="social-section">
                  <h4 className="social-title">
                    Connect with me
                  </h4>

                  <div className="social-links">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        asChild
                        className="social-button"
                      >
                        <a href={social.link} target="_blank" rel="noopener noreferrer">
                          {social.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - FORM */}
              <div className="contact-form">
                <h3 className="form-title">Send a Message</h3>

                <div className="form-fields">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />

                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-textarea"
                  />

                  <Button
                    className="submit-button"
                    onClick={sendMail}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="button-loading">
                        <span className="loading-dots">
                          <span>.</span><span>.</span><span>.</span>
                        </span>
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Improved CSS */}
      <style jsx>{`
        .contact-section {
          padding: 4rem 1rem;
          background: linear-gradient(to bottom, 
            hsl(var(--background)) 0%,
            hsla(var(--background) / 0.6) 50%,
            hsl(var(--background)) 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-content {
          text-align: center;
          margin-bottom: 3.5rem;
          animation: fade-in-up 0.7s ease-out forwards;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, 
            hsl(var(--primary)) 0%,
            hsl(270 80% 60%) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .section-description {
          color: hsl(var(--muted-foreground));
          font-size: clamp(1rem, 2vw, 1.125rem);
          max-width: 32rem;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-content {
          max-width: 80rem;
          margin: 0 auto;
          animation: fade-in-up 0.7s ease-out 0.2s both;
        }

        .contact-card {
          padding: 2rem;
          border-radius: 1.5rem;
          border: 1px solid hsl(var(--border) / 0.1);
          background: hsl(var(--card) / 0.6);
          backdrop-filter: blur(20px);
          box-shadow: 
            0 20px 40px hsl(var(--foreground) / 0.05),
            0 0 0 1px hsl(var(--border) / 0.05);
        }

        .contact-grid {
          display: grid;
          gap: 3rem;
          grid-template-columns: 1fr;
        }

        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
          
          .contact-card {
            padding: 3rem;
          }
        }

        /* Contact Info Styles */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .info-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          background: hsl(var(--primary) / 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid hsl(var(--primary) / 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .info-item:hover .info-icon {
          transform: scale(1.05);
          background: hsl(var(--primary) / 0.15);
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          margin-bottom: 0.25rem;
        }

        .info-value {
          color: hsl(var(--foreground));
          font-weight: 500;
        }

        .link-value {
          transition: color 0.2s ease;
        }

        .link-value:hover {
          color: hsl(var(--primary));
        }

        /* Social Section */
        .social-section {
          padding-top: 1.5rem;
          border-top: 1px solid hsl(var(--border) / 0.1);
        }

        .social-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
        }

        .social-button {
          border: 1px solid hsl(var(--border) / 0.2);
          border-radius: 0.75rem;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .social-button:hover {
          border-color: hsl(var(--primary) / 0.4);
          background: hsl(var(--primary) / 0.1);
          transform: translateY(-2px);
        }

        /* Form Styles */
        .contact-form {
          display: flex;
          flex-direction: column;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          flex: 1;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          background: hsl(var(--input) / 0.5);
          border: 1px solid hsl(var(--border) / 0.1);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          font-size: 0.875rem;
          color: hsl(var(--foreground));
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: hsl(var(--muted-foreground));
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: hsl(var(--primary) / 0.5);
          box-shadow: 
            0 0 0 4px hsl(var(--primary) / 0.1),
            0 0 20px hsl(var(--primary) / 0.1);
          background: hsl(var(--input) / 0.8);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }

        .submit-button {
          width: 100%;
          background: linear-gradient(135deg, 
            hsl(var(--primary)) 0%,
            hsl(270 80% 60%) 100%);
          border-radius: 0.75rem;
          padding: 1.25rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          box-shadow: 0 8px 24px hsl(var(--primary) / 0.2);
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 32px hsl(var(--primary) / 0.3),
            0 0 0 1px hsl(var(--primary) / 0.1);
          opacity: 0.95;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .button-loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-dots {
          display: flex;
          gap: 2px;
        }

        .loading-dots span {
          animation: dot-bounce 1.4s ease-in-out infinite both;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

        /* Animations */
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes dot-bounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Mobile Optimizations */
        @media (max-width: 640px) {
          .contact-section {
            padding: 2rem 1rem;
          }
          
          .contact-card {
            padding: 1.5rem;
            border-radius: 1rem;
          }
          
          .info-item {
            gap: 0.75rem;
          }
          
          .info-icon {
            width: 2.5rem;
            height: 2.5rem;
          }
          
          .form-input,
          .form-textarea {
            padding: 0.875rem 1rem;
          }
          
          .submit-button {
            padding: 1rem 1.5rem;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .gradient-text {
            animation: none;
          }
          
          .info-icon,
          .social-button,
          .submit-button,
          .form-input,
          .form-textarea {
            transition: none;
          }
          
          .loading-dots span {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
