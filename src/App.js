import "./style.scss";
import { useEffect, useState } from "react";
import { fetchEventList, fetchEventWithParams } from "./api";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEventList();
      setEvents(data);
    };
    getEvents();
  }, []);

  // useEffect(() => {
  //   const getEvent = async (paramName, value) => {
  //     const data = await fetchEventWithParams("city", "İstanbul");
  //     console.log(data);
  //     setEvents(data);
  //   };
  //   getEvent();
  // }, []);

  return (
    <div>
      <Header />
      <div className="container events">
        <div className="row">
          {events.map((event, key) => (
            <div className="col-4 event-box" key={key}>
              <a href={`/event/${event.id}`} title={event.title}>
                <div className="event-image"><img src={event.images[0]} alt={event.title} /></div>
                <span className="title">{event.title}</span>
                <div className="event-box-footer">
                  <span className="place">{`${event.place} / ${event.city}`}</span>
                  <small className="date">
                    {event.startDate} / {event.endDate}
                  </small>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
