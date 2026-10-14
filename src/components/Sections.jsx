import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { Reveal, SectionHead, Tilt, Img, Stars, Slider, Counter } from "./ui.jsx";
import { useModals } from "./modals.jsx";
import { FLEET, WHY, STEPS, REVIEWS, STATS, FAQS, PHONE, waLink, SERVICES } from "../data/data.js";

export const ReviewCard = ({ r }) => (
  <Tilt className="rcard" max={5}>
    <Icon n="quote" s={46} className="rq" />
    <Stars n={r.r} />
    <p>{r.t}</p>
    <div className="rc-by">
      <span className="avatar">{r.n.charAt(0)}</span>
      <div><b>{r.n}</b><small>{r.loc}</small></div>
    </div>
  </Tilt>
);

export const Reviews = ({ dark }) => (
  <section className={`sec ${dark ? "sec-dark" : "sec-soft"}`}>
    <div className="container">
      <SectionHead a="What Our" b="Travellers Say" light={dark} sub="Real stories from families, couples and groups who travelled with us." />
      <Slider items={REVIEWS} render={(r) => <ReviewCard r={r} />} per={3} autoplay={5000} />
    </div>
  </section>
);

export const WhyUs = () => (
  <section className="sec">
    <div className="container">
      <SectionHead a="Why Choose" b="The Travel House" sub="We combine local expertise with premium service so every journey feels effortless." />
      <div className="grid g3">
        {WHY.map((w, i) => (
          <Reveal key={w.t} delay={i * 80}>
            <Tilt className="why">
              <div className="why-ico"><Icon n={w.icon} s={28} /></div>
              <h4>{w.t}</h4>
              <p>{w.d}</p>
              <span className="why-n">0{i + 1}</span>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Steps = () => (
  <section className="sec sec-soft">
    <div className="container">
      <SectionHead a="How It" b="Works" sub="Four simple steps from dreaming to departing." />
      <div className="steps">
        {STEPS.map((s, i) => (
          <Reveal key={s.t} delay={i * 120} className="step">
            <div className="step-ico"><Icon n={s.icon} s={30} /><em>{i + 1}</em></div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Stats = ({ dark }) => (
  <div className={`stats ${dark ? "dark" : ""}`}>
    {STATS.map((s) => (
      <div key={s.l} className="stat"><b><Counter to={s.n} suffix={s.s} /></b><span>{s.l}</span></div>
    ))}
  </div>
);

export const Fleet = () => {
  const { enquire } = useModals();
  return (
    <section className="sec sec-dark">
      <div className="container">
        <SectionHead a="Our Premium" b="Car & Coach Fleet" light sub="Clean, comfortable and driver-verified vehicles for airport transfers, outstation trips and group tours." />
        <Slider items={FLEET} per={3} autoplay={4200} render={(f) => (
          <Tilt className="fleet">
            <div className="fleet-ico"><Icon n={f.icon} s={34} /></div>
            <h4>{f.n}</h4>
            <p className="muted-l">{f.ex}</p>
            <div className="fleet-meta">
              <span><Icon n="users" s={15} /> {f.seats} seats</span>
              <span><Icon n="wallet" s={15} /> {f.bag}</span>
            </div>
            <div className="fleet-rate">{f.rate}</div>
            <button className="btn btn-primary btn-sm btn-block" onClick={() => enquire("", `Book a ${f.n}`)}>Book This Vehicle</button>
          </Tilt>
        )} />
      </div>
    </section>
  );
};

export const ServicesGrid = ({ limit }) => (
  <div className="grid g3">
    {SERVICES.slice(0, limit || SERVICES.length).map((s, i) => (
      <Reveal key={s.slug} delay={i * 70}>
        <Tilt className="scard">
          <div className="scard-img"><Img src={s.pic} alt={s.t} /><span className="scard-ico"><Icon n={s.icon} s={24} /></span></div>
          <div className="scard-body">
            <h4>{s.t}</h4>
            <p>{s.d}</p>
            <Link to={`/services/${s.slug}`} className="link-arrow">Learn more <Icon n="arrow" s={16} /></Link>
          </div>
        </Tilt>
      </Reveal>
    ))}
  </div>
);

export const CtaBand = ({ title = "Ready For Your Next Adventure?", sub = "Talk to our travel experts and get a free customised quote in minutes." }) => {
  const { enquire } = useModals();
  return (
    <section className="cta">
      <div className="cta-bg" />
      <div className="container cta-in">
        <Reveal>
          <h2>{title}</h2>
          <p>{sub}</p>
        </Reveal>
        <Reveal delay={150} className="cta-btns">
          <button className="btn btn-primary btn-lg shine" onClick={() => enquire("", "Get Your Free Quote")}>Get Free Quote <Icon n="arrow" s={18} /></button>
          <a className="btn btn-glass btn-lg" href={`tel:+91${PHONE}`}><Icon n="phone" s={18} /> +91 {PHONE}</a>
          <a className="btn btn-wa btn-lg" href={waLink("Hello, I want to plan a trip.")} target="_blank" rel="noreferrer"><Icon n="whatsapp" s={20} /> WhatsApp</a>
        </Reveal>
      </div>
    </section>
  );
};

export const MarqueeStrip = () => {
  const items = ["Tour Packages", "Car & Coach Rental", "Flight Booking", "Passport & Visa", "Travel Insurance", "Hotel Booking", "Event Management", "Honeymoon Trips", "Pilgrimage Tours"];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => <span key={i}><Icon n="star" s={14} fill /> {t}</span>)}
      </div>
    </div>
  );
};

export { FAQS };
