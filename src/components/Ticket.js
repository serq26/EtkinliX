import moment from "moment";
import React from "react";

export default function Ticket2({ event, seatCategory }) {
  return (
    <div class="ticket">
      <div class="left">
        <div class="image">
          <img
            src={
              event.images.length > 0
                ? event.images[0].src
                : "/images/empty-image.png"
            }
            alt={event.title}
          />
          <p class="admit-one">
            <span>{seatCategory.split("-")[0]}</span>
            <span>{seatCategory.split("-")[0]}</span>
            <span>{seatCategory.split("-")[0]}</span>
          </p>
        </div>
        <div class="ticket-info">
          <p class="date">
            <span>{moment(event.startDate).format("dddd")}</span>
            <span class="june-29">
              {moment(event.startDate).format("Do MMMM")}
            </span>
            <span>{moment(event.startDate).format("yyyy")}</span>
          </p>
          <div class="show-name">
            <h1>{event.title}</h1>
            <h2>{event.owner}</h2>
          </div>
          <div class="time">
            <p>{seatCategory}</p>
          </div>
          <p class="location">
            <span>{event.place}</span>
            <span class="separator">
              <i class="far fa-smile"></i>
            </span>
            <span> / {event.city}</span>
          </p>
        </div>
      </div>
      <div class="right">
        <div class="right-info-container">
          <div class="show-name">
            <h1>{event.title}</h1>
            <h6>{event.category}</h6>
          </div>
          <div class="time">{seatCategory}</div>
          <div class="barcode">
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
