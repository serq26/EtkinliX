import React, { useEffect, useState } from "react";
import EventBox from "../components/EventBox";
import { useEvents } from "../contexts/EventContext";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [popularEvents, setPopularEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { events } = useEvents();

  useEffect(() => {
    const popularEvents = events
      .sort(() => Math.random() - Math.random())
      .slice(0, 2);
    setPopularEvents(popularEvents);
    setLoading(false);
  }, [events]);

  return (
    <div className="container events">
      {!loading && (
        <Swiper
          className="mySwiper"
          spaceBetween={50}
          slidesPerView={1}
          speed={1200}
        >
          {popularEvents.map((event, key) => (
            <SwiperSlide key={key}>
              <img src={event.images[0].src} alt={event.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="row">
        {events.map((event, key) => (
          <EventBox key={key} event={event} />
        ))}
      </div>
    </div>
  );
}
