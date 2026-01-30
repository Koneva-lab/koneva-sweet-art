// App.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";


import { motion, AnimatePresence } from "framer-motion";

/* =========================
   LINKS
   ========================= */
const INSTAGRAM_URL = "https://www.instagram.com/koneva_sweet_art/";
const PINTEREST_URL = "https://pin.it/6K9nT7795";
const WHATSAPP_URL = "https://wa.me/491773633727";
const EMAIL_ADDRESS = "koneva_sweet_art@yahoo.com";
const ORDER_PDF_URL = "/downloads/bestellformular.pdf";

const ADDRESS_TEXT = "Poststr. 9, 75385 Bad Teinach";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS_TEXT);

/* =========================
   Hintergrundbilder (eigene Bilder)
   ========================= */
const HERO_BG = "/images/hero-bg.jpg";
const ORDER_BG = "/images/order-bg.jpg";
const FAQ_BG = "/images/faq-bg.jpg";

/* =========================
   HERO Video (rundes Fenster)
   ========================= */
const HERO_VIDEO_SRC = "/videos/hero.mp4";
const HERO_VIDEO_POSTER = "/images/hero-poster.jpg";

/* =========================
   Luxury shimmer CSS
   ========================= */
const GlobalLuxuryStyles = React.memo(() => (

  <style>{`
    :root{
      --gold: #c9a24d;
      --blackSoft: #0e0e0e;
      --cream: #f5f1eb;
    }

    html{ scroll-behavior: smooth; }

    @keyframes goldShimmer {
      0%   { transform: translateX(-140%); opacity: 0; }
      12%  { opacity: 1; }
      50%  { opacity: 1; }
      88%  { opacity: 1; }
      100% { transform: translateX(140%); opacity: 0; }
    }

    @keyframes textShimmer {
      0%   { background-position: -200% 50%; }
      100% { background-position: 200% 50%; }
    }

    @keyframes underlineShimmer {
      0%   { background-position: -220% 50%; }
      100% { background-position: 220% 50%; }
    }

    .brand-shimmer{
      background: linear-gradient(90deg,
        rgba(245,241,235,0.65) 0%,
        rgba(201,162,77,0.95) 35%,
        rgba(245,241,235,0.9) 55%,
        rgba(201,162,77,0.95) 70%,
        rgba(245,241,235,0.65) 100%
      );
      background-size: 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: textShimmer 3.4s ease-in-out infinite;
      text-shadow: 0 0 18px rgba(201,162,77,0.12);
    }

    .gold-shimmer{
      background: linear-gradient(90deg,
        rgba(201,162,77,0.75) 0%,
        rgba(255,240,200,0.95) 32%,
        rgba(201,162,77,0.95) 55%,
        rgba(255,240,200,0.9) 72%,
        rgba(201,162,77,0.75) 100%
      );
      background-size: 220% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: textShimmer 3.1s ease-in-out infinite;
      text-shadow: 0 0 22px rgba(201,162,77,0.16);
    }

    .navlink{
      position: relative;
      display: inline-flex;
      align-items: center;
      padding: 6px 2px;
      transition: color 260ms ease;
    }

    .nav-underline{
      height: 2px;
      border-radius: 999px;
      background: linear-gradient(90deg,
        rgba(201,162,77,0.25) 0%,
        rgba(255,255,255,0.92) 42%,
        rgba(201,162,77,0.98) 62%,
        rgba(255,255,255,0.25) 100%
      );
      background-size: 220% 100%;
      animation: underlineShimmer 1.75s ease-in-out infinite;
      box-shadow: 0 0 16px rgba(201,162,77,0.18);
    }

    :focus-visible{
      outline: 2px solid rgba(201,162,77,0.65);
      outline-offset: 2px;
      border-radius: 10px;
    }

    .hide-scrollbar{
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar{ display:none; }

    /* ====== Drag slider micro UX ====== */
    .drag-scroll{
  cursor: grab;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
}
.drag-scroll.dragging{ cursor: grabbing; }
.drag-scroll *{ -webkit-user-drag: none; user-drag: none; }
.no-select, .no-select *{ user-select: none !important; -webkit-user-select: none !important; }


    @media (prefers-reduced-motion: reduce) {
      .lux-shimmer { animation: none !important; opacity: 0.25 !important; }
      .lux-motion { transition: none !important; animation: none !important; }
      .brand-shimmer, .gold-shimmer { animation: none !important; color: rgba(201,162,77,0.92) !important; -webkit-text-fill-color: rgba(201,162,77,0.92) !important; }
      .nav-underline { animation: none !important; }
    }
      /* HERO Background – Desktop */
/* ===== Backgrounds: verhindert doppelte Kachelung + hält 1 Bild ===== */
.hero-bg, .order-bg, .faq-bg{
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* ===== Mobile Anpassungen (dein “guter” Stand) ===== */
@media (max-width: 768px){

  /* HERO: deutlich nach rechts */
  .hero-bg{ background-position: 40% center; }

  /* BESTELLUNG: deutlich nach links */
  .order-bg{ background-position: 60% center; }

  /* FAQ: weiter nach rechts */
  .faq-bg{ background-position: 40% center; }
}
}
    `}</style>
    
));


/* =========================
   Shimmer divider line
   ========================= */
const ShimmerLine = ({ className = "" }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gold" />
    <div
      className="absolute inset-0 lux-shimmer"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 45%, rgba(255,255,255,0) 100%)",
        animation: "goldShimmer 2.4s ease-in-out infinite",
        mixBlendMode: "overlay",
      }}
    />
  </div>
);

/* =========================
   Soft success chime (WebAudio)
   ========================= */
function playSuccessChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.setValueAtTime(880, now);

    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.setValueAtTime(1320, now + 0.02);

    o1.connect(gain);
    o2.connect(gain);
    gain.connect(ctx.destination);

    o1.start(now);
    o2.start(now + 0.02);
    o1.stop(now + 0.55);
    o2.stop(now + 0.55);

    setTimeout(() => {
      try {
        ctx.close();
      } catch {
        /* ignore */
      }
    }, 750);
  } catch {
    /* ignore */
  }
}

/* =========================
   Text Reveal (Scroll)
   - preserve spaces + line breaks
   ========================= */
function Reveal({ children, as = "div", className = "", delay = 0, once = true, y = 14 }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      viewport={{ once, amount: 0.4 }}
      className={className}
    >
      {children}
    </Comp>
  );
}

function tokenizePreserveWhitespace(text) {
  return String(text || "").split(/(\s+)/g);
}

function RevealLines({ text, className = "", stagger = 0.035, once = true }) {
  const tokens = useMemo(() => tokenizePreserveWhitespace(text), [text]);

  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      className={`whitespace-pre-wrap break-words ${className}`}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {tokens.map((t, i) => {
        const isWs = t.trim() === "";
        if (isWs) return <span key={`ws-${i}`}>{t}</span>;
        return (
          <motion.span
            key={`w-${i}`}
            variants={{
              hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.52, ease: "easeOut" },
              },
            }}
            className="inline-block"
          >
            {t}
          </motion.span>
        );
      })}
    </motion.p>
  );
}

/* =========================
   UI building blocks
   ========================= */
const GoldDivider = () => (
  <div className="flex justify-center my-24 md:my-32">
    <ShimmerLine className="w-24 h-[2px] translate-x-4 opacity-100" />
  </div>
);

const SignatureQuote = ({ text }) => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.2 }}
    viewport={{ once: true }}
    className="py-24 md:py-36 text-center px-6 lux-motion bg-black"
  >
    <p className="font-serif text-xl md:text-2xl gold-shimmer">{text}</p>
  </motion.section>
);

const SectionTitle = ({ kicker, title }) => (
  <div className="text-center mb-12 md:mb-16">
    {kicker && (
      <Reveal as="p" className="uppercase tracking-[0.3em] text-xs text-gold mb-4">
        {kicker}
      </Reveal>
    )}
    <Reveal as="h2" className="text-3xl md:text-4xl font-serif text-cream">
      {title}
    </Reveal>
    <div className="mt-5 flex justify-center">
      <ShimmerLine className="w-16 h-[2px] translate-x-1 opacity-100" />
    </div>
  </div>
);

const ExternalLink = ({ href, children, className = "" }) => (
  <a href={href} target="_blank" rel="noreferrer" className={className}>
    {children}
  </a>
);

/* =========================
   Simple Icons (inline SVG)
   ========================= */
function IconLink({ href, label, children, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={title || label}
      className="inline-flex items-center justify-center
                 w-14 h-14 md:w-16 md:h-16
                 rounded-full border border-white/15 bg-white/5
                 hover:border-gold/55 transition"
    >
      {children}
    </a>
  );
}

const IconInstagram = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M17.6 6.4h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const IconPinterest = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2a10 10 0 0 0-3.7 19.3c-.1-.8-.2-2 .1-2.9l1.3-5.4s-.3-.6-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.2 1 .5 1.8 1.6 1.8 1.9 0 3.4-2 3.4-4.9 0-2.6-1.9-4.4-4.6-4.4-3.1 0-5 2.3-5 4.7 0 .9.3 1.8.8 2.3.1.1.1.2.1.4l-.3 1.3c-.1.4-.3.5-.7.3-1.3-.6-2.1-2.5-2.1-4.1 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.8 2.7 6.8 6.3 0 3.8-2.4 6.8-5.7 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2.9-.8 2.1-1.2 2.8A10 10 0 1 0 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const IconWhatsApp = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M20.3 3.7A10 10 0 0 0 4.2 17.8L3 22l4.3-1.1A10 10 0 0 0 22 12a10 10 0 0 0-1.7-8.3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M9.2 9.4c.2-.6.5-.6.7-.6h.6c.2 0 .4 0 .6.5l.7 1.7c.1.3.1.5 0 .7l-.4.5c-.1.1-.2.3-.1.5.2.4.8 1.3 1.7 2 .9.7 1.7 1 2.1 1.2.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.7-.1l1.7.8c.3.1.5.3.5.6 0 .3-.1 1-.7 1.6-.6.6-1.3.7-1.8.6-.5-.1-2-.6-3.8-1.7-2.2-1.4-3.6-3.2-4-3.8-.4-.7-.9-1.9-.9-2.9 0-1 .3-1.5.5-1.8Z"
      fill="currentColor"
    />
  </svg>
);

const IconMail = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 7h16v10H4V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const IconPin = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M12 12.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);


/* =========================
   High-Luxury Modal Shell
   ========================= */
const ModalShell = ({ title, subtitle, children, onClose, footer }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus?.();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        initial={{ y: 14, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 10, scale: 0.985, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full max-w-4xl lg:max-w-5xl max-h-[88vh] overflow-hidden rounded-3xl bg-[#0E0E0E]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-1 rounded-3xl pointer-events-none border border-gold/35" />
        <div className="absolute -inset-2 rounded-3xl pointer-events-none border border-gold/15 blur-[2px]" />

        <div className="relative max-h-[88vh] overflow-y-auto">
          <div className="p-8 md:p-10 pb-6 border-b border-white/10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold/15 border border-gold/35">
                    <span className="text-gold text-sm leading-none">✓</span>
                  </span>
                  <span className="uppercase tracking-[0.28em] text-[11px] text-gold">
                    {subtitle || "Koneva Sweet Art"}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl tracking-wide font-serif text-cream">{title}</h2>

                <div className="mt-4 w-16">
                  <ShimmerLine className="h-[2px] translate-x-1 opacity-100" />
                </div>
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="text-2xl text-cream/70 hover:text-cream transition"
                aria-label="Schließen"
                type="button"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-8 md:p-10 pb-12 md:pb-14">
            <div className="border border-gold/25 rounded-2xl p-8 md:p-10 bg-black/20 text-cream/80 leading-[1.95] whitespace-pre-line">
              {children}
            </div>
          </div>

          <div className="px-8 md:px-10 pb-8 md:pb-10 pt-2">
            {footer ? (
              footer
            ) : (
              <button type="button" onClick={onClose} className="mx-auto block relative text-cream">
                <span className="after:block after:h-px after:bg-gold after:mt-2 after:translate-x-1">Schließen</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================
   Formspree helper
   ========================= */
async function submitToFormspree(endpoint, data) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
  });

  let json = {};
  try {
    json = await res.json();
  } catch {
    json = {};
  }

  return { ok: res.ok, json };
}

/* =========================
   Mail helper
   ========================= */
function buildMailto({ subject, body }) {
  const to = EMAIL_ADDRESS || "";
  const s = encodeURIComponent(subject || "");
  const b = encodeURIComponent(body || "");
  return `mailto:${to}?subject=${s}&body=${b}`;
}

/* =========================
   Cookie Banner (DSGVO)
   ========================= */
const COOKIE_KEY = "koneva_cookie_consent_v1";

/* =========================
   Slider controls
   ========================= */
function scrollByCard(container, dir = 1) {
  if (!container) return;
  const card = container.querySelector("[data-card='true']");
  const w = card?.getBoundingClientRect?.().width || 320;
  container.scrollBy({ left: dir * (w + 16), behavior: "smooth" });
}

/* =========================
   helpers
   ========================= */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =========================
   Füllungen Slider: Pointer Drag + Clean Snap + Click Block
   ========================= */
function snapToNearestCard(container) {
  if (!container) return;
  const cards = Array.from(container.querySelectorAll("[data-card='true']"));
  if (!cards.length) return;

  const cRect = container.getBoundingClientRect();
  const viewportCenter = cRect.left + container.clientWidth / 2;

  let best = cards[0];
  let bestDist = Infinity;

  for (const card of cards) {
    const r = card.getBoundingClientRect();
    const center = r.left + r.width / 2;
    const d = Math.abs(center - viewportCenter);
    if (d < bestDist) {
      bestDist = d;
      best = card;
    }
  }

  // Ziel möglichst exakt: scrollLeft + Delta der linken Kante
  const bestRect = best.getBoundingClientRect();
  const delta = bestRect.left - cRect.left;
  const targetLeft = container.scrollLeft + delta;

  container.scrollTo({ left: targetLeft, behavior: "smooth" });
}


function usePointerDragSlider(ref, opts = {}) {
  const { snap = true, dragThreshold = 6 } = opts;

  const stateRef = useRef({
  down: false,
  dragging: false,
  startX: 0,
  startScrollLeft: 0,
  pointerId: null,
  raf: 0,
  targetScrollLeft: 0,
  lastDragTs: 0,
  prevSnapType: "",
  blockClickOnce: false, // ✅ HIER eingefügt
});


  const setBodySelect = (on) => {
    document.documentElement.classList.toggle("no-select", on);
  };

  const onPointerDown = (e) => {
  const el = ref.current;
  if (!el) return;

  // ✅ Touch/Pen: native Swipe erlauben, kein JS-Drag
  if (e.pointerType !== "mouse") return;

  // Nur linke Maustaste
  if (e.button !== 0) return;

    stateRef.current.down = true;
    stateRef.current.dragging = false;
    stateRef.current.startX = e.clientX;
    stateRef.current.startScrollLeft = el.scrollLeft;
    stateRef.current.pointerId = e.pointerId;
    stateRef.current.targetScrollLeft = el.scrollLeft;

    // temporarily disable snap while dragging (prevents "fight")
    stateRef.current.prevSnapType = el.style.scrollSnapType || "";
    el.style.scrollSnapType = "none";

    // capture pointer to keep receiving events
    try {
      el.setPointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }

    setBodySelect(true);
  };

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (!stateRef.current.down) return;

    const dx = e.clientX - stateRef.current.startX;
    const abs = Math.abs(dx);

    if (!stateRef.current.dragging && abs >= dragThreshold) {
      stateRef.current.dragging = true;
    }

    if (!stateRef.current.dragging) return;

    // prevent default scrolling/selection while actively dragging horizontally
    e.preventDefault?.();

    // "soft" feel: small multiplier + rAF to smooth updates
    const softness = 1.08;
    stateRef.current.targetScrollLeft = stateRef.current.startScrollLeft - dx * softness;

    if (stateRef.current.raf) return;
    stateRef.current.raf = requestAnimationFrame(() => {
      stateRef.current.raf = 0;
      el.scrollLeft = stateRef.current.targetScrollLeft;
    });
  };

  const endDrag = () => {
    const el = ref.current;
    if (!el) return;

    const wasDragging = stateRef.current.dragging;

    stateRef.current.down = false;

    // restore snap type
    el.style.scrollSnapType = stateRef.current.prevSnapType;

    if (stateRef.current.raf) {
      cancelAnimationFrame(stateRef.current.raf);
      stateRef.current.raf = 0;
    }

    if (wasDragging) {
  stateRef.current.blockClickOnce = true; // ✅ neu
  stateRef.current.lastDragTs = Date.now();
  if (snap) snapToNearestCard(el);
}


    stateRef.current.dragging = false;
    stateRef.current.pointerId = null;
    setBodySelect(false);
  };

  const onPointerUp = () => endDrag();
  const onPointerCancel = () => endDrag();
  const onPointerLeave = () => {
    // If pointer leaves while held, we still end gracefully.
    if (stateRef.current.down) endDrag();
  };

  // Block clicks that happen right after a drag
  const onClickCapture = (e) => {
  if (!stateRef.current.blockClickOnce) return;
  stateRef.current.blockClickOnce = false; // ✅ nur EIN Click wird geblockt
  e.preventDefault();
  e.stopPropagation();
};


  const isDragging = () => stateRef.current.down && stateRef.current.dragging;

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onPointerLeave,
    onClickCapture,
    isDragging,
  };
}

/* =========================
   Cookie components (unchanged)
   ========================= */
function CookieBanner({ onConsentChange, registerOpenSettings }) {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState({ necessary: true, analytics: false, marketing: false });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_KEY);
      if (!saved) {
        setOpen(true);
        return;
      }
      const parsed = JSON.parse(saved);
      if (parsed?.choice) {
        setPrefs({
          necessary: true,
          analytics: !!parsed.choice.analytics,
          marketing: !!parsed.choice.marketing,
        });
        onConsentChange?.(parsed.choice);
      } else {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (choice) => {
    const payload = { ts: Date.now(), choice };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(payload));
    onConsentChange?.(choice);
  };

  const acceptAll = () => {
    const choice = { necessary: true, analytics: true, marketing: true };
    setPrefs(choice);
    persist(choice);
    setOpen(false);
  };

  const rejectAll = () => {
    const choice = { necessary: true, analytics: false, marketing: false };
    setPrefs(choice);
    persist(choice);
    setOpen(false);
  };

  const saveSelection = () => {
    const choice = { necessary: true, analytics: !!prefs.analytics, marketing: !!prefs.marketing };
    persist(choice);
    setOpen(false);
  };

  const openSettings = () => {
    setOpen(true);
    setShowDetails(true);
  };

  useEffect(() => {
    registerOpenSettings?.(() => openSettings());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={rejectAll} />
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0E0E0E] border border-gold/25 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.28em] text-[11px] text-gold mb-2">Datenschutz & Cookies</p>
              <h2 className="font-serif text-2xl md:text-3xl text-cream">Ihre Privatsphäre ist mir wichtig.</h2>
              <div className="mt-4 w-16">
                <ShimmerLine className="h-[2px] translate-x-1 opacity-100" />
              </div>
            </div>

            <button
              type="button"
              onClick={rejectAll}
              className="text-2xl text-cream/70 hover:text-cream transition"
              aria-label="Schließen (Ablehnen)"
              title="Schließen (Ablehnen)"
            >
              ×
            </button>
          </div>

          <p className="mt-5 text-cream/80 leading-[1.8] text-sm">
            Ich verwende Cookies, um die Website sicher bereitzustellen (notwendig) und – nur mit Ihrer Einwilligung – um
            Reichweite/Performance zu messen (Analytics) oder Inhalte zu personalisieren (Marketing).
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowDetails((s) => !s)}
              className="px-4 py-2 rounded-full border border-white/10 text-cream text-sm hover:border-gold/40 transition"
            >
              {showDetails ? "Details ausblenden" : "Details anzeigen"}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#datenschutz-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="px-4 py-2 rounded-full border border-white/10 text-cream text-sm hover:border-gold/40 transition"
            >
              Datenschutzerklärung
            </a>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="mt-6 overflow-hidden"
              >
                <div className="grid gap-4">
                  <CookieToggle
                    title="Notwendig"
                    desc="Erforderlich für Kernfunktionen (z. B. Sicherheit, Formularversand). Kann nicht deaktiviert werden."
                    checked
                    disabled
                  />
                  <CookieToggle
                    title="Analytics"
                    desc="Hilft mir zu verstehen, welche Inhalte gut funktionieren (z. B. Seitenaufrufe)."
                    checked={prefs.analytics}
                    onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                  />
                  <CookieToggle
                    title="Marketing"
                    desc="Ermöglicht personalisierte Inhalte / Reichweitenmessung über Dritte (nur falls du das nutzt)."
                    checked={prefs.marketing}
                    onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={rejectAll}
              className="px-5 py-3 rounded-full border border-white/10 text-cream text-sm hover:border-gold/40 transition"
            >
              Ablehnen
            </button>

            <button
              type="button"
              onClick={saveSelection}
              className="px-5 py-3 rounded-full border border-white/10 text-cream text-sm hover:border-gold/40 transition"
            >
              Auswahl speichern
            </button>

            <button
              type="button"
              onClick={acceptAll}
              className="px-5 py-3 rounded-full bg-gold text-blackSoft text-sm tracking-wide font-medium"
            >
              Alle akzeptieren
            </button>
          </div>

          <p className="mt-4 text-xs text-cream/55 leading-relaxed">
            Hinweis: Wenn Sie Analytics/Marketing ablehnen, funktioniert die Website weiterhin vollständig.
          </p>
        </div>
      </div>
    </div>
  );
}

function CookieToggle({ title, desc, checked, onChange, disabled }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-cream font-medium">{title}</p>
          <p className="text-cream/70 text-sm leading-relaxed mt-1">{desc}</p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange?.(!checked)}
          className={`shrink-0 w-12 h-7 rounded-full border transition ${
            checked ? "bg-gold/90 border-gold/60" : "bg-black/40 border-white/15"
          } ${disabled ? "opacity-60 cursor-not-allowed" : "hover:border-gold/50"}`}
          aria-pressed={checked}
          aria-label={`${title} ${checked ? "deaktivieren" : "aktivieren"}`}
        >
          <span
            className={`block w-5 h-5 rounded-full bg-[#0E0E0E] transition translate-y-[1px] ${
              checked ? "translate-x-[26px]" : "translate-x-[2px]"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

/* =========================
   FAQ helper + components
   ========================= */
function groupFaq(items) {
  const map = new Map();
  items.forEach((it) => {
    if (!map.has(it.group)) map.set(it.group, []);
    map.get(it.group).push(it);
  });
  return Array.from(map.entries()).map(([title, list]) => ({ title, list }));
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-6"
        aria-expanded={isOpen}
      >
        <span className="text-cream font-medium leading-relaxed">{item.q}</span>
        <span
          className="text-gold text-lg leading-none transition-transform"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ⌄
        </span>
      </button>
      {isOpen && <div className="px-6 pb-6 text-cream/75 leading-[1.9]">{item.a}</div>}
    </div>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

/**
 * Pinch-to-zoom + Pan
 * - 1 Finger: Pan nur wenn scale > 1
 * - 2 Finger: Pinch zoom + "pinch center" stabil halten (gut genug ohne heavy math)
 */
function LightboxZoom({ src, alt, onPrev, onNext, onZoomChange }) {

  const wrapRef = useRef(null);
const didMove = useRef(false);


  const pointers = useRef(new Map()); // pointerId -> {x,y}
  const gesture = useRef({
    mode: "idle", // idle | pan | pinch
    startScale: 1,
    startTx: 0,
    startTy: 0,
    startDist: 0,
    startMid: { x: 0, y: 0 },
    startMidLocal: { x: 0, y: 0 },
  });

  const [scale, setScale] = useState(1);
useEffect(() => {
  onZoomChange?.(scale);
}, [scale, onZoomChange]);

  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  // Pan bounds (simple + robust): begrenze Shift abhängig von Containergröße und Scale
  const getBounds = () => {
    const el = wrapRef.current;
    if (!el) return { bx: 0, by: 0 };
    const w = el.clientWidth;
    const h = el.clientHeight;
    // maximale Verschiebung (grob): (scale-1) * 0.5 * size
    const bx = Math.max(0, (scale - 1) * 0.5 * w);
    const by = Math.max(0, (scale - 1) * 0.5 * h);
    return { bx, by };
  };

  const applyClamp = (nextTx, nextTy, nextScale = scale) => {
    const el = wrapRef.current;
    if (!el) return { tx: nextTx, ty: nextTy };
    const w = el.clientWidth;
    const h = el.clientHeight;

    const bx = Math.max(0, (nextScale - 1) * 0.5 * w);
    const by = Math.max(0, (nextScale - 1) * 0.5 * h);

    return {
      tx: clamp(nextTx, -bx, bx),
      ty: clamp(nextTy, -by, by),
    };
  };

  const resetZoom = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  const onPointerDown = (e) => {
didMove.current = false;

    const el = wrapRef.current;
    if (!el) return;

    // Pointer capture, damit wir alle Moves bekommen
    try {
      el.setPointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const pts = Array.from(pointers.current.values());

    if (pts.length === 1) {
      // Pan vorbereiten (nur wenn gezoomt)
      gesture.current.mode = scale > 1 ? "pan" : "idle";
      gesture.current.startTx = tx;
      gesture.current.startTy = ty;
      gesture.current.startMid = { x: pts[0].x, y: pts[0].y };
    }

    if (pts.length === 2) {
      // Pinch Start
      gesture.current.mode = "pinch";
      gesture.current.startScale = scale;
      gesture.current.startTx = tx;
      gesture.current.startTy = ty;

      const d = dist(pts[0], pts[1]);
      gesture.current.startDist = d;

      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      gesture.current.startMid = mid;

      // Midpoint relativ zum Container (für Stabilität)
      const rect = el.getBoundingClientRect();
      gesture.current.startMidLocal = { x: mid.x - rect.left - rect.width / 2, y: mid.y - rect.top - rect.height / 2 };
    }
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = Array.from(pointers.current.values());
    const el = wrapRef.current;
    if (!el) return;

    // PINCH (2 pointers)
    if (pts.length === 2 && gesture.current.mode === "pinch") {
      e.preventDefault?.();
didMove.current = true;


      const d = dist(pts[0], pts[1]);
      const raw = gesture.current.startScale * (d / (gesture.current.startDist || d));
      const nextScale = clamp(raw, 1, 3.2);

      // “Pinch Center” halbwegs stabil halten:
      // Wenn scale wächst, verschiebe tx/ty etwas entgegen der Midpoint-Position
      const rect = el.getBoundingClientRect();
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const midLocal = { x: mid.x - rect.left - rect.width / 2, y: mid.y - rect.top - rect.height / 2 };

      const scaleDelta = nextScale / (gesture.current.startScale || 1);

      // Shift so, dass der Bereich unter den Fingern nicht “weg rutscht” (vereinfachte Version)
      const nextTx = gesture.current.startTx + (gesture.current.startMidLocal.x - midLocal.x) * 0.15 * (scaleDelta - 1);
      const nextTy = gesture.current.startTy + (gesture.current.startMidLocal.y - midLocal.y) * 0.15 * (scaleDelta - 1);

      const clamped = applyClamp(nextTx, nextTy, nextScale);

      setScale(nextScale);
      setTx(clamped.tx);
      setTy(clamped.ty);
      return;
    }

    // PAN (1 pointer, nur wenn gezoomt)
    if (pts.length === 1 && gesture.current.mode === "pan" && scale > 1) {
      e.preventDefault?.();
didMove.current = true;


      const p = pts[0];
      const dx = p.x - gesture.current.startMid.x;
      const dy = p.y - gesture.current.startMid.y;

      const nextTx = gesture.current.startTx + dx;
      const nextTy = gesture.current.startTy + dy;
      const clamped = applyClamp(nextTx, nextTy, scale);

      setTx(clamped.tx);
      setTy(clamped.ty);
    }
  };

  const onPointerUpOrCancel = (e) => {
    pointers.current.delete(e.pointerId);

    const pts = Array.from(pointers.current.values());
    if (pts.length < 2) {
      // Wenn pinch endet, fallback auf pan oder idle
      if (pts.length === 1 && scale > 1) {
        gesture.current.mode = "pan";
        gesture.current.startTx = tx;
        gesture.current.startTy = ty;
        gesture.current.startMid = { x: pts[0].x, y: pts[0].y };
      } else {
        gesture.current.mode = "idle";
      }
    }

    // Wenn zurück auf scale=1 => translate resetten
    if (scale <= 1.01) {
      setScale(1);
      setTx(0);
      setTy(0);
    }
  };

  // Optional: Double tap / double click => Toggle zoom (nice UX)
  const lastTap = useRef(0);
  const onTap = () => {
  if (didMove.current) return;

  const now = Date.now();
  if (now - lastTap.current < 280) {
    if (scale > 1) resetZoom();
    else setScale(2);
  }
  lastTap.current = now;
};


  return (
    <div
      ref={wrapRef}
      className="w-full max-h-[85vh] flex items-center justify-center overflow-hidden"
      // wichtig für Touch-Gesten:
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUpOrCancel}
      onPointerCancel={onPointerUpOrCancel}
      onPointerLeave={onPointerUpOrCancel}
      onClick={onTap}
    >
      <img
        key={src}
        src={src}
        alt={alt}
        draggable={false}
        className="select-none w-full max-h-[85vh] object-contain"
        style={{
          transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
          transformOrigin: "center center",
          transition: gesture.current.mode === "idle" ? "transform 180ms ease-out" : "none",
        }}
      />
    </div>
  );
}


/* =========================
   App
   ========================= */
export default function App() {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjjllyo";
  const brand = "Koneva Sweet Art";

  const [legalModal, setLegalModal] = useState(null); // impressum | datenschutz | agb
  const [filter, setFilter] = useState("Alle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  useEffect(() => {
  const onResize = () => {
    if (window.innerWidth >= 768) setMobileMenuOpen(false); // md breakpoint
  };
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);



  const [successModal, setSuccessModal] = useState(null); // "order" | "contact" | null
  const closeSuccessModal = () => setSuccessModal(null);
  

  const [, setCookieConsent] = useState(null);
  const cookieOpenRef = useRef(null);

  // ORDER form state
  const [orderSending, setOrderSending] = useState(false);
  const [orderError, setOrderError] = useState("");

  // CONTACT form state
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState("");

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
const [zoomScale, setZoomScale] = useState(1);


  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Scrollspy / Active nav
  const [activeSection, setActiveSection] = useState("#top");

  // Slider refs
  const offersSliderRef = useRef(null);
  const fillingsSliderRef = useRef(null);
  const gallerySliderRef = useRef(null);
  // Autoplay Pause nach User-Interaktion (Mobile)
const pauseAutoUntilRef = useRef(0);

const markUserInteracted = () => {
  pauseAutoUntilRef.current = Date.now() + 8000; // 8 Sekunden Pause nach Swipe
};



  // Drag UX state (hint + cursor class)
  const [fillingsHint, setFillingsHint] = useState(true);
const [fillingsDragging, setFillingsDragging] = useState(false);

  const dragFillings = usePointerDragSlider(fillingsSliderRef, { snap: true, dragThreshold: 6 });
  

  useEffect(() => {
    // hint fades out automatically (still re-shows on hover via opacity utility below if you want)
    if (!fillingsHint) return;
    const t = setTimeout(() => setFillingsHint(false), 4200);
    return () => clearTimeout(t);
  }, [fillingsHint]);

  // Autoplay (Mobile): Gallery + Fillings
useEffect(() => {
  const isMobile = window.innerWidth < 768;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (!isMobile || reduced) return;

  const shouldPause = () => Date.now() < pauseAutoUntilRef.current;

  const tick = (ref) => {
    const el = ref.current;
    if (!el) return;

    // Pause nach User-Interaktion
    if (shouldPause()) return;

    // Wenn Finger noch drauf ist: nicht auto scrollen
    if (document.activeElement === el) return; // optional


    const max = el.scrollWidth - el.clientWidth;
    const nearEnd = el.scrollLeft >= max - 4;

    if (nearEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else scrollByCard(el, 1);
  };

  const id = setInterval(() => {
    tick(gallerySliderRef);
    tick(fillingsSliderRef);
  }, 3200);

  return () => clearInterval(id);
}, []);



  const navLinks = useMemo(
    () => [
      { href: "#about", label: "Über mich" },
      { href: "#offers", label: "Angebote" },
      { href: "#order", label: "Bestellung" },
      { href: "#gallery", label: "Galerie" },
      { href: "#fillings", label: "Füllungen" },
      { href: "#videos", label: "Videos" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Kontakt" },
    ],
    []
  );

  const faqItems = useMemo(
    () => [
      {
        q: "Wie läuft eine Tortenbestellung bei Koneva Sweet Art ab?",
        a: "Nach Ihrer Anfrage klären wir gemeinsam alle relevanten Details. Am besten laden Sie das Bestellformular als PDF herunter und ausgefüllt per E-Mail oder WhatsApp an mich senden. Auf dieser Basis erhalten Sie ein individuelles Angebot. Nach Bestätigung und Anzahlung wird Ihr Termin verbindlich reserviert.",
        group: "Bestellung & Ablauf",
      },
      {
        q: "Wann sollte ich meine Torte reservieren?",
        a: "Für Hochzeitstorten empfehle ich eine Anfrage 3 bis 6 Monate im Voraus. Für kleinere Anlässe genügt meist ein Vorlauf von 3 bis 4 Wochen – abhängig von der Verfügbarkeit.",
        group: "Bestellung & Ablauf",
      },
      {
        q: "Wie kann ich eine Anfrage stellen?",
        a: "Sie können Ihre Anfrage bequem per Instagram oder E-Mail senden. Bitte nennen Sie Anlass, Datum, Personenanzahl sowie eine grobe Designvorstellung und – wenn relevant – die Location.",
        group: "Bestellung & Ablauf",
      },
      {
        q: "Wann gilt meine Bestellung als verbindlich?",
        a: "Eine Buchung gilt als verbindlich nach schriftlicher Bestätigung und Eingang der Anzahlung.",
        group: "Bestellung & Ablauf",
      },
      {
        q: "Werden alle Torten individuell entworfen?",
        a: "Ja. Jede Torte entsteht als maßgeschneidertes Designstück – abgestimmt auf Stil, Anlass und Ihre Wünsche.",
        group: "Design & Individualität",
      },
      {
        q: "Kann ich eigene Ideen einbringen?",
        a: "Sehr gerne. Ihre Inspirationen fließen in die Gestaltung ein und werden professionell in ein stimmiges Gesamtkonzept übersetzt.",
        group: "Design & Individualität",
      },
      {
        q: "Gibt es Referenzdesigns?",
        a: "Gerne zeige ich Ihnen Beispiele meiner Arbeiten zur Inspiration. Jede neue Torte entsteht jedoch als eigenständiges Design.",
        group: "Design & Individualität",
      },
      {
        q: "Kann die Torte an ein Farb- oder Eventkonzept angepasst werden?",
        a: "Ja. Farben, Formen und Details werden auf Wunsch an Ihr Gesamtkonzept angepasst.",
        group: "Design & Individualität",
      },
      {
        q: "Wie setzt sich der Preis einer Torte zusammen?",
        a: "Der Preis reflektiert Designaufwand, handwerkliche Präzision, Größe, Portionenzahl/Gewicht sowie eingesetzte Techniken und Lebensmittel/Materialien. Jede Torte wird individuell kalkuliert.",
        group: "Preise & Leistungen",
      },
      {
        q: "Gibt es Mindestbestellwerte?",
        a: "Ja. Der Mindestbestellwert für Hochzeitstorten beträgt 450 €, für Event- und Design-Torten 250 €, für Bento-Torten 70 €.",
        group: "Preise & Leistungen",
      },
      {
        q: "Was ist im Preis enthalten?",
        a: "Persönliche Beratung, individuelle Designskizze, hochwertige Zutaten, handgefertigte Dekoration sowie die sorgfältige Umsetzung, Vorbereitung und Verpackung.",
        group: "Preise & Leistungen",
      },
      {
        q: "Welche Zusatzleistungen gibt es?",
        a: "Zusätzliche Leistungen wie Lieferung, Aufbau, besondere Techniken oder Personalisierungen können individuell ergänzt werden.",
        group: "Preise & Leistungen",
      },
      {
        q: "Ist Lieferung möglich?",
        a: "Lieferung ist nach individueller Absprache möglich – abhängig von Termin, Location und Umfang.",
        group: "Lieferung & Abholung",
      },
      {
        q: "Kann ich die Torte auch abholen?",
        a: "Gerne. Hinweise zum sicheren Transport erhalten Sie selbstverständlich.",
        group: "Lieferung & Abholung",
      },
      {
        q: "Wer trägt die Verantwortung nach Übergabe?",
        a: "Nach Übergabe der Torte geht die Verantwortung für Transport und Lagerung auf die Kund:innen über.",
        group: "Lieferung & Abholung",
      },
      {
        q: "Bis wann sind Änderungen möglich?",
        a: "Änderungen am Design oder Umfang sind bis zu einem bestimmten Zeitpunkt vor dem Event möglich und müssen abgestimmt werden bzw. werden im Vertrag schriftlich beschrieben.",
        group: "Änderungen & Stornierung",
      },
      {
        q: "Was passiert bei einer Stornierung?",
        a: "Bei Stornierungen werden bereits entstandene Kosten berücksichtigt – insbesondere bei kurzfristigen Absagen, laut dem schriftlichen Vertrag.",
        group: "Änderungen & Stornierung",
      },
      {
        q: "Können kurzfristige Änderungen berücksichtigt werden?",
        a: "Kurzfristige Änderungen sind je nach Aufwand und Produktionsstand ggf. nicht mehr umsetzbar.",
        group: "Änderungen & Stornierung",
      },
      {
        q: "Können Allergien berücksichtigt werden?",
        a: "Ja. Bitte teilen Sie Hinweise zu Allergien oder Unverträglichkeiten bereits bei der Anfrage mit.",
        group: "Besonderheiten",
      },
      {
        q: "Gibt es vegane oder glutenfreie Optionen?",
        a: "In vielen Fällen sind alternative Rezepturen möglich. Sprechen Sie mich gerne darauf an – idealerweise bereits bei der ersten Anfrage.",
        group: "Besonderheiten",
      },
      {
        q: "Sind Sonderformen oder ausgefallene Designs möglich?",
        a: "Ja. Ich bin spezialisiert auf individuelle Designs und ausgefallene Formen – sofern technisch realisierbar.",
        group: "Besonderheiten",
      },
    ],
    []
  );
const faqIndexByQ = useMemo(() => {
  const m = new Map();
  faqItems.forEach((x, i) => m.set(x.q, i));
  return m;
}, [faqItems]);


  const faqGroups = useMemo(() => groupFaq(faqItems), [faqItems]);

  // Galerie
  const gallery = useMemo(
    () => [
      { src: "/images/gallery1.jpg", cat: "Hochzeitstorte", alt: "Hochzeitstorte" },
      { src: "/images/gallery2.jpg", cat: "Hochzeitstorte", alt: "Hochzeitstorte" },
      { src: "/images/gallery3.jpg", cat: "Hochzeitstorte", alt: "Hochzeitstorte" },
      { src: "/images/gallery4.jpg", cat: "Hochzeitstorte", alt: "Hochzeitstorte" },
      { src: "/images/gallery5.jpg", cat: "Hochzeitstorte", alt: "Hochzeitstorte" },
      { src: "/images/gallery6.jpg", cat: "Hochzeitstorte", alt: "Hochzeitstorte" },

      { src: "/images/gallery100.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery101.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery102.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery103.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery104.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery105.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery106.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery107.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery108.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery109.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery110.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery112.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery113.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery114.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery115.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery116.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery117.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery118.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery119.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery120.jpg", cat: "Design-Torte", alt: "Design-Torte" },
      { src: "/images/gallery121.jpg", cat: "Design-Torte", alt: "Design-Torte" },

      { src: "/images/gallery200.jpg", cat: "Sweet Table", alt: "Sweet Table" },
      { src: "/images/gallery201.jpg", cat: "Sweet Table", alt: "Sweet Table" },
      { src: "/images/gallery202.jpg", cat: "Sweet Table", alt: "Sweet Table" },
      { src: "/images/gallery203.jpg", cat: "Sweet Table", alt: "Sweet Table" },
      { src: "/images/gallery204.jpg", cat: "Sweet Table", alt: "Sweet Table" },
      { src: "/images/gallery205.jpg", cat: "Sweet Table", alt: "Sweet Table" },
    ],
    []
  );
const [shuffledAll, setShuffledAll] = useState(() => shuffleArray(gallery));

useEffect(() => {
  // Shuffle nur dann neu, wenn man auf "Alle" wechselt oder sich die Galerie ändert
  if (filter === "Alle") setShuffledAll(shuffleArray(gallery));
}, [filter, gallery]);


 const filtered = useMemo(() => {
  if (filter === "Alle") return shuffledAll;
  return gallery.filter((g) => g.cat === filter);
}, [filter, gallery, shuffledAll]);


  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };
  const next = useCallback(() => {
  setLightboxIndex((i) => (i + 1) % (filtered.length || 1));
}, [filtered.length]);

const prev = useCallback(() => {
  setLightboxIndex((i) => (i - 1 + (filtered.length || 1)) % (filtered.length || 1));
}, [filtered.length]);



 // Scroll lock (MENÜ + MODALS) + Accessibility (nur MODALS) — robust
const scrollLockRef = useRef({ locked: false, overflow: "", paddingRight: "" });

useEffect(() => {
  const lockScroll = Boolean(legalModal || lightboxOpen || successModal || mobileMenuOpen);
  const inertBg = Boolean(legalModal || lightboxOpen || successModal); // nicht fürs Mobile-Menü

  const body = document.body;
  const html = document.documentElement;
  const appRoot = document.getElementById("app-content");

  // ---- LOCK ----
  if (lockScroll && !scrollLockRef.current.locked) {
    scrollLockRef.current.locked = true;
    scrollLockRef.current.overflow = body.style.overflow;
    scrollLockRef.current.paddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
  }

  // ---- UNLOCK ----
  if (!lockScroll && scrollLockRef.current.locked) {
    body.style.overflow = scrollLockRef.current.overflow || "auto";
    body.style.paddingRight = scrollLockRef.current.paddingRight || "0px";
    scrollLockRef.current.locked = false;
  }

  // ---- INERT (nur Modals/Lightbox/Success) ----
  if (inertBg) {
    appRoot?.setAttribute("inert", "");
    appRoot?.setAttribute("aria-hidden", "true");
  } else {
    appRoot?.removeAttribute("inert");
    appRoot?.removeAttribute("aria-hidden");
  }

  // Cleanup nur für Unmount (nicht pro Re-Run)
  return () => {
    if (scrollLockRef.current.locked) {
      body.style.overflow = scrollLockRef.current.overflow || "auto";
      body.style.paddingRight = scrollLockRef.current.paddingRight || "0px";
      scrollLockRef.current.locked = false;
    }
    appRoot?.removeAttribute("inert");
    appRoot?.removeAttribute("aria-hidden");
  };
}, [legalModal, lightboxOpen, successModal, mobileMenuOpen]);




// 🔄 Reset Zoom when lightbox image changes
useEffect(() => {
  if (!lightboxOpen) return;
  setZoomScale(1);
}, [lightboxIndex, lightboxOpen]);

// ESC close
useEffect(() => {
  const onKey = (e) => {
    if (e.key === "Escape") {
      setLegalModal(null);
      setLightboxOpen(false);
      setSuccessModal(null);
      setMobileMenuOpen(false);

    }
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

// ✅ Lightbox: Pfeiltasten links/rechts
useEffect(() => {
  if (!lightboxOpen) return;

  const onKey = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [lightboxOpen, next, prev]);




  // Scrollspy via IntersectionObserver (robust)
  useEffect(() => {
    const ids = ["top", "about", "offers", "order", "gallery", "fillings", "videos", "faq", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const ratios = new Map();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });

        let bestId = "top";
        let bestRatio = 0;

        els.forEach((el) => {
          const r = ratios.get(el.id) || 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = el.id;
          }
        });

        setActiveSection(`#${bestId}`);
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.08, 0.15, 0.25, 0.35, 0.5, 0.65, 0.8],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const onNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      window.history.replaceState(null, "", href);
    } catch {
      /* ignore */
    }
  };

  // ORDER submit
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (orderSending) return;

    setOrderError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("_gotcha") || "").trim() !== "") return;

    setOrderSending(true);
    const { ok, json } = await submitToFormspree(FORMSPREE_ENDPOINT, fd);
    setOrderSending(false);

    if (!ok) {
      setOrderError(json?.errors?.[0]?.message || "Leider gab es ein Problem beim Senden. Bitte versuche es erneut.");
      return;
    }

    form.reset();
    playSuccessChime();
    setSuccessModal("order");
  };

  // CONTACT submit
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (contactSending) return;

    setContactError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("_gotcha") || "").trim() !== "") return;

    setContactSending(true);
    const { ok, json } = await submitToFormspree(FORMSPREE_ENDPOINT, fd);
    setContactSending(false);

    if (!ok) {
      setContactError(json?.errors?.[0]?.message || "Leider gab es ein Problem beim Senden. Bitte versuche es erneut.");
      return;
    }

    form.reset();
    playSuccessChime();
    setSuccessModal("contact");
  };

  const mailtoOrder = buildMailto({
    subject: "Bestellung / Anfrage – Koneva Sweet Art",
    body:
      "Hallo Koneva Sweet Art,\n\nich möchte eine Bestellung/Anfrage senden.\n\nName:\nDatum/Anlass:\nPersonen (ca.):\nWünsche/Stil:\nBudget (optional):\n\nLiebe Grüße",
  });

  const mailtoContact = buildMailto({
    subject: "Kontakt – Koneva Sweet Art",
    body:
      "Hallo Koneva Sweet Art,\n\nich habe eine Frage:\n\nName:\nNachricht:\n\nLiebe Grüße",
  });

  const backToSection = () => {
    const target = successModal === "order" ? "#order" : "#contact";
    closeSuccessModal();
    setTimeout(() => {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  // Füllungen
  const fillings = useMemo(
    () => [
      { src: "/images/fillings/filling1.jpg", title: "Schwarzwald-Torte", note: "intensiv, fein" },
      { src: "/images/fillings/filling2.jpg", title: "Schokoladen-Sahne-Mix", note: "cremig, elegant" },
      { src: "/images/fillings/filling3.jpg", title: "Schokoladen-Kirsch-Torte", note: "fruchtig, fein" },
      { src: "/images/fillings/filling4.jpg", title: "Erdbeer-Mojito-Torte", note: "frisch, klar" },
      { src: "/images/fillings/filling5.jpg", title: "Snickers-Torte", note: "nussig, karamellig" },
      { src: "/images/fillings/filling6.jpg", title: "Schokoladen-Mousse-Kirsch-Torte", note: "fruchtig, samtig" },
{ src: "/images/fillings/filling7.jpg", title: "Haselnuss-Karamell-Mascarpone-Torte", note: "karamellig, samtig" },
{ src: "/images/fillings/filling8.jpg", title: "Karamell-Apfel-Torte", note: "fruchtig, samtig" },
{ src: "/images/fillings/filling9.jpg", title: "Mango-Erdbeer-Torte", note: "fruchtig, frisch" },
{ src: "/images/fillings/filling10.jpg", title: "Karamell-Frischkäse- und Beeren-Torte", note: "karamellig und fruchtig" },
{ src: "/images/fillings/filling11.jpg", title: "Pina-Colada- und Mandel-Kirsch-Torte", note: "fruchtig, samtig" },
{ src: "/images/fillings/filling12.jpg", title: "verschiedene Torten", note: "fruchtig, samtig" },
{ src: "/images/fillings/filling13.jpg", title: "Mandarinen-Tartellete", note: "fruchtig, samtig" },
{ src: "/images/fillings/filling14.jpg", title: "Zitronen-Tartellete", note: "fruchtig, samtig" },
{ src: "/images/fillings/filling15.jpg", title: "Aprikosen-Cognac-Tartellete", note: "fruchtig, samtig" },
    ],
    []
  );

  // Videos
  const videos = useMemo(
    () => [
      { src: "/videos/video1.mp4", poster: "/images/videos/poster1.jpg", title: "Finisch · Detail" },
      { src: "/videos/video2.mp4", poster: "/images/videos/poster2.jpg", title: "Finisch · Texture" },
      { src: "/videos/video3.mp4", poster: "/images/videos/poster3.jpg", title: "Setup · Sweet Table" },
    ],
    []
  );

  // Angebote
  const offers = useMemo(
    () => [
      {
        title: "Hochzeitstorte",
        text: "Individuelle Kreationen – abgestimmt auf Stil, Ort und Stimmung.",
        img: "/images/offers/offer-wedding.jpg",
      },
      {
        title: "Design-Torte",
        text: "Design-Torten als Unikat – modern, klar, mit künstlerischer Handschrift.",
        img: "/images/offers/offer-design.jpg",
      },
      {
        title: "Sweet Table",
        text: "Kompositionen aus kleinen Formen – harmonisch inszeniert für Events.",
        img: "/images/offers/offer-sweettbl.jpg",
      },
    ],
    []
  );

  return (
    <div className="font-sans bg-[#0E0E0E] text-white">
      <GlobalLuxuryStyles />
 
    <div id="app-content">

      {/* Cookie Banner */}
      <CookieBanner
        onConsentChange={(c) => setCookieConsent(c)}
        registerOpenSettings={(fn) => {
          cookieOpenRef.current = fn;
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/55 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" onClick={(e) => onNavClick(e, "#top")} className="flex items-center gap-4">
            <img src="/images/logo.png" alt={`${brand} Logo`} className="h-14 md:h-16 w-auto" />
            <span className="hidden sm:inline font-serif tracking-wide text-lg brand-shimmer">{brand}</span>
          </a>

          <nav className="text-sm hidden md:flex items-center gap-6 text-cream/75 relative">
            {navLinks.map((l) => {
              const isActive = activeSection === l.href;

              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href)}
                  className={`navlink ${isActive ? "text-cream" : "text-cream/75 hover:text-cream"} `}
                >
                  <span className={isActive ? "gold-shimmer" : ""}>{l.label}</span>

                  {isActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="nav-underline absolute left-0 right-0 -bottom-1"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <button
  type="button"
  className="md:hidden w-11 h-11 rounded-full border border-white/10 bg-white/5 text-cream hover:border-gold/40 transition flex items-center justify-center"
  onClick={() => setMobileMenuOpen((v) => !v)}
  aria-label="Menü öffnen"
  aria-expanded={mobileMenuOpen}
>
  ☰
</button>

        </div>
         {/* ✅ HIER: Mobile Menü Overlay */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="md:hidden fixed inset-0 z-[60]"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panel */}
        <motion.div
          initial={{ y: -14, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -10, opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute top-4 left-4 right-4 rounded-3xl border border-gold/25 bg-[#0E0E0E] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 flex items-center justify-between border-b border-white/10">
            <p className="uppercase tracking-[0.28em] text-[11px] text-gold">Menü</p>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-cream/70 hover:text-cream transition"
              aria-label="Schließen"
            >
              ×
            </button>
          </div>

          <nav className="p-4">
            <div className="grid gap-2">
              {navLinks.map((l) => {
  const isActive = activeSection === l.href;

  return (
    <a
      key={l.href}
      href={l.href}
      onClick={(e) => {
        onNavClick(e, l.href);
        setMobileMenuOpen(false);
      }}
      className={`px-4 py-3 rounded-2xl border transition ${
        isActive
          ? "border-gold/50 bg-gold/10 text-cream"
          : "border-white/10 bg-white/5 text-cream/85 hover:text-cream hover:border-gold/40"
      }`}
    >
      <span className={isActive ? "gold-shimmer" : ""}>{l.label}</span>
    </a>
  );
})}

            </div>
          </nav>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
      </header>

      {/* HERO */}
      <section
  id="top"
  className="hero-bg min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 relative"
  style={{ backgroundImage: `url(${HERO_BG})` }}
>


      
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mx-auto mb-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative"
          >
            <div className="absolute inset-0 pointer-events-none rounded-full border-2 border-gold/65" />
            <div className="absolute -inset-2 pointer-events-none rounded-full border border-gold/25 blur-[2px]" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <video
              className="w-full h-full object-cover"
              src={HERO_VIDEO_SRC}
              poster={HERO_VIDEO_POSTER}
              autoPlay
              muted
              playsInline
              preload="auto"
              fetchpriority="high"


            />
          </motion.div>

          <Reveal as="h1" className="font-serif text-4xl md:text-6xl leading-tight mb-6 text-cream">
            {brand}
          </Reveal>

          <Reveal as="div" delay={0.1}>
            <p className="uppercase tracking-[0.3em] text-sm md:text-base text-gold mb-10">Kunst zum Genießen</p>
          </Reveal>

          <div className="mt-16 w-12 mx-auto">
            <ShimmerLine className="h-[2px] translate-x-1 opacity-100" />
          </div>
        </div>
      </section>


      {/* ABOUT */}
      <section id="about" className="py-24 md:py-40 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Autor" title="Über mich" />

          <div className="border border-gold/30 rounded-3xl p-3 md:p-4 bg-white/[0.02]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden bg-white/5 border border-white/10"
              >
                <img
                  src="/images/hero.jpg"
                  alt="Koneva Sweet Art – Portrait"
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </motion.div>

              <div className="rounded-2xl bg-black/20 border border-gold/15 p-6 md:p-7">
                <p className="text-cream/75 leading-[1.95] whitespace-pre-line">
                  {`Ich bin die Gründerin von Koneva Sweet Art. Geboren in Lettland, geprägt von Kunst, Form und Material – und seit vielen Jahren in Deutschland zu Hause. Meine kreative Reise begann nicht in der Backstube, sondern in der Keramik und Architektur. Über 25 Jahre Berufserfahrung haben meinen Blick für Proportion, Statik, Oberfläche und Detail geschärft. Ich denke in Formen, Schichten und Strukturen – immer mit einem klaren ästhetischen Anspruch. Parallel dazu habe ich meine zweite große Leidenschaft vertieft: das Konditorhandwerk. Ich habe es an einer professionellen Konditorschule erlernt und bin heute zugelassene Konditorin. Für mich ist Konditorei Kunst in essbarer Form. Ein Feld ohne Grenzen. Ein Raum für Experimente, neue Techniken und ständige Weiterentwicklung.
Ich arbeite präzise, akribisch, mit großer Sorgfalt und Liebe zum Detail. Qualität ist für mich kein Anspruch – sondern Voraussetzung.
Ich spezialisiere mich auf exklusive Design-Torten für Hochzeiten, Events und besondere Momente.
Jede Torte entsteht individuell – als Spiegel einer Idee, einer Stimmung, eines Anlasses.
Hier teile ich meine Arbeit, meine Prozesse, meine Suche nach Perfektion und meine Leidenschaft für Tortenkunst.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SignatureQuote text="Form entsteht aus Stille." />

      {/* OFFERS */}
      <section id="offers" className="py-24 md:py-40 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Leistungen" title="Angebote" />

          {/* Mobile */}
          <div className="md:hidden">
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-cream/70 text-xs tracking-[0.28em] uppercase">Swipe</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollByCard(offersSliderRef.current, -1)}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-cream hover:border-gold/40 transition"
                    aria-label="Zurück"
                    title="Zurück"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollByCard(offersSliderRef.current, 1)}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-cream hover:border-gold/40 transition"
                    aria-label="Weiter"
                    title="Weiter"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div
                ref={offersSliderRef}
                className="hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {offers.map((c) => (
                  <motion.article
                    key={c.title}
                    data-card="true"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="snap-start shrink-0 w-[78vw] max-w-[360px] rounded-3xl overflow-hidden border border-white/10 bg-white/5"
                  >
                    <div className="relative">
                      <img src={c.img} alt={c.title} className="w-full aspect-[9/16] object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />
                      <div className="absolute inset-0 pointer-events-none border border-gold/20" />

                      <div className="absolute left-0 right-0 bottom-0 p-6">
                        <Reveal as="h3" className="font-serif text-2xl text-cream">
                          {c.title}
                        </Reveal>
                        <div className="mt-4 w-12">
                          <ShimmerLine className="h-[2px] translate-x-1 opacity-100" />
                        </div>
                        <Reveal as="p" delay={0.06} className="mt-4 text-cream/80 leading-[1.85] text-sm">
                          {c.text}
                        </Reveal>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <p className="mt-6 text-center text-xs text-cream/55 leading-relaxed">
                Tipp: Wische nach links/rechts – wie Stories.
              </p>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-10">
            {offers.map((c, i) => (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.03 }}
                viewport={{ once: true }}
                className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden lux-motion"
              >
                <div className="relative">
                  <img src={c.img} alt={c.title} className="w-full aspect-[9/16] object-cover" loading="lazy" />
                  <div className="absolute inset-0 pointer-events-none border border-gold/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                </div>

                <div className="p-8">
                  <Reveal as="h3" className="font-serif text-xl mb-3 text-cream">
                    {c.title}
                  </Reveal>
                  <div className="w-12 mb-5">
                    <ShimmerLine className="h-[2px] translate-x-1 opacity-100" />
                  </div>
                  <Reveal as="p" delay={0.04} className="text-cream/75 leading-[1.9]">
                    {c.text}
                  </Reveal>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SignatureQuote text="Ästhetik ist eine Entscheidung." />

      {/* ORDER */}
      <section
  id="order"
  className="order-bg py-24 md:py-40 px-6 relative"
  style={{ backgroundImage: `url(${ORDER_BG})` }}
>


        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <SectionTitle kicker="Individuelle Anfrage" title="Bestellung" />

          <div className="mb-10 border border-white/10 bg-black/55 backdrop-blur p-6 rounded-2xl">
            <Reveal as="p" className="font-serif text-xl mb-2 text-cream">
              PDF-Bestellformular
            </Reveal>
            <Reveal as="p" delay={0.03} className="text-cream/75 leading-relaxed">
              Sie können das Bestellformular als PDF herunterladen und ausgefüllt per E-Mail oder WhatsApp an mich senden.
              Danach bekommen Sie von mir ein maßgeschneidertes Angebot.
            </Reveal>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href={ORDER_PDF_URL}
                className="px-5 py-3 rounded-full bg-gold text-blackSoft text-sm tracking-wide text-center font-medium"
                download
              >
                PDF herunterladen
              </a>

              <ExternalLink
                href={WHATSAPP_URL}
                className="px-5 py-3 rounded-full border border-white/10 text-cream text-sm tracking-wide text-center hover:border-gold/40 transition"
              >
                Per WhatsApp senden
              </ExternalLink>

              <a
                href={mailtoOrder}
                className="px-5 py-3 rounded-full border border-white/10 text-cream text-sm tracking-wide text-center hover:border-gold/40 transition"
              >
                Per E-Mail senden
              </a>
            </div>
          </div>

          {orderError && (
            <div className="mb-8 border border-white/10 bg-black/55 backdrop-blur p-6 rounded-2xl">
              <p className="font-medium text-cream mb-2">Leider nicht gesendet</p>
              <p className="text-cream/75">{orderError}</p>
            </div>
          )}

          <form className="grid grid-cols-1 gap-6" onSubmit={handleOrderSubmit}>
            <input type="hidden" name="formType" value="Bestellung" />
            <input type="hidden" name="_subject" value="Neue Bestellung – Koneva Sweet Art" />

            <div className="hidden" aria-hidden="true">
              <label>
                Bitte dieses Feld leer lassen:
                <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
              </label>
            </div>

            {/* ✅ Hinweis Pflichtfelder */}
            <p className="text-xs text-cream/60 leading-relaxed -mt-1">
              Felder mit einem <span className="text-gold">*</span> sind Pflichtfelder.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                required
                name="name"
                placeholder="Name *"
                aria-label="Name (Pflichtfeld)"
                className="bg-transparent text-cream placeholder:text-cream/45 border-b border-cream/30 py-3 focus:outline-none focus:border-gold transition-colors"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="E-Mail *"
                aria-label="E-Mail (Pflichtfeld)"
                className="bg-transparent text-cream placeholder:text-cream/45 border-b border-cream/30 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <select
                required
                name="anlass"
                aria-label="Anlass (Pflichtfeld)"
                className="bg-transparent text-cream border-b border-cream/30 py-3 focus:outline-none focus:border-gold transition-colors"
                defaultValue=""
              >
                <option value="" disabled className="text-blackSoft">
                  Anlass *
                </option>
                <option className="text-blackSoft">Hochzeit</option>
                <option className="text-blackSoft">Geburtstag</option>
                <option className="text-blackSoft">Sweet Table</option>
                <option className="text-blackSoft">Event</option>
              </select>

              <input
                type="date"
                name="date"
                className="bg-transparent text-cream border-b border-cream/30 py-3 focus:outline-none focus:border-gold transition-colors"
              />

              <input
                name="persons"
                placeholder="Personen (ca.)"
                className="bg-transparent text-cream placeholder:text-cream/45 border-b border-cream/30 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <textarea
              required
              name="message"
              rows={5}
              placeholder="Wünsche / Stil / Farben / Budgetrahmen (optional) *"
              aria-label="Wünsche / Stil (Pflichtfeld)"
              className="bg-black/50 text-cream placeholder:text-cream/45 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-gold transition-colors leading-[1.9]"
            />

            
            <label className="flex items-start gap-3 text-xs text-cream/75 leading-relaxed">
              <input type="checkbox" name="privacy" value="accepted" required className="mt-1" />
              <span>
                Ich habe die{" "}
                <button
                  type="button"
                  className="underline underline-offset-4"
                  onClick={() => setLegalModal("datenschutz")}
                >
                  Datenschutzerklärung
                </button>{" "}
                gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung der Anfrage einverstanden{" "}
                <span className="text-gold">*</span>.
              </span>
            </label>

            <button type="submit" disabled={orderSending} className="mx-auto relative text-cream disabled:opacity-60">
              <span className="after:block after:h-px after:bg-gold after:mt-2 after:translate-x-1">
                {orderSending ? "Sende..." : "Anfrage senden"}
              </span>
            </button>

            <div className="pt-2 text-center">
              <a
                href={mailtoOrder}
                className="inline-block text-sm text-cream/85 hover:text-cream relative after:block after:h-px after:bg-gold after:mt-2 after:translate-x-1"
              >
                E-Mail direkt senden (Anhänge möglich)
              </a>
            </div>
          </form>
        </div>
      </section>


      {/* GALLERY + FÜLLUNGEN */}
      <section id="gallery" className="py-24 md:py-40 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Auswahl" title="Galerie" />

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Alle", "Hochzeitstorte", "Design-Torte", "Sweet Table"].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 text-sm border transition rounded-full ${
                  filter === c
                    ? "bg-gold text-blackSoft border-gold/50"
                    : "bg-white/5 text-cream border-white/10 hover:border-gold/40"
                }`}
                type="button"
              >
                {c}
              </button>
            ))}
          </div>

          {/* MOBILE: Slider (wie Angebote) */}
<div className="md:hidden">
  <div
  ref={gallerySliderRef}
  onTouchStart={markUserInteracted}
  onPointerDown={markUserInteracted}
  className="hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2"
  style={{ WebkitOverflowScrolling: "touch" }}
>


    {filtered.map((g, idx) => (
      <button
        key={`${g.src}-${idx}`}
        type="button"
        onClick={() => openLightbox(idx)}
        data-card="true"
        className="snap-start shrink-0 w-[78vw] max-w-[360px] text-left"
      >
        <div className="relative overflow-hidden border border-white/10 bg-white/5 rounded-2xl">
          <img
            src={g.src}
            alt={g.alt}
            loading="lazy"
            className="w-full aspect-[9/16] object-cover"
          />
          <div className="absolute inset-0 border border-gold/40 opacity-0 hover:opacity-100 transition rounded-2xl" />
        </div>
      </button>
    ))}
  </div>

  <p className="mt-6 text-center text-xs text-cream/55 leading-relaxed">
    Tipp: Wische nach links/rechts – wie Stories.
  </p>
</div>

{/* DESKTOP: Grid bleibt */}
<div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-10">
  {filtered.map((g, idx) => (
    <button
      key={`${g.src}-${idx}`}
      type="button"
      onClick={() => openLightbox(idx)}
      className="text-left group"
    >
      <div className="relative overflow-hidden border border-white/10 bg-white/5 rounded-2xl">
        <img
          src={g.src}
          alt={g.alt}
          loading="lazy"
          className="w-full aspect-[9/16] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 border border-gold/40 opacity-0 group-hover:opacity-100 transition rounded-2xl" />
      </div>
    </button>
  ))}
</div>


<div className="mt-16 text-center">
  <a
    href="https://www.instagram.com/koneva_sweet_art/"
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center gap-3
      px-10 py-5
      rounded-full
      bg-gold text-blackSoft
      font-medium tracking-wide
      shadow-[0_0_25px_rgba(201,162,77,0.35)]
      hover:shadow-[0_0_45px_rgba(201,162,77,0.6)]
      hover:scale-[1.03]
      transition-all duration-300
      relative overflow-hidden
    "
  >
    <span className="relative z-10">Mehr Bilder auf Instagram</span>

    {/* Gold Shimmer Layer */}
    <span
      className="absolute inset-0 lux-shimmer"
      style={{
        background:
          "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0) 70%)",
        opacity: 0.35,
      }}
    />
  </a>
</div>

          {/* FÜLLUNGEN */}
<div id="fillings" className="mt-16 border border-white/10 bg-white/5 rounded-2xl p-6 md:p-8">


            <div className="text-center">
              <Reveal as="p" className="uppercase tracking-[0.3em] text-xs text-gold">
                Auswahl
              </Reveal>
              <div className="text-center mt-3"></div>
              <Reveal as="h2" className="text-3xl md:text-4xl font-serif text-cream mt-3">
                Füllungen
              </Reveal>
              <div className="mt-5 flex justify-center">
                <ShimmerLine className="w-16 h-[2px] translate-x-1 opacity-100" />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <p className="text-xs text-cream/55 tracking-[0.28em] uppercase hidden md:block">
                Horizontal Slider
              </p>

              
            </div>

{fillingsHint && (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mt-4 mb-3 text-center"
  >
    <span className="inline-flex items-center gap-2 text-xs text-cream/65 border border-white/10 bg-black/30 px-4 py-2 rounded-full">
      ⇆ Drag/Swipe für mehr Füllungen
    </span>
  </motion.div>
)}
            <div className="relative mt-1">
  {/* Pfeil links */}
  <button
    type="button"
    onClick={() => scrollByCard(fillingsSliderRef.current, -1)}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/20 bg-black/50 text-cream hover:border-gold/50 transition flex items-center justify-center"
    aria-label="Zurück"
    title="Zurück"
  >
    ‹
  </button>

  {/* Pfeil rechts */}
  <button
    type="button"
    onClick={() => scrollByCard(fillingsSliderRef.current, 1)}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/20 bg-black/50 text-cream hover:border-gold/50 transition flex items-center justify-center"
    aria-label="Weiter"
    title="Weiter"
  >
    ›
  </button>

  {/* Slider (NUR HIER ref!) */}
  <div
    ref={fillingsSliderRef}
    onPointerDown={(e) => {
      dragFillings.onPointerDown(e);
      markUserInteracted();          // ✅ wichtig fürs Autoplay-Pause-System
      setFillingsHint(false);
      setFillingsDragging(true);
    }}
    onPointerMove={dragFillings.onPointerMove}
    onPointerUp={(e) => {
      dragFillings.onPointerUp(e);
      setFillingsDragging(false);
    }}
    onPointerCancel={(e) => {
      dragFillings.onPointerCancel(e);
      setFillingsDragging(false);
    }}
    onPointerLeave={(e) => {
      dragFillings.onPointerLeave(e);
      setFillingsDragging(false);
    }}
    onClickCapture={dragFillings.onClickCapture}
    className={`hide-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2 drag-scroll ${
      fillingsDragging ? "dragging" : ""
    }`}
    style={{ WebkitOverflowScrolling: "touch", touchAction: "auto" }}

  >
    {fillings.map((f) => (
      <motion.article
        key={f.title}
        data-card="true"
        className="snap-start shrink-0 w-[82vw] max-w-[420px] rounded-3xl overflow-hidden border border-white/10 bg-black/30"
      >
        {/* WICHTIG: hier muss dein Bild wirklich drin sein */}
        <img src={f.src} alt={f.title} className="w-full aspect-[9/16] object-cover" loading="lazy" />
        <div className="p-5">
          <p className="font-serif text-xl text-cream">{f.title}</p>
          <p className="mt-1 text-cream/70 text-sm">{f.note}</p>
        </div>
      </motion.article>
    ))}
  </div>
</div>

            <p className="mt-8 text-xs text-cream/55 text-center leading-relaxed">
              Hinweis: Kombinationen & Verfügbarkeit nach Saison, Design und gewünschter Optik.
            </p>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="py-24 md:py-40 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <SectionTitle kicker="Hinter den Kulissen" title="Videos" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {videos.map((v) => (
              <div key={v.src} className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden">
                <video
                  className="w-full aspect-[9/16] object-cover bg-black"
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="metadata"
                />
                <div className="p-5">
                  <Reveal as="p" className="text-cream/85 text-sm tracking-wide">
                    {v.title}
                  </Reveal>
                  <div className="mt-3 w-10">
                    <ShimmerLine className="h-[2px] translate-x-1 opacity-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
  <a
    href="https://www.instagram.com/koneva_sweet_art/"
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center gap-3
      px-10 py-5
      rounded-full
      bg-gold text-blackSoft
      font-medium tracking-wide
      shadow-[0_0_25px_rgba(201,162,77,0.35)]
      hover:shadow-[0_0_45px_rgba(201,162,77,0.6)]
      hover:scale-[1.03]
      transition-all duration-300
      relative overflow-hidden
    "
  >
    <span className="relative z-10">Mehr Videos auf Instagram</span>

    {/* Gold Shimmer Layer */}
    <span
      className="absolute inset-0 lux-shimmer"
      style={{
        background:
          "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0) 70%)",
        opacity: 0.35,
      }}
    />
  </a>
</div>

        </div>
      </section>

      {/* FAQ */}
      <section
  id="faq"
  className="faq-bg py-24 md:py-40 px-6 relative"
  style={{ backgroundImage: `url(${FAQ_BG})` }}
>


        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionTitle kicker="Fragen" title="FAQ" />

          <div className="grid gap-10">
            {faqGroups.map((group, gi) => (
              <div
                key={group.title}
                className="border border-white/10 bg-black/55 backdrop-blur rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="font-serif text-xl text-cream">{group.title}</h3>
                  <div className="flex-1 h-px bg-gold/30" />
                </div>

                <div className="grid gap-3">
                  {group.list.map((item, ii) => {
                    const globalIndex = faqIndexByQ.get(item.q);

                    const isOpen = openFaqIndex === globalIndex;
                    return (
                      <FaqItem
                        key={`${gi}-${ii}`}
                        item={item}
                        isOpen={isOpen}
                        onToggle={() => setOpenFaqIndex(isOpen ? null : globalIndex)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-40 px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <SectionTitle kicker="Kontakt" title="Kontaktformular" />

          {contactError && (
            <div className="mb-8 border border-white/10 bg-white/5 p-6 rounded-2xl">
              <p className="font-medium text-cream mb-2">Leider nicht gesendet</p>
              <p className="text-cream/75">{contactError}</p>
            </div>
          )}

          <form className="grid gap-6" onSubmit={handleContactSubmit}>
            <input type="hidden" name="formType" value="Kontakt" />
            <input type="hidden" name="_subject" value="Neue Kontaktanfrage – Koneva Sweet Art" />

            <div className="hidden" aria-hidden="true">
              <label>
                Bitte dieses Feld leer lassen:
                <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
              </label>
            </div>

            {/* ✅ Hinweis Pflichtfelder */}
            <p className="text-xs text-cream/60 leading-relaxed -mt-1">
              Felder mit einem <span className="text-gold">*</span> sind Pflichtfelder.
            </p>

            <input
              required
              name="name"
              placeholder="Name *"
              aria-label="Name (Pflichtfeld)"
              className="bg-transparent text-cream placeholder:text-cream/45 border-b border-cream/30 py-3 focus:outline-none focus:border-gold transition-colors"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="E-Mail *"
              aria-label="E-Mail (Pflichtfeld)"
              className="bg-transparent text-cream placeholder:text-cream/45 border-b border-cream/30 py-3 focus:outline-none focus:border-gold transition-colors"
            />
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Nachricht *"
              aria-label="Nachricht (Pflichtfeld)"
              className="bg-white/5 text-cream placeholder:text-cream/45 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-gold transition-colors leading-[1.9]"
            />

            
            <label className="flex items-start gap-3 text-xs text-cream/75 leading-relaxed">
              <input type="checkbox" name="privacy" value="accepted" required className="mt-1" />
              <span>
                Ich habe die{" "}
                <button
                  type="button"
                  className="underline underline-offset-4"
                  onClick={() => setLegalModal("datenschutz")}
                >
                  Datenschutzerklärung
                </button>{" "}
                gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung der Anfrage einverstanden{" "}
                <span className="text-gold">*</span>.
              </span>
            </label>

            <button
              type="submit"
              disabled={contactSending}
              className="mx-auto relative text-cream disabled:opacity-60"
            >
              <span className="after:block after:h-px after:bg-gold after:mt-2 after:translate-x-1">
                {contactSending ? "Sende..." : "Nachricht senden"}
              </span>
            </button>

            <div className="pt-2 text-center">
              <a
                href={mailtoContact}
                className="inline-block text-sm text-cream/85 hover:text-cream relative after:block after:h-px after:bg-gold after:mt-2 after:translate-x-1"
              >
                E-Mail direkt senden (Anhänge möglich)
              </a>
            </div>
          </form>

          <GoldDivider />
          <div id="datenschutz-anchor" className="sr-only" aria-hidden="true" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0E0E0E] text-cream pt-12 pb-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-7">
          <div className="flex flex-wrap items-center justify-center gap-4 text-cream/80">
            <IconLink href={INSTAGRAM_URL} label="Instagram">
              <IconInstagram className="text-cream" />
            </IconLink>
            <IconLink href={PINTEREST_URL} label="Pinterest">
              <IconPinterest className="text-cream" />
            </IconLink>
            <IconLink href={WHATSAPP_URL} label="WhatsApp">
              <IconWhatsApp className="text-cream" />
            </IconLink>
            <IconLink href={`mailto:${EMAIL_ADDRESS}`} label="E-Mail">
              <IconMail className="text-cream" />
            </IconLink>

            <IconLink href={GOOGLE_MAPS_URL} label="Adresse" title={ADDRESS_TEXT}>
              <IconPin className="text-cream" />
            </IconLink>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-cream/80">
            <button
              className="underline underline-offset-4 hover:text-cream transition"
              onClick={() => setLegalModal("impressum")}
              type="button"
            >
              Impressum
            </button>
            <button
              className="underline underline-offset-4 hover:text-cream transition"
              onClick={() => setLegalModal("datenschutz")}
              type="button"
            >
              Datenschutzerklärung
            </button>
            <button
              className="underline underline-offset-4 hover:text-cream transition"
              onClick={() => setLegalModal("agb")}
              type="button"
            >
              AGB
            </button>
            <button
              className="underline underline-offset-4 hover:text-cream transition"
              type="button"
              onClick={() => cookieOpenRef.current?.()}
            >
              Cookies
            </button>
          </div>

          <div className="text-center text-xs text-cream/55">© 2026 {brand} · Alle Rechte vorbehalten</div>
        </div>
      </footer>
</div>   

      {/* Modals */}
      <AnimatePresence>
        {legalModal === "impressum" && (
          <ModalShell title="Impressum" subtitle="Rechtliches" onClose={() => setLegalModal(null)}>
{`Angaben gemäß § 5 TMG

Koneva Sweet Art
Inhaberin: Jelena Koneva
Poststr. 9
75385 Bad Teinach
Deutschland

Telefon: +49(0)1773633727
E-Mail: koneva_sweet_art@yahoo.com

Umsatzsteuer-ID
Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
[USt-IdNr. eintragen, falls vorhanden]

Aufsichtsbehörde 
Handwerkskammer Karlsruhe
Friedrichspl. 4-5, 76133 Karlsruhe

Berufsbezeichnung
Konditorin (verliehen in der Bundesrepublik Deutschland)

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
Jelena Koneva
Poststr. 9
75385 Bad Teinach
Deutschland

Haftung für Inhalte

Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
Nach §§ 8 bis 10 TMG bin ich jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.

Haftung für Links

Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe.
Für diese fremden Inhalte wird daher keine Gewähr übernommen.

Urheberrecht

Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht.
Eine Vervielfältigung oder Verwendung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung.`}
          </ModalShell>
        )}

        {legalModal === "datenschutz" && (
          <ModalShell title="Datenschutzerklärung" subtitle="Rechtliches" onClose={() => setLegalModal(null)}>
{`1. Allgemeine Hinweise

Der Schutz Ihrer persönlichen Daten ist mir ein besonderes Anliegen.
Ich behandle Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

Diese Datenschutzerklärung informiert Sie darüber, welche personenbezogenen Daten auf dieser Website erhoben und verarbeitet werden.

2. Verantwortliche Stelle

Verantwortlich für die Datenverarbeitung auf dieser Website ist:

Koneva Sweet Art
Inhaberin: Jelena Koneva
Poststr. 9, 75385 Bad Teinach
Deutschland
E-Mail: koneva_sweet_art@yahoo.com

3. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck der Verwendung
a) Beim Besuch der Website

Beim Aufrufen dieser Website werden durch den Server automatisch Informationen erfasst. Diese sind:

IP-Adresse des anfragenden Geräts
Datum und Uhrzeit des Zugriffs
Name und URL der abgerufenen Datei
Website, von der aus der Zugriff erfolgt
verwendeter Browser und Betriebssystem

Diese Daten dienen der Gewährleistung eines reibungslosen Verbindungsaufbaus sowie der Systemsicherheit und werden nicht verwendet, um Rückschlüsse auf Ihre Person zu ziehen.

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO

b) Kontaktaufnahme

Wenn Sie mich per E-Mail oder Kontaktformular kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert.

Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO

4. Weitergabe von Daten

Eine Übermittlung Ihrer persönlichen Daten an Dritte findet nicht statt, außer:
Sie haben ausdrücklich eingewilligt
die Verarbeitung ist gesetzlich zulässig
sie ist zur Vertragsabwicklung erforderlich

5. Cookies

Diese Website kann Cookies verwenden. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.

Sie dienen dazu, das Angebot nutzerfreundlicher zu machen.
Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben.

6. Analyse-Tools und Tools von Drittanbietern

Sofern Analyse-Tools (z. B. Google Analytics) oder externe Dienste verwendet werden, erfolgt dies nur auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.

Derzeit werden keine Tracking-Tools ohne Einwilligung eingesetzt.
(Anpassen, falls du Tools nutzt.)

7. Ihre Rechte

Sie haben jederzeit das Recht auf:
Auskunft über Ihre gespeicherten Daten
Berichtigung unrichtiger Daten
Löschung Ihrer Daten
Einschränkung der Verarbeitung
Widerspruch gegen die Verarbeitung
Datenübertragbarkeit

Anfragen richten Sie bitte an die oben genannte verantwortliche Stelle.

8. Beschwerderecht

Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren.

9. Datensicherheit

Diese Website verwendet geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulation, Verlust oder unbefugten Zugriff zu schützen.

10. Aktualität und Änderung dieser Datenschutzerklärung

Diese Datenschutzerklärung ist aktuell gültig und hat den Stand: [Datum einfügen].

Ich behalte mir vor, diese Datenschutzerklärung bei Bedarf anzupassen.`}
          </ModalShell>
        )}

        {legalModal === "agb" && (
          <ModalShell title="AGB" subtitle="Rechtliches" onClose={() => setLegalModal(null)}>
{`1. Individuelle Anfertigung
Alle Produkte von Koneva Sweet Art sind individuell angefertigte Unikate. Handwerksbedingte Abweichungen (z. B. Farben, Details) sind möglich und stellen keinen Mangel dar.

2. Angebot & Vertrag
Ein Vertrag kommt erst mit schriftlicher Bestätigung (z. B. per E-Mail) zustande.

3. Änderungen
Änderungen am Design, an der Größe oder an sonstigen Details sind nur bis zu einem bestimmten Zeitpunkt vor dem Event möglich
und müssen schriftlich abgestimmt werden. Spätere Änderungen können – je nach Aufwand – zu einer Preisanpassung führen oder ggf. nicht mehr umgesetzt werden.

4. Stornierung
Bei einer Stornierung der Bestellung wird die geleistete Anzahlung nicht zurückerstattet, da diese zur Reservierung des Termins sowie für die Planungs- und Vorbereitungszeit dient. Erfolgt die Stornierung kurzfristig, behalte ich mir vor, weitere bereits entstandene Kosten in Rechnung zu stellen.

5. Haftung & Übergabe
Mit der Übergabe der Torte an die Kund:innen geht die Verantwortung für den weiteren Umgang mit der Torte über.
Für Schäden, die nach der Übergabe durch unsachgemäßen Transport, Lagerung oder äußere Einflüsse entstehen,
übernehme ich keine Haftung.

6. Lieferung
Eine Lieferung erfolgt nach individueller Absprache. Für Schäden, die durch Dritte oder ungeeignete Gegebenheiten
am Lieferort entstehen, wird keine Haftung übernommen.

7. Abholung
Bei Abholung liegt die Verantwortung für einen sicheren Transport vollständig bei den Kund:innen.
Ich empfehle einen ebenen Untergrund sowie eine klimatisierte Transportumgebung.

8. Höhere Gewalt
Sollte die Umsetzung der Bestellung durch unvorhersehbare Ereignisse (z. B. Krankheit, technische Ausfälle, höhere Gewalt)
nicht möglich sein, bemühe ich mich um eine schnellstmögliche Information und eine faire Lösung.

9. Anwendbares Recht
Es gilt deutsches Recht.

10. Geltungsbereich
Mit der Buchung einer Torte werden diese Bedingungen anerkannt.`}
          </ModalShell>
        )}

        {successModal && (
          <ModalShell
            title="Danke!"
            subtitle={successModal === "order" ? "Bestellung / Anfrage" : "Kontakt"}
            onClose={closeSuccessModal}
            footer={
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={backToSection}
                  className="px-5 py-3 rounded-full bg-gold text-blackSoft text-sm tracking-wide font-medium"
                >
                  Zurück zur Seite
                </button>

                <ExternalLink
                  href={successModal === "order" ? WHATSAPP_URL : INSTAGRAM_URL}
                  className="px-5 py-3 rounded-full border border-white/10 text-cream text-sm tracking-wide text-center hover:border-gold/40 transition"
                >
                  {successModal === "order" ? "WhatsApp öffnen" : "Instagram öffnen"}
                </ExternalLink>

                <button
                  type="button"
                  onClick={closeSuccessModal}
                  className="px-5 py-3 rounded-full border border-white/10 text-cream text-sm tracking-wide hover:border-gold/40 transition"
                >
                  Schließen
                </button>
              </div>
            }
          >
            <div className="space-y-6">
              <p>
                {successModal === "order"
                  ? "Deine Bestellung/Anfrage wurde erfolgreich gesendet. Ich melde mich so schnell wie möglich zurück."
                  : "Deine Nachricht wurde erfolgreich gesendet. Ich melde mich so schnell wie möglich zurück."}
              </p>

              <div className="w-20">
                <ShimmerLine className="h-[2px] translate-x-1 opacity-100" />
              </div>

              <p className="text-sm text-cream/70 leading-[1.9]">
                Tipp: Referenzen/Inspirationen kannst du mir gerne per Instagram oder WhatsApp schicken.
              </p>
            </div>
          </ModalShell>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      {lightboxOpen && filtered.length > 0 && (
        <div
  className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-6"
  onClick={() => setLightboxOpen(false)}
  role="dialog"
  aria-modal="true"
  aria-label="Galerie Vorschau"
>

        
          <div className="relative max-w-5xl w-full cursor-grab" onClick={(e) => e.stopPropagation()}>

            <button
              className="absolute -top-10 right-0 text-cream text-2xl"
              onClick={() => setLightboxOpen(false)}
              aria-label="Schließen"
              type="button"
            >
              ×
            </button>

            <motion.div
            
  className="w-full"
  drag={zoomScale > 1 ? false : "x"}
  dragConstraints={{ left: 0, right: 0 }}
  dragElastic={0.12}
  dragMomentum={false}
  onDragEnd={(e, info) => {
    const swipe = info.offset.x;
    const threshold = 90; // wie “weit” man ziehen muss

    if (swipe > threshold) {
      prev();
    } else if (swipe < -threshold) {
      next();
    }
  }}
  whileTap={{ cursor: "grabbing" }}
  style={{ touchAction: "pan-y" }} // wichtig: vertikal scrollen ok, horizontal drag für swipe
>
  <motion.div
  key={filtered[lightboxIndex]?.src} // sorgt weiterhin für Reset beim Wechsel
  initial={{ opacity: 0, scale: 0.985 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.99 }}
  transition={{ duration: 0.2 }}
  className="w-full"
>
  <LightboxZoom

    src={filtered[lightboxIndex]?.src}
    alt={filtered[lightboxIndex]?.alt || "Galerie"}
    onPrev={prev}
    onNext={next}
onZoomChange={setZoomScale}
  />
</motion.div>
</motion.div> 



            <div className="flex justify-between mt-6 text-cream">
              <button
                onClick={prev}
                type="button"
                className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-10 after:bg-gold after:translate-x-1"
              >
                Zurück
              </button>
              <button
                onClick={next}
                type="button"
                className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-10 after:bg-gold after:translate-x-1"
              >
                Weiter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



