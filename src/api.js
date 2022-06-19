var events = require("./data/events.json");

/**
 * Gets all events
 */
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(events);
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
    var searchField = "title";
    var searchVal = value;
    for (var i = 0; i < events.length; i++) {
      if (events[i][searchField].includes(searchVal)) {
        results.push(events[i]);
      }
    }
    resolve(results);
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
