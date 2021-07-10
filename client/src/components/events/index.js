import React, { useState, useEffect } from "react";

// IAMAGE IMPORTS
import EventHeader from "../utils/EventHeader";
import Line from "../utils/Line";

import { useHistory } from "react-router-dom";
// CSS IMPORTS
import "./events.css";

// ALL EVENTS
import { getAllEvents } from "../../api/index";

// UTILITIES
import Spinner from "../utils/Spinner";
import Event from "../utils/Event";

function Events() {
  const history = useHistory();
  const [allEvents, setallEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents(history).then((data) => {
      setallEvents(data);
      setLoading(false);
    }).catch(err => {
      localStorage.clear();
      history.push("/login")
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ONGOING, UPCOMING, PAST EVENTS
  let onGoingEvents = allEvents?.filter((event) => event.status === "Ongoing");
  let upcomingEvents = allEvents?.filter(
    (event) => event.status === "Upcoming"
  );
  let pastEvents = allEvents?.filter((event) => event.status === "Past");

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main-background">
          <div className="container pt-lg-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-10 col-md-8 col-sm-10 col-10 mx-auto my-5 content-background px-lg-5 py-md-5">
                <div className="d-flex justify-content-center pt-md-5">
                 <EventHeader />
                </div>

                {/* ONGOING EVENTS */}
                {onGoingEvents?.length > 0 && (
                  <div>
                    <h4 className="font-vcr font-blue mt-5 pt-4 text-center font-24 mb-4">
                      &lt;&lt;&nbsp;ONGOING EVENTS&nbsp;&gt;&gt;
                    </h4>
                    <div className="row d-flex justify-content-center">
                      {onGoingEvents.map((event, index) => (
                        <Event event={event} key={index} />
                      ))}
                    </div>
                    <div className="d-flex justify-content-center pt-5">
                      <Line />
                    </div>
                  </div>
                )}

                {/* UPCOMING EVENTS */}
                {upcomingEvents?.length > 0 && (
                  <div>
                    <h4 className="font-vcr font-blue mt-5 pt-4 text-center font-24 mb-4">
                      &lt;&lt;&nbsp;UPCOMING EVENTS&nbsp;&gt;&gt;
                    </h4>
                    <div className="row d-flex justify-content-center">
                      {upcomingEvents.map((event, index) => (
                        <Event event={event} key={index} />
                      ))}
                    </div>
                  </div>
                )}

                {/* PAST EVENTS */}
                {pastEvents?.length > 0 && (
                  <div>
                    <div className="d-flex justify-content-center pt-4">
                      <Line />
                    </div>
                    <h4 className="font-vcr font-blue mt-5 pt-4 text-center font-24 mb-4">
                      &lt;&lt;&nbsp;PAST EVENTS&nbsp;&gt;&gt;
                    </h4>
                    <div className="row d-flex justify-content-center">
                      {pastEvents.map((event, index) => (
                        <Event event={event} key={index} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Events;
