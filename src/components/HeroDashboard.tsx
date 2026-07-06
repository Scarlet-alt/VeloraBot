import { motion, AnimatePresence, animate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard, PackageSearch, Tags, CircleDollarSign, ShieldAlert,
  Wallet, Settings, Search, Bell, Gamepad2, CheckCircle2, AlertTriangle,
  TrendingUp, Timer, Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Verdict = "accept" | "review";

interface Order {
  game: string;
  job: string;
  price: string;
  risk: number;
  verdict: Verdict;
}

const ORDERS: Order[] = [
  { game: "Valorant", job: "Plat 3 → Diamond 1", price: "$64.00", risk: 8, verdict: "accept" },
  { game: "LoL", job: "Emerald IV → Diamond IV", price: "$112.50", risk: 34, verdict: "review" },
  { game: "WoW", job: "Mythic+15 weekly ×4", price: "$27.90", risk: 5, verdict: "accept" },
  { game: "Valorant", job: "Immortal placement, 5 games", price: "$48.20", risk: 11, verdict: "accept" },
  { game: "Apex", job: "Master RP grind, duo queue", price: "$89.00", risk: 41, verdict: "review" },
  { game: "OW2", job: "GM decay recovery", price: "$36.75", risk: 9, verdict: "accept" },
];

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: PackageSearch, label: "Orders" },
  { icon: Tags, label: "Listings" },
  { icon: CircleDollarSign, label: "Pricing" },
  { icon: ShieldAlert, label: "Risk engine" },
  { icon: Wallet, label: "Payouts" },
  { icon: Settings, label: "Settings" },
];

const GAME_SPLIT = [
  { name: "Valorant", pct: 46 },
  { name: "League", pct: 31 },
  { name: "WoW", pct: 15 },
  { name: "Other", pct: 8 },
];

/* Revenue curve for the area chart (7 days) */
const CHART_PATH =
  "M0 76 C 24 70, 40 58, 62 60 S 100 74, 122 64 S 156 30, 182 36 S 216 58, 240 46 S 274 12, 300 18";

/* ------------------------------------------------------------------ */
/* Bits                                                                */
/* ------------------------------------------------------------------ */

function CountUp({ to, prefix = "", suffix = "", decimals = 0 }: {
  to: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) { el.textContent = prefix + to.toFixed(decimals) + suffix; return; }
    const controls = animate(0, to, {
      duration: 1.6,
      delay: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { el.textContent = prefix + v.toFixed(decimals) + suffix; },
    });
    return () => controls.stop();
  }, [to, prefix, suffix, decimals, reduce]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function Kpi({ icon: Icon, label, children, trend }: {
  icon: typeof Zap; label: string; children: React.ReactNode; trend?: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 min-w-0">
      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-white/40">
        <Icon size={10} className="text-brand shrink-0" /> {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[15px] font-semibold tracking-tight text-white/90 tabular-nums">{children}</span>
        {trend && <span className="text-[9px] font-medium text-emerald-400 tabular-nums">{trend}</span>}
      </div>
    </div>
  );
}

function RiskBadge({ order }: { order: Order }) {
  const ok = order.verdict === "accept";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8.5px] font-medium ${
        ok ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"
      }`}
    >
      {ok ? <CheckCircle2 size={9} /> : <AlertTriangle size={9} />}
      {ok ? "Auto-accepted" : "Held for review"} · {order.risk}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

export function HeroDashboard() {
  const reduce = useReducedMotion();
  const [feed, setFeed] = useState<Order[]>(ORDERS.slice(0, 4));
  const cursor = useRef(4);

  /* rotate a new order into the feed every few seconds */
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setFeed((prev) => {
        const next = ORDERS[cursor.current % ORDERS.length];
        cursor.current += 1;
        return [next, ...prev.slice(0, 3)];
      });
    }, 3400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      aria-hidden
      className="pointer-events-none select-none overflow-hidden rounded-xl border border-white/10 bg-[oklch(0.09_0.008_265)] shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)] text-left"
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-6 py-1 text-[10px] text-white/35">
          <Search size={10} /> app.velora.gg / command-center
        </div>
        <div className="flex items-center gap-2.5 text-white/35">
          <Bell size={12} />
          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-brand to-purple-400 text-center text-[9px] font-semibold leading-5 text-white">A</span>
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-[148px] shrink-0 border-r border-white/[0.06] p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-1.5 px-1.5 pt-1">
            <Gamepad2 size={13} className="text-brand" />
            <span className="text-[11px] font-semibold tracking-tight text-white/90">velora</span>
            <span className="ml-auto rounded border border-brand/30 bg-brand/10 px-1 py-px text-[7.5px] font-medium uppercase tracking-wide text-brand">live</span>
          </div>
          <nav className="space-y-0.5">
            {NAV.map((n) => (
              <div
                key={n.label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] ${
                  n.active ? "bg-brand/15 font-medium text-white/90" : "text-white/40"
                }`}
              >
                <n.icon size={11} className={n.active ? "text-brand" : ""} /> {n.label}
                {n.label === "Orders" && (
                  <span className="ml-auto rounded-full bg-brand/20 px-1.5 text-[8px] font-semibold text-brand tabular-nums">14</span>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* main */}
        <div className="min-w-0 flex-1 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-[12px] font-semibold tracking-tight text-white/90">Good evening, Ayoub</div>
              <div className="text-[9px] text-white/35">Eldorado · 3 games synced · last order 42s ago</div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] font-medium text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Autopilot on
            </div>
          </div>

          {/* KPI row */}
          <div className="mb-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            <Kpi icon={CircleDollarSign} label="Revenue today" trend="+18.2%">
              <CountUp to={1284.6} prefix="$" decimals={2} />
            </Kpi>
            <Kpi icon={Zap} label="Active boosts">
              <CountUp to={14} />
            </Kpi>
            <Kpi icon={TrendingUp} label="Auto-accept rate">
              <CountUp to={92} suffix="%" />
            </Kpi>
            <Kpi icon={Timer} label="Avg. fill time">
              3m 40s
            </Kpi>
          </div>

          <div className="grid gap-2 lg:grid-cols-[1.4fr_1fr]">
            {/* revenue chart */}
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-medium text-white/70">Revenue — last 7 days</span>
                <span className="text-[9px] text-white/35">$6,412.90 total</span>
              </div>
              <svg viewBox="0 0 300 90" className="h-[88px] w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="vlr-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.18 265)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="oklch(0.68 0.18 265)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[22, 44, 66].map((y) => (
                  <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                ))}
                <motion.path
                  d={`${CHART_PATH} L300 90 L0 90 Z`}
                  fill="url(#vlr-fill)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 1 }}
                />
                <motion.path
                  d={CHART_PATH}
                  fill="none"
                  stroke="oklch(0.72 0.16 265)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.7, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.circle
                  cx="300" cy="18" r="3.5"
                  fill="oklch(0.72 0.16 265)"
                  stroke="oklch(0.09 0.008 265)"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.2, duration: 0.4 }}
                />
              </svg>
              {/* game split */}
              <div className="mt-3 space-y-1.5">
                {GAME_SPLIT.map((g, i) => (
                  <div key={g.name} className="flex items-center gap-2">
                    <span className="w-14 text-[9px] text-white/45">{g.name}</span>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-brand/80 to-brand/40"
                        initial={{ width: 0 }}
                        animate={{ width: `${g.pct}%` }}
                        transition={{ delay: 2 + i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="w-7 text-right text-[9px] text-white/45 tabular-nums">{g.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* decision feed */}
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-medium text-white/70">Decision engine</span>
                <span className="text-[9px] text-white/35">risk-scored live</span>
              </div>
              <div className="space-y-1.5">
                <AnimatePresence initial={false} mode="popLayout">
                  {feed.map((o, i) => (
                    <motion.div
                      key={`${o.game}-${o.job}-${cursor.current - i}`}
                      layout
                      initial={{ opacity: 0, y: -14, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[9.5px] font-medium text-white/80">
                          <span className="text-brand">{o.game}</span> · {o.job}
                        </span>
                        <span className="shrink-0 text-[9.5px] font-semibold text-white/85 tabular-nums">{o.price}</span>
                      </div>
                      <div className="mt-1"><RiskBadge order={o} /></div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
