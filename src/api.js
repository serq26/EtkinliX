// var events = require("./data/events.json");
import events from "./data/events.json";
import urlSlug from "url-slug";

/**
 * Gets all events
 */
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(events);
  });
}

/**
 * Get data by id
 * @param {String} id
 */
function findById(id) {
  return new Promise((resolve, reject) => {
    const event = events.find((e) => e.id === id);
    resolve(event);
  });
}

/**
 * Searching for events by input text
 * @param {String} paramName
 * @param {String} value
 */
function findWithParams(paramName, value) {
  return new Promise((resolve, reject) => {
    const event = events.filter((e) => e[paramName] === value);
    resolve(event);
  });
}

/**
 * Searching for events by input text
 * @param {String} value
 */
function findBySearch(value) {
  return new Promise((resolve, reject) => {
    var results = [];
    var searchFields = ["title", "place", "owner"];
    var searchVal = value;
    for (var i = 0; i < events.length; i++) {
      for (var j = 0; j < searchFields.length; j++) {
        if (events[i][searchFields[j]].toLowerCase().includes(searchVal)) {
          !results.includes(events[i]) && results.push(events[i]);
        }
      }
    }
    resolve(results);
  });
}

function getCities() {
  return new Promise((resolve, reject) => {
    var cities = [];
    for (var i = 0; i < events.length; i++) {
      !cities.includes(events[i]["city"]) && cities.push(events[i]["city"]);
    }
    resolve(cities);
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    var categories = [];
    for (var i = 0; i < events.length; i++) {
      !categories.includes(events[i]["category"]) &&
        categories.push(events[i]["category"]);
    }
    resolve(categories);
  });
}

function getPlaces() {
  return new Promise((resolve, reject) => {
    var places = [];
    for (var i = 0; i < events.length; i++) {
      !places.includes(events[i]["place"]) && places.push(events[i]["place"]);
    }
    resolve(places);
  });
}

function getPlaceEvents(place) {
  return new Promise((resolve, reject) => {
    var placeEvents = events.filter(
      (event) => urlSlug(event.place, { dictionary: { ı: "i" } }) === place
    );

    resolve(placeEvents);
  });
}

function getEventsByFilter(filters) {
  return new Promise((resolve, reject) => {
    const filtered = events.filter((item) => {
      for (var key in filters) {
        if (!filters[key]) continue;

        if (item[key] !== filters[key]) return false;
      }
      return true;
    });
    resolve(filtered);
  });
}

function getOldEvents() {
  return new Promise((resolve, reject) => {
    const today = Date.now();
    const oldEvents = events.filter((e) =>Date.parse(e.startDate) < today);
    resolve(oldEvents);
  });
}

export const fetchEventList = async () => {
  const events = await findAll();
  return events;
};

export const fetchEventWithParams = async (paramName, value) => {
  const event = await findWithParams(paramName, value);
  return event;
};

export const fetchEventBySearch = async (searchText) => {
  const events = await findBySearch(searchText);
  return events;
};

export const fetchEventById = async (id) => {
  const event = await findById(id);
  return event;
};

export const fetchCities = async () => {
  const cities = await getCities();
  return cities;
};

export const fetchEventCategories = async () => {
  const categories = await getCategories();
  return categories;
};

export const fetchPlaces = async () => {
  const places = await getPlaces();
  return places;
};

export const fetchEventsByPlace = async (place) => {
  const events = await getPlaceEvents(place);
  return events;
};

export const fetchEventsByFilter = async (filters) => {
  const events = await getEventsByFilter(filters);
  return events;
};

export const fetchOldEvents = async () => {
  const oldEvents = await getOldEvents();
  return oldEvents;
};
