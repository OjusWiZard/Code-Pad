import React from 'react'
import './navbar.css'
import Nav from "react-bootstrap/Nav";
// import { NavLink } from "react-router-dom";
import logo from '../../images/home/logo.png'

function navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
              <Nav.Link className="navbar-brand" to="/">
                {/* <img src={logo} alt="Code-pad" className="img-fluid my-2 mx-0 px-0"/> */}
                Navbar
              </Nav.Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                      <Nav className="navbar-nav mx-auto mt-4">                        
                        {/* <NavLink exact to="/" activeClassName="active-nav-item">*/}
                          <Nav.Link className="text-center nav-item mx-5 font-blue font-16 font-vcr" href="/">
                            HOME
                          </Nav.Link>                          
                        {/* </NavLink>*/}
                          <Nav.Link className="text-center nav-item mx-5 font-blue font-16 font-vcr" href="/events">
                            EVENTS
                          </Nav.Link>                                                
                          <Nav.Link className="text-center nav-item mx-5 font-blue font-16 font-vcr" href="/editor">
                            EDITOR
                          </Nav.Link>                        
                      </Nav>
                      <Nav.Link className="text-center nav-item font-blue font-16 font-vcr" href="/login">
                         LOGIN
                      </Nav.Link>                      
                    </div>
                  </nav>
        </div>
    )
}

export default navbar
