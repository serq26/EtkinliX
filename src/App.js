import "./style.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetail from "./pages/EventDetail";
import PlaceEvents from "./pages/PlaceEvents";
import OldEvents from "./pages/OldEvents";
import { useTheme } from "./contexts/ThemeContext";
import Footer from "./components/Footer";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme === "dark" ? theme : ""}`} data-theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/place/:placeUrl" element={<PlaceEvents />} />
          <Route path="/old-events" element={<OldEvents />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
