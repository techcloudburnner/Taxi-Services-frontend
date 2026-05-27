// src/routes/contact.tsx
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Loader2, AlertCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { API_ENDPOINTS } from "@/config/api/constants";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sikar Taxi Service | Rudra Banna Taxi & Cab" },
      { name: "description", content: "Contact Rudra Banna — Sikar's trusted taxi & cab service. Call, WhatsApp or message us 24/7 for taxi service in Sikar Rajasthan." },
      { property: "og:title", content: "Contact — Sikar Taxi Service" },
      { property: "og:description", content: "Reach Rudra Banna Taxi 24/7 — Sikar cab service." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const items = [
    { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: BRAND.phone, href: `https://wa.me/${BRAND.whatsapp}` },
    { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: MapPin, label: "Address", value: BRAND.address },
    { icon: Clock, label: "Hours", value: BRAND.hours },
  ];

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Submit to API
      const contactData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        message: formData.message.trim(),
      };

      await axios.post(API_ENDPOINTS.CONTACTS.BASE, contactData);
      
      setSent(true);
      // Reset form
      setFormData({ name: "", phone: "", email: "", message: "" });
      
    } catch (err: any) {
      console.error('Contact submission error:', err);
      
      if (err.response?.status === 400) {
        const errorData = err.response.data;
        if (typeof errorData === 'string') {
          setError(errorData);
        } else if (errorData?.message) {
          setError(errorData.message);
        } else {
          setError("Please check all required fields and try again.");
        }
      } else if (err.code === 'ERR_NETWORK') {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Failed to send message. Please try again or contact us directly.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setError(null);
  };

  return (
    <div className="py-20">
      <div className="container-x">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Contact</span>
          <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Let's <span className="text-gradient">talk</span>
          </h1>
          <p className="mt-4 text-foreground/70">
            Have a question or need help planning a trip? Drop us a line and we'll get back fast.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact Info Cards */}
          <div className="space-y-3">
            {items.map((it) => {
              const Inner = (
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50 hover:shadow-glow">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
                    <div className="mt-0.5 font-medium text-foreground">{it.value}</div>
                  </div>
                </div>
              );
              return it.href ? (
                <a 
                  key={it.label} 
                  href={it.href} 
                  target={it.href.startsWith("http") ? "_blank" : undefined} 
                  rel="noreferrer"
                >
                  {Inner}
                </a>
              ) : (
                <div key={it.label}>{Inner}</div>
              );
            })}
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            {sent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="flex h-full flex-col items-center justify-center py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 font-display text-2xl">Message Sent!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-6 px-6 py-2.5 rounded-full border border-border text-sm font-medium hover:border-primary hover:text-primary transition"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <>
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setError(null)} 
                      className="ml-2 text-sm underline hover:no-underline"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input 
                    label="Name *" 
                    value={formData.name}
                    onChange={(v) => handleChange('name', v)}
                    required 
                  />
                  <Input 
                    label="Phone *" 
                    type="tel" 
                    value={formData.phone}
                    onChange={(v) => handleChange('phone', v)}
                    required 
                  />
                  <Input 
                    label="Email" 
                    type="email" 
                    value={formData.email}
                    onChange={(v) => handleChange('email', v)}
                    className="sm:col-span-2" 
                  />
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Message *
                    </label>
                    <textarea 
                      required 
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full rounded-xl border border-border bg-input/40 p-3 text-sm outline-none transition focus:border-primary focus:bg-input/60 resize-none placeholder:text-muted-foreground" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ 
  label, 
  value,
  onChange,
  type = "text", 
  required, 
  className 
}: { 
  label: string; 
  value: string;
  onChange: (v: string) => void;
  type?: string; 
  required?: boolean; 
  className?: string; 
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required} 
        className="w-full rounded-xl border border-border bg-input/40 px-3 py-3 text-sm outline-none transition focus:border-primary focus:bg-input/60 placeholder:text-muted-foreground" 
      />
    </div>
  );
}
// import { useState } from "react";
// import { createFileRoute } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
// import { BRAND } from "@/lib/constants";

// export const Route = createFileRoute("/contact")({
//   head: () => ({
//     meta: [
//       { title: "Contact Sikar Taxi Service | Rudra Banna Taxi & Cab" },
//       { name: "description", content: "Contact Rudra Banna — Sikar's trusted taxi & cab service. Call, WhatsApp or message us 24/7 for taxi service in Sikar Rajasthan." },
//       { property: "og:title", content: "Contact — Sikar Taxi Service" },
//       { property: "og:description", content: "Reach Rudra Banna Taxi 24/7 — Sikar cab service." },
//       { property: "og:url", content: "/contact" },
//     ],
//     links: [{ rel: "canonical", href: "/contact" }],
//   }),
//   component: ContactPage,
// });

// function ContactPage() {
//   const [sent, setSent] = useState(false);
//   const items = [
//     { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
//     { icon: MessageCircle, label: "WhatsApp", value: BRAND.phone, href: `https://wa.me/${BRAND.whatsapp}` },
//     { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
//     { icon: MapPin, label: "Address", value: BRAND.address },
//     { icon: Clock, label: "Hours", value: BRAND.hours },
//   ];

//   return (
//     <div className="py-20">
//       <div className="container-x">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
//           <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Contact</span>
//           <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
//             Let's <span className="text-gradient">talk</span>
//           </h1>
//           <p className="mt-4 text-foreground/70">
//             Have a question or need help planning a trip? Drop us a line and we'll get back fast.
//           </p>
//         </motion.div>

//         <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
//           <div className="space-y-3">
//             {items.map((it) => {
//               const Inner = (
//                 <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50 hover:shadow-glow">
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//                     <it.icon className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
//                     <div className="mt-0.5 font-medium text-foreground">{it.value}</div>
//                   </div>
//                 </div>
//               );
//               return it.href ? (
//                 <a key={it.label} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{Inner}</a>
//               ) : (
//                 <div key={it.label}>{Inner}</div>
//               );
//             })}
//           </div>

//           <form
//             onSubmit={(e) => { e.preventDefault(); setSent(true); }}
//             className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
//           >
//             {sent ? (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col items-center justify-center py-10 text-center">
//                 <Send className="h-10 w-10 text-primary" />
//                 <h3 className="mt-4 font-display text-2xl">Message Sent</h3>
//                 <p className="mt-2 text-sm text-muted-foreground">We'll reply to you shortly.</p>
//               </motion.div>
//             ) : (
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <Input label="Name" name="name" required />
//                 <Input label="Phone" name="phone" type="tel" required />
//                 <Input label="Email" name="email" type="email" className="sm:col-span-2" />
//                 <Input label="Subject" name="subject" className="sm:col-span-2" />
//                 <div className="sm:col-span-2">
//                   <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
//                   <textarea required rows={5} className="w-full rounded-xl border border-border bg-input/40 p-3 text-sm outline-none transition focus:border-primary focus:bg-input/60" />
//                 </div>
//                 <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]">
//                   <Send className="h-4 w-4" /> Send Message
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Input({ label, name, type = "text", required, className }: { label: string; name: string; type?: string; required?: boolean; className?: string; }) {
//   return (
//     <div className={className}>
//       <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
//       <input type={type} name={name} required={required} className="w-full rounded-xl border border-border bg-input/40 px-3 py-3 text-sm outline-none transition focus:border-primary focus:bg-input/60" />
//     </div>
//   );
// }
