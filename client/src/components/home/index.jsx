import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../api/index";
import Spinner from "../utils/Spinner";
import Event from "../utils/Event";

// Image Imports
import Line from "../utils/Line";

// CSS Imports
import "./home.css";
import Codepad from "../utils/Codepad";

function Home() {
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
                  CodePad is the Competetive Programming platform of JSSATEN.
                  This platform is way cooler than a normal coding website
                  because of it's Retro VCR Design, Integrated Coding Editor for
                  45+ languages, Programming Contests, and their Live
                  Leaderboards. At CodePad, The Nibble Computer Society will
                  conduct multiple Programming Competitions to revive the geek
                  in you, and keep promoting the coding culture in our college.
                  So, charge all your laptops and Happy Coding!
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
