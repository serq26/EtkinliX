import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEventsByPlace } from "../api";
import EventListItem from "../components/EventListItem";
import { useEvents } from "../contexts/EventContext";

export default function PlaceEvents() {
  const { placeUrl } = useParams();
  const { events, setEvents } = useEvents();

  useEffect(() => {
    const getEvents = async (place) => {
      setEvents(await fetchEventsByPlace(place));
    };

    getEvents(placeUrl);
  }, [placeUrl]);

  return (
    <div>
      {events.map((event,key) => 
        <EventListItem key={key} event={event} />
      )}
    </div>
  );
}
