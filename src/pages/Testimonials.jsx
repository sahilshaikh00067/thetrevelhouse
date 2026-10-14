import React from "react";
import { PageBanner, Reveal, Stars } from "../components/ui.jsx";
import { ReviewCard, Stats, CtaBand } from "../components/Sections.jsx";
import { REVIEWS } from "../data/data.js";

export default function Testimonials() {
  const avg = (REVIEWS.reduce((a, r) => a + r.r, 0) / REVIEWS.length).toFixed(1);
  return (
    <>
      <PageBanner title="Testimonials" sub="Words from travellers who trusted us with their holidays." crumbs={[{ t: "Testimonials" }]} />
      <section className="sec">
        <div className="container">
          <Reveal className="rating-sum">
            <b>{avg}</b><div><Stars n={5} s={22} /><span>Average rating from {REVIEWS.length}+ featured reviews</span></div>
          </Reveal>
          <div className="grid g3">
            {REVIEWS.map((r, i) => <Reveal key={r.n} delay={(i % 3) * 100}><ReviewCard r={r} /></Reveal>)}
          </div>
          <Stats />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
