import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
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

  // Local form state for mailto
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // EmailJS configuration through Vite env vars:
  // - VITE_EMAILJS_SERVICE_ID
  // - VITE_EMAILJS_TEMPLATE_ID
  // - VITE_EMAILJS_PUBLIC_KEY
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

  // Initialize EmailJS when public key is available (safe to call in browser)
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      try {
        // emailjs.init is optional if you pass publicKey to send(), but initializing once is fine.
        // @ts-ignore - the init method exists on the EmailJS client
        if (typeof emailjs.init === "function") {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          emailjs.init(EMAILJS_PUBLIC_KEY);
        }
      } catch (err) {
        console.warn("Failed to init EmailJS:", err);
      }
    }
    // Dev-only helpful debug: report whether the Vite env vars are present (does not print keys)
    try {
      if (import.meta.env.MODE === "development") {
        // Log presence (true/false) so you can check browser console if Vite exposes the vars
        // We intentionally do NOT log the secret/public key values themselves.
        // Open devtools Console and look for "EmailJS config presence" when the page loads.
        // eslint-disable-next-line no-console
        console.info("EmailJS config presence:", {
          serviceIdPresent: !!EMAILJS_SERVICE_ID,
          templateIdPresent: !!EMAILJS_TEMPLATE_ID,
          publicKeyPresent: !!EMAILJS_PUBLIC_KEY,
        });
      }
    } catch (err) {
      // ignore in production or if import.meta.env.MODE is unavailable
    }
  }, [EMAILJS_PUBLIC_KEY]);

  const sendMail = async () => {
    if (!message) {
      sonnerToast("Please enter a message before sending.");
      return;
    }

    setLoading(true);

    const openMailtoFallback = () => {
      const subject = encodeURIComponent(`Website contact from ${name || "visitor"}`);
      const body = encodeURIComponent(`Name: ${name || "-"}%0AEmail: ${email || "-"}%0A%0A${message}`);
      const mailto = `mailto:ramkumar9219447537@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    };

    try {
      // Prefer EmailJS if configured
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        // Dev console log that we're attempting EmailJS (no secrets printed)
        // eslint-disable-next-line no-console
        console.info("Attempting EmailJS send (envs present)", {
          serviceIdPresent: !!EMAILJS_SERVICE_ID,
          templateIdPresent: !!EMAILJS_TEMPLATE_ID,
          publicKeyPresent: !!EMAILJS_PUBLIC_KEY,
        });

        try {
          const templateParams = {
            from_name: name || "Visitor",
            from_email: email || "",
            message,
          };

          const result = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
          );

          // Dev: log EmailJS response summary
          // eslint-disable-next-line no-console
          console.info("EmailJS send response:", {
            status: result && (result.status || result.text || "unknown")
          });

          // EmailJS succeeded
          sonnerToast.success("Thanks for contacting me — I'll get back to you soon!");
          setName("");
          setEmail("");
          setMessage("");
          return;
        } catch (err: any) {
          // Log error details (do not print env keys)
          // eslint-disable-next-line no-console
          console.error("EmailJS send failed:", err && (err.text || err.status || err) );
        }
      } else {
        // eslint-disable-next-line no-console
        console.info("EmailJS env vars missing — will fall back to mailto");
      }

      // If EmailJS isn't configured or fails, fall back to mailto
      sonnerToast("Falling back to opening your email client...");
      openMailtoFallback();
    } catch (e) {
      sonnerToast("Failed to send message. Please try again later.");
      // eslint-disable-next-line no-console
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
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
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
