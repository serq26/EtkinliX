import "./App.css";
import { useEffect, useState } from "react";
import { fetchEventList, fetchEventWithParams } from "./api";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEventList();
      setEvents(data);
    };
    getEvents();
  }, []);

  useEffect(() => {
    const getEvent = async (paramName,value) => {
      const data = await fetchEventWithParams("city","İstanbul");
      console.log(data)
      setEvents(data);
    };
    getEvent();
  }, []);

  return (
    <div className="App">
      <ul>
        {events.map((event, key) => (
          <li key={key}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
