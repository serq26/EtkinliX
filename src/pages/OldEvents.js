import React, { useEffect } from "react";
import { fetchOldEvents } from "../api";
import EventListItem from "../components/EventListItem";
import { useEvents } from "../contexts/EventContext";
import * as urlSlug from 'url-slug'

export default function OldEvents() {
  const { events, setEvents } = useEvents();

  useEffect(() => {
    const getOldEvents = async () => {
      const oldEvents = await fetchOldEvents();
      setEvents(oldEvents);
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
              {events.map((event, key) => (
                <EventListItem key={key} event={event} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
