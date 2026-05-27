import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient">404</h1>
        <h2 className="mt-4 font-display text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like this ride doesn't exist. Let's get you back home.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sikar Taxi Service | Rudra Banna Taxi & Cab Service in Sikar" },
      { name: "description", content: "Trusted Sikar taxi service — book cab & taxi service in Sikar Rajasthan for outstation, airport, railway station & local rides. Verified drivers, 24/7 booking, transparent pricing." },
      { name: "keywords", content: "sikar taxi service, taxi service in sikar, sikar cab service, cab service in sikar, taxi in sikar, cab in sikar, car rental sikar, taxi sikar, cab booking sikar, taxi service in sikar rajasthan, sikar railway station taxi, rudra banna taxi" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Rudra Banna Taxi" },
      { property: "og:site_name", content: "Rudra Banna Taxi" },
      { property: "og:title", content: "Sikar Taxi Service | Rudra Banna Taxi & Cab Service" },
      { property: "og:description", content: "Premium taxi & cab service in Sikar Rajasthan — verified drivers, clean fleet, transparent pricing. Book online or call 24/7." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sikar Taxi Service | Rudra Banna Taxi" },
      { name: "twitter:description", content: "Book trusted cab service in Sikar — 24/7 verified drivers." },
      { name: "geo.region", content: "IN-RJ" },
      { name: "geo.placename", content: "Sikar, Rajasthan" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Rudra Banna Taxi",
          description: "Trusted taxi and cab service in Sikar, Rajasthan offering local, outstation, airport and railway station transfers.",
          url: "/",
          telephone: "+91-98765-43210",
          areaServed: [
            { "@type": "City", name: "Sikar" },
            { "@type": "State", name: "Rajasthan" },
            { "@type": "Country", name: "India" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sikar",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
          priceRange: "₹₹",
          openingHours: "Mo-Su 00:00-23:59",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "1024",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
