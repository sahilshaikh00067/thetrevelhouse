import React from "react";
import { PageBanner } from "../components/ui.jsx";
import { ServicesGrid, Fleet, Steps, CtaBand } from "../components/Sections.jsx";
import { CDN } from "../data/data.js";

export default function Services() {
  return (
    <>
      <PageBanner title="Our Services" sub="Tours, cabs, flights, visas, insurance, hotels and events — one trusted desk." crumbs={[{ t: "Our Services" }]} img={`${CDN}/4/948530/other-images/564046.jpg`} />
      <section className="sec"><div className="container"><ServicesGrid /></div></section>
      <Fleet />
      <Steps />
      <CtaBand />
    </>
  );
}
