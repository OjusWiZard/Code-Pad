import React from 'react'
import './navbar.css'
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";

function navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
              <Nav.Link className="navbar-brand" to="/">
                Navbar
              </Nav.Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                      <ul className="navbar-nav mx-auto mt-4">
                        <li className="nav-item mx-2">
                          <Nav.Link className="text-center nav-link font-grey font-16 font-vcr" href="/">
                            HOME
                          </Nav.Link>
                        </li>
                        <li className="nav-item mx-2">
                          <Nav.Link className="text-center nav-link font-grey font-16 font-vcr" href="/events">
                            EVENTS
                          </Nav.Link>
                        </li>
                        <li className="nav-item mx-2">
                          <Nav.Link className="text-center nav-link font-grey font-16 font-vcr" href="/editor">
                            EDITOR
                          </Nav.Link>
                        </li>
                      </ul>
                      <Nav.Link className="text-center nav-link nav-item font-grey font-16 font-vcr" href="/login">
                         LOGIN
                      </Nav.Link>                      
                    </div>
                  </nav>
        </div>
    )
}

export default navbar
