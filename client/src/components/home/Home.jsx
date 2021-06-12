import React, { useEffect, useState } from "react";
import logo from "../../images/home/logo.svg";
import line from "../../images/home/line.svg";
import button from "../../images/home/button.svg";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../api/index";
import Spinner from "../utils/Spinner";
import Event from "../utils/Event";
import "./home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [allEvents, setallEvents] = useState([]);
  useEffect(() => {
    getAllEvents().then((data) => {
      setallEvents(data);
      setLoading(false);
    });
  }, []);
  let onGoingEvents = allEvents?.filter((event) => event.status === "Ongoing");
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main-background">
          <div className="container pt-lg-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8 col-md-10 col-sm-11 col-11 mx-auto my-lg-5 my-2 content-background px-lg-5 py-3">
                <div>
                  <div className="d-flex justify-content-center pt-5">
                    <img src={logo} alt="Codepad" className="img-fluid" />
                  </div>
                  <p className="font-robot font-lightGrey text-justify mt-5 pt-3 font-14 font-weight-bold px-lg-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    amet qui! Sed, distinctio maiores consequatur velit,
                    voluptatibus deleniti voluptate suscipit corrupti odio amet
                    inventore sunt, esse molestiae et iusto tenetur laboriosam
                    ipsam ab nemo harum impedit. Soluta enim magni eligendi a?
                    Facere corporis voluptates impedit sit reiciendis deserunt
                    harum doloribus repudiandae tempora accusantium ipsum esse
                    suscipit, voluptatem alias assumenda vero consequatur iste
                    odio error incidunt, iusto quibusdam repellendus. In,
                    eveniet corrupti! Impedit ipsa at accusamus velit suscipit.
                    Voluptates nihil omnis, aliquam modi, impedit unde.
                  </p>
                  <div className="d-flex justify-content-center pt-5">
                    <img src={line} alt="" className="img-fluid" />
                  </div>
                  {onGoingEvents && (
                    <div>
                      <h4 className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold">
                        &lt;&lt;&nbsp;ONGOING EVENTS&nbsp;&gt;&gt;
                      </h4>
                      <div className="row d-flex justify-content-center mt-3">
                        {onGoingEvents?.map(
                          (event, index) =>
                            index < 3 && (
                              <Event event={event}/>
                            )
                        )}
                      </div>
                    </div>
                  )}
                  <div className="my-5 text-center">
                    <Link to="/events">
                      <img src={button} alt="" className="img-fluid" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Home;
