import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { BRAND } from "../data/data.js";

/* ---------------- hooks ---------------- */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

export function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const f = () => setW(window.innerWidth);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return w;
}

export function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor((diff / 36e5) % 24),
    m: Math.floor((diff / 6e4) % 60),
    s: Math.floor((diff / 1e3) % 60),
    done: diff === 0,
  };
}

/* ---------------- primitives ---------------- */
export const Reveal = ({ children, delay = 0, className = "", from = "up", as: Tag = "div" }) => {
  const [ref, seen] = useInView();
  return (
    <Tag ref={ref} className={`reveal reveal-${from} ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
};

export const Counter = ({ to, suffix = "", dur = 1800 }) => {
  const [ref, seen] = useInView(0.4);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return undefined;
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, dur]);
  return <span ref={ref}>{v.toLocaleString("en-IN")}{suffix}</span>;
};

/* 3D tilt on mouse move */
export const Tilt = ({ children, className = "", max = 9, glare = true, as: Tag = "div", ...rest }) => {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100).toFixed(0)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(0)}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <Tag ref={ref} className={`tilt ${glare ? "tilt-glare" : ""} ${className}`} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  );
};

export const SectionHead = ({ a, b, sub, light, eyebrow = BRAND, left }) => (
  <Reveal className={`sec-head ${left ? "left" : ""} ${light ? "light" : ""}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{a} <em>{b}</em></h2>
    <div className="divider"><i /><b /><i /></div>
    {sub && <p>{sub}</p>}
  </Reveal>
);

export const Img = ({ src, alt = "", className = "", style }) => {
  const [bad, setBad] = useState(false);
  if (bad) return <div className={`img-fallback ${className}`} style={style}><Icon n="mountain" s={34} /></div>;
  return <img src={src} alt={alt} loading="lazy" className={className} style={style} onError={() => setBad(true)} />;
};

export const Stars = ({ n = 5, s = 15 }) => (
  <span className="stars">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} n="star" s={s} fill className={i < n ? "on" : "off"} />)}</span>
);

export const Breadcrumb = ({ items }) => (
  <nav className="crumbs" aria-label="Breadcrumb">
    <Link to="/">Home</Link>
    {items.map((it, i) => (
      <React.Fragment key={i}>
        <Icon n="chevR" s={14} />
        {it.to ? <Link to={it.to}>{it.t}</Link> : <span>{it.t}</span>}
      </React.Fragment>
    ))}
  </nav>
);

export const PageBanner = ({ title, sub, crumbs = [], img }) => (
  <section className="banner">
    <div className="banner-bg" style={img ? { backgroundImage: `url(${img})` } : undefined} />
    <div className="banner-ov" />
    <div className="blob b1" /><div className="blob b2" />
    <div className="container banner-in">
      <Breadcrumb items={crumbs} />
      <h1 className="fade-up">{title}</h1>
      {sub && <p className="fade-up d1">{sub}</p>}
    </div>
    <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C240,90 480,0 720,30 C960,60 1200,90 1440,30 L1440,80 L0,80 Z" /></svg>
  </section>
);

export const Accordion = ({ items, first = 0 }) => {
  const [open, setOpen] = useState(first);
  return (
    <div className="acc">
      {items.map(([q, a], i) => (
        <div key={i} className={`acc-item ${open === i ? "open" : ""}`}>
          <button className="acc-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{q}</span>
            <span className="acc-ico"><Icon n={open === i ? "minus" : "plus"} s={16} /></span>
          </button>
          <div className="acc-a" style={{ maxHeight: open === i ? 400 : 0 }}><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
};

/* ---------------- generic slider (autoplay, drag, dots, arrows, timer bar) ---------------- */
export function Slider({ items, render, per = 3, gap = 24, autoplay = 4500, dots = true, arrows = true, className = "" }) {
  const w = useWidth();
  const pv = w < 640 ? 1 : w < 1024 ? Math.min(2, per) : per;
  const max = Math.max(0, items.length - pv);
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef(null);
  const idx = Math.min(i, max);
  const go = useCallback((n) => setI(n > max ? 0 : n < 0 ? max : n), [max]);

  useEffect(() => {
    if (!autoplay || hover || max === 0) return undefined;
    const t = setTimeout(() => go(idx + 1), autoplay);
    return () => clearTimeout(t);
  }, [idx, autoplay, hover, max, go]);

  const down = (e) => { start.current = e.clientX; };
  const move = (e) => { if (start.current !== null) setDrag(e.clientX - start.current); };
  const up = () => {
    if (start.current === null) return;
    if (drag < -60) go(idx + 1); else if (drag > 60) go(idx - 1);
    start.current = null; setDrag(0);
  };

  const pct = 100 / pv;
  const off = `calc(${-idx * pct}% - ${idx * gap / pv}px + ${drag}px)`;
  return (
    <div className={`slider ${className}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); up(); }}>
      <div className="slider-view" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <div className="slider-track" style={{ gap, transform: `translateX(${off})`, transition: drag ? "none" : undefined }}>
          {items.map((it, k) => (
            <div key={k} className="slider-slide" style={{ flex: `0 0 calc(${pct}% - ${gap * (pv - 1) / pv}px)` }}>{render(it, k)}</div>
          ))}
        </div>
      </div>
      {arrows && max > 0 && (
        <>
          <button className="sl-btn prev" onClick={() => go(idx - 1)} aria-label="Previous"><Icon n="chevL" s={22} /></button>
          <button className="sl-btn next" onClick={() => go(idx + 1)} aria-label="Next"><Icon n="chevR" s={22} /></button>
        </>
      )}
      {dots && max > 0 && (
        <div className="sl-dots">
          {Array.from({ length: max + 1 }).map((_, k) => (
            <button key={k} className={k === idx ? "on" : ""} onClick={() => go(k)} aria-label={`Slide ${k + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
