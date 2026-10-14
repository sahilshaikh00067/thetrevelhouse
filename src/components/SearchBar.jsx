import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { STATES, BUDGETS, NIGHTS } from "../data/data.js";

export default function SearchBar() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [b, setB] = useState("");
  const [n, setN] = useState("");
  const go = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (b !== "") p.set("budget", b);
    if (n) p.set("nights", n);
    nav(`/tour-packages${p.toString() ? "?" + p.toString() : ""}`);
  };
  return (
    <form className="searchbar" onSubmit={go}>
      <div className="sb-title"><Icon n="search" s={20} /><b>Find Your Perfect Trip</b></div>
      <label className="sb-f">
        <span><Icon n="pin" s={15} /> Where to?</span>
        <select value={q} onChange={(e) => setQ(e.target.value)}>
          <option value="">Anywhere</option>
          {Object.entries(STATES).map(([s, c]) => (
            <optgroup key={s} label={s}>
              <option value={s.split(" ")[0]}>All {s}</option>
              {c.map((x) => <option key={x} value={x}>{x}</option>)}
            </optgroup>
          ))}
        </select>
      </label>
      <label className="sb-f">
        <span><Icon n="wallet" s={15} /> Budget</span>
        <select value={b} onChange={(e) => setB(e.target.value)}>
          <option value="">Any budget</option>
          {BUDGETS.map((x, i) => <option key={i} value={i}>{x.l}</option>)}
        </select>
      </label>
      <label className="sb-f">
        <span><Icon n="calendar" s={15} /> Nights</span>
        <select value={n} onChange={(e) => setN(e.target.value)}>
          <option value="">Any duration</option>
          {NIGHTS.map((x) => <option key={x} value={x}>{x} Night{x > 1 ? "s" : ""}</option>)}
        </select>
      </label>
      <button className="btn btn-primary shine" type="submit">Search Packages <Icon n="arrow" s={16} /></button>
    </form>
  );
}
