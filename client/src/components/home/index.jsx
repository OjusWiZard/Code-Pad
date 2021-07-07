import React, { useEffect, useState } from "react";
import logo from "../../images/home/logo.svg";
import line from "../../images/home/line.svg";
import { Link, useHistory } from "react-router-dom";
import { getAllEvents } from "../../api/index";
import Spinner from "../utils/Spinner";
import Event from "../utils/Event";
import "./home.css";

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
        localStorage.clear();
        history.push("/login");
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
                  <img src={logo} alt="Codepad" className="img-fluid" />
                </div>
                <p className="font-robot font-lightGrey text-justify mt-5 font-14 font-weight-bold px-lg-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. amet
                  qui! Sed, distinctio maiores consequatur velit, voluptatibus
                  deleniti voluptate suscipit corrupti odio amet inventore sunt,
                  esse molestiae et iusto tenetur laboriosam ipsam ab nemo harum
                  impedit. Soluta enim magni eligendi a? Facere corporis
                  voluptates impedit sit reiciendis deserunt harum doloribus
                  repudiandae tempora accusantium ipsum esse suscipit,
                  voluptatem alias assumenda vero consequatur iste odio error
                  incidunt, iusto quibusdam repellendus. In, eveniet corrupti!
                  Impedit ipsa at accusamus velit suscipit. Voluptates nihil
                  omnis, aliquam modi, impedit unde.
                </p>
                <div className="d-flex justify-content-center pt-5">
                  <img src={line} alt="" className="img-fluid" />
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
