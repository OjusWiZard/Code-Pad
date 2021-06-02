import React from "react";
import "./navbar.css";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import logo from "../../images/home/logo.svg";

function navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-xl">
        <NavLink className="navbar-brand" exact to="/">
          <img
            src={logo}
            alt="Code-pad"
            className="img-fluid mx-0 px-0"
            width="120px"
          />
        </NavLink>
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
              <NavLink
                className="p-3 text-center p-3 font-16 font-vcr font-blue nav-item"
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
                className="text-center p-3 nav-item font-blue font-16 font-vcr"
                exact
                to="/events"
              >
                EVENTS
              </NavLink>
            </NavLink>
            <NavLink
              to="/profile"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr"
                exact
                to="/profile"
              >
                PROFILE
              </NavLink>
            </NavLink>
            <NavLink
              to="/signup"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr"
                exact
                to="/signup"
              >
                SIGNUP
              </NavLink>
            </NavLink>
            <NavLink
              to="/editor"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr"
                exact
                to="/editor"
              >
                EDITOR
              </NavLink>
            </NavLink>
          </Nav>
          <NavLink
            to="/login"
            activeClassName="active-nav-item"
            className="mx-3"
          >
            <NavLink
              className="text-center p-3 nav-item font-blue font-16 font-vcr mt-n2"
              exact
              to="/login"
            >
              LOGIN
            </NavLink>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default navbar;
