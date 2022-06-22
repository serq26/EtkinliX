import { createContext, useContext, useEffect, useState } from "react";
import { fetchEventList } from "../api";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEventList();
      setEvents(data);
    };
    getEvents();
  }, []);

  const values = { events, setEvents, loading, setLoading };

  return (
    <EventContext.Provider value={values}>{children}</EventContext.Provider>
  );
};

const useEvents = () => useContext(EventContext);

export { EventProvider, useEvents };
