import React from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "../components/Icon.jsx";
import PackageCard from "../components/PackageCard.jsx";
import { PageBanner, Reveal, Tilt, Img } from "../components/ui.jsx";
import { useModals } from "../components/modals.jsx";
import { CtaBand } from "../components/Sections.jsx";
import NotFound from "./NotFound.jsx";
import { CATEGORIES, PACKAGES } from "../data/data.js";

export default function Category() {
  const { type, slug } = useParams();
  const { enquire } = useModals();
  const cat = CATEGORIES[type];
  if (!cat) return <NotFound />;

  if (!slug) {
    return (
      <>
        <PageBanner title={cat.title} sub="Pick a category to see matching packages." crumbs={[{ t: "Tour Packages", to: "/tour-packages" }, { t: cat.title }]} />
        <section className="sec"><div className="container grid g4">
          {cat.items.map((it, i) => (
            <Reveal key={it.slug} delay={(i % 4) * 80}>
              <Tilt as={Link} to={`/tours/${type}/${it.slug}`} className="dcard sm">
                <Img src={it.img} alt={it.t} /><div className="dcard-ov" />
                <div className="dcard-in"><h4>{it.t}</h4><span className="dcard-go"><Icon n="arrow" s={18} /></span></div>
              </Tilt>
            </Reveal>
          ))}
        </div></section>
        <CtaBand />
      </>
    );
  }

  const item = cat.items.find((x) => x.slug === slug);
  if (!item) return <NotFound />;
  const key = (item.k || item.t.replace(/ Tours$/, "")).toLowerCase();
  const list = PACKAGES.filter((p) => `${p.title} ${p.dest} ${p.region} ${p.acts.join(" ")} ${p.themes.join(" ")}`.toLowerCase().includes(key));

  return (
    <>
      <PageBanner title={item.t} sub={`${list.length} package${list.length === 1 ? "" : "s"} available`} crumbs={[{ t: cat.title, to: `/tours/${type}` }, { t: item.t }]} img={item.img} />
      <section className="sec"><div className="container">
        {list.length ? (
          <div className="grid g3">{list.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 90}><PackageCard p={p} /></Reveal>)}</div>
        ) : (
          <div className="empty">
            <Icon n="globe" s={46} />
            <h3>Custom {item.t.replace(/ Tours$/, "")} packages on request</h3>
            <p>We don't have a ready package listed here yet, but we can design one for you within minutes.</p>
            <button className="btn btn-primary" onClick={() => enquire("", `Custom ${item.t}`)}>Request Custom Quote</button>
          </div>
        )}
      </div></section>
      <CtaBand />
    </>
  );
}
