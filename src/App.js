import "./style.scss";
import Header from "./components/Header";
import EventBox from "./components/EventBox";
import { useEvents } from "./contexts/EventContext";

function App() {
  const {events} = useEvents();
  
  // useEffect(() => {
  //   const getEvents = async () => {
  //     const data = await fetchEventList();
  //     setEvents(data);
  //   };
  //   getEvents();
  // }, []);

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
            <EventBox key={key} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
