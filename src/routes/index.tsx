import { createFileRoute } from "@tanstack/react-router";
import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useSpring, useReducedMotion,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, Zap, Radar, MessageSquare, Terminal, LineChart, SlidersHorizontal,
  Check, Menu, X, Star, CheckCircle2, Users, Megaphone,
  MousePointerClick, History, Gauge, Eye, Send, Activity,
} from "lucide-react";
import veloraLogo from "@/assets/velora-logo.png";
import veloraDashBlue from "@/assets/velora-dash-blue.png";
import veloraDashPurple from "@/assets/velora-dash-purple.webp";
import veloraComposite from "@/assets/velora-composite.png";
import veloraAngled from "@/assets/velora-angled.png";
import veloraConnect from "@/assets/velora-connect.png";
import veloraSidePurple from "@/assets/velora-side-purple.png";
import dashboardImage from "@/assets/dashboard.jpg";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { UnicornBackground } from "@/components/UnicornBackground";

export const Route = createFileRoute("/")({ component: Home });

const ease = [0.22, 1, 0.36, 1] as const;
const DISCORD = "https://discord.gg/vUGgbfvG2J";

function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Storm-style word-by-word heading reveal */
function AnimatedH2({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <h2 ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.06, duration: 0.7, ease }}
          className="inline-block mr-[0.25em]"
        >
          {w}
        </motion.span>
      ))}
    </h2>
  );
}

/* Scroll parallax wrapper — content drifts as you scroll past it */
function Parallax({ children, amount = 50 }: { children: ReactNode; amount?: number }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} style={reduce ? {} : { y }}>
      {children}
    </motion.div>
  );
}

function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <AmbientGlow />
      <Nav />
      <Hero />
      <EngineTabs />
      <StatsSection />
      <HowItWorks />
      <Games />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* Velora ambience: blue drifting on the left, pink on the right — like the dashboard themes */
function AmbientGlow() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={reduce ? {} : { y: y1 }}
        animate={reduce ? {} : { opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-8%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(68,104,255,0.22)_0%,_rgba(68,104,255,0.08)_36%,_transparent_72%)] blur-[140px]"
      />
      <motion.div
        style={reduce ? {} : { y: y2 }}
        animate={reduce ? {} : { opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute right-[-6%] top-[35%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(236,125,188,0.18)_0%,_rgba(236,125,188,0.06)_40%,_transparent_74%)] blur-[150px]"
      />
      <motion.div
        style={reduce ? {} : { y: y3 }}
        animate={reduce ? {} : { opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        className="absolute bottom-[-12%] left-[20%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(96,76,255,0.16)_0%,_rgba(96,76,255,0.05)_40%,_transparent_72%)] blur-[140px]"
      />
    </div>
  );
}

function VeloraLogo({ className = "h-7 w-7" }: { className?: string }) {
  return <img src={veloraLogo} alt="Velora" className={`${className} rounded-lg object-cover`} width={64} height={64} />;
}

function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.5 0 12.6 12.6 0 0 0-.61-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.04.03C.53 9.05-.32 13.58.1 18.06c0 .02.01.04.03.05a19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.12c.13-.1.25-.19.37-.29a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08 0c.12.1.25.2.37.3a.08.08 0 0 1 0 .12 12.3 12.3 0 0 1-1.88.9.08.08 0 0 0-.04.1c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6.02-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.22 0 2.18 1.1 2.16 2.42 0 1.34-.94 2.42-2.16 2.42Z" />
    </svg>
  );
}

/* Floating dashboard image treatment without the square box around it */
function DashShot({ src, alt, eager = false, className = "" }: { src: string; alt: string; eager?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-visible ${className}`}>
      <div className="absolute inset-x-6 bottom-4 h-16 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-transparent shadow-[0_35px_90px_-28px_rgba(0,0,0,0.86)]">
        <img
          src={src}
          alt={alt}
          className="w-full object-contain"
          width={1920}
          height={1039}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
        />
      </div>
    </div>
  );
}

/* Slim referral announcement — sits above the nav pill, whole strip is clickable */
function AnnouncementBar() {
  return (
    <a
      href={DISCORD}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-11 items-center justify-center gap-2.5 border-b border-white/[0.06] bg-gradient-to-r from-brand/15 via-background to-[oklch(0.55_0.2_350/0.12)] px-4 text-center text-sm transition-colors hover:from-brand/25 hover:to-[oklch(0.55_0.2_350/0.2)] sm:h-12 sm:text-base"
    >
      <Users size={16} className="hidden shrink-0 text-brand sm:inline" />
      <span className="truncate">
        <span className="font-medium">Invite a friend, both save $5 on Monthly.</span>{" "}
        <span className="hidden text-muted-foreground sm:inline">Get your referral link in Discord.</span>
      </span>
      <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Features", href: "#features" },
    { label: "Games", href: "#games" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col"
    >
      <AnnouncementBar />
      <div className="px-4 pt-4">
      <div className="mx-auto max-w-7xl glass rounded-full px-7 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 text-lg font-semibold">
          <VeloraLogo className="h-9 w-9" /> <span>Velora</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-base text-muted-foreground">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </nav>
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-base font-medium hover:opacity-90 transition"
        >
          <DiscordIcon size={17} /> Join Discord
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden mx-auto max-w-7xl mt-2 glass rounded-2xl p-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={DISCORD} target="_blank" rel="noreferrer" className="text-sm text-brand inline-flex items-center gap-2">
            <DiscordIcon size={14} /> Join Discord
          </a>
        </div>
      )}
      </div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const dashY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Storm-style tilt: rests at rotateX(16deg), flattens out as you scroll.
  const scrollTilt = useTransform(scrollYProgress, [0, 0.45], [16, 0]);
  // Mouse parallax — snappy spring so the panel visibly chases the cursor.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 260, damping: 22, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 22, mass: 0.6 });
  // Leans TOWARD the cursor: cursor up → top edge comes forward, cursor right → right edge comes forward.
  const rotateX = useTransform([scrollTilt, springY], (latest: number[]) => latest[0] + latest[1] * 7);
  const rotateY = useTransform(springX, (v) => v * 9);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    // Normalize against the viewport so the full mouse range maps to the full tilt range.
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative flex min-h-screen flex-col justify-center pt-36 pb-24 md:pt-40 md:pb-32 px-4"
    >
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 -z-10 overflow-hidden">
        <UnicornBackground projectId="p7Ff6pfTrb5Gs59C7nLC" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/45 to-background" />
      </motion.div>

      <div className="max-w-5xl mx-auto text-center relative">
        <motion.a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-muted-foreground">Live for Valorant &amp; Fortnite</span>
          <span className="text-brand font-medium inline-flex items-center gap-1">Join us <ArrowRight size={14} /></span>
        </motion.a>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] text-gradient">
          {"Never miss an Eldorado request again.".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, ease }}
          className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Velora watches Eldorado for you and replies to buyers in seconds. You just take the order.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#pricing" className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:scale-105 transition-transform">Try it free</a>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="rounded-full glass px-7 py-3.5 font-medium inline-flex items-center gap-2 hover:bg-accent transition">
            <DiscordIcon /> Join Discord
          </a>
        </motion.div>
      </div>

      {/* 3D floating dashboard — layered rig:
          perspective › entrance › scroll+mouse tilt › idle float › dashboard */}
      <motion.div style={{ y: dashY }} className="relative max-w-7xl mx-auto mt-24 [perspective:1600px]">
        <motion.div
          initial={{ opacity: 0, y: 120, rotateX: 32, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ delay: 1.15, duration: 1.5, ease }}
          className="[transform-style:preserve-3d]"
        >
          <motion.div style={{ rotateX, rotateY }} className="[transform-style:preserve-3d]">
            <motion.div
              animate={reduce ? {} : { y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative [transform-style:preserve-3d]"
            >
              {/* glow pool — blue into pink, like the two themes */}
              <div className="absolute left-1/2 top-[70%] -z-10 h-[420px] w-[120%] -translate-x-1/2 rounded-[50%] bg-gradient-to-r from-brand/25 via-brand/10 to-[oklch(0.55_0.2_350/0.22)] blur-3xl animate-pulse-glow" />

              <DashShot src={veloraDashBlue} alt="Velora monitor dashboard" eager />

              {/* satellite cards, lifted off the panel on the z-axis */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.8, ease }}
                className="absolute -left-5 -bottom-5 hidden md:block [transform:translateZ(80px)]"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="rounded-xl border border-white/10 bg-[oklch(0.11_0.01_265/0.95)] px-4 py-3 shadow-glow backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <DiscordIcon size={15} /> Discord linked
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Secure login · instant access</div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.7, duration: 0.8, ease }}
                className="absolute -right-4 top-[14%] hidden md:block [transform:translateZ(90px)]"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                  className="rounded-xl border border-white/10 bg-[oklch(0.11_0.01_265/0.95)] px-4 py-3 shadow-glow backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 size={15} className="text-emerald-400" /> Reply sent
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Valorant · Rank Boost</div>
                </motion.div>
              </motion.div>

              {/* floor reflection */}
              <div
                aria-hidden
                className="absolute inset-x-6 top-full h-24 origin-top scale-y-[-1] rounded-xl bg-gradient-to-b from-white/[0.04] to-transparent [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CategoryMarquee() {
  const cats = [
    "Rank Boost", "Placements", "Net Wins", "Coaching", "Radiant Boost",
    "Save the World", "Battle Pass", "Reload Rank Boost", "Custom Requests",
  ];
  return (
    <section className="py-20 border-y border-border">
      <Reveal>
        <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-10">Works with every category</h3>
      </Reveal>
      <div className="relative overflow-hidden mask-fade">
        <div className="flex gap-16 animate-marquee w-max">
          {[...cats, ...cats, ...cats].map((c, i) => (
            <div key={i} className="text-2xl md:text-3xl font-bold text-muted-foreground/60 whitespace-nowrap">{c}</div>
          ))}
        </div>
      </div>
      <style>{`.mask-fade{mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent);}`}</style>
    </section>
  );
}

function EngineTabs() {
  const tabs = [
    { icon: Radar, label: "Monitor", desc: "Velora watches new requests in real time, so you do not have to keep checking manually.", image: veloraAngled, imageAlt: "Velora monitor view" },
    { icon: MessageSquare, label: "Auto-Reply", desc: "Send your saved response instantly when a request matches your setup.", image: veloraConnect, imageAlt: "Velora reply flow" },
    { icon: SlidersHorizontal, label: "Rules", desc: "Choose what Velora should react to with categories, keywords, and skip rules.", image: veloraDashPurple, imageAlt: "Velora rules view" },
    { icon: Terminal, label: "Live Console", desc: "See every action as it happens, from matched requests to skipped ones.", image: veloraComposite, imageAlt: "Velora live console" },
    { icon: LineChart, label: "Stats", desc: "Track sent replies, offers, skipped requests, failures, and monitor health from one screen.", image: veloraSidePurple, imageAlt: "Velora stats view" },
  ];
  const [active, setActive] = useState(0);
  const Icon = tabs[active].icon;
  const activeVisual = tabs[active].image;

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-center text-sm uppercase tracking-widest text-brand mb-3">What Velora does for you</p>
        </Reveal>
        <AnimatedH2 text="What Velora does for you." className="text-center text-5xl md:text-6xl font-bold text-gradient mb-16" />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === i ? "bg-primary text-primary-foreground" : "glass hover:bg-accent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="grid md:grid-cols-2 gap-8 items-center glass rounded-3xl p-8 md:p-12"
        >
          <div className="relative">
            <DashShot src={activeVisual} alt={tabs[active].imageAlt} className="rounded-[1.7rem]" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-sm backdrop-blur">
              <Icon size={15} className="text-brand" /> {tabs[active].label}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">{tabs[active].label}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{tabs[active].desc}</p>
            <a href="#pricing" className="inline-flex items-center gap-2 text-brand font-medium">
              Try it free <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SoftStatusGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-12%] top-[8%] h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(88,120,255,0.22)_0%,_transparent_72%)] blur-3xl" />
      <div className="absolute right-[-5%] bottom-[-8%] h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(235,125,191,0.15)_0%,_transparent_70%)] blur-3xl" />
    </div>
  );
}

function StatsSection() {
  const small = [
    { icon: Activity, value: "24/7", label: "Always monitoring" },
    { icon: Zap, value: "Instant", label: "Dashboard access after payment" },
  ];
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-center text-sm uppercase tracking-widest text-brand mb-3">Why sellers use it</p>
        </Reveal>
        <AnimatedH2 text="The first reply usually wins." className="text-center text-5xl md:text-6xl font-bold text-gradient mb-4" />
        <Reveal delay={0.1}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">Buyers on Eldorado mostly go with whoever answers first. Velora makes sure that's you.</p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <div className="group relative h-full min-h-[300px] overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 via-transparent to-[oklch(0.55_0.2_350/0.08)] p-8">
              <SoftStatusGlow />
              <div className="relative flex h-full flex-col justify-end">
                <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 text-xs text-brand">
                  <Radar size={13} /> Always watching
                </div>
                <div className="text-6xl md:text-7xl font-bold text-gradient">First.</div>
                <p className="mt-3 max-w-md text-muted-foreground">
                  New request appears. Velora checks your rules, sends the right reply, and logs the action.
                </p>
              </div>
            </div>
          </Reveal>

          {small.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.1}>
              <div className="group h-full rounded-3xl glass p-8 hover:bg-accent transition-colors">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/30 to-[oklch(0.55_0.2_350/0.2)] ring-1 ring-white/10">
                  <s.icon size={19} strokeWidth={1.8} />
                </div>
                <div className="text-4xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl glass px-8 py-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="font-medium">Valorant &amp; Fortnite live</span>
            </div>
            <span className="text-sm text-muted-foreground">More games coming soon</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Join the Discord", desc: "Velora uses Discord to log you in. One click.", href: DISCORD },
    { n: "02", title: "Pick a plan", desc: "After a successful payment, you will immediately be redirected to your personal Velora dashboard." },
    { n: "03", title: "Press Start", desc: "Done. Velora is watching and replying for you." },
  ];
  return (
    <section className="py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <p className="text-sm uppercase tracking-widest text-brand mb-3">Getting started</p>
            <AnimatedH2 text="Live in minutes." className="text-4xl md:text-5xl font-bold text-gradient mb-6" />
            <p className="text-muted-foreground text-lg mb-10">Three steps, no setup headache.</p>
          </Reveal>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={0.1 + i * 0.1}>
                <div className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl glass flex items-center justify-center text-brand font-bold">{s.n}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {s.href ? (
                        <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand transition-colors">
                          {s.title} <DiscordIcon size={15} />
                        </a>
                      ) : s.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Parallax amount={60}>
          <motion.img
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            src={veloraComposite}
            alt="Velora dashboards"
            className="w-full drop-shadow-2xl"
            width={1122}
            height={1402}
            loading="lazy"
          />
        </Parallax>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const feats = [
    { icon: Zap, title: "Fast Mode", desc: "Cuts every delay down when you want max speed." },
    { icon: SlidersHorizontal, title: "Auto Reply Rules", desc: "One rule per category. Flip them on and off anytime." },
    { icon: MousePointerClick, title: "Auto-Close Pages", desc: "Velora tidies up after itself. No window clutter." },
    { icon: History, title: "Activity Log", desc: "A history of every request it handled." },
    { icon: Gauge, title: "Latency Control", desc: "Choose how fast replies go out — instant or more natural." },
    { icon: Megaphone, title: "Announcements", desc: "Updates show up right on your dashboard." },
  ];
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-center text-sm uppercase tracking-widest text-brand mb-3">Toolkit</p>
        </Reveal>
        <AnimatedH2 text="The details are covered." className="text-center text-5xl md:text-6xl font-bold text-gradient mb-16" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feats.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="glass rounded-2xl p-8 h-full hover:bg-accent transition-colors group">
                <f.icon className="text-brand mb-6 group-hover:scale-110 transition-transform" size={26} strokeWidth={1.8} />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Whop checkout links — PUBLIC checkout URLs only.
// SECURITY: never put Whop API keys, private tokens, or webhook secrets here — this file ships to the browser.
// Paste the real Whop checkout link for each plan below. Until then the button shows a safe "pending" state.
const WHOP_CHECKOUT_URLS: Record<string, string> = {
  trial: "https://whop.com/velora-be8c/trial-14/",
  weekly: "https://whop.com/velora-be8c/weekly-94-28ed/",
  monthly: "https://whop.com/velora-be8c/monthly-0f-c978/",
};

const isPlaceholder = (url?: string) => !url || url.startsWith("PASTE_");

function Pricing() {
  const plans = [
    {
      name: "Trial", price: "$0", period: "1 hour", plan: "trial",
      features: ["Full access, nothing locked", "Valorant & Fortnite", "Discord support"],
      cta: "Try it free", highlight: false,
    },
    {
      name: "Weekly", price: "$8", period: "/week", plan: "weekly",
      features: ["Everything in Trial", "24/7 monitoring", "All auto-reply rules", "Fast Mode"],
      cta: "Go Weekly", highlight: false,
    },
    {
      name: "Monthly", price: "$25", period: "/month", plan: "monthly",
      features: ["Everything in Weekly", "Best price per day", "Priority support", "Invite a friend: $5 off for both — you each pay $20"],
      cta: "Go Monthly", highlight: true,
    },
  ];
  return (
    <section id="pricing" className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-center text-sm uppercase tracking-widest text-brand mb-3">Pricing</p>
        </Reveal>
        <AnimatedH2 text="Simple pricing." className="text-center text-5xl md:text-6xl font-bold text-gradient mb-6" />
        <Reveal delay={0.1}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">Try it free for an hour. Stay if it works for you.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p, i) => {
            const checkout = WHOP_CHECKOUT_URLS[p.plan];
            const pending = isPlaceholder(checkout);
            return (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={`rounded-3xl p-8 h-full flex flex-col ${p.highlight ? "bg-gradient-to-b from-brand/30 to-brand/5 border border-brand/40" : "glass"}`}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">{p.name}</p>
                  {p.highlight && <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-medium text-brand">Best value</span>}
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold">{p.price}</span>
                  <span className="text-muted-foreground">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-brand shrink-0 mt-0.5" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {pending ? (
                  <a
                    href="#pricing"
                    aria-disabled="true"
                    title="Whop checkout link coming soon"
                    className={`text-center rounded-full py-3 font-medium transition opacity-60 cursor-not-allowed ${p.highlight ? "bg-primary text-primary-foreground" : "glass"}`}
                  >
                    {p.cta}
                  </a>
                ) : (
                  <a
                    href={checkout}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-center rounded-full py-3 font-medium transition ${p.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "glass hover:bg-accent"}`}
                  >
                    {p.cta}
                  </a>
                )}
              </div>
            </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.3}>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 via-transparent to-[oklch(0.55_0.2_350/0.08)] p-6 md:p-7">
            <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[oklch(0.55_0.2_350/0.15)] blur-3xl" />
            <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/30 to-[oklch(0.55_0.2_350/0.2)] ring-1 ring-white/10">
                  <Users size={18} className="text-foreground/90" />
                </div>
                <div>
                  <p className="font-semibold">Invite a friend, both save $5 on Monthly.</p>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                    Your friend gets $5 off their first Monthly payment. Once their paid signup is confirmed, your reward is handled through Discord.
                  </p>
                </div>
              </div>
              <a
                href={DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <DiscordIcon size={15} /> Get referral link
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Not sure which plan to choose?{" "}
            <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="font-medium text-brand hover:underline">
              Join Discord
            </a>{" "}
            and we'll help you pick the right one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Games() {
  const live = [
    { name: "Valorant", cats: ["Rank Boost", "Placements", "Net Wins", "Coaching", "Radiant Boost"] },
    { name: "Fortnite", cats: ["Save the World", "Battle Pass", "Reload Rank Boost", "Custom Requests"] },
  ];
  const soon = ["League of Legends", "Brawl Stars", "EA FC 25", "OSRS", "R6 Siege", "Rocket League"];
  return (
    <section id="games" className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-center text-sm uppercase tracking-widest text-brand mb-3">Games</p>
        </Reveal>
        <AnimatedH2 text="Supported games." className="text-center text-5xl md:text-6xl font-bold text-gradient mb-6" />
        <Reveal delay={0.1}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">Valorant and Fortnite are live today. More are on the way.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {live.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.1}>
              <div className="glass rounded-3xl p-8 h-full border border-brand/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">{g.name}</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.cats.map((c) => (
                    <span key={c} className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-sm text-muted-foreground">{c}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {soon.map((g) => (
              <div key={g} className="glass rounded-2xl p-4 text-center opacity-60">
                <div className="text-sm font-medium">{g}</div>
                <div className="text-xs text-muted-foreground mt-1">Soon</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "How fast are the replies?", a: "Seconds. Velora catches a request the moment it appears and answers right away. Fast Mode makes it even quicker." },
    { q: "How do I log in?", a: "Through Discord. Join our server, log in with one click, and your dashboard is ready. Support and announcements live there too." },
    { q: "What happens after I pay?", a: "After a successful payment, you will immediately be redirected to your personal Velora dashboard. No waiting, no manual setup." },
    { q: "Which games are supported?", a: "Valorant and Fortnite, with every major category. More games are coming." },
    { q: "Is there a free trial?", a: "Yes — 1 hour of full access, free. Enough to watch it catch and answer real requests." },
    { q: "How does the referral discount work?", a: "Invite a friend and you both get $5 off your next Monthly payment — $20 each, for that month. Invite another friend for another month's discount." },
  ];
  return (
    <section id="faq" className="py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="text-center text-sm uppercase tracking-widest text-brand mb-3">FAQ</p>
        </Reveal>
        <AnimatedH2 text="Quick answers." className="text-center text-5xl md:text-6xl font-bold text-gradient mb-16" />
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="glass rounded-3xl px-6">
            {items.map((it) => (
              <AccordionItem key={it.q} value={it.q}>
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">{it.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { quote: "I kept losing orders to faster sellers. Not anymore. It paid for itself the first week.", name: "Kaze", role: "Valorant booster" },
    { quote: "Set my templates, turned it on, went to sleep. Replies were already sent when I woke up.", name: "Drex", role: "Fortnite seller" },
    { quote: "I like that I can watch everything it does in the console. No black box.", name: "Nyra", role: "Multi-game seller" },
  ];
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-center text-sm uppercase tracking-widest text-brand mb-3">Sellers</p>
        </Reveal>
        <AnimatedH2 text="What sellers say." className="text-center text-5xl md:text-6xl font-bold text-gradient mb-16" />
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="glass rounded-2xl p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4 text-brand">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} className="fill-current" />)}
                </div>
                <p className="text-lg mb-6 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-[oklch(0.55_0.2_350)]" />
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,14,30,0.96),rgba(10,16,32,0.88))] p-10 md:p-16 shadow-[0_30px_90px_-26px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,117,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(231,121,184,0.16),transparent_40%)]" />
        <Reveal>
          <div className="relative text-center">
            <p className="text-sm uppercase tracking-widest text-brand mb-3">Support</p>
            <AnimatedH2 text="Need help or have a question?" className="text-3xl md:text-5xl font-bold text-gradient mb-4" />
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg mb-8">Join the Discord and ask us directly. We will help you pick the right plan, set up Velora, or fix anything that feels unclear.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={DISCORD} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:scale-105 transition-transform">
                <DiscordIcon /> Join Discord
              </a>
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium hover:bg-accent transition">
                See Plans <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 font-semibold mb-4"><VeloraLogo /> Velora</div>
          <p className="text-sm text-muted-foreground">Eldorado automation for sellers.</p>
        </div>
        {[
          { title: "Product", links: [
            { label: "Features", href: "#features" },
            { label: "Games", href: "#games" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
          ] },
          { title: "Community", links: [
            { label: "Discord", href: DISCORD },
            { label: "Announcements", href: DISCORD },
            { label: "Support", href: DISCORD },
          ] },
          { title: "Legal", links: [
            { label: "Terms", href: "#" },
            { label: "Privacy", href: "#" },
          ] },
        ].map((col) => (
          <div key={col.title}>
            <div className="font-semibold mb-4">{col.title}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border flex flex-wrap justify-between gap-4 text-sm text-muted-foreground">
        <div>© 2026 Velora. Not affiliated with Eldorado.gg or Riot Games.</div>
      </div>
    </footer>
  );
}
