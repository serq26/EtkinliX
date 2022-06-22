import React, { useEffect, useRef, useState } from "react";
import EventBox from "../components/EventBox";
import { useEvents } from "../contexts/EventContext";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import EventFilter from "../components/EventFilter";
import Loading from "../components/Loading";
import { getPopularEvents } from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [popularEvents, setPopularEvents] = useState([]);
  const { events, loading, setLoading } = useEvents();

  const swiperRef = useRef(null);

  useEffect(() => {
    const popularEvents = async (eventId) => {
      const data = await getPopularEvents(eventId);
      setPopularEvents(data);
      setLoading(false);
    };

    popularEvents();
  }, []);

  return !loading ? (
    <div className="events">
      <div className="home-slide">
        <Swiper
          className="mySwiper"
          ref={swiperRef}
          slidesPerView={1}
          speed={1000}
          autoPlay={true}
          loop={true}
          delay={1000}
        >
          {popularEvents.map((event, key) => (
            <SwiperSlide key={key}>
              <Link
                to={`/event/${event.id}`}
                style={{ display: "block", height: "100%", width: "100%" }}
              >
                <img
                  src={
                    event.images.length > 0
                      ? event.images[0].src
                      : "/images/empty-image.png"
                  }
                  alt={event.title}
                />
                <div className="slide-texts">
                  <h2>{event.title}</h2>
                  <span>{event.owner}</span>
                  <div className="dates">
                    <img src="/icons/calendar.png" alt="date" />
                    <span>
                      {event.startDate} - {event.endDate}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className="prev"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <img src="/icons/arrow.png" alt="Prev" />
        </button>
        <button
          className="next"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <img src="/icons/arrow.png" alt="Next" />
        </button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <EventFilter />
          </div>
        </div>
        <div className="row">
          {events.map((event, key) => (
            <EventBox key={key} event={event} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
