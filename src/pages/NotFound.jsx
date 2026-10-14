import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon.jsx";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="container center">
        <div className="nf-num">4<span><Icon n="globe" s={90} /></span>4</div>
        <h2>Looks like you took a wrong turn</h2>
        <p>The page you are looking for does not exist or has moved. Let's get you back on the journey.</p>
        <div className="row-btns center-row">
          <Link to="/" className="btn btn-primary btn-lg shine">Back to Home</Link>
          <Link to="/tour-packages" className="btn btn-ghost btn-lg">Browse Packages</Link>
        </div>
      </div>
    </section>
  );
}
