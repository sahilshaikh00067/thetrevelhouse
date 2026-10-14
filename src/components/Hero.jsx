import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { HERO, PHONE, waLink } from "../data/data.js";

const DUR = 6500;

export default function Hero() {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const box = useRef(null);
  const n = HERO.length;

  useEffect(() => {
    if (pause) return undefined;
    const t = setTimeout(() => setI((x) => (x + 1) % n), DUR);
    return () => clearTimeout(t);
  }, [i, pause, n]);

  const onMove = (e) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <section className="hero" ref={box} onPointerMove={onMove} onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      {HERO.map((s, k) => (
        <div key={k} className={`hero-slide ${k === i ? "on" : ""}`}>
          <div className="hero-img" style={{ backgroundImage: `url(${s.img})` }} />
        </div>
      ))}
      <div className="hero-ov" />
      <div className="hero-dots-bg" />

      <div className="container hero-in">
        <div className="hero-copy" key={i}>
          <span className="hero-tag"><i /> {HERO[i].tag}</span>
          <h1>
            <span className="ln"><span>{HERO[i].title[0]}</span></span>
            <span className="ln"><span className="grad">{HERO[i].title[1]}</span></span>
          </h1>
          <p>{HERO[i].sub}</p>
          <div className="hero-btns">
            <Link to={HERO[i].cta[1]} className="btn btn-primary btn-lg shine">{HERO[i].cta[0]} <Icon n="arrow" s={18} /></Link>
            <a href={waLink("Hello, I want to plan a trip.")} target="_blank" rel="noreferrer" className="btn btn-glass btn-lg"><Icon n="whatsapp" s={20} /> Chat With Expert</a>
          </div>
          <div className="hero-trust">
            <div><b>5000+</b><span>Happy Travellers</span></div>
            <div><b>75+</b><span>Tour Packages</span></div>
            <div><b>24x7</b><span>Support</span></div>
          </div>
        </div>

        <div className="hero-float">
          <div className="hf-card c1 glass"><span className="hf-ico"><Icon n="plane" s={20} /></span><div><b>Flights & Visa</b><small>Best fares guaranteed</small></div></div>
          <div className="hf-card c2 glass"><span className="hf-ico"><Icon n="award" s={20} /></span><div><b>Trusted Agency</b><small>Verified & trusted service</small></div></div>
          <div className="hf-card c3 glass"><span className="hf-ico"><Icon n="phone" s={20} /></span><div><b>+91 {PHONE}</b><small>Call anytime</small></div></div>
          <div className="hf-ring" />
        </div>
      </div>

      <div className="hero-ctrl">
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous"><Icon n="chevL" s={22} /></button>
        <div className="hero-nums">
          {HERO.map((_, k) => (
            <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}>
              <span>0{k + 1}</span>
              <i>{k === i && <b key={i + (pause ? "p" : "r")} style={{ animationDuration: `${DUR}ms`, animationPlayState: pause ? "paused" : "running" }} />}</i>
            </button>
          ))}
        </div>
        <button onClick={() => setI((i + 1) % n)} aria-label="Next"><Icon n="chevR" s={22} /></button>
      </div>
      <div className="scroll-hint"><span /></div>
    </section>
  );
}
