import "./style.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetail from "./pages/EventDetail";
import PlaceEvents from "./pages/PlaceEvents";
import OldEvents from "./pages/OldEvents";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/place/:placeUrl" element={<PlaceEvents />} />
        <Route path="/old-events" element={<OldEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
