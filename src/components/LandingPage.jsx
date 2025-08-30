import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowUpRight, Mail, MapPin, Phone, Download, Star, Sparkles, Send, ArrowRight } from "lucide-react";

/*
  Wee Mobility — Single-file React Landing Page
  - Tech: React + TailwindCSS + Framer Motion + Lucide icons
  - Animations: Parallax hero, staggered reveals, hover tilt, carousel, marquee, spotlight, scroll progress
  - Notes:
    • Replace image placeholders in the /assets directory as specified at the bottom of this file (search `ASSET NAMING`).
    • Tailwind should be enabled in your project for styling to work.
    • This file exports a default React component you can drop into a React app.
*/

// ---------- Helpers ----------
const cls = (...xs) => xs.filter(Boolean).join(" ");

const COLORS = [
  { key: "misty-grey", name: "Misty Grey", hex: "#A8AAAC" },
  { key: "cherry-red", name: "Cherry Red", hex: "#B6202A" },
  { key: "choco-brown", name: "Choco Brown", hex: "#8B5A2B" },
  { key: "aqua-blue", name: "Aqua Blue", hex: "#1C6AA9" },
  { key: "sunset-orange", name: "Sunset Orange", hex: "#E77C26" },
];

const PRODUCTS = [
  {
    id: "wee-ls-1",
    name: "WEE LS-1",
    tagline: "Smart. Safe. Made for Families.",
    colors: COLORS,
    brochure: "/assets/brochures/WEE-LS-1-Brochure.pdf",
    // IMG PATHS: /assets/ls1/<view>-<colorKey>.png e.g., front-misty-grey.png, side-cherry-red.png
    views: ["front", "side"],
    parts: [
      { key: "led-headlamp", label: "LED Headlamp", pos: { x: 18, y: 22 } },
      { key: "front-brake", label: "Front Disc Brake", pos: { x: 30, y: 58 } },
      { key: "battery", label: "Removable Battery", pos: { x: 54, y: 42 } },
      { key: "rear-suspension", label: "Rear Suspension", pos: { x: 76, y: 60 } },
      { key: "dashboard", label: "Smart Dashboard", pos: { x: 44, y: 18 } },
    ],
  },
  // Placeholder future products to preview animations & layout
  {
    id: "wee-ls-2",
    name: "WEE LS-2",
    tagline: "Longer Range. Lighter Weight.",
    comingSoon: true,
  },
  {
    id: "wee-ls-3",
    name: "WEE LS-3",
    tagline: "Performance meets Practicality.",
    comingSoon: true,
  },
  {
    id: "wee-ls-4",
    name: "WEE LS-4",
    tagline: "Premium comfort for every ride.",
    comingSoon: true,
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya Rao",
    role: "Teacher, Bengaluru",
    quote:
      "The LS-1 is perfect for our daily commute. Smooth, quiet and shockingly affordable.",
    rating: 5,
  },
  {
    name: "S. Iqbal",
    role: "Office Admin, Hyderabad",
    quote:
      "Charging once in two days and the app reminders are a blessing. Family loves it!",
    rating: 5,
  },
  {
    name: "Meera Shah",
    role: "Designer, Pune",
    quote:
      "Pick a color and go! The build feels premium and stable on bad roads.",
    rating: 4,
  },
];

const NEWS = [
  { date: "2025-09-15", title: "Teaser: WEE LS-2 range upgrade", blurb: "Up to 30% more range with lightweight cells.", tag: "Coming Soon" },
  { date: "2025-07-10", title: "WEE LS-1 software update v1.2", blurb: "Smarter charging and improved trip stats.", tag: "Update" },
  { date: "2025-06-01", title: "Wee Mobility partners with city EV hubs", blurb: "More service points for easier care.", tag: "Partnership" },
];

// ---------- Small UI Bits ----------
function Pill({ children }) {
  return (
    <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs backdrop-blur-sm">
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      {eyebrow && (
        <motion.div initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-2">
          <Pill>{eyebrow}</Pill>
        </motion.div>
      )}
      <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-semibold tracking-tight">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="text-white/70 mt-3">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ---------- Header ----------
function Header() {
  const progress = useScrollProgress();
  const navRef = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      ref={navRef}
      className={cls(
        "fixed top-0 inset-x-0 z-50 border-b border-white/10",
        "backdrop-blur-xl bg-black/30"
      )}
      style={{ willChange: "transform" }}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-3"
          aria-label="Wee Mobility — Back to top"
        >
          <img src="/assets/logo-wee.svg" alt="Wee Mobility" className="h-7 w-auto" />
          <span className="text-sm font-medium tracking-wide text-white/80 group-hover:text-white transition">Wee Mobility</span>
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <button onClick={() => scrollTo("about")} className="hover:text:white text-white/70 transition">About Us</button>
          <button onClick={() => scrollTo("products")} className="hover:text:white text-white/70 transition">Products</button>
          <button onClick={() => scrollTo("contact")} className="hover:text:white text-white/70 transition">Contact Us</button>
        </nav>
      </div>
      <motion.div className="h-[2px] bg-gradient-to-r from-white/0 via-white/50 to-white/0" style={{ scaleX: progress }} />
    </motion.header>
  );
}

function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return scaleX;
}

// ---------- Hero / Tagline ----------
function Hero() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section className="relative pt-24 md:pt-32 pb-20 md:pb-40 overflow-hidden">
      {/* Background sparkles */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]">
        <motion.div
          className="absolute -top-10 -left-10 size-[50rem] rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 size-[50rem] rounded-full bg-gradient-radial from-[#A8AAAC22] via-transparent to-transparent"
          style={{ y: y2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-4">
            <Pill>Family-first electric mobility</Pill>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight"
          >
            Ride smarter. Spend less. <span className="text-white/70">Smile more.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-white/70 mt-4 md:text-lg">
            Meet <strong>WEE LS-1</strong> — our elegant, efficient e-scooter designed for India’s middle-class families. Safe, reliable and delightfully affordable.
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#products" className="px-5 py-3 rounded-2xl bg-white text-black font-medium inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.99] transition">
              Explore Products <ArrowUpRight className="size-4" />
            </a>
            <a href="#about" className="px-5 py-3 rounded-2xl border border-white/20 text-white/90 font-medium hover:bg-white/10 transition">
              Learn More
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2"><Sparkles className="size-4"/> 85 km real-world range</div>
            <div className="flex items-center gap-2"><Sparkles className="size-4"/> Fast-charge 0–80% in ~60 min</div>
          </div>
        </div>

        {/* Animated scooter montage (auto-swapping front + side) */}
        <HeroScooterShowcase />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 animate-bounce hidden md:flex items-center gap-2">
        <ChevronDown className="size-5"/> Scroll
      </div>
    </section>
  );
}

function HeroScooterShowcase() {
  const [index, setIndex] = useState(0); // 0: front, 1: side
  const [colorKey] = useState("misty-grey");
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % 2), 2600);
    return () => clearInterval(id);
  }, []);
  const src = `/assets/ls1/${index === 0 ? "front" : "side"}-${colorKey}.png`;

  return (
    <div className="relative aspect-[4/3] w-full max-w-xl mx-auto">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-white/0 to-white/10" />
      <div className="absolute -inset-6 -z-10 blur-3xl opacity-40 bg-gradient-to-r from-[#A8AAAC44] via-transparent to-[#FFFFFF22]" />
      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt="WEE LS-1 Hero"
          className="w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
    </div>
  );
}

// ---------- About ----------
function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <SectionHeading
        eyebrow="About Wee Mobility"
        title="We build electric scooters families can trust"
        subtitle="Our mission is simple — make clean mobility delightful and attainable. Designed in India, for India."
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Affordable excellence",
            desc: "High quality without the heavy price tag. Serviceable, reliable, repair-friendly.",
          },
          {
            title: "Thoughtful safety",
            desc: "Disc brakes, sturdy chassis, and smart alerts to keep your family safer.",
          },
          {
            title: "Future-ready",
            desc: "Modular battery & OTA updates keep your scooter improving over time.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="rounded-3xl p-6 bg:white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="text-lg md:text-xl font-medium">{f.title}</div>
            <p className="text-white/70 mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------- Products ----------
function Products() {
  return (
    <section id="products" className="relative py-20 md:py-28">
      <SectionHeading
        eyebrow="Products"
        title="Meet the lineup"
        subtitle="Explore WEE LS-1 in depth and preview upcoming models."
      />

      {/* LS-1 Deep Dive */}
      <L1Showcase />

      {/* Other products using different animations */}
      <OtherProducts />
    </section>
  );
}

function L1Showcase() {
  const product = PRODUCTS[0];
  const [color, setColor] = useState(product.colors[0]);
  const [viewIndex, setViewIndex] = useState(0); // 0 front, 1 side

  // Auto-toggle front/side every few seconds
  useEffect(() => {
    const id = setInterval(() => setViewIndex((v) => (v + 1) % product.views.length), 3200);
    return () => clearInterval(id);
  }, [product.views.length]);

  const src = `/assets/ls1/${product.views[viewIndex]}-${color.key}.png`;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <motion.div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl md:text-4xl font-semibold">{product.name}</h3>
            <p className="text-white/70 mt-2">{product.tagline}</p>
          </motion.div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {product.colors.map((c) => (
              <button
                key={c.key}
                onClick={() => setColor(c)}
                className={cls(
                  "group relative px-4 py-2 rounded-2xl border text-sm transition",
                  c.key === color.key ? "border-white/80 bg-white text-black" : "border-white/20 text-white/80 hover:bg-white/10"
                )}
                aria-label={`Select ${c.name}`}
              >
                <span className="absolute -left-2 -top-2 size-3 rounded-full" style={{ background: c.hex }} />
                {c.name}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-white/70">
            {["85 km range", "55 km/h top speed", "0-80%: ~60 min", "USB-C charging", "Anti-theft alerts", "3 ride modes"].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                {s}
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <a href={product.brochure} download className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition">
              <Download className="size-4" /> Download Brochure (PDF)
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-[2rem] bg-gradient-to-br from-white/10 via-white/0 to-white/10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={src}
                src={src}
                alt={`${product.name} — ${color.name} ${product.views[viewIndex]} view`}
                className="w-full h-full object-contain"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          {/* View toggle */}
          <div className="absolute inset-x-0 -bottom-4 mx-auto w-max flex items-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-2 py-1">
            {product.views.map((v, i) => (
              <button key={v} onClick={() => setViewIndex(i)} className={cls("px-3 py-1 rounded-full text-sm", i === viewIndex ? "bg-white text-black" : "text-white/80 hover:bg-white/10")}>{v}</button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Exploded/parts view */}
      <ExplodedView color={color} product={product} />
    </div>
  );
}

function ExplodedView({ product, color }) {
  const imgSrc = `/assets/ls1/side-${color.key}.png`;
  return (
    <div className="mt-16">
      <SectionHeading
        eyebrow="LS-1 Details"
        title={`Explore the ${product.name} — ${color.name}`}
        subtitle="Hover items to preview. Replace part thumbnails with your own crops for a stunning effect."
      />

      <div className="relative max-w-5xl mx-auto">
        <img src={imgSrc} alt={`${product.name} side view`} className="w-full h-auto object-contain rounded-[2rem] border border-white/10 bg-white/5" />

        {product.parts.map((p, i) => (
          <PartCallout key={p.key} part={p} colorKey={color.key} index={i} />
        ))}
      </div>
    </div>
  );
}

function PartCallout({ part, colorKey, index }) {
  // Positions are in percentage of the container
  const style = { left: `${part.pos.x}%`, top: `${part.pos.y}%` };
  const thumb = `/assets/ls1/parts/${part.key}-${colorKey}.png`; // replace with real crops
  return (
    <motion.div
      className="absolute"
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * index }}
    >
      <motion.div whileHover={{ scale: 1.03 }} className="group relative">
        <div className="absolute -left-10 -top-10 w-24 h-24 rounded-xl bg-white/5 border border-white/10 overflow-hidden opacity-0 group-hover:opacity-100 transition">
          <img src={thumb} onError={(e)=>{e.currentTarget.style.opacity=0}} alt={part.label} className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur border border-white/10">
          <ArrowRight className="size-3" />
          <span className="text-xs whitespace-nowrap">{part.label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OtherProducts() {
  const others = PRODUCTS.slice(1);
  return (
    <div className="mt-20 space-y-12">
      {/* 1) Tilt-on-hover cards (LS-2) */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h4 className="text-xl font-semibold mb-4">Coming Next</h4>
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((p, i) => (
            <TiltCard key={p.id} delay={i * 0.05}>
              <div className="p-5">
                <div className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                  <img src={`/assets/${p.id}/front-misty-grey.png`} onError={(e)=>{e.currentTarget.src='/assets/placeholders/scooter-silhouette.png'}} alt={p.name} className="w-full h-full object-contain"/>
                </div>
                <div className="mt-4">
                  <div className="text-lg font-medium">{p.name}</div>
                  <div className="text-white/60 text-sm">{p.tagline}</div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                  <Pill>Preview</Pill>
                  <span className="opacity-70">Tap for details</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </motion.div>

      {/* 2) Marquee of variants / accessories (fun visual filler) */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="py-6 flex gap-10 animate-[marquee_40s_linear_infinite] will-change-transform">
          {new Array(12).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-3 min-w-max">
              <div className="size-8 rounded-full border border-white/20" />
              <span className="text-white/60">Wee Mobility • Sustainable • Family-first • Reliable</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3) Spotlight reveal on click (modal-like) */}
      <SpotlightPreview />
    </div>
  );
}

function TiltCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ rotateX: -4, rotateY: 6, scale: 1.02 }}
      className="[perspective:1000px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

function SpotlightPreview() {
  const [open, setOpen] = useState(false);
  const [p] = useState(PRODUCTS[1]);
  return (
    <div className="relative">
      <div className="rounded-3xl border border-white/10 bg-[radial-gradient(80%_80%_at_50%_50%,rgba(255,255,255,0.08),transparent)] p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="text-2xl font-semibold">Interactive Preview</div>
          <p className="text-white/70 mt-2">Click the button to see a dramatic spotlight reveal of an upcoming model.</p>
          <button onClick={() => setOpen(true)} className="mt-4 px-5 py-3 rounded-2xl bg-white text-black font-medium inline-flex items-center gap-2">Reveal LS-2 <ArrowUpRight className="size-4"/></button>
        </div>
        <div className="flex-1">
          <img src={`/assets/${p.id}/side-misty-grey.png`} onError={(e)=>{e.currentTarget.src='/assets/placeholders/scooter-silhouette.png'}} alt={p.name} className="w-full h-auto object-contain"/>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} className="relative w-[90vw] max-w-3xl rounded-3xl overflow-hidden border border-white/10 bg-black">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 60%, rgba(255,255,255,0.3), transparent 50%)" }} />
              <img src={`/assets/${p.id}/front-misty-grey.png`} onError={(e)=>{e.currentTarget.src='/assets/placeholders/scooter-silhouette.png'}} alt={p.name} className="w-full h-auto object-contain"/>
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-white text-black text-sm font-medium">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Contact ----------
function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <SectionHeading
        eyebrow="Contact Us"
        title="We’d love to hear from you"
        subtitle="Reach out for test rides, dealership queries, or support."
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10">
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl p-6 border border-white/10 bg-white/5">
          <div className="space-y-4">
            <div className="flex items-start gap-3"><MapPin className="mt-1 size-5"/> <div>Wee Mobility HQ<br/>3rd Floor, Tech Park, Bengaluru, KA 560001</div></div>
            <div className="flex items-center gap-3"><Phone className="size-5"/> <a href="tel:+918000000000" className="hover:underline">+91 80000 00000</a></div>
            <div className="flex items-center gap-3"><Mail className="size-5"/> <a href="mailto:hello@weemobility.com" className="hover:underline">hello@weemobility.com</a></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl p-6 border border-white/10 bg-white/5">
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Name" required />
        <Input label="Email" type="email" required />
      </div>
      <Input label="Phone" />
      <TextArea label="Message" rows={4} required />
      <button disabled={status!=="idle"} type="submit" className={cls("px-5 py-3 rounded-2xl font-medium inline-flex items-center gap-2", status==="idle"?"bg-white text-black":"bg-white/30 text-white/80 cursor-not-allowed")}>Send <Send className="size-4"/></button>
      {status === "sent" && (
        <div className="text-green-300/90 text-sm">Thanks! We’ll get back to you shortly.</div>
      )}
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block text-sm">
      <span className="text-white/80">{label}</span>
      <input {...props} className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:ring-2 ring-white/30" />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block text-sm">
      <span className="text-white/80">{label}</span>
      <textarea {...props} className="mt-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:ring-2 ring-white/30" />
    </label>
  );
}

// ---------- Testimonials ----------
function Testimonials() {
  return (
    <section className="relative py-20 md:py-28">
      <SectionHeading eyebrow="Customer Feedback" title="Loved by everyday riders" subtitle="Real experiences from real families." />
      <TestimonialCarousel />
    </section>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const count = TESTIMONIALS.length;
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4000);
    return () => clearInterval(id);
  }, [count]);

  const handlePrev = () => setIndex((i) => (i - 1 + count) % count);
  const handleNext = () => setIndex((i) => (i + 1) % count);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="flex items-center gap-1 text-yellow-300/90">
              {new Array(TESTIMONIALS[index].rating).fill(0).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-lg md:text-xl text-white/90 leading-relaxed">“{TESTIMONIALS[index].quote}”</p>
            <div className="mt-4 text-white/60 text-sm">— {TESTIMONIALS[index].name}, {TESTIMONIALS[index].role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-y-0 left-0 flex items-center">
          <button onClick={handlePrev} className="p-2 rounded-full bg-black/60 border border-white/10 ml-4">
            <ChevronLeft className="size-4" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button onClick={handleNext} className="p-2 rounded-full bg-black/60 border border-white/10 mr-4">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- News ----------
function News() {
  return (
    <section className="relative py-20 md:py-28">
      <SectionHeading eyebrow="News & Updates" title="What’s new at Wee" subtitle="Launches, software updates and partnerships." />
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/30 to-white/10" />
          <div className="space-y-8">
            {NEWS.map((n, i) => (
              <motion.div key={n.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="pl-10">
                <div className="flex items-center gap-3">
                  <Pill>{n.tag}</Pill>
                  <span className="text-white/60 text-sm">{new Date(n.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-1 text-lg font-medium">{n.title}</div>
                <div className="text-white/70">{n.blurb}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/10 text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/assets/logo-wee.svg" alt="Wee Mobility" className="h-6 w-auto" />
          <span className="text-white/60">© {new Date().getFullYear()} Wee Mobility</span>
        </div>
        <div className="text-white/60">Made with ❤️ for sustainable cities.</div>
      </div>
    </footer>
  );
}

// ---------- Page Shell ----------
export default function WeeMobilityLandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Contact />
        <Testimonials />
        <News />
      </main>
      <Footer />
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

/*
=======================
ASSET NAMING & PLACEMENT
=======================

Put your files under /public/assets (or your framework’s public folder). Example tree:

/public/assets
  ├─ logo-wee.svg
  ├─ placeholders/
  │    └─ scooter-silhouette.png
  ├─ brochures/
  │    └─ WEE-LS-1-Brochure.pdf
  ├─ ls1/
  │    ├─ front-misty-grey.png
  │    ├─ side-misty-grey.png
  │    ├─ front-cherry-red.png
  │    ├─ side-cherry-red.png
  │    ├─ front-choco-brown.png
  │    ├─ side-choco-brown.png
  │    ├─ front-aqua-blue.png
  │    ├─ side-aqua-blue.png
  │    ├─ front-sunset-orange.png
  │    ├─ side-sunset-orange.png
  │    └─ parts/
  │         ├─ led-headlamp-misty-grey.png
  │         ├─ front-brake-misty-grey.png
  │         ├─ battery-misty-grey.png
  │         ├─ rear-suspension-misty-grey.png
  │         └─ dashboard-misty-grey.png
  ├─ wee-ls-2/
  │    ├─ front-misty-grey.png
  │    └─ side-misty-grey.png
  ├─ wee-ls-3/
  │    ├─ front-misty-grey.png
  │    └─ side-misty-grey.png
  └─ wee-ls-4/
       ├─ front-misty-grey.png
       └─ side-misty-grey.png
*/