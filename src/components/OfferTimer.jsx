import React, { useMemo } from "react";
import { Icon } from "./Icon.jsx";
import { useCountdown, Reveal } from "./ui.jsx";
import { useModals } from "./modals.jsx";

function target() {
  const KEY = "th_offer_end";
  const week = 72 * 36e5;
  try {
    const saved = Number(localStorage.getItem(KEY));
    if (saved && saved > Date.now()) return saved;
    const t = Date.now() + week;
    localStorage.setItem(KEY, String(t));
    return t;
  } catch (e) { return Date.now() + week; }
}

const Box = ({ v, l }) => (
  <div className="tm-box"><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>
);

export default function OfferTimer() {
  const t = useMemo(target, []);
  const c = useCountdown(t);
  const { enquire } = useModals();
  return (
    <section className="offer">
      <div className="offer-bg" />
      <div className="container offer-in">
        <Reveal from="left" className="offer-copy">
          <span className="eyebrow light"><Icon n="zap" s={14} fill /> Limited Time Offer</span>
          <h2>Early-Bird <em>Holiday Deals</em> Are Live!</h2>
          <p>Book Goa, Andaman, Dubai, Bhutan & Bali packages now and lock in special rates with free airport transfers. Offer ends in:</p>
          <div className="timer">
            <Box v={c.d} l="Days" /><i>:</i><Box v={c.h} l="Hours" /><i>:</i><Box v={c.m} l="Mins" /><i>:</i><Box v={c.s} l="Secs" />
          </div>
          <button className="btn btn-primary btn-lg shine" onClick={() => enquire("", "Claim Your Early-Bird Offer")}>Claim This Offer <Icon n="arrow" s={18} /></button>
        </Reveal>
        <Reveal from="right" className="offer-art">
          <div className="coupon">
            <div className="cp-top"><Icon n="gift" s={34} /><span>Free with every booking</span></div>
            <ul>
              <li><Icon n="check" s={16} /> Airport pickup & drop</li>
              <li><Icon n="check" s={16} /> Complimentary breakfast</li>
              <li><Icon n="check" s={16} /> Free itinerary customisation</li>
              <li><Icon n="check" s={16} /> 24x7 trip assistance</li>
            </ul>
            <div className="cp-code">Call <b>+91 9580066593</b> to claim</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
