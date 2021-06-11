import React, { useState, useEffect } from "react";
import frame from "../../images/events/Frame.svg";
import logo from "../../images/events/event_logo.svg";
import line from "../../images/home/line.png";
import { Link } from "react-router-dom";
import "./events.css";
import { getAllEvents } from "../../api/index";
import Spinner from "../utils/Spinner";

function Events() {
  const [allEvents, setallEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllEvents().then((data) => {
      setallEvents(data);
      setLoading(false);
    });
    return () => {
      setallEvents([]);
    };
  }, []);
  let onGoingEvents = allEvents?.filter((event) => event.status === "Ongoing");
  let upcomingEvents = allEvents?.filter(
    (event) => event.status === "Upcoming"
  );
  let pastEvents = allEvents?.filter((event) => event.status === "Past");
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main-background">
          <div className="container pt-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8 col-md-8 col-sm-11 col-11 mx-auto my-5 content-background  px-lg-5 py-3">
                <div className="d-flex justify-content-center pt-5">
                  <img src={logo} alt="" className="img-fluid" />
                </div>
                <h4
                  className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold"
                  id="ongoing"
                >
                  &lt;&lt;&nbsp;&nbsp;ONGOING EVENTS&nbsp;&nbsp;&gt;&gt;
                </h4>
                <div className="row d-flex justify-content-center mt-3">
                  {onGoingEvents?.map((event, index) => (
                    <Link
                      key={event.url}
                      to={`/events/${event.slug}`}
                      className="button-hover link col-lg-4 col-md-4 col-sm-12 col-12 mt-3"
                    >
                      {console.log(event)}
                      <div className="text-center">
                        <img
                          src={event.icon}
                          alt=""
                          className="img-fluid frame"
                        />
                        <div className="text-center pt-3">
                          <span className="font-vcr font-blue">
                            {event.title}
                          </span>
                          <p className="date pt-1 font-robot">
                            {event.datetime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="d-flex justify-content-center pt-5">
                  <img src={line} alt="" className="img-fluid" />
                </div>
                <h4
                  className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold"
                  id="ongoing"
                >
                  &lt;&lt;&nbsp;&nbsp;UPCOMING EVENTS&nbsp;&nbsp;&gt;&gt;
                </h4>
                <div className="row d-flex justify-content-center mt-3">
                  {upcomingEvents?.map((event, index) => (
                    <Link
                      key={event.url}
                      to={`/events/${event.slug}`}
                      className="button-hover link col-lg-4 col-md-4 col-sm-12 col-12 mt-3"
                    >
                      {console.log(event)}
                      <div className="text-center">
                        <img
                          src={event.icon}
                          alt=""
                          className="img-fluid frame"
                        />
                        <div className="text-center pt-3">
                          <span className="font-vcr font-blue">
                            {event.title}
                          </span>
                          <p className="date pt-1 pb-4 font-robot">
                            {event.datetime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="d-flex justify-content-center pt-4">
                  <img src={line} alt="" className="img-fluid" />
                </div>
                <h4
                  className="font-vcr font-blue mt-5 pt-3 text-center font-weight-bold"
                  id="ongoing"
                >
                  &lt;&lt;&nbsp;&nbsp;PAST EVENTS&nbsp;&nbsp;&gt;&gt;
                </h4>
                <div className="row d-flex justify-content-center mt-3">
                  {pastEvents?.map((event, index) => (
                    <Link
                      key={event.url}
                      to={`/events/${event.slug}`}
                      className="button-hover link col-lg-4 col-md-4 col-sm-12 col-12 mt-3"
                    >
                      {console.log(event)}
                      <div className="text-center">
                        <img
                          src={event.icon}
                          alt=""
                          className="img-fluid frame"
                        />
                        <div className="text-center pt-3">
                          <span className="font-vcr font-blue">
                            {event.title}
                          </span>
                          <p className="date pt-1 pb-4 font-robot">
                            {event.datetime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default Events;
