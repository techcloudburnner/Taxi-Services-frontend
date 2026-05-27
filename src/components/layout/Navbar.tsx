import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-gradient-to-b from-background via-background to-background/95 backdrop-blur-2xl shadow-elevation">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5 transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow transition group-hover:scale-110">
            <span className="font-display text-xl font-bold text-primary-foreground">R</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-wide text-foreground">{BRAND.name}</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-primary font-semibold">Taxi & Travels</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-semibold transition-all duration-300 relative group ${pathname === l.to ? "text-primary" : "text-foreground/75 hover:text-primary"
                }`}
            >
              {l.label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${pathname === l.to ? "w-full" : "w-0 group-hover:w-full"
                }`} />
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
          className="hidden items-center gap-2.5 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-105 hover:shadow-glow md:inline-flex group"
        >
          <Phone className="h-4 w-4 transition group-hover:rotate-12" />
          {BRAND.phone}
        </a>

        <button
          aria-label="Toggle menu"
          className="md:hidden transition-transform hover:scale-110"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-lg md:hidden">
          <div className="container-x flex flex-col gap-2 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-surface hover:text-primary transition"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:scale-105"
            >
              <Phone className="h-4 w-4" /> {BRAND.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
