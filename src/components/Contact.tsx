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

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && typeof emailjs.init === "function") {
      // @ts-ignore
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, [EMAILJS_PUBLIC_KEY]);

  const sendMail = async () => {
    if (!message) {
      sonnerToast("Please enter a message before sending.");
      return;
    }

    setLoading(true);

    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          { from_name: name || "Visitor", from_email: email, message },
          EMAILJS_PUBLIC_KEY
        );
        sonnerToast.success("Thanks for contacting me — I'll get back to you soon!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const subject = encodeURIComponent(`Website contact from ${name || "visitor"}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:ramkumar9219447537@gmail.com?subject=${subject}&body=${body}`;
      }
    } catch (error) {
      sonnerToast("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Feel free to reach out for collaborations or just a friendly chat.
          </p>
        </div>

        {/* Contact Card */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 sm:p-8 lg:p-10 glass-effect">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              {/* Left Section */}
              <div className="space-y-8">
                <h3 className="text-xl sm:text-2xl font-semibold">Contact Information</h3>
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="text-primary">{info.icon}</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground hover:text-primary transition-colors text-sm sm:text-base break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground text-sm sm:text-base">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Social Links */}
                <div className="pt-4 sm:pt-6">
                  <h4 className="text-lg font-semibold mb-3 sm:mb-4">Connect with me</h4>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        asChild
                        className="hover:border-primary/50 w-10 h-10 sm:w-12 sm:h-12"
                      >
                        <a href={social.link} target="_blank" rel="noopener noreferrer">
                          {social.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Section (Form) */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Send a Message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-sm sm:text-base bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm sm:text-base bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 text-sm sm:text-base bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base"
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

