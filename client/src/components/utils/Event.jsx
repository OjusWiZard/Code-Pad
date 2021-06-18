import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function Event({ event }) {
  return (
    <div className="col-lg-4 col-md-4 col-sm-12 col-12 ">
      <Link
        key={event.url}
        to={`/events/${event.slug}`}
        className="button-hover link mt-3"
      >
        {console.log(event)}
        <div className="text-center">
          <img src={event.icon} alt="" className="img-fluid frame p-3" />
          <div className="text-center pt-3">
            <span className="font-vcr font-blue">{event.title}</span>
            <p className="date pt-1 pb-4 font-robot">
              {moment(event?.datetime).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Event;
