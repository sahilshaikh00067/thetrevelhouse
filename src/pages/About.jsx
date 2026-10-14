import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon.jsx";
import { PageBanner, Reveal, SectionHead, Tilt, Img } from "../components/ui.jsx";
import { Stats, WhyUs, Steps, Reviews, CtaBand } from "../components/Sections.jsx";
import { BRAND, DESTS, PACKAGES, CDN } from "../data/data.js";

const VALUES = [
  { t: "Our Mission", d: "To make world-class travel simple, affordable and personal for every family in Uttar Pradesh and beyond.", icon: "route" },
  { t: "Our Vision", d: "To become the most trusted travel brand of Purvanchal — known for honesty, care and unforgettable journeys.", icon: "eye" },
  { t: "Our Promise", d: "Transparent pricing, verified partners and a real human by your side from the first call to the last drop.", icon: "shield" },
];
const TIMELINE = [
  ["Plan", "Listen to your dream, dates and budget"],
  ["Design", "Craft a flexible, transparent itinerary"],
  ["Book", "Confirm hotels, vehicles, tickets & visas"],
  ["Travel", "24x7 on-ground and WhatsApp support"],
  ["Return", "Feedback, memories and your next trip"],
];

export default function About() {
  return (
    <>
      <PageBanner title="About Us" sub={`Meet ${BRAND} — your personal travel partner in Varanasi.`} crumbs={[{ t: "About Us" }]} img={`${CDN}/4/948530/other-images/564047.jpg`} />
      <section className="sec">
        <div className="container about-grid">
          <Reveal from="left" className="collage">
            <Tilt className="c-main" max={6}><Img src={DESTS[3].img} alt="Bhutan" /></Tilt>
            <Tilt className="c-sm1" max={10}><Img src={DESTS[4].img} alt="Bali" /></Tilt>
            <Tilt className="c-sm2" max={10}><Img src={DESTS[1].img} alt="Andaman" /></Tilt>
            <div className="c-badge"><b>{PACKAGES.length}+</b><span>Curated<br />Packages</span></div>
            <div className="c-ring" />
          </Reveal>
          <Reveal from="right" className="about-copy">
            <span className="eyebrow">Who We Are</span>
            <h2>Travel With A <em>Personal Touch</em></h2>
            <p>{BRAND} is a leading tour operator in Uttar Pradesh which combines tour and travel with a personal touch. Based at Baragaon, Babatpur Airport Road, Varanasi, we help families, couples, pilgrims and corporate groups explore India and the world.</p>
            <p>Our team handles every detail — hotels, cabs, flights, visas, insurance and events — so that you can focus on the experience. Every itinerary is flexible and built around you.</p>
            <ul className="ticks">
              <li><Icon n="check" s={16} /> Domestic, international, pilgrimage & honeymoon tours</li>
              <li><Icon n="check" s={16} /> Own fleet access — sedans to luxury coaches</li>
              <li><Icon n="check" s={16} /> Passport, visa & insurance desk</li>
            </ul>
            <Link to="/contact-us" className="btn btn-primary shine">Get In Touch <Icon n="arrow" s={16} /></Link>
          </Reveal>
        </div>
        <div className="container"><Stats /></div>
      </section>

      <section className="sec sec-soft">
        <div className="container">
          <SectionHead a="What Drives" b="Us" />
          <div className="grid g3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 100}>
                <Tilt className="why"><div className="why-ico"><Icon n={v.icon} s={28} /></div><h4>{v.t}</h4><p>{v.d}</p></Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="container">
          <SectionHead a="Our" b="Journey Process" sub="From the first hello to your next booking." />
          <div className="hline">
            {TIMELINE.map(([t, d], i) => (
              <Reveal key={t} delay={i * 110} className="hl-item">
                <span>{i + 1}</span><h5>{t}</h5><p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <Reviews dark />
      <CtaBand />
    </>
  );
}
