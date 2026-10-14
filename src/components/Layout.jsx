import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { useModals } from "./modals.jsx";
import { NAV, SERVICES, DESTS, THEMES, ACTIVITIES, BRAND, PHONE, EMAIL, ADDRESS, HOURS, waLink } from "../data/data.js";

/* ---------- preloader ---------- */
export function Preloader() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setHide(true), 1500);
    const b = setTimeout(() => setGone(true), 2100);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (gone) return null;
  return (
    <div className={`preloader ${hide ? "hide" : ""}`}>
      <div className="pl-orbit"><span /><span /><span /></div>
      <img src="/logo.jpg" alt={BRAND} className="pl-logo" />
      <div className="pl-bar"><i /></div>
    </div>
  );
}

/* ---------- scroll progress + cursor glow ---------- */
export function ScrollFx() {
  const bar = useRef(null);
  const glow = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onMove = (e) => {
      if (glow.current) glow.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onMove); };
  }, []);
  return (
    <>
      <div className="progress"><i ref={bar} /></div>
      <div className="cursor-glow" ref={glow} />
    </>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" }); }, [pathname]);
  return null;
}

/* ---------- top bar ---------- */
export function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-in">
        <div className="tb-l">
          <a href={`tel:+91${PHONE}`}><Icon n="phone" s={14} /> +91 {PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="hide-sm"><Icon n="mail" s={14} /> {EMAIL}</a>
          <span className="hide-md"><Icon n="clock" s={14} /> {HOURS}</span>
        </div>
        <div className="tb-r">
          <span className="tb-offer"><Icon n="gift" s={14} /> Flat savings on Goa, Andaman & Dubai packages!</span>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon n="facebook" s={15} /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon n="instagram" s={15} /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Icon n="youtube" s={15} /></a>
        </div>
      </div>
    </div>
  );
}

/* ---------- header ---------- */
const MegaCol = ({ title, items, base }) => (
  <div className="mega-col">
    <h6>{title}</h6>
    {items.map((it) => <Link key={it.slug} to={`/tours/${base}/${it.slug}`}>{it.t.replace(/ Tours$/, "")}</Link>)}
  </div>
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [acc, setAcc] = useState("");
  const { enquire } = useModals();
  const { pathname } = useLocation();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-in">
        <Link to="/" className="brand" aria-label={BRAND}>
          <img src="/logo-mark.png" alt="" />
          <span><b>The Travel</b><em>House</em></span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <div key={n.t} className={`nav-item ${n.sub || n.mega ? "has-dd" : ""} ${n.mega ? "has-mega" : ""}`}>
              <NavLink to={n.to} end={n.to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
                {n.t}{(n.sub || n.mega) && <Icon n="chevD" s={14} />}
              </NavLink>
              {n.sub && (
                <div className="dd">
                  {n.sub.map((s) => <Link key={s.to} to={s.to}>{s.t}</Link>)}
                </div>
              )}
              {n.mega && (
                <div className="mega">
                  <MegaCol title="By Destination" items={DESTS.slice(0, 8)} base="destination" />
                  <MegaCol title="By Theme" items={THEMES} base="theme" />
                  <MegaCol title="By Activity" items={ACTIVITIES.slice(0, 8)} base="activity" />
                  <div className="mega-promo">
                    <img src={DESTS[1].img} alt="" />
                    <div><b>Andaman Escapes</b><span>Island hopping from ₹15,500</span><Link to="/tour-packages">View all 75+ packages →</Link></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="header-cta">
          <a href={`tel:+91${PHONE}`} className="hc-call"><span><Icon n="phone" s={18} /></span><div><small>Call Us 24x7</small><b>+91 {PHONE}</b></div></a>
          <button className="btn btn-primary btn-sm shine" onClick={() => enquire("", "Get a Free Quote")}>Get Quote</button>
          <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu"><Icon n="menu" s={26} /></button>
        </div>
      </div>
    </header>

      <div className={`drawer-back ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "show" : ""}`}>
        <div className="drawer-top">
          <img src="/logo.jpg" alt={BRAND} />
          <button onClick={() => setOpen(false)} aria-label="Close menu"><Icon n="x" s={24} /></button>
        </div>
        <div className="drawer-links">
          {NAV.map((n) => (
            <div key={n.t}>
              {n.sub ? (
                <>
                  <button className="dl-row" onClick={() => setAcc(acc === n.t ? "" : n.t)}>{n.t}<Icon n="chevD" s={18} style={{ transform: acc === n.t ? "rotate(180deg)" : "none", transition: ".3s" }} /></button>
                  <div className="dl-sub" style={{ maxHeight: acc === n.t ? 500 : 0 }}>
                    <Link to={n.to}>All Services</Link>
                    {n.sub.map((s) => <Link key={s.to} to={s.to}>{s.t}</Link>)}
                  </div>
                </>
              ) : n.mega ? (
                <>
                  <button className="dl-row" onClick={() => setAcc(acc === n.t ? "" : n.t)}>{n.t}<Icon n="chevD" s={18} style={{ transform: acc === n.t ? "rotate(180deg)" : "none", transition: ".3s" }} /></button>
                  <div className="dl-sub" style={{ maxHeight: acc === n.t ? 500 : 0 }}>
                    <Link to="/tour-packages">All Packages</Link>
                    <Link to="/tours/destination">By Destination</Link>
                    <Link to="/tours/theme">By Theme</Link>
                    <Link to="/tours/activity">By Activity</Link>
                  </div>
                </>
              ) : (
                <Link className="dl-row" to={n.to}>{n.t}</Link>
              )}
            </div>
          ))}
        </div>
        <div className="drawer-foot">
          <a href={`tel:+91${PHONE}`} className="btn btn-primary btn-block"><Icon n="phone" s={18} /> Call +91 {PHONE}</a>
          <a href={waLink("Hello, I want to plan a trip.")} target="_blank" rel="noreferrer" className="btn btn-wa btn-block"><Icon n="whatsapp" s={18} /> WhatsApp Us</a>
        </div>
      </aside>
    </>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const sub = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) return;
    window.open(waLink(`Please add ${email} to your travel offers list.`), "_blank", "noopener");
    setOk(true);
  };
  return (
    <footer className="footer">
      <svg className="foot-wave" viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C240,0 480,80 720,40 C960,0 1200,70 1440,30 L1440,0 L0,0 Z" /></svg>
      <div className="container">
        <div className="foot-news">
          <div><h3>Get Exclusive Travel Deals</h3><p>Join our list for early-bird offers, festival packages and last-minute deals.</p></div>
          {ok ? <div className="news-ok"><Icon n="check" s={18} /> Subscribed — check WhatsApp!</div> : (
            <form onSubmit={sub}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email" />
              <button className="btn btn-primary shine" type="submit">Subscribe</button>
            </form>
          )}
        </div>
        <div className="foot-grid">
          <div>
            <img src="/logo.jpg" alt={BRAND} className="foot-logo" />
            <p className="foot-about">{BRAND} is a premium tour & travel company in Varanasi — curating holidays, cabs, flights, visas & events with a personal touch.</p>
            <div className="foot-soc">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon n="facebook" s={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon n="instagram" s={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Icon n="youtube" s={18} /></a>
              <a href={waLink("Hello")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon n="whatsapp" s={18} /></a>
            </div>
          </div>
          <div>
            <h5>Quick Links</h5>
            {NAV.map((n) => <Link key={n.t} to={n.to}>{n.t}</Link>)}
          </div>
          <div>
            <h5>Our Services</h5>
            {SERVICES.map((s) => <Link key={s.slug} to={`/services/${s.slug}`}>{s.t}</Link>)}
          </div>
          <div>
            <h5>Popular Tours</h5>
            {DESTS.slice(0, 7).map((d) => <Link key={d.slug} to={`/tours/destination/${d.slug}`}>{d.t}</Link>)}
          </div>
          <div>
            <h5>Contact</h5>
            <p className="fc"><Icon n="pin" s={16} /><span>{ADDRESS}</span></p>
            <p className="fc"><Icon n="phone" s={16} /><a href={`tel:+91${PHONE}`}>+91 {PHONE}</a></p>
            <p className="fc"><Icon n="mail" s={16} /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            <p className="fc"><Icon n="clock" s={16} /><span>{HOURS}</span></p>
          </div>
        </div>
        <div className="foot-bot">
          <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
          <span>Crafted with <Icon n="heart" s={13} fill style={{ color: "#ff8a1f", verticalAlign: "-2px" }} /> in Varanasi</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- floating buttons ---------- */
export function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <div className="float-l">
        <a href={`tel:+91${PHONE}`} className="fl call" aria-label="Call"><Icon n="phone" s={22} /></a>
      </div>
      <div className="float-r">
        <button className={`fl top ${show ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><Icon n="up" s={22} /></button>
        <a href={waLink("Hello, I want to plan a trip.")} target="_blank" rel="noreferrer" className="fl wa" aria-label="WhatsApp"><Icon n="whatsapp" s={26} /></a>
      </div>
    </>
  );
}

/* ---------- auto offer popup ---------- */
export function OfferPopup() {
  const { enquire } = useModals();
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("th_popup") === "1"; } catch (e) { seen = false; }
    if (seen) return undefined;
    const t = setTimeout(() => {
      enquire("", "Special Offer: Get a Free Custom Quote");
      try { sessionStorage.setItem("th_popup", "1"); } catch (e) { /* ignore */ }
    }, 14000);
    return () => clearTimeout(t);
  }, [enquire]);
  return null;
}