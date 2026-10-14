import React from "react";
import { Routes, Route } from "react-router-dom";
import { ModalProvider } from "./components/modals.jsx";
import { Preloader, ScrollFx, ScrollToTop, TopBar, Header, Footer, Floating, OfferPopup } from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import Packages from "./pages/Packages.jsx";
import PackageDetail from "./pages/PackageDetail.jsx";
import Category from "./pages/Category.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <ModalProvider>
      <Preloader />
      <ScrollFx />
      <ScrollToTop />
      <TopBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/tour-packages" element={<Packages />} />
          <Route path="/tour-packages/:slug" element={<PackageDetail />} />
          <Route path="/tours/:type" element={<Category />} />
          <Route path="/tours/:type/:slug" element={<Category />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Floating />
      <OfferPopup />
    </ModalProvider>
  );
}
