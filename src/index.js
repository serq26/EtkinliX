import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EventProvider } from "./contexts/EventContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <EventProvider>
      <App />
    </EventProvider>
  </ThemeProvider>
);
