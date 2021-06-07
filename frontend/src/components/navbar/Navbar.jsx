import React, { useState } from "react";
import "./navbar.css";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/home/logo.svg";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const handleClick = () => {
    setSidebar(!sidebar);
    if(sidebar){
      document.getElementById('sidebar').style.display = 'block'
    }else{
      document.getElementById('sidebar').style.display = 'none'
    }
  }
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
          aria-label="Toggle navigation"
          onClick={handleClick}
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-2x fa-grip-lines font-blue"></i>
          </span>
        </button>
        <div class="search-overlay" id="sidebar">
          <div class="search-content">
            <div class="clearfix" onClick={handleClick} style={{cursor: 'pointer'}}>
              <i class="fas fa-times-circle fa-2x text-white float-right mb-4"></i>
            </div>
            <Link to="/">
              <div className="mt-3 font-vcr font-blue font-25">Home</div>
            </Link>
            <Link to="/events">
              <div className="mt-3 font-vcr font-blue font-25">Events</div>
            </Link>
            <Link to="/profile">
              <div className="mt-3 font-vcr font-blue font-25">Profile</div>
            </Link>
            <Link to="/signup">
              <div className="mt-3 font-vcr font-blue font-25">Signup</div>
            </Link>
            <Link to="/login">
              <div className="mt-3 font-vcr font-blue font-25">Login</div>
            </Link>
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

export default Navbar;
