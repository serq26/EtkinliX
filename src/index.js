import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EventProvider } from "./contexts/EventContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <EventProvider>
    <App />
  </EventProvider>
);
