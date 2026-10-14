import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { Img } from "./ui.jsx";
import EnquiryForm from "./EnquiryForm.jsx";
import { inr, waLink, PHONE } from "../data/data.js";

const Ctx = createContext(null);
export const useModals = () => useContext(Ctx);

function Lightbox({ items, index, onClose }) {
  const [i, setI] = useState(index);
  const n = items.length;
  const prev = useCallback(() => setI((x) => (x - 1 + n) % n), [n]);
  const next = useCallback(() => setI((x) => (x + 1) % n), [n]);
  useEffect(() => {
    const k = (e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [prev, next]);
  const it = items[i];
  return (
    <div className="lb" onClick={onClose}>
      <button className="lb-x" onClick={onClose} aria-label="Close"><Icon n="x" s={24} /></button>
      <button className="lb-nav l" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"><Icon n="chevL" s={28} /></button>
      <figure onClick={(e) => e.stopPropagation()} key={i}>
        <img src={it.src} alt={it.t} />
        <figcaption>
          <b>{it.t}</b>
          <span>{i + 1} / {n}</span>
        </figcaption>
      </figure>
      <button className="lb-nav r" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><Icon n="chevR" s={28} /></button>
    </div>
  );
}

function QuickView({ pkg, onClose, onEnquire }) {
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal quick" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-x" onClick={onClose} aria-label="Close"><Icon n="x" s={20} /></button>
        <div className="quick-img">
          <Img src={pkg.img} alt={pkg.name} />
          <span className="chip gold">{pkg.dur}</span>
        </div>
        <div className="quick-body">
          <span className="eyebrow">{pkg.region}</span>
          <h3>{pkg.name}</h3>
          <p className="muted"><Icon n="pin" s={15} /> {pkg.dest}</p>
          <div className="quick-grid">
            <div><small>Duration</small><b>{pkg.dur}</b></div>
            <div><small>Starting from</small><b className="price">{inr(pkg.price)}</b></div>
            <div><small>Activities</small><b>{pkg.acts.join(", ") || "Sightseeing"}</b></div>
            <div><small>Themes</small><b>{pkg.themes.join(", ") || "Leisure"}</b></div>
          </div>
          <div className="quick-act">
            <Link to={`/tour-packages/${pkg.slug}`} className="btn btn-primary" onClick={onClose}>View Full Details <Icon n="arrow" s={16} /></Link>
            <button className="btn btn-ghost" onClick={() => onEnquire(pkg.title)}>Book / Enquire</button>
            <a className="btn btn-wa" href={waLink(`Hi, I am interested in "${pkg.title}". Please share details.`)} target="_blank" rel="noreferrer"><Icon n="whatsapp" s={18} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalProvider({ children }) {
  const [m, setM] = useState(null);
  const close = useCallback(() => setM(null), []);
  const api = useMemo(() => ({
    enquire: (pkg = "", note = "") => setM({ type: "enquiry", pkg, note }),
    quick: (pkg) => setM({ type: "quick", pkg }),
    lightbox: (items, index = 0) => setM({ type: "lightbox", items, index }),
    close,
  }), [close]);

  useEffect(() => {
    document.body.style.overflow = m ? "hidden" : "";
    const k = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [m, close]);

  return (
    <Ctx.Provider value={api}>
      {children}
      {m && m.type === "lightbox" && <Lightbox items={m.items} index={m.index} onClose={close} />}
      {m && m.type === "quick" && <QuickView pkg={m.pkg} onClose={close} onEnquire={(t) => setM({ type: "enquiry", pkg: t, note: "" })} />}
      {m && m.type === "enquiry" && (
        <div className="modal-back" onClick={close}>
          <div className="modal enq" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-x" onClick={close} aria-label="Close"><Icon n="x" s={20} /></button>
            <div className="enq-side">
              <img src="/logo-mark.png" alt="" className="enq-logo" />
              <h3>{m.note || "Plan Your Dream Trip"}</h3>
              <p>Share your details and our travel expert will send a customised quote on WhatsApp within minutes.</p>
              <ul>
                <li><Icon n="check" s={16} /> Best price guarantee</li>
                <li><Icon n="check" s={16} /> 100% customisable itinerary</li>
                <li><Icon n="check" s={16} /> 24x7 trip support</li>
              </ul>
              <a href={`tel:+91${PHONE}`} className="enq-call"><Icon n="phone" s={18} /> +91 {PHONE}</a>
            </div>
            <div className="enq-form"><EnquiryForm pkg={m.pkg} compact /></div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
