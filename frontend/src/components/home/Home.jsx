import React from "react";
import logo from "../../images/home/logo.png";
import line from "../../images/home/line.png";
import frame from "../../images/home/Frame.png";
import button from "../../images/home/button.png";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <React.Fragment>
      <div className="main-background">
        <div className="dots">
          <div className="dot-1"></div>
          <div className="dot-2"></div>
          <div className="dot-3"></div>
          <div className="dot-4"></div>
          <div className="dot-5"></div>'
        </div>
        <div className="container pt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-11 col-11 mx-auto my-5 content-background px-lg-5">
              <div>
                <div className="d-flex justify-content-center pt-5">
                  <img src={logo} alt="" className="img-fluid" />
                </div>
                <p className="font-robot font-lightGrey text-justify mt-5 pt-3 font-14 font-weight-bold">
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
                <h4 className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold">
                  &lt;&lt;&nbsp;&nbsp;ONGOING EVENTS&nbsp;&nbsp;&gt;&gt;
                </h4>
                <div className="row d-flex justify-content-center mt-3">
                  <Link
                    to="/events/1"
                    className="button-hover link col-lg-4 col-md-4 col-sm-12 col-12 mt-3"
                  >
                    <div className="text-center">
                      <img src={frame} alt="" className="img-fluid frame" />
                      <div className="text-center pt-3">
                        <span className="font-vcr font-blue">CODEWARS</span>
                        <p className="date pt-1 font-robot">
                          ENDS ON 10-JAN-2018
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                    <div className="text-center">
                      <img src={frame} alt="" className="img-fluid frame" />
                      <div className="text-center pt-3">
                        <span className="font-vcr font-blue">CODEWARS</span>
                        <p className="date pt-1 font-robot">
                          ENDS ON 10-JAN-2018
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                    <div className="text-center">
                      <img src={frame} alt="" className="img-fluid frame" />
                      <div className="text-center pt-3">
                        <span className="font-vcr font-blue">CODEWARS</span>
                        <p className="date pt-1 font-robot">
                          ENDS ON 10-JAN-2018
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <Link to="/events">
                    <img src={button} alt="" className="img-fluid" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
