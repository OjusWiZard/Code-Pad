import React from 'react'
import { NavLink } from 'react-bootstrap';
import './navbar.css'

function navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
              <NavLink className="navbar-brand" to="/">
                Navbar
              </NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                      <ul className="navbar-nav mx-auto mt-4">
                        <li className="nav-item mx-2">
                          <NavLink className="text-center nav-link font-grey font-16 font-vcr" to="/">
                            HOME
                          </NavLink>
                        </li>
                        <li className="nav-item mx-2">
                          <NavLink className="text-center nav-link font-grey font-16 font-vcr" to="/events">
                            EVENTS
                          </NavLink>
                        </li>
                        <li className="nav-item mx-2">
                          <NavLink className="text-center nav-link font-grey font-16 font-vcr" to="/editor">
                            EDITOR
                          </NavLink>
                        </li>
                      </ul>
                      <NavLink className="text-center nav-link nav-item font-grey font-16 font-vcr" to="/login">
                         LOGIN
                      </NavLink>                      
                    </div>
                  </nav>
        </div>
    )
}

export default navbar
