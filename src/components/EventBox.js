import React from "react";
import { Link } from "react-router-dom";
import urlSlug from 'url-slug';

export default function EventBox({ event }) {
  return (
    <div className="col-4 event-box">
      {/* <Link to={`/event/${event.id}`} title={event.title}> */}
        <div className="event-image">
          <img src={event.images[0].src} alt={event.title} />
        </div>
        <span className="title">{event.title}</span>
        <div className="event-box-footer">
          <Link to={`/place/${urlSlug(event.place,{dictionary:{'ı':'i'}})}`}>
            <span className="place">{`${event.place} / ${event.city}`}</span>
          </Link>
          <small className="date">
            {event.startDate} / {event.endDate}
          </small>
          <span>{event.category}</span>
        </div>
      {/* </Link> */}
    </div>
  );
}
