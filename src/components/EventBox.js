import React from "react";
import { Link } from "react-router-dom";
import urlSlug from "url-slug";
import moment from "moment";
import 'moment/locale/tr';

export default function EventBox({ event }) {
  moment.locale("tr");


  return (
    <div className="col-xl-4 col-md-6 col-lg-4">
      <div className="event-box">
        <Link to={`/event/${event.id}`} title={event.title}>
          <div className="event-image">
            <img src={event.images.length > 0 ? event.images[0].src : `/images/empty-image.png`} alt={event.title} />
          </div>
        </Link>
        <div className="event-box-footer">
          <Link to={`/event/${event.id}`} title={event.title}>
            <span className="title">{event.title}</span>
          </Link>
          <Link
            to={`/place/${urlSlug(event.place, { dictionary: { ı: "i" } })}`}
          >
            <div className="place">
              <img src="/icons/location.png" alt="location" />
              <span>{`${event.place} / ${event.city}`}</span>
            </div>
          </Link>
          <small className="date">
            <img src="/icons/calendar.png" alt="date" />
            {moment(event.startDate, "DD-MM-YYYY hh:mm:ss").format("lll")} -{" "}
            {moment(event.endDate, "DD-MM-YYYY hh:mm:ss").format("lll")}
          </small>
          <span className="category">{event.category}</span>
        </div>
      </div>
    </div>
  );
}
