import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

export default function EventListItem({event}) {
  moment.locale('tr');
  return (
    <li>
        <Link to={`/event/${event.id}`}>
            <div className='left'>
              <img src={event.images.length > 0 ? event.images[0].src : "/images/empty-image.png"} alt={event.title} />
            </div>
            <div className='right'>
              <span>{event.title} / {event.owner}</span>
              <span><img src="/icons/location.png" alt="location"/>{event.place} / {event.city}</span>
              <span><img src="/icons/calendar.png" alt="location"/>{moment(event.startDate, "DD-MM-YYYY hh:mm:ss").format("lll")} - {moment(event.endDate, "DD-MM-YYYY hh:mm:ss").format("lll")}</span>
            </div>
        </Link>
    </li>
  )
}
