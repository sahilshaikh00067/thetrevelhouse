import React, { useState } from "react";
import { Icon } from "./Icon.jsx";
import { waLink, PHONE } from "../data/data.js";

export default function EnquiryForm({ pkg = "", compact = false, title }) {
  const [f, setF] = useState({ name: "", phone: "", dest: pkg, date: "", pax: "2", msg: "" });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr("Please enter your name");
    if (f.phone.replace(/\D/g, "").length < 10) return setErr("Please enter a valid 10-digit mobile number");
    setErr("");
    const text = `Hello The Travel House,\nName: ${f.name}\nPhone: ${f.phone}\nDestination / Package: ${f.dest || "Not decided"}\nTravel date: ${f.date || "Flexible"}\nTravellers: ${f.pax}\nMessage: ${f.msg || "-"}`;
    window.open(waLink(text), "_blank", "noopener");
    setSent(true);
  };

  if (sent)
    return (
      <div className="form-ok">
        <div className="ok-ring"><Icon n="check" s={34} /></div>
        <h4>Thank you, {f.name.split(" ")[0]}!</h4>
        <p>Your enquiry is ready on WhatsApp. If it did not open, call us on <a href={`tel:+91${PHONE}`}>+91 {PHONE}</a>.</p>
        <button className="btn btn-ghost" onClick={() => setSent(false)}>Send another enquiry</button>
      </div>
    );

  return (
    <form className={`form ${compact ? "compact" : ""}`} onSubmit={submit} noValidate>
      {title && <h3 className="form-title">{title}</h3>}
      <div className="row2">
        <label><span>Full Name *</span><input value={f.name} onChange={set("name")} placeholder="Your name" /></label>
        <label><span>Mobile *</span><input value={f.phone} onChange={set("phone")} placeholder="10-digit number" inputMode="tel" /></label>
      </div>
      <label><span>Destination / Package</span><input value={f.dest} onChange={set("dest")} placeholder="e.g. Goa, Andaman, Dubai" /></label>
      <div className="row2">
        <label><span>Travel Date</span><input type="date" value={f.date} onChange={set("date")} /></label>
        <label><span>Travellers</span>
          <select value={f.pax} onChange={set("pax")}>
            {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>)}
          </select>
        </label>
      </div>
      {!compact && <label><span>Message</span><textarea rows="3" value={f.msg} onChange={set("msg")} placeholder="Tell us about your plan, budget, hotel preference..." /></label>}
      {err && <p className="form-err">{err}</p>}
      <button type="submit" className="btn btn-primary btn-block shine">Send Enquiry on WhatsApp <Icon n="send" s={17} /></button>
    </form>
  );
}
