var events = require('./data/events.json');

function findAll() {
    return new Promise((resolve,reject) => {
        resolve(events);
    })
}

function findWithParams(paramName,value) {
    return new Promise((resolve,reject) => {
        const event = events.filter(e => e[paramName] === value);
        resolve(event);
    })
}

export const fetchEventList = async () => {
  const events = await findAll();
  return events;
}

export const fetchEventWithParams = async (paramName,value) => {
  const event = await findWithParams(paramName,value);
  return event;
}