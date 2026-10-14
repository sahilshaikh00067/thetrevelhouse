import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { Img, Tilt } from "./ui.jsx";
import { useModals } from "./modals.jsx";
import { inr } from "../data/data.js";

export default function PackageCard({ p }) {
  const { quick, enquire } = useModals();
  return (
    <Tilt className="pcard" max={7}>
      <div className="pcard-img">
        <Link to={`/tour-packages/${p.slug}`} aria-label={p.name}><Img src={p.img} alt={p.name} /></Link>
        <div className="pcard-badges">
          <span className="chip gold">{p.dur}</span>
          {p.popular && <span className="chip hot"><Icon n="zap" s={12} fill /> Popular</span>}
        </div>
        <button className="pcard-eye" onClick={() => quick(p)} aria-label="Quick view"><Icon n="eye" s={18} /></button>
        <span className="pcard-region">{p.region}</span>
      </div>
      <div className="pcard-body">
        <h3><Link to={`/tour-packages/${p.slug}`}>{p.name}</Link></h3>
        <p className="pcard-loc"><Icon n="pin" s={14} /> <span className="line-2">{p.dest}</span></p>
        <div className="pcard-tags">
          {p.acts.slice(0, 2).map((a) => <span key={a}>{a}</span>)}
        </div>
        <div className="pcard-foot">
          <div>
            <small>Starts from</small>
            <b className={p.price ? "price" : "price req"}>{inr(p.price)}</b>
            {p.price > 0 && <small> /person</small>}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => enquire(p.title)}>Book Now</button>
        </div>
      </div>
    </Tilt>
  );
}
