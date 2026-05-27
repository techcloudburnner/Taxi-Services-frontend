import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { BRAND, NAV_LINKS, SOCIALS } from "@/lib/constants";

const FacebookIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H17V4.3c-.4-.1-1.4-.2-2.5-.2-2.5 0-4 1.5-4 4.2v2.2H8v3h2.5V21h3z" /></svg>
);
const InstagramIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2H21l-6.52 7.45L22.5 22h-6.81l-5.33-6.97L4.2 22H1.44l6.98-7.98L1.5 2h6.98l4.82 6.37L18.24 2zm-1.19 18h1.88L7.04 4H5.06L17.06 20z" /></svg>
);
const YoutubeIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 8.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7.2.3c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.8 2 11.5v1.4C2 14.6 2 16.2 2 16.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9 1.6.2 6.9.3 6.9.3s4.4 0 7.2-.3c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.4c0-1.7-.2-3.3-.2-3.3zM10 14.5v-5l4.5 2.5L10 14.5z" /></svg>
);

export function Footer() {
  const socials = [
    { href: SOCIALS.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: SOCIALS.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: SOCIALS.twitter, icon: XIcon, label: "Twitter" },
    { href: SOCIALS.youtube, icon: YoutubeIcon, label: "YouTube" },
    { href: `https://wa.me/${BRAND.whatsapp}`, icon: MessageCircle, label: "WhatsApp" },
  ];

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background via-secondary/3 to-secondary/8">
      {/* Main Footer Content */}
      <div className="container-x py-20">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <span className="font-display text-xl font-bold text-primary-foreground">R</span>
              </div>
              <div>
                <div className="font-display text-lg font-bold tracking-wide text-foreground">{BRAND.name}</div>
                <div className="text-[8px] uppercase tracking-[0.3em] text-primary font-bold">Taxi & Travels</div>
              </div>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed mb-8">
              Safe rides. Trusted drivers. Across India. 24x7 reliable taxi service with verified drivers and transparent pricing.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="group rounded-full border border-primary/30 bg-primary/8 p-2.5 text-foreground/60 transition hover:border-primary hover:bg-primary/20 hover:text-primary hover:scale-110">
                  <s.icon className="h-4 w-4 transition group-hover:rotate-12" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-8 flex items-center gap-2">
              <span className="h-1 w-1.5 bg-primary rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-foreground/75 transition hover:text-primary font-medium hover:translate-x-1">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-8 flex items-center gap-2">
              <span className="h-1 w-1.5 bg-primary rounded-full" />
              Services
            </h4>
            <ul className="space-y-4 text-sm text-foreground/75 font-medium">
              <li className="hover:text-primary transition">Local City Rides</li>
              <li className="hover:text-primary transition">Outstation Trips</li>
              <li className="hover:text-primary transition">Airport Transfer</li>
              <li className="hover:text-primary transition">Wedding & Events</li>
              <li className="hover:text-primary transition">Corporate Travel</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-8 flex items-center gap-2">
              <span className="h-1 w-1.5 bg-primary rounded-full" />
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Phone className="mt-1 h-4 w-4 text-primary flex-shrink-0 transition group-hover:scale-125" />
                <div className="text-sm">
                  <div className="text-xs text-primary/70 font-bold uppercase tracking-wider">Phone</div>
                  <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="text-foreground/75 hover:text-primary font-medium transition">
                    {BRAND.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="mt-1 h-4 w-4 text-primary flex-shrink-0 transition group-hover:scale-125" />
                <div className="text-sm">
                  <div className="text-xs text-primary/70 font-bold uppercase tracking-wider">Email</div>
                  <a href={`mailto:${BRAND.email}`} className="text-foreground/75 hover:text-primary font-medium transition break-all">
                    {BRAND.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border/50 bg-gradient-to-r from-secondary/5 via-primary/3 to-secondary/5">
        <div className="container-x py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-foreground/60 font-medium">
            <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
            <div className="flex gap-4">
              <span>{BRAND.address}</span>
              <span className="text-foreground/40">•</span>
              <span>{BRAND.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
