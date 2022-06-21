import React, { useEffect, useState } from "react";
import {
  fetchCities,
  fetchEventCategories,
  fetchEventList,
  fetchEventsByFilter,
  fetchEventWithParams,
  fetchPlaces,
} from "../api";
import { useEvents } from "../contexts/EventContext";
import moment from 'moment';

export default function EventFilter() {
  const { events, setEvents } = useEvents();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    category: "",
    place: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    const getDataByFilters = async (filters) => {
      setEvents(await fetchEventsByFilter(filters));
    }

    getDataByFilters(filters);

    // return(
    //   getDataByFilters(filters)
    // )
  }, [filters]);

  // Gets all cities
  useEffect(() => {
    const getCities = async () => {
      setCities(await fetchCities());
    };

    getCities();
  }, []);

  // Gets all event categories
  useEffect(() => {
    const getCategpries = async () => {
      setCategories(await fetchEventCategories());
    };

    getCategpries();
  }, []);

  // Gets all places
  useEffect(() => {
    const getPlaces = async () => {
      setPlaces(await fetchPlaces());
    };

    getPlaces();
  }, []);

  return (
    <div className="filters">
      <select
        id="city"
        name="city"
        onChange={async (e) => {
          // if (!e.target.value) return setEvents(await fetchEventList());

          // const filteredEvents = await fetchEventWithParams(
          //   "city",
          //   e.target.value
          // );
          // setEvents(filteredEvents);
          setFilters({...filters, city: e.target.value});
        }}
      >
        <option value="">Tüm Şehirler</option>
        {cities.map((city, key) => (
          <option value={city} key={key}>
            {city}
          </option>
        ))}
      </select>
      <select
        id="category"
        name="category"
        onChange={async (e) => {
          // if (!e.target.value) return setEvents(await fetchEventList());

          // const filteredEvents = await fetchEventWithParams(
          //   "category",
          //   e.target.value
          // );
          // setEvents(filteredEvents);
          setFilters({...filters, category: e.target.value});      
        }}
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map((category, key) => (
          <option value={category} key={key}>
            {category}
          </option>
        ))}
      </select>
      <select
        id="place"
        name="place"
        onChange={async (e) => {
          // if (!e.target.value) return setEvents(await fetchEventList());

          // const filteredEvents = await fetchEventWithParams(
          //   "place",
          //   e.target.value
          // );
          // setEvents(filteredEvents);
          setFilters({...filters, place: e.target.value});      
        }}
      >
        <option value="">Tüm Mekanlar</option>
        {places.map((place, key) => (
          <option value={place} key={key}>
            {place}
          </option>
        ))}
      </select>
      <div>
        <input type="date" name="startDate" id="startDate" onChange={(e) => setFilters({...filters, startDate: moment(e.target.value).format("DD-MM-YYYY") })} />
        <input type="date" name="endDate" id="endDate" onChange={(e) => setFilters({...filters, endDate: moment(e.target.value).format("DD-MM-YYYY")})} />
      </div>
      {JSON.stringify(filters)}
    </div>
  );
}
