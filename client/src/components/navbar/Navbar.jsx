import React, { useState, useEffect } from "react";
import "./navbar.css";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import toggle from "../../images/common/toggle.svg";
import logo from "../../images/home/logo.svg";
import { signOut } from "../../api";
import close from "../../images/common/close.svg";

function Navbar() {
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const handleClick = () => {
    setSidebar(!sidebar);
    if (sidebar) {
      document.getElementById("sidebar").style.display = "block";
    } else {
      document.getElementById("sidebar").style.display = "none";
    }
  };
  const history = useHistory();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    setSidebar(false);
    document.getElementById("sidebar").style.display = "none";
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-xl">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Code-pad"
            className="img-fluid mx-0 px-0"
            width="120px"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={handleClick}
        >
          <span className="navbar-toggler-icon">
            <img src={toggle} alt="toggle"  width="35px" height="35px" />
          </span>
        </button>
        <div className="sidebar" id="sidebar">
          <div className="sidebar-content">
            <div
              className="clearfix"
              onClick={handleClick}
              style={{ cursor: "pointer", textAlign: 'right'}}
            >
              <img src={close} alt="close" width="30px" height="30px" />
            </div>
            <Link to="/">
              <div className="mt-3 font-vcr font-25 px-3 line home">
                Home
              </div>
            </Link>
            <Link to="/events">
              <div className="mt-3 font-vcr font-25 px-3 line">
                Events
              </div>
            </Link>
            {token ? (
              <>
                <Link to="/profile">
                  <div className="mt-3 font-vcr font-25 px-3">
                    Profile
                  </div>
                </Link>
                <div onClick={() => signOut(history)}>
                  <div className="mt-3 font-vcr font-25 px-3">
                    Logout
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <div className="mt-3 font-vcr font-25 px-3">
                    Signup
                  </div>
                </Link>
                <Link to="/login">
                  <div className="mt-3 font-vcr font-25 px-3">
                    Login
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <Nav className="navbar-nav mx-auto mt-5">
            <NavLink
              exact
              to="/"
              activeClassName="active-nav-item"
              className="mr-5"
            >
              <NavLink
                className="p-3 text-center p-3 font-16 font-vcr font-blue line nav-item"
                exact
                to="/"
              >
                HOME
              </NavLink>
            </NavLink>
            <NavLink
              to="/events"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr line"
                exact
                to="/events"
              >
                EVENTS
              </NavLink>
            </NavLink>
            {token ? (
              <NavLink
                to="/profile"
                activeClassName="active-nav-item"
                className="mx-5"
              >
                <NavLink
                  className="text-center p-3 nav-item font-blue font-16 font-vcr line"
                  exact
                  to="/profile"
                >
                  PROFILE
                </NavLink>
              </NavLink>
            ) : (
              <NavLink
                to="/signup"
                activeClassName="active-nav-item"
                className="mx-5"
              >
                <NavLink
                  className="text-center p-3 nav-item font-blue font-16 font-vcr line"
                  exact
                  to="/signup"
                >
                  SIGNUP
                </NavLink>
              </NavLink>
            )}

            <NavLink
              to="/editor"
              activeClassName="active-nav-item"
              className="ml-5"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr editor"
                exact
                to="/editor"
              >
                EDITOR
              </NavLink>
            </NavLink>
          </Nav>
          {!token ? (
            <NavLink
              to="/login"
              activeClassName="active-nav-item"
              className="mx-3"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr mt-n2 login"
                exact
                to="/login"
              >
                LOGIN
              </NavLink>
            </NavLink>
          ) : (
            <div className="mx-3" style={{ cursor: "pointer" }}>
              <span
                className="text-center p-3 nav-item font-blue font-16 font-vcr mt-n2 login"
                onClick={() => signOut(history)}
              >
                LOGOUT
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
