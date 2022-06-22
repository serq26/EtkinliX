import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { fetchEventById, fetchSimilarEvents, toTimeStamp } from "../api";
import SocialMediaShare from "../components/SocialMediaShare";
import urlSlug from "url-slug";
import moment from "moment";
import "moment/locale/tr";
import Loading from "../components/Loading";
import Ticket from "../components/Ticket";

export default function EventDetail() {
  const [event, setEvent] = useState({});
  const [similarEvents, setSimilarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seatCategory, setSeatCategory] = useState("");
  const { eventId } = useParams();
  const swiperRef = useRef(null);

  SwiperCore.use([Autoplay]);
  moment.locale("tr");

  useEffect(() => {
    const getEvent = async (eventId) => {
      const data = await fetchEventById(eventId);
      setEvent(data);
      setLoading(false);
    };

    getEvent(eventId);
  }, [eventId]);

  useEffect(() => {
    const getSimilarEvents = async (category, id) => {
      const data = await fetchSimilarEvents(category, id);
      setSimilarEvents(data);
      setLoading(false);
    };

    getSimilarEvents(event.category, eventId);
  }, [event.category, eventId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-8 col-lg-8">
          <div className="event-detail">
            {!loading ? (
              <div>
                <h2 className="title">
                  {event.title} <span>/ {event.owner}</span>
                </h2>
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
                    {event.images.length > 0 ? (
                      event.images.map((img, key) => (
                        <SwiperSlide key={key}>
                          <img src={img.src} alt={event.title} />
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <img src="/images/empty-image.png" alt="empty" />
                      </SwiperSlide>
                    )}
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
                <div className="category">
                  <span>
                    <img src="/icons/category.png" alt="category" />
                    Kategori: {event.category}
                  </span>
                </div>
                <div className="dates">
                  <span className="date">
                    <img src="/icons/calendar.png" alt="date" />
                    Başlangıç Tarihi: {moment(event.startDate, "DD-MM-YYYY hh:mm:ss").format("lll")}
                  </span>
                  <span className="date">
                    <img src="/icons/calendar.png" alt="date" />
                    Bitiş Tarihi: {moment(event.endDate, "DD-MM-YYYY hh:mm:ss").format("lll")}
                  </span>
                </div>
                <div className="event-description">
                  <h6>Etkinlik Açıklaması: </h6>
                  <p>{event.description}</p>
                </div>
                {!event.isTicketed && <h4 className="free-event"><img src="/icons/free.png" alt="free"/>Etkinlik Ücretsizdir</h4>}
                {event.isTicketed && toTimeStamp(event.startDate) >= Date.now() && (
                  <div>
                    <div className="seats">
                      <div className="left">
                        <h6>Bilet Al</h6>
                        <select
                          id="seats"
                          name="seats"
                          onChange={(e) => setSeatCategory(e.target.value)}
                        >
                          <option value="">Kategori Seçiniz</option>
                          {event.seats.map((item, index) => (
                            <option
                              value={`${item.category} - ${item.price}`}
                              key={index}
                            >
                              {item.category}
                            </option>
                          ))}
                        </select>
                        <span>Fiyat: {seatCategory.split("-")[1]}</span>
                        <button
                          type="button"
                          onClick={() => {
                            document.getElementById(
                              "small_modal"
                            ).style.display = "block";
                            document.getElementById(
                              "small_modal"
                            ).style.opacity = 1;
                          }}
                          disabled={seatCategory === "" ? true : false}
                        >
                          Satın Al
                        </button>
                      </div>
                      <div className="right">
                        <img
                          className="seat-plan"
                          src={event.seatPlan}
                          alt="Seat Plan"
                        />
                      </div>
                    </div>
                    <div
                      id="small_modal"
                      className="modal fade"
                      role="dialog"
                      aria-labelledby="mySmallModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="exampleModalLabel"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src="/icons/success.png"
                                alt="success"
                                style={{ marginRight: "8px" }}
                              />
                              Biletiniz Oluşturuldu
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => {
                                document.getElementById(
                                  "small_modal"
                                ).style.display = "none";
                                document.getElementById(
                                  "small_modal"
                                ).style.opacity = 0;
                              }}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <Ticket event={event} seatCategory={seatCategory} />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => {
                                document.getElementById(
                                  "small_modal"
                                ).style.display = "none";
                                document.getElementById(
                                  "small_modal"
                                ).style.opacity = 0;
                              }}
                            >
                              Tamam
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="col-xl-4 col-lg-4">
          <div className="event-map">
            <div className="title">
              <img src="/icons/location.png" alt="location" />
              <h5>Etkinlik Konumu:</h5>
            </div>
            <span className="place">
              <Link
                to={`/place/${urlSlug(event.place, {
                  dictionary: { ı: "i" },
                })}`}
              >
                {event.place}
              </Link>{" "}
              / {event.city}
            </span>
            <div
              className="map"
              dangerouslySetInnerHTML={{ __html: event.map }}
            />
          </div>
          <div className="share-block">
            <span>Etkinliği Paylaş: </span>
            <SocialMediaShare title={event.title} />
          </div>
          <div className="similar-events">
            <h5 className="title">Benzer Etkinlikler</h5>
            <ul>
              {similarEvents.map((e, key) => (
                <li key={key}>
                  <Link to={`/event/${e.id}`}>
                    <img
                      src={
                        e.images.length > 0
                          ? e.images[0].src
                          : "/images/empty-image.png"
                      }
                      alt={e.title}
                    />
                    <span>{e.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
