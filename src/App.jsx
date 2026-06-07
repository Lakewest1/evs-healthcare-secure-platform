import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Home from "./pages/Home";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
