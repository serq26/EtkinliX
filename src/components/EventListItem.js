import React from 'react'
import { Link } from 'react-router-dom'

export default function EventListItem({event}) {
  return (
    <li>
        <Link to={`/event/${event.id}`}>
            <img src={event.images[0].src} alt={event.title} />
            <span>{event.title}</span>
            <span>{event.owner}</span>
            <span>{event.place} / {event.city}</span>
        </Link>
    </li>
  )
}
