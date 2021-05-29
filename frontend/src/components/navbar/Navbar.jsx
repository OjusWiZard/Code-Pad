import React from "react";
import "./navbar.css";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import logo from "../../images/home/logo.png";

function navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-xl">
        <Nav.Link className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Code-pad"
            className="img-fluid mx-0 px-0"
            width="120px"
          />
        </Nav.Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <Nav className="navbar-nav mx-auto mt-5">
            <NavLink
              exact
              to="/"
              activeClassName="active-nav-item"
              className="mr-5"
            >
              <Nav.Link
                className="text-center font-16 font-vcr font-blue nav-item"
                href="/"
              >
                HOME
              </Nav.Link>
            </NavLink>
            <NavLink
              to="/events"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <Nav.Link
                className="text-center nav-item font-blue font-16 font-vcr"
                href="/events"
              >
                EVENTS
              </Nav.Link>
            </NavLink>
            <NavLink
              to="/profile"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <Nav.Link
                className="text-center nav-item font-blue font-16 font-vcr"
                href="/profile"
              >
                PROFILE
              </Nav.Link>
            </NavLink>
            <NavLink
              to="/signup"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <Nav.Link
                className="text-center nav-item font-blue font-16 font-vcr"
                href="/signup"
              >
                SIGNUP
              </Nav.Link>
            </NavLink>
            <NavLink
              to="/editor"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <Nav.Link
                className="text-center nav-item font-blue font-16 font-vcr"
                href="/editor"
              >
                EDITOR
              </Nav.Link>
            </NavLink>
          </Nav>
          <NavLink
            to="/login"
            activeClassName="active-nav-item"
            className="mx-3"
          >
            <Nav.Link
              className="text-center nav-item font-blue font-16 font-vcr mt-n2"
              href="/login"
            >
              LOGIN
            </Nav.Link>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default navbar;
