import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventsByPlace } from "../api";
import EventListItem from "../components/EventListItem";
import * as urlSlug from "url-slug";

export default function PlaceEvents() {
  const { placeUrl } = useParams();
  const [placeEvents, setPlaceEvents] = useState([]);

  useEffect(() => {
    const getEvents = async (place) => {
      setPlaceEvents(await fetchEventsByPlace(place));
    };

    getEvents(placeUrl);
  }, [placeUrl]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="place-events">
            <h2>
              {urlSlug
                .convert(placeUrl, {
                  transformer: urlSlug.TITLECASE_TRANSFORMER,
                })
                .replaceAll("-", " ")}
            </h2>
            <ul>
              {placeEvents.map((event, key) => (
                <EventListItem key={key} event={event} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
