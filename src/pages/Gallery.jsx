import React, { useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { PageBanner, Reveal, Img } from "../components/ui.jsx";
import { useModals } from "../components/modals.jsx";
import { CtaBand } from "../components/Sections.jsx";
import { GALLERY } from "../data/data.js";

export default function Gallery() {
  const cats = ["All", ...Array.from(new Set(GALLERY.map((g) => g.c)))];
  const [c, setC] = useState("All");
  const { lightbox } = useModals();
  const list = c === "All" ? GALLERY : GALLERY.filter((g) => g.c === c);
  return (
    <>
      <PageBanner title="Photo Gallery" sub="Moments and destinations from our tours — tap to enlarge." crumbs={[{ t: "Gallery" }]} />
      <section className="sec">
        <div className="container">
          <div className="chips center-row">{cats.map((k) => <button key={k} className={c === k ? "on" : ""} onClick={() => setC(k)}>{k}</button>)}</div>
          <div className="masonry big" key={c}>
            {list.map((g, i) => (
              <Reveal key={g.src + i} delay={(i % 4) * 70} className={`m-item m-${i % 5}`}>
                <button onClick={() => lightbox(list, i)} aria-label={`Open ${g.t}`}>
                  <Img src={g.src} alt={g.t} />
                  <span className="m-ov"><Icon n="expand" s={26} /><b>{g.t}</b></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
