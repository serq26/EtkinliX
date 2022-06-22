import React, { useEffect, useState } from "react";
import { fetchOldEvents } from "../api";
import EventListItem from "../components/EventListItem";

export default function OldEvents() {
  const [oldEvents, setOldEvents] = useState([]);

  useEffect(() => {
    const getOldEvents = async () => {
      const oldEvents = await fetchOldEvents();
      setOldEvents(oldEvents);
    };

    getOldEvents();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="place-events">
            <h2>Geçmiş Etkinlikler</h2>
            <ul>
              {oldEvents.map((event, key) => (
                <EventListItem key={key} event={event} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
