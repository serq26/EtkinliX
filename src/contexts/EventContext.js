import { createContext, useContext, useEffect, useState } from "react";
import { fetchEventList, fetchEventWithParams } from "../api";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEventList();
      setEvents(data);
    };
    getEvents();
  }, []);

  const values = { events, setEvents };

  return <EventContext.Provider value={values}>{children}</EventContext.Provider>;
};

const useEvents = () => useContext(EventContext);

export { EventProvider, useEvents };
