import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllEvents } from "../../api/index";
import Spinner from "../utils/Spinner";
import Event from "../utils/Event";

// Image Imports
import Line from "../utils/Line";

// CSS Imports
import "./home.css";
import Codepad from "../utils/Codepad";

function Home() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getAllEvents()
      .then((data) => {
        let onGoingEvents = data?.filter((event) => event.status === "Ongoing");
        let upcomingEvents = data?.filter(
          (event) => event.status === "Upcoming"
        );
        let pastEvents = data?.filter((event) => event.status === "Past");
        if (onGoingEvents.length > 0) {
          setEvents(onGoingEvents);
        } else if (upcomingEvents.length > 0) {
          setEvents(upcomingEvents);
        } else {
          setEvents(pastEvents);
        }
        setLoading(false);
        return events;
      })
      .catch((err) => {
       console.log(err);
      });
  }, []);

  if (loading) return <Spinner />;
  else
    return (
      <div className="main-background">
        <div className="container pt-sm-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-10 col-10 mx-auto my-md-5 my-2 content-background px-lg-5 py-sm-3">
              <div>
                <div className="d-flex justify-content-center pt-md-5">
                  <Codepad />
                </div>
                <p className="font-robot font-lightGrey text-justify mt-5 font-14 font-weight-bold px-lg-5">
                  Codepad was created as a platform to help programmers make it
                  big in the world of algorithms, computer programming, and
                  programming contests. At Codepad, we work hard to revive the
                  geek in you by hosting a programming contest at the start of
                  the month and another smaller programming challenge in the
                  middle of the month.Codepad Long Challenge is a 10-day monthly
                  coding contest where you can show off your computer
                  programming skills. The significance being - it gives you
                  enough time to think about a problem, try different ways of
                  attacking the problem, read the concepts etc. If you’re
                  usually slow at solving problems and have ample time at hand,
                  this is ideal for you. We also put in a lot of efforts in
                  getting quality problems, which would, in turn, foster your
                  learning while solving them.
                </p>
                <div className="d-flex justify-content-center pt-5">
                  <Line />
                </div>
                {events.length > 0 && (
                  <div>
                    <h4 className="font-vcr font-blue mt-5 pt-4 text-center mb-4">
                      &lt;&lt;&nbsp;{events[0]?.status.toUpperCase()}{" "}
                      EVENTS&nbsp;&gt;&gt;
                    </h4>
                    <div className="row d-flex justify-content-center">
                      {events?.map((event, index) => (
                        <Event event={event} key={index} />
                      ))}
                    </div>
                    <div className="my-5 text-center button-hover px-5 home-events-button-bg">
                      <Link to="/events">
                        <div className="mt-4 see-all-buttons font-vcr px-5 pt-2 pb-3 text-black">
                          *ALL EVENTS*
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home;
