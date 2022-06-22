import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEventsByPlace } from "../api";
import EventListItem from "../components/EventListItem";
import { useEvents } from "../contexts/EventContext";
import * as urlSlug from 'url-slug'

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
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="place-events">
            <h2>{urlSlug.convert(placeUrl,{transformer: urlSlug.TITLECASE_TRANSFORMER})}</h2>
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
