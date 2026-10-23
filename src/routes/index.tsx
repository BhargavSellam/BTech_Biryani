import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Phone, MapPin, Menu as MenuIcon, X, Instagram, Search, Navigation, UtensilsCrossed, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logo from "@/assets/logo.png.asset.json";
import hero from "@/assets/hero-biryani.jpg";
import { SITE, MENU, MENU_IS_DEMO, GALLERY, priceLabel, type MenuItem } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "B.TECH Biryani — Biryani in Ambajipeta, Andhra Pradesh" },
      { name: "description", content: "Explore the menu at BTech Biryani in Ambajipeta. Call +91 7337584872 to enquire or place your order." },
      { property: "og:title", content: "B.TECH Biryani — Ambajipeta" },
      { property: "og:description", content: "Big flavour, every bite. Explore the menu and call to order." },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "BTech Biryani",
          telephone: "+917337584872",
          servesCuisine: "Biryani",
          address: { "@type": "PostalAddress", addressLocality: "Ambajipeta", addressRegion: "Andhra Pradesh", addressCountry: "IN" },
          sameAs: [SITE.instagram],
        }),
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit Us" },
  { href: "#contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  return (
    <div className="overflow-x-hidden pb-20 lg:pb-0">
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <Featured />
        <About />
        <Gallery />
        <Visit />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string | undefined }) {
  return (
    <div className="reveal mx-auto mb-10 max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-deep">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4">
        <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="B.TECH Biryani home">
          <img src={logo.url} alt="B.TECH Biryani logo" width={56} height={56} className="h-14 w-14 rounded-full" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-charcoal transition-colors hover:text-gold-deep">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="lg" className="hidden sm:inline-flex">
            <a href={SITE.phoneTel}><Phone /> Call to Order</a>
          </Button>
          <button className="grid h-11 w-11 place-items-center rounded-full border lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-charcoal/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-background p-6 shadow-soft transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="mb-8 flex items-center justify-between">
            <img src={logo.url} alt="" width={48} height={48} className="h-12 w-12 rounded-full" />
            <button className="grid h-11 w-11 place-items-center rounded-full border" aria-label="Close menu" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-lg font-medium text-charcoal hover:bg-accent">{n.label}</a>
            ))}
          </nav>
          <Button asChild variant="gold" size="xl" className="mt-auto">
            <a href={SITE.phoneTel} tabIndex={open ? 0 : -1}><Phone /> Call to Order</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div aria-hidden className="animate-float absolute -left-10 top-24 h-24 w-24 rounded-full border-4 border-primary/30" />
      <div aria-hidden className="animate-float absolute right-1/3 top-10 h-4 w-4 rotate-45 bg-primary/60" style={{ animationDelay: "1.5s" }} />
      <div aria-hidden className="animate-float absolute bottom-16 left-1/2 h-3 w-3 rotate-45 bg-gold-deep/60" style={{ animationDelay: "3s" }} />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <UtensilsCrossed className="h-4 w-4" /> Ambajipeta's biryani spot
          </p>
          <h1 className="text-5xl font-black leading-[1.05] sm:text-6xl xl:text-7xl">
            Big Flavour.<br /><span className="text-gold-gradient">Every Bite.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Explore the menu at BTech Biryani in Ambajipeta. Call us to enquire or place your order.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="xl"><a href="#menu">Explore Menu</a></Button>
            <Button asChild variant="goldOutline" size="xl"><a href={SITE.phoneTel}><Phone /> Call to Order</a></Button>
          </div>
          <div className="mt-8 flex flex-col gap-3 text-sm text-charcoal sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-deep" /> {SITE.location}</span>
            <a href={SITE.phoneTel} className="flex items-center gap-2 font-semibold hover:text-gold-deep"><Phone className="h-4 w-4 text-gold-deep" /> {SITE.phoneDisplay}</a>
          </div>
        </div>
        <div className="relative animate-fade-up" style={{ animationDelay: ".2s" }}>
          <div aria-hidden className="absolute inset-6 -z-10 rounded-full bg-gold opacity-20 blur-3xl" />
          <img src={hero} alt="Illustrative photo of chicken biryani in a copper pot" width={1280} height={1280} fetchPriority="high" className="mx-auto aspect-square w-full max-w-xl rounded-full border-8 border-background object-cover shadow-soft" />
          <span className="absolute bottom-4 right-4 rounded-full bg-background/90 px-3 py-1 text-xs text-muted-foreground">Illustrative image</span>
        </div>
      </div>
    </section>
  );
}

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${veg ? "text-veg" : "text-nonveg"}`}>
      <span className={`grid h-4 w-4 place-items-center border-2 ${veg ? "border-veg" : "border-nonveg"}`}>
        <span className={`h-2 w-2 rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
      </span>
      {veg ? "Veg" : "Non-veg"}
    </span>
  );
}

function enquireHref(item: MenuItem) {
  if (!SITE.whatsappEnabled) return SITE.phoneTel;
  const msg = `Hello BTech Biryani, I would like to enquire about ${item.name} (${item.portion}).`;
  return `${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function DishCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-[5/4] overflow-hidden">
        <img src={item.image} alt={`Illustrative photo of ${item.name}`} loading="lazy" width={912} height={736} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {MENU_IS_DEMO && <span className="absolute left-3 top-3 rounded-full bg-charcoal px-3 py-1 text-xs font-medium text-charcoal-foreground">Demo item</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <span className="shrink-0 font-semibold text-gold-deep">{priceLabel(item.price)}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <VegMark veg={item.veg} />
          <span>{item.portion}</span>
          <span className={item.available ? "text-veg" : "text-destructive"}>{item.available ? "Available" : "Unavailable"}</span>
        </div>
        <Button asChild variant="charcoal" className="mt-5 h-11">
          <a href={enquireHref(item)}><Phone /> Enquire to Order</a>
        </Button>
      </div>
    </article>
  );
}

function MenuSection() {
  const cats = useMemo(() => ["All", ...Array.from(new Set(MENU.map((m) => m.category)))], []);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const items = MENU.filter((m) => (cat === "All" || m.category === cat) && m.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <section id="menu" className="bg-secondary/60 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Our Menu" title="Find your favourite" sub={MENU_IS_DEMO ? "Demo menu: dishes, portions and prices shown are placeholders until confirmed by the restaurant." : undefined} />
        <div className="reveal mb-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Menu categories">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`h-11 rounded-full px-5 text-sm font-semibold transition-all ${cat === c ? "bg-gold text-primary-foreground shadow-gold" : "border bg-background text-charcoal hover:border-primary"}`}>
                {c}
              </button>
            ))}
          </div>
          <label className="relative w-full md:w-72">
            <span className="sr-only">Search the menu</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…" className="h-11 w-full rounded-full border bg-background pl-11 pr-4 text-sm" />
          </label>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => <div key={i.id} className="animate-fade-up"><DishCard item={i} /></div>)}
        </div>
        {items.length === 0 && <p className="py-10 text-center text-muted-foreground">No dishes match your search.</p>}
        <div className="reveal mt-10 rounded-2xl border bg-background p-5 text-sm text-muted-foreground">
          <strong className="text-charcoal">Allergens & dietary needs:</strong> Allergen information will be added once confirmed. Please call us to discuss any dietary requirements before ordering.
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const feat = MENU.filter((m) => m.featured);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Featured" title="Dishes to try" sub={MENU_IS_DEMO ? "Placeholder selection — to be chosen by the owner." : undefined} />
        <div className="grid gap-6 md:grid-cols-3">
          {feat.map((f, i) => (
            <div key={f.id} className="reveal group relative overflow-hidden rounded-3xl shadow-soft" style={{ transitionDelay: `${i * 100}ms` }}>
              <img src={f.image} alt={`Illustrative photo of ${f.name}`} loading="lazy" width={912} height={736} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent p-6 pt-20">
                <h3 className="text-2xl font-bold text-charcoal-foreground">{f.name}</h3>
                <p className="mt-1 text-sm text-charcoal-foreground/80">{f.portion} · {priceLabel(f.price)}</p>
                <Button asChild variant="gold" className="mt-4 h-11"><a href={enquireHref(f)}><Phone /> Enquire</a></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-charcoal py-20 text-charcoal-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[auto_1fr]">
        <img src={logo.url} alt="B.TECH Biryani logo" width={260} height={260} loading="lazy" className="reveal mx-auto h-56 w-56 rounded-full shadow-gold md:h-64 md:w-64" />
        <div className="reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">About Us</p>
          <h2 className="mt-2 text-3xl font-bold text-charcoal-foreground sm:text-4xl">Welcome to B.TECH Biryani</h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gold" />
          <p className="mt-6 text-lg text-charcoal-foreground/85">
            BTech Biryani serves biryani lovers in Ambajipeta, Andhra Pradesh. Explore our menu, then give us a call to enquire or place your order.
          </p>
          <p className="mt-4 rounded-2xl border border-charcoal-foreground/20 p-4 text-sm italic text-charcoal-foreground/70">
            Owner's story coming soon — space reserved for the restaurant to share its story.
          </p>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  const go = (d: number) => setIdx((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length));
  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx]);
  return (
    <section id="gallery" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Gallery" title="A feast for the eyes" sub="Illustrative images shown — real restaurant photos coming soon." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((g, i) => (
            <button key={i} onClick={() => setIdx(i)} className="reveal group overflow-hidden rounded-2xl" aria-label={`Open image: ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" width={600} height={600} className="aspect-square w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
            </button>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="goldOutline" size="xl"><a href={SITE.instagram} target="_blank" rel="noopener noreferrer"><Instagram /> Follow Us on Instagram</a></Button>
        </div>
      </div>
      {idx !== null && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 animate-in fade-in"
          onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
          onTouchEnd={(e) => { if (touch.current === null) return; const dx = e.changedTouches[0]!.clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touch.current = null; }}>
          <button autoFocus onClick={() => setIdx(null)} aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-background text-charcoal"><X /></button>
          <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-background text-charcoal"><ChevronLeft /></button>
          <img key={idx} src={GALLERY[idx]!.src} alt={GALLERY[idx]!.alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain animate-in zoom-in-95" />
          <button onClick={() => go(1)} aria-label="Next image" className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-background text-charcoal"><ChevronRight /></button>
        </div>
      )}
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="bg-secondary/60 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Visit Us" title="Find us in Ambajipeta" />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal flex flex-col justify-center rounded-3xl border bg-background p-8 shadow-soft">
            <MapPin className="h-8 w-8 text-gold-deep" />
            <p className="mt-4 text-2xl font-bold text-charcoal">{SITE.location}</p>
            <p className="mt-2 text-muted-foreground">Exact address coming soon. Call us for exact directions.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild variant="gold" size="xl"><a href={SITE.mapsSearch} target="_blank" rel="noopener noreferrer"><Navigation /> Search on Google Maps</a></Button>
              <Button asChild variant="goldOutline" size="xl"><a href={SITE.phoneTel}><Phone /> Call for Exact Directions</a></Button>
            </div>
          </div>
          <div className="reveal relative overflow-hidden rounded-3xl border shadow-soft">
            <span className="absolute left-4 top-4 z-10 rounded-full bg-charcoal px-4 py-1.5 text-sm font-semibold text-charcoal-foreground">Ambajipeta area</span>
            <iframe title="Map of the Ambajipeta area" src={SITE.mapEmbed} loading="lazy" className="h-80 w-full lg:h-full lg:min-h-96" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "", website: "" });
  const [err, setErr] = useState<string | null>(null);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // spam trap
    if (form.name.trim().length < 2) return setErr("Please enter your name.");
    if (!/^[+\d][\d\s-]{8,15}$/.test(form.phone.trim())) return setErr("Please enter a valid phone number.");
    if (form.message.trim().length < 3) return setErr("Please enter a message.");
    setErr(null);
    const body = `Hello BTech Biryani, I'm ${form.name.trim()} (${form.phone.trim()}). ${form.message.trim().slice(0, 500)}`;
    window.location.href = `${SITE.smsLink}?body=${encodeURIComponent(body)}`;
  };
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="Contact" title="Get in touch" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="reveal space-y-4">
            <a href={SITE.phoneTel} className="flex items-center gap-4 rounded-2xl border p-5 transition-shadow hover:shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-primary-foreground"><Phone className="h-5 w-5" /></span>
              <span><span className="block text-sm text-muted-foreground">Call to order</span><span className="text-xl font-bold text-charcoal">{SITE.phoneDisplay}</span></span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-gold-deep"><MapPin className="h-5 w-5" /></span>
              <span className="text-charcoal">{SITE.location}</span>
            </div>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border p-5 transition-shadow hover:shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-gold-deep"><Instagram className="h-5 w-5" /></span>
              <span className="text-charcoal">@b.tech_biryanis</span>
            </a>
            <div className="flex items-start gap-4 rounded-2xl border p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-gold-deep"><Clock className="h-5 w-5" /></span>
              <div className="text-charcoal">
                {SITE.hours.length ? SITE.hours.map((h) => <p key={h.days}><strong>{h.days}:</strong> {h.time}</p>) : <p>Opening hours coming soon — please call to check.</p>}
              </div>
            </div>
          </div>
          <form onSubmit={submit} noValidate className="reveal space-y-4 rounded-3xl border bg-secondary/50 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">Send an enquiry</h3>
            <p className="text-sm text-muted-foreground">This opens a text message to the restaurant on your phone, ready to send.</p>
            {(["name", "phone"] as const).map((f) => (
              <div key={f}>
                <label htmlFor={f} className="mb-1 block text-sm font-medium text-charcoal">{f === "name" ? "Name" : "Phone number"}</label>
                <input id={f} type={f === "phone" ? "tel" : "text"} maxLength={f === "name" ? 80 : 16} value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} className="h-12 w-full rounded-xl border bg-background px-4" />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-charcoal">Message</label>
              <textarea id="message" rows={4} maxLength={500} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border bg-background p-4" />
            </div>
            <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <Button type="submit" variant="gold" size="xl" className="w-full">Send Enquiry</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "How do I place an order?", a: `Call us on ${SITE.phoneDisplay} to enquire about the menu and place your order.` },
  { q: "Where is the restaurant located?", a: "We're in Ambajipeta, Andhra Pradesh. Please call us for exact directions." },
  { q: "What are your opening hours?", a: "Opening hours will be published soon. Please call to check before visiting." },
  { q: "What portions and family packs are available?", a: "Please call us to ask about current portion sizes and pack options." },
  { q: "Do you offer takeaway or delivery?", a: "Please call us to ask about takeaway and delivery availability." },
  { q: "Can you help with dietary requirements?", a: "Yes — please call and discuss your dietary needs with us before ordering." },
];

function Faq() {
  return (
    <section className="bg-secondary/60 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle eyebrow="FAQ" title="Questions? We've got answers" />
        <Accordion type="single" collapsible className="reveal rounded-3xl border bg-background px-6">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-semibold text-charcoal">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <img src={logo.url} alt="B.TECH Biryani logo" width={96} height={96} loading="lazy" className="h-24 w-24 rounded-full" />
          <p className="mt-4 max-w-xs text-sm text-charcoal-foreground/75">Big flavour, every bite. Biryani in Ambajipeta, Andhra Pradesh.</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 font-semibold text-primary">Quick links</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="text-charcoal-foreground/80 hover:text-primary">{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="space-y-2 text-sm">
          <p className="mb-3 font-semibold text-primary">Contact</p>
          <a href={SITE.phoneTel} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" /> {SITE.phoneDisplay}</a>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {SITE.location}</p>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Instagram className="h-4 w-4" /> Instagram</a>
        </div>
      </div>
      <div className="border-t border-charcoal-foreground/15 px-4 py-5 text-center text-xs text-charcoal-foreground/60">
        © {new Date().getFullYear()} B.TECH Biryani. All rights reserved. · <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
      </div>
    </footer>
  );
}

function MobileBar() {
  const items = [
    { href: "#menu", label: "View Menu", icon: UtensilsCrossed },
    { href: SITE.phoneTel, label: "Call", icon: Phone },
    { href: SITE.mapsSearch, label: "Directions", icon: Navigation, ext: true },
  ];
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t bg-background/95 backdrop-blur lg:hidden">
      {items.map(({ href, label, icon: Icon, ext }) => (
        <a key={label} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold ${label === "Call" ? "bg-gold text-primary-foreground" : "text-charcoal"}`}>
          <Icon className="h-5 w-5" /> {label}
        </a>
      ))}
    </nav>
  );
}
