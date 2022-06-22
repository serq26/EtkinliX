import moment from "moment";
import React from "react";

export default function Ticket2({ event, seatCategory }) {
  return (
    <div className="ticket">
      <div className="left">
        <div className="image">
          <img
            src={
              event.images.length > 0
                ? event.images[0].src
                : "/images/empty-image.png"
            }
            alt={event.title}
          />
          <p className="admit-one">
            <span>{seatCategory.split("-")[0]}</span>
            <span>{seatCategory.split("-")[0]}</span>
            <span>{seatCategory.split("-")[0]}</span>
          </p>
        </div>
        <div className="ticket-info">
          <p className="date">
            <span>{moment(event.startDate, "DD-MM-YYYY hh:mm:ss").format("ddd")}</span>
            <span className="june-29">
              {moment(event.startDate, "DD-MM-YYYY hh:mm:ss").format("Do MMMM")}
            </span>
            <span>{moment(event.startDate, "DD-MM-YYYY hh:mm:ss").format("YYYY")}</span>
          </p>
          <div className="show-name">
            <h1>{event.title}</h1>
            <h2>{event.owner}</h2>
          </div>
          <div className="time">
            <p>{seatCategory}</p>
          </div>
          <p className="location">
            <span>{event.place}</span>
            <span className="separator">
              <i className="far fa-smile"></i>
            </span>
            <span> / {event.city}</span>
          </p>
        </div>
      </div>
      <div className="right">
        <div className="right-info-container">
          <div className="show-name">
            <h1>{event.title}</h1>
            <h6>{event.category}</h6>
          </div>
          <div className="time">{seatCategory}</div>
          <div className="barcode">
            <img
              src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb"
              alt="QR code"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
