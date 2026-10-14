import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon.jsx";
import PackageCard from "../components/PackageCard.jsx";
import { PageBanner, Reveal } from "../components/ui.jsx";
import { CtaBand } from "../components/Sections.jsx";
import { PACKAGES, REGION_NAMES, BUDGETS, NIGHTS } from "../data/data.js";

export default function Packages() {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const region = sp.get("region") || "";
  const budget = sp.get("budget") ?? "";
  const nights = sp.get("nights") || "";
  const sort = sp.get("sort") || "popular";
  const [limit, setLimit] = useState(12);

  useEffect(() => { setQ(sp.get("q") || ""); }, [sp]);
  useEffect(() => { setLimit(12); }, [region, budget, nights, sort, q]);

  const upd = (k, v) => {
    const n = new URLSearchParams(sp);
    if (v === "" || v === null) n.delete(k); else n.set(k, v);
    setSp(n, { replace: true });
  };

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let r = PACKAGES.filter((p) => {
      if (region && p.region !== region) return false;
      if (term && !(`${p.title} ${p.dest} ${p.region} ${p.acts.join(" ")} ${p.themes.join(" ")}`.toLowerCase().includes(term))) return false;
      if (nights && p.nights !== Number(nights)) return false;
      if (budget !== "" && BUDGETS[Number(budget)]) {
        const b = BUDGETS[Number(budget)];
        if (!(p.price >= b.min && p.price <= b.max)) return false;
      }
      return true;
    });
    if (sort === "low") r = [...r].sort((a, b) => (a.price || 9e9) - (b.price || 9e9));
    else if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === "nights") r = [...r].sort((a, b) => a.nights - b.nights);
    return r;
  }, [q, region, budget, nights, sort]);

  const active = region || budget !== "" || nights || q;
  const clear = () => { setQ(""); setSp({}, { replace: true }); };

  return (
    <>
      <PageBanner title="Tour Packages" sub="Handcrafted domestic & international holidays — customise any plan to your budget." crumbs={[{ t: "Tour Packages" }]} />
      <section className="sec">
        <div className="container">
          <div className="filters">
            <label className="f-search">
              <Icon n="search" s={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && upd("q", q)} onBlur={() => upd("q", q)} placeholder="Search destination, hotel or theme..." />
            </label>
            <select value={budget} onChange={(e) => upd("budget", e.target.value)} aria-label="Budget">
              <option value="">Any Budget</option>
              {BUDGETS.map((b, i) => <option key={i} value={i}>{b.l}</option>)}
            </select>
            <select value={nights} onChange={(e) => upd("nights", e.target.value)} aria-label="Nights">
              <option value="">Any Nights</option>
              {NIGHTS.map((n) => <option key={n} value={n}>{n} Night{n > 1 ? "s" : ""}</option>)}
            </select>
            <select value={sort} onChange={(e) => upd("sort", e.target.value)} aria-label="Sort">
              <option value="popular">Sort: Popular</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="nights">Duration: Short first</option>
            </select>
          </div>

          <div className="chips">
            <button className={!region ? "on" : ""} onClick={() => upd("region", "")}>All</button>
            {REGION_NAMES.concat(["North East"].filter((x) => !REGION_NAMES.includes(x))).map((r) => (
              <button key={r} className={region === r ? "on" : ""} onClick={() => upd("region", r)}>{r}</button>
            ))}
          </div>

          <div className="res-bar">
            <span><b>{list.length}</b> package{list.length === 1 ? "" : "s"} found</span>
            {active && <button className="link-arrow" onClick={clear}>Clear filters <Icon n="x" s={14} /></button>}
          </div>

          {list.length === 0 ? (
            <div className="empty">
              <Icon n="search" s={44} />
              <h3>No packages match your filters</h3>
              <p>Don't worry — we customise trips on request. Clear the filters or talk to our experts.</p>
              <button className="btn btn-primary" onClick={clear}>Reset Filters</button>
            </div>
          ) : (
            <>
              <div className="grid g3">
                {list.slice(0, limit).map((p, i) => <Reveal key={p.id} delay={(i % 3) * 90}><PackageCard p={p} /></Reveal>)}
              </div>
              {limit < list.length && (
                <div className="center mt"><button className="btn btn-ghost btn-lg" onClick={() => setLimit(limit + 12)}>Load More Packages <Icon n="chevD" s={18} /></button></div>
              )}
            </>
          )}
        </div>
      </section>
      <CtaBand title="Can't Find Your Perfect Package?" sub="Tell us your dates, budget and interests — we will design a trip just for you." />
    </>
  );
}
