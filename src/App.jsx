import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import IssuesCards from "./pages/IssuesCards";
import Wallets from "./pages/Wallets";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" && <NavBar />}
      {pathname === "/" && <Hero />}
      <Routes>
        <Route path="/" element={<IssuesCards />} />
        <Route path="/wallets" element={<Wallets />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
