import { useState } from "react";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast as sonnerToast } from "@/components/ui/sonner";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "ramkumar9219447537@gmail.com",
      link: "mailto:ramkumar9219447537@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 9219447537",
      link: "tel:+919219447537",
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

  // Local form state for mailto
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Formspree endpoint (set VITE_FORMSPREE_ENDPOINT in .env), and backend as a fallback.
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";
  // Backend endpoint - when running locally the server listens on port 4000 by default.
  // You can set VITE_BACKEND_URL in your .env to override.
  const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/send";

  const sendMail = async () => {
    // Require a message at minimum
    if (!message) {
      sonnerToast("Please enter a message before sending.");
      return;
    }

    setLoading(true);

    // Helper: open a mailto: fallback
    const openMailtoFallback = () => {
      const subject = encodeURIComponent(`Website contact from ${name || "visitor"}`);
      const body = encodeURIComponent(`Name: ${name || "-"}%0AEmail: ${email || "-"}%0A%0A${message}`);
      const mailto = `mailto:ramkumar9219447537@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    };

    try {
      // 1) Try Formspree if configured
      if (FORMSPREE_ENDPOINT) {
        try {
          const fsRes = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ name, email, message }),
          });

          if (fsRes.ok) {
            sonnerToast("Message sent via Formspree — thank you!");
            setName("");
            setEmail("");
            setMessage("");
            return;
          } else {
            console.warn("Formspree responded with non-ok status", fsRes.status);
          }
        } catch (err) {
          console.warn("Formspree request failed:", err);
        }
      }

      // 2) Try backend endpoint if configured
      try {
        const payload = { name, email, message };

        const res = await fetch(BACKEND_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          sonnerToast("Message sent — check your inbox.");
          setName("");
          setEmail("");
          setMessage("");
          return;
        } else {
          console.warn("Backend responded with non-ok status", res.status);
        }
      } catch (err) {
        console.warn("Backend request failed:", err);
      }

      // 3) Final fallback: open mail client via mailto
      sonnerToast("Falling back to opening your email client...");
      openMailtoFallback();
    } catch (e) {
      sonnerToast("Failed to send message. Please try again later.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 glass-effect">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="text-primary">{info.icon}</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-6">
                  <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        asChild
                        className="hover:border-primary/50"
                      >
                        <a href={social.link} target="_blank" rel="noopener noreferrer">
                          {social.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                <div className="space-y-4">
                  {/* Controlled inputs for mailto */}
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Your name"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Your email"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    aria-label="Your message"
                  />
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={sendMail}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
