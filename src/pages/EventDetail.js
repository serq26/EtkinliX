import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchEventById } from "../api";

export default function EventDetail() {
  const [event, setEvent] = useState({});
  const [loading,setLoading] = useState(true);
  const { eventId } = useParams();

  useEffect(() => {
    const getEvent = async (eventId) => {
      const data = await fetchEventById(eventId);
      console.log(data);
      setEvent(data);
      setLoading(false);
    };

    getEvent(eventId);
  }, [eventId]);

  return (
    <div>
      {!loading  ? (<div>
        {event.title}
        <Swiper
          className="mySwiper"
          spaceBetween={50}
          slidesPerView={1}
          speed={1200}
        >
          <SwiperSlide>
            <img src={event.images[0].src} alt={event.title} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={event.images[1].src} alt={event.title} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={event.images[2].src} alt={event.title} />
          </SwiperSlide>
        </Swiper>
        <div dangerouslySetInnerHTML={{ __html: event.map }} />
      </div>)
      :(
        <div>Loading...</div>
      )
      }
    </div>
  );
}
