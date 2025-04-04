import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PortfolioHero from "./components/Hero/page";
import AboutSection from "./components/About/page";
import CustomROMProductsPage from "./pages/products/page";
import AvailableROMsPage from "./pages/[codename]/page";
import ROMDetailsPage from "./pages/[romName]/page";
import ContactPage from "./pages/contact/page";
import SupportSection from "./pages/Support/Support";
import ScrollToTop from "./hooks/scrollFix";
import FeedbackButton from "./components/FeedbackButton";
import PageNotFound from "./page_not_found"

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <FeedbackButton />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PortfolioHero />
                <AboutSection />
              </>
            }
          />
          <Route path="/products" element={<CustomROMProductsPage />} />
          <Route path="/products/:codename" element={<AvailableROMsPage />} />
          <Route
            path="/products/:codename/:romName"
            element={<ROMDetailsPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/support" element={<SupportSection />} />


  {/* This is the catch-all route. It matches any path that hasn't been matched before. */}
  <Route path="*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
