import React from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "../components/Icon.jsx";
import { PageBanner, Reveal, Img, Tilt } from "../components/ui.jsx";
import { useModals } from "../components/modals.jsx";
import { CtaBand, Fleet } from "../components/Sections.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";
import NotFound from "./NotFound.jsx";
import { SERVICES, FLEET } from "../data/data.js";

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = SERVICES.find((x) => x.slug === slug);
  const { enquire } = useModals();
  if (!s) return <NotFound />;
  return (
    <>
      <PageBanner title={s.t} sub={s.d} crumbs={[{ t: "Our Services", to: "/services" }, { t: s.t }]} img={s.pic} />
      <section className="sec">
        <div className="container pd-grid">
          <div className="pd-main">
            <Reveal><div className="sd-img"><Img src={s.pic} alt={s.t} /><span className="sd-ico"><Icon n={s.icon} s={34} /></span></div></Reveal>
            <Reveal delay={80}>
              <h3 className="h3">About {s.t}</h3>
              <p className="lead">{s.long}</p>
              <ul className="feat">
                {s.features.map((f) => <li key={f}><Icon n="check" s={18} /> {f}</li>)}
              </ul>
              <button className="btn btn-primary btn-lg shine" onClick={() => enquire("", `Enquiry: ${s.t}`)}>Enquire Now <Icon n="arrow" s={18} /></button>
            </Reveal>
            {s.slug === "car-and-coach-rental" && (
              <Reveal delay={120}>
                <h3 className="h3 mt-s">Vehicle Rates</h3>
                <div className="table-wrap">
                  <table className="rates">
                    <thead><tr><th>Vehicle</th><th>Model</th><th>Seats</th><th>Luggage</th><th>Rate</th></tr></thead>
                    <tbody>{FLEET.map((f) => <tr key={f.n}><td><b>{f.n}</b></td><td>{f.ex}</td><td>{f.seats}</td><td>{f.bag}</td><td className="price">{f.rate}</td></tr>)}</tbody>
                  </table>
                </div>
              </Reveal>
            )}
          </div>
          <aside className="pd-side">
            <Tilt className="bookcard" max={3} glare={false}>
              <div className="bk-top"><small>Free Consultation</small><b>Enquire Now</b></div>
              <EnquiryForm pkg={s.t} compact />
            </Tilt>
            <div className="side-list">
              <h5>Other Services</h5>
              {SERVICES.filter((x) => x.slug !== s.slug).map((x) => <Link key={x.slug} to={`/services/${x.slug}`}><Icon n={x.icon} s={16} /> {x.t}</Link>)}
            </div>
          </aside>
        </div>
      </section>
      {s.slug === "car-and-coach-rental" && <Fleet />}
      <CtaBand />
    </>
  );
}
