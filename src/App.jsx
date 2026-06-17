import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs"; // ← Import Jobs page
import Apply from "./pages/Apply";

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} /> {/* ← Add this route */}
            <Route path="/apply" element={<Apply />} />
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}