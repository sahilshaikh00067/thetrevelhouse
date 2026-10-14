import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon.jsx";
import Hero from "../components/Hero.jsx";
import SearchBar from "../components/SearchBar.jsx";
import OfferTimer from "../components/OfferTimer.jsx";
import PackageCard from "../components/PackageCard.jsx";
import { Reveal, SectionHead, Tilt, Img, Slider, Accordion } from "../components/ui.jsx";
import { useModals } from "../components/modals.jsx";
import { MarqueeStrip, Stats, WhyUs, Steps, Fleet, ServicesGrid, Reviews, CtaBand } from "../components/Sections.jsx";
import { PACKAGES, DESTS, THEMES, FAQS, GALLERY, BRAND } from "../data/data.js";

const featured = PACKAGES.filter((p) => p.price > 0).slice(0, 14);
const intl = PACKAGES.filter((p) => p.intl);
const honey = [PACKAGES.find((p) => /bali honeymoon/i.test(p.title)), PACKAGES.find((p) => /andaman honeymoon/i.test(p.title)), PACKAGES.find((p) => /kashmir/i.test(p.title)), PACKAGES.find((p) => /manali/i.test(p.title)), PACKAGES.find((p) => /dubai dhamaka/i.test(p.title))].filter(Boolean);

export default function Home() {
  const { lightbox } = useModals();
  const gal = GALLERY.slice(0, 9);
  return (
    <>
      <Hero />
      <div className="container search-wrap"><SearchBar /></div>
      <MarqueeStrip />

      {/* about intro */}
      <section className="sec">
        <div className="container about-grid">
          <Reveal from="left" className="collage">
            <Tilt className="c-main" max={6}><Img src={DESTS[0].img} alt="Goa" /></Tilt>
            <Tilt className="c-sm1" max={10}><Img src={DESTS[5].img} alt="Kashmir" /></Tilt>
            <Tilt className="c-sm2" max={10}><Img src={DESTS[2].img} alt="Dubai" /></Tilt>
            <div className="c-badge"><b>10+</b><span>Years of<br />Travel Expertise</span></div>
            <div className="c-ring" />
          </Reveal>
          <Reveal from="right" className="about-copy">
            <span className="eyebrow">About {BRAND}</span>
            <h2>Your Trusted <em>Travel Partner</em> From Varanasi</h2>
            <p>{BRAND} is a leading tour operator in Uttar Pradesh which combines tour and travel with a personal touch. From Goa beaches and Himalayan valleys to Dubai, Bali and Bhutan — we plan every detail so you only collect memories.</p>
            <ul className="ticks">
              <li><Icon n="check" s={16} /> Handpicked hotels, resorts & private transfers</li>
              <li><Icon n="check" s={16} /> Fully customisable domestic & international tours</li>
              <li><Icon n="check" s={16} /> One-stop desk for flights, visa, insurance & events</li>
            </ul>
            <div className="row-btns">
              <Link to="/about-us" className="btn btn-primary shine">Discover More <Icon n="arrow" s={16} /></Link>
              <Link to="/contact-us" className="btn btn-ghost">Talk To Us</Link>
            </div>
          </Reveal>
        </div>
        <div className="container"><Stats /></div>
      </section>

      {/* destinations slider */}
      <section className="sec sec-soft">
        <div className="container">
          <SectionHead a="Top Trending" b="Destinations" sub="Explore the places travellers love most — tap a destination to see its packages." />
          <Slider items={DESTS} per={4} gap={22} autoplay={3800} render={(d) => (
            <Tilt as={Link} to={`/tours/destination/${d.slug}`} className="dcard">
              <Img src={d.img} alt={d.t} />
              <div className="dcard-ov" />
              <div className="dcard-in">
                <small>{d.n}</small>
                <h4>{d.t}</h4>
                <span className="dcard-go"><Icon n="arrow" s={18} /></span>
              </div>
            </Tilt>
          )} />
        </div>
      </section>

      {/* featured packages */}
      <section className="sec">
        <div className="container">
          <SectionHead a="Featured" b="Tour Packages" sub="Handcrafted holidays with stays, transfers and sightseeing included." />
          <Slider items={featured} per={3} gap={26} autoplay={5000} render={(p) => <PackageCard p={p} />} />
          <div className="center mt"><Link to="/tour-packages" className="btn btn-primary btn-lg shine">View All {PACKAGES.length} Packages <Icon n="arrow" s={18} /></Link></div>
        </div>
      </section>

      <OfferTimer />

      {/* themes */}
      <section className="sec">
        <div className="container">
          <SectionHead a="Tours By" b="Theme" sub="Pilgrimage, beaches, heritage or wildlife — pick the mood of your holiday." />
          <div className="theme-grid">
            {THEMES.map((t, i) => (
              <Reveal key={t.slug} delay={i * 60} className={`th th-${i}`}>
                <Link to={`/tours/theme/${t.slug}`} className="th-in">
                  <Img src={t.img} alt={t.t} />
                  <div className="th-ov" />
                  <h4>{t.t.replace(/ Tours$/, "")}</h4>
                  <span className="th-go"><Icon n="arrow" s={18} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />

      {/* international slider */}
      <section className="sec sec-dark">
        <div className="container">
          <SectionHead a="International" b="Escapes" light sub="Dubai, Bhutan, Bali and Baku — visa support and flights handled by us." />
          <Slider items={intl.slice(0, 12)} per={3} gap={26} autoplay={4600} render={(p) => <PackageCard p={p} />} />
        </div>
      </section>

      <Steps />

      {/* honeymoon */}
      <section className="sec">
        <div className="container">
          <SectionHead a="Honeymoon &" b="Romantic Getaways" sub="Private, beautiful and perfectly planned for the two of you." />
          <div className="grid g3">
            {honey.slice(0, 3).map((p, i) => <Reveal key={p.id} delay={i * 100}><PackageCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>

      <Fleet />

      <section className="sec">
        <div className="container">
          <SectionHead a="Our" b="Services" sub="Everything you need for a smooth journey — under one roof." />
          <ServicesGrid limit={6} />
          <div className="center mt"><Link to="/services" className="btn btn-ghost btn-lg">All Services <Icon n="arrow" s={18} /></Link></div>
        </div>
      </section>

      {/* gallery */}
      <section className="sec sec-soft">
        <div className="container">
          <SectionHead a="Travel" b="Gallery" sub="A glimpse of the destinations our guests have explored. Tap any photo to enlarge." />
          <div className="masonry">
            {gal.map((g, i) => (
              <Reveal key={i} delay={(i % 3) * 80} className={`m-item m-${i % 5}`}>
                <button onClick={() => lightbox(gal, i)} aria-label={`Open ${g.t}`}>
                  <Img src={g.src} alt={g.t} />
                  <span className="m-ov"><Icon n="expand" s={26} /><b>{g.t}</b></span>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="center mt"><Link to="/gallery" className="btn btn-primary shine">Full Gallery <Icon n="arrow" s={16} /></Link></div>
        </div>
      </section>

      <Reviews dark />

      {/* faq */}
      <section className="sec">
        <div className="container faq-grid">
          <Reveal from="left">
            <span className="eyebrow">FAQ</span>
            <h2 className="h2l">Frequently Asked <em>Questions</em></h2>
            <p className="lead">Can't find your answer? Our team replies within minutes on call and WhatsApp.</p>
            <Tilt className="faq-card">
              <Icon n="headset" s={36} />
              <b>Still have questions?</b>
              <Link to="/contact-us" className="btn btn-primary btn-sm">Contact Us</Link>
            </Tilt>
          </Reveal>
          <Reveal from="right"><Accordion items={FAQS} /></Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
