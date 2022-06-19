import React from "react";
import EventBox from "../components/EventBox";
import { useEvents } from "../contexts/EventContext";

export default function Home() {
  const { events } = useEvents();

  return (
    <div className="container events">
      <div className="row">
        {events.map((event, key) => (
          <EventBox key={key} event={event} />
        ))}
      </div>
    </div>
  );
}
