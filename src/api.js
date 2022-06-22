import events from "./data/events.json";
import urlSlug from "url-slug";

/**
 * Gets all events
 */
function findAll() {
  return new Promise((resolve, reject) => {
    const today = Date.now();
    const newEvents = events.filter((e) => toTimeStamp(e.startDate) >= today);
    resolve(newEvents);
  });
}

/**
 * Get data by page params start and end
 * @param {Number} start
 * @param {Number} end
 */
let arrayForHoldingPosts = [];
function findAllWithPage(start, end) {
  return new Promise((resolve, reject) => {
    const slicedPosts = events.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    resolve(arrayForHoldingPosts);
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

/**
 * Gets a list of cities where events are held in the database
 */
function getCities() {
  return new Promise((resolve, reject) => {
    var cities = [];
    for (var i = 0; i < events.length; i++) {
      !cities.includes(events[i]["city"]) && cities.push(events[i]["city"]);
    }
    resolve(cities);
  });
}

/**
 * Gets a list of categories where events are held in the database
 */
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

/**
 * Gets a list of places where events are held in the database
 */
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

/**
 * Get event by filters
 * @param {Object} filters
 * @param {String} filters.city
 * @param {String} filters.category
 * @param {String} filters.place
 */
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

/**
 * Gets out-of-date events events
 */
function getOldEvents() {
  return new Promise((resolve, reject) => {
    const today = Date.now();
    const oldEvents = events.filter((e) => toTimeStamp(e.startDate) < today);
    console.log(oldEvents)
    resolve(oldEvents);
  });
}

/**
 * Returns similar events based on the given event
 * @param {String} category
 * @param {Number} id
 */
function getSimilarEvents(category, id) {
  return new Promise((resolve, reject) => {
    const similarEvents = events.filter(
      (e) => e.category === category && e.id !== id
    );
    resolve(similarEvents);
  });
}

export function toTimeStamp(dateStr) {
  const justDate = dateStr.split(" ")[0];
  const [day, month, year] = justDate.split("-");
  return Date.parse(
    year + "/" + month + "/" + day + " " + dateStr.split(" ")[1]
  );
}

export function toTimeStamp2(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return Date.parse(
    year + "/" + month + "/" + day + " "
  );
}

/**
 * Returns events from the given start date
 * @param {String} date
 */
function getEventsByStartDate(date) {
  return new Promise((resolve, reject) => {
    const result = events.filter(
      (e) => toTimeStamp(e.startDate) >= Date.parse(date)
    );
    resolve(result);
  });
}

/**
 * Returns events from the given start date
 * @param {String} date
 */
function getEventsByEndDate(date) {
  return new Promise((resolve, reject) => {
    const result = events.filter(
      (e) => toTimeStamp(e.startDate) <= Date.parse(date)
    );
    resolve(result);
  });
}

/**
 * Returns events from the given dates
 * @param {String} starDate
 * @param {String} endDate
 */
 function getEventsByDate(startDate="01-01-2010",endDate="01-01-2030") {
  return new Promise((resolve, reject) => {
    const result = events.filter(
      (e) => toTimeStamp(e.startDate) >= toTimeStamp2(startDate) && toTimeStamp(e.startDate) <= toTimeStamp2(endDate)
    );
    resolve(result);
  });
}

/**
 * Get all popular events
 */
export const getPopularEvents = () => {
  const popularEvents = events
    .sort(() => Math.random() - Math.random())
    .slice(0, 4);
  return popularEvents;
};

export const fetchEventList = async () => {
  const events = await findAll();
  return events;
};

export const fetchEventListWithPage = async (start, end) => {
  const events = await findAllWithPage(start, end);
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

export const fetchSimilarEvents = async (category, id) => {
  const similarEvents = await getSimilarEvents(category, id);
  return similarEvents;
};

export const fetchEventsByStartDate = async (date) => {
  const sEvents = await getEventsByStartDate(date);
  return sEvents;
};

export const fetchEventsByEndDate = async (date) => {
  const eEvents = await getEventsByEndDate(date);
  return eEvents;
};

export const fetchEventsByDate = async (startDate,endDate) => {
  const eEvents = await getEventsByDate(startDate,endDate);
  return eEvents;
};
