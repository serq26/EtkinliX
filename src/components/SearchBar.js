import React, { useEffect } from "react";
import { fetchEventBySearch } from "../api";
import { useEvents } from "../contexts/EventContext";

export default function SearchBar() {
  const { setEvents } = useEvents();

//   useEffect(() => {
//     const getEvent = async (paramName, value) => {
//       const data = await fetchEventWithParams("city", "İstanbul");
//       console.log(data);
//       setEvents(data);
//     };
//     getEvent();
//   }, []);

  const handleChange = async (e) => {
    const data = await fetchEventBySearch(e.target.value);
    setEvents(data);
  };

  return (
    <div className="col-3 searchBar">
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Etkinlik, Sanatçı yada Mekann Arayın"
        onChange={handleChange}
      />
    </div>
  );
}
