import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchEventById } from "../api";
import SocialMediaShare from "../components/SocialMediaShare";

export default function EventDetail() {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [seatCategory, setSeatCategory] = useState("");
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
      {!loading ? (
        <div>
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
          <SocialMediaShare title={event.title} />
          {event.isTicketed && <div className="seats">
            <select
              id="seats"
              name="seats"
              onChange={(e) => setSeatCategory(e.target.value)}
            >
              {event.seats.map((item, index) => (
                <option value={`${item.category} - ${item.price}`} key={index}>
                  {item.category}
                </option>
              ))}
            </select>
            {seatCategory}
          </div>}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
