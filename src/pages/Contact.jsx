import React from "react";
import { Icon } from "../components/Icon.jsx";
import { PageBanner, Reveal, Tilt, Accordion } from "../components/ui.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import { PHONE, EMAIL, ADDRESS, HOURS, FAQS, waLink, BRAND } from "../data/data.js";

export default function Contact() {
  const cards = [
    { i: "phone", t: "Call Us", v: `+91 ${PHONE}`, h: `tel:+91${PHONE}` },
    { i: "whatsapp", t: "WhatsApp", v: "Chat instantly", h: waLink("Hello, I want to plan a trip.") },
    { i: "mail", t: "Email", v: EMAIL, h: `mailto:${EMAIL}` },
    { i: "clock", t: "Working Hours", v: HOURS },
  ];
  return (
    <>
      <PageBanner title="Contact Us" sub="We would love to plan your next journey — reach out any time." crumbs={[{ t: "Contact Us" }]} />
      <section className="sec">
        <div className="container">
          <div className="grid g4">
            {cards.map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <Tilt className="ccard" as={c.h ? "a" : "div"} href={c.h} target={c.h && c.h.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className="ccard-ico"><Icon n={c.i} s={26} /></span>
                  <small>{c.t}</small><b>{c.v}</b>
                </Tilt>
              </Reveal>
            ))}
          </div>

          <div className="contact-grid">
            <Reveal from="left" className="contact-form">
              <span className="eyebrow">Send Enquiry</span>
              <h2 className="h2l">Let's Plan Your <em>Perfect Trip</em></h2>
              <EnquiryForm title="" />
            </Reveal>
            <Reveal from="right" className="contact-map">
              <iframe title="Office location" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent("Baragaon Babatpur Airport Road Varanasi")}&output=embed`} />
              <div className="map-card"><Icon n="pin" s={22} /><div><b>{BRAND}</b><span>{ADDRESS}</span></div></div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="sec sec-soft">
        <div className="container narrow">
          <h2 className="h2l center">Quick <em>Answers</em></h2>
          <Accordion items={FAQS.slice(0, 5)} />
        </div>
      </section>
    </>
  );
}
