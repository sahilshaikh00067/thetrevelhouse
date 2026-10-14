import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "../components/Icon.jsx";
import PackageCard from "../components/PackageCard.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import { PageBanner, Reveal, SectionHead, Slider, Img, Tilt } from "../components/ui.jsx";
import { useModals } from "../components/modals.jsx";
import { CtaBand } from "../components/Sections.jsx";
import NotFound from "./NotFound.jsx";
import { pkgBySlug, PACKAGES, INCLUSIONS, EXCLUSIONS, POLICIES, inr, waLink, PHONE } from "../data/data.js";

function buildItinerary(p) {
  const days = p.days;
  const stops = p.stops.length ? p.stops : [p.region];
  const out = [{ t: `Arrival in ${stops[0]}`, d: `Meet our representative on arrival, private transfer to your hotel, check-in and relax. Evening free to explore local markets or the neighbourhood.` }];
  for (let i = 1; i < days - 1; i++) {
    const s = stops[Math.min(stops.length - 1, Math.floor((i * stops.length) / Math.max(1, days - 1)))];
    out.push({ t: `Explore ${s}`, d: `After breakfast, enjoy a guided sightseeing tour of ${s} with a private AC vehicle. Visit the top attractions, enjoy leisure time and return to the hotel for a comfortable overnight stay.` });
  }
  if (days > 1) out.push({ t: "Departure", d: "Breakfast and check-out. Private transfer to the airport / railway station with wonderful memories to take home." });
  return out;
}

export default function PackageDetail() {
  const { slug } = useParams();
  const p = pkgBySlug(slug);
  const { enquire, lightbox } = useModals();
  const [tab, setTab] = useState("overview");
  const [open, setOpen] = useState(0);
  const iti = useMemo(() => (p ? buildItinerary(p) : []), [p]);
  const related = useMemo(() => (p ? PACKAGES.filter((x) => x.region === p.region && x.id !== p.id).concat(PACKAGES.filter((x) => x.region !== p.region)).slice(0, 8) : []), [p]);
  if (!p) return <NotFound />;

  const imgs = [p.img, ...related.slice(0, 3).map((r) => r.img)].map((src, i) => ({ src, t: i === 0 ? p.name : `${p.region} gallery` }));
  const tabs = [["overview", "Overview"], ["itinerary", "Itinerary"], ["inclusions", "Inclusions"], ["policies", "Policies"]];

  return (
    <>
      <PageBanner title={p.name} sub={`${p.dur} • ${p.dest}`} crumbs={[{ t: "Tour Packages", to: "/tour-packages" }, { t: p.name }]} img={p.img} />
      <section className="sec pd">
        <div className="container pd-grid">
          <div className="pd-main">
            <Reveal>
              <div className="pd-gal">
                <button className="g-main" onClick={() => lightbox(imgs, 0)}><Img src={imgs[0].src} alt={p.name} /><span className="m-ov"><Icon n="expand" s={28} /></span></button>
                {imgs.slice(1).map((g, i) => (
                  <button key={i} className="g-th" onClick={() => lightbox(imgs, i + 1)}><Img src={g.src} alt={g.t} /><span className="m-ov"><Icon n="expand" s={20} /></span></button>
                ))}
              </div>
            </Reveal>

            <div className="facts">
              <div><Icon n="clock" s={22} /><small>Duration</small><b>{p.dur}</b></div>
              <div><Icon n="pin" s={22} /><small>Region</small><b>{p.region}</b></div>
              <div><Icon n="users" s={22} /><small>Group</small><b>Private / Group</b></div>
              <div><Icon n="car" s={22} /><small>Transfers</small><b>Private AC</b></div>
            </div>

            <div className="tabs" role="tablist">
              {tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>)}
            </div>

            <div className="tab-body" key={tab}>
              {tab === "overview" && (
                <div className="fade-up">
                  <h3>About This Tour</h3>
                  <p>Experience <b>{p.name}</b> — a {p.dur} journey covering {p.dest}. This package is designed for comfort: handpicked accommodation, private transfers and well-paced sightseeing so you enjoy every moment without the stress of planning.</p>
                  <div className="tagrow">
                    {p.acts.map((a) => <span key={a}><Icon n="sun" s={14} /> {a}</span>)}
                    {p.themes.map((a) => <span key={a} className="alt"><Icon n="mountain" s={14} /> {a}</span>)}
                  </div>
                  <h4 className="mt-s">Destinations Covered</h4>
                  <div className="stops">{p.stops.map((s) => <span key={s}><Icon n="pin" s={14} /> {s}</span>)}</div>
                </div>
              )}
              {tab === "itinerary" && (
                <div className="timeline fade-up">
                  {iti.map((d, i) => (
                    <div key={i} className={`tl ${open === i ? "open" : ""}`}>
                      <div className="tl-dot">{i + 1}</div>
                      <button className="tl-head" onClick={() => setOpen(open === i ? -1 : i)}>
                        <span><small>Day {i + 1}</small>{d.t}</span><Icon n={open === i ? "minus" : "plus"} s={18} />
                      </button>
                      <div className="tl-body" style={{ maxHeight: open === i ? 220 : 0 }}><p>{d.d}</p></div>
                    </div>
                  ))}
                  <p className="note">* Itinerary is indicative and can be fully customised to your preferences.</p>
                </div>
              )}
              {tab === "inclusions" && (
                <div className="two fade-up">
                  <div><h4 className="ok-h">Package Includes</h4><ul className="list ok">{INCLUSIONS.map((x) => <li key={x}><Icon n="check" s={16} />{x}</li>)}</ul></div>
                  <div><h4 className="no-h">Package Excludes</h4><ul className="list no">{EXCLUSIONS.map((x) => <li key={x}><Icon n="x" s={16} />{x}</li>)}</ul></div>
                </div>
              )}
              {tab === "policies" && (
                <div className="pol fade-up">{POLICIES.map(([h, t]) => <div key={h}><b>{h}</b><p>{t}</p></div>)}</div>
              )}
            </div>
          </div>

          <aside className="pd-side">
            <Tilt className="bookcard" max={3} glare={false}>
              <div className="bk-top">
                <small>Starting from</small>
                <b>{inr(p.price)}</b>
                {p.price > 0 && <span>per person*</span>}
              </div>
              <EnquiryForm pkg={p.title} compact />
              <div className="bk-links">
                <a href={`tel:+91${PHONE}`}><Icon n="phone" s={16} /> Call Now</a>
                <a href={waLink(`Hi, I am interested in "${p.title}". Please share details.`)} target="_blank" rel="noreferrer"><Icon n="whatsapp" s={16} /> WhatsApp</a>
              </div>
            </Tilt>
          </aside>
        </div>
      </section>

      <section className="sec sec-soft">
        <div className="container">
          <SectionHead a="You May Also" b="Like" />
          <Slider items={related} per={3} gap={26} autoplay={4500} render={(x) => <PackageCard p={x} />} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
