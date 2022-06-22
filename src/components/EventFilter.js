import React, { useEffect, useState } from "react";
import {
  fetchCities,
  fetchEventCategories,
  fetchEventsByDate,
  fetchEventsByEndDate,
  fetchEventsByFilter,
  fetchEventsByStartDate,
  fetchPlaces,
} from "../api";
import { useEvents } from "../contexts/EventContext";

export default function EventFilter() {
  const { events, setEvents } = useEvents();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [filters, setFilters] = useState({
    city: "",
    category: "",
    place: "",
  });

  // Get events by filter
  useEffect(() => {
    const getDataByFilters = async (filters) => {
      setEvents(await fetchEventsByFilter(filters));
    };

    getDataByFilters(filters);
  }, [filters]);

    // Get event by dates filter
    useEffect(() => {
      if (endDate !== undefined || startDate !== undefined) {
        const getDataByDate = async (startDate,endDate) => {
          setEvents(await fetchEventsByDate(startDate,endDate));
        };
  
        getDataByDate(startDate,endDate);
      }
    }, [startDate,endDate]);

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
      <div className="form-group">
        <label>Şehir</label>
        <select
          id="city"
          name="city"
          onChange={async (e) => {
            setFilters({ ...filters, city: e.target.value });
          }}
        >
          <option value="">Tüm Şehirler</option>
          {cities.map((city, key) => (
            <option value={city} key={key}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Kategori</label>
        <select
          id="category"
          name="category"
          onChange={async (e) => {
            setFilters({ ...filters, category: e.target.value });
          }}
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((category, key) => (
            <option value={category} key={key}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Mekan</label>
        <select
          id="place"
          name="place"
          onChange={async (e) => {
            setFilters({ ...filters, place: e.target.value });
          }}
        >
          <option value="">Tüm Mekanlar</option>
          {places.map((place, key) => (
            <option value={place} key={key}>
              {place}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Başlangıç Tarihi:</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Bitiş Tarihi:</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <span>{startDate}</span>
      <span>-  {endDate}</span>
    </div>
  );
}
