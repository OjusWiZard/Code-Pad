import React from 'react';
import logo from '../../images/home/Logo.png';
import line from '../../images/home/line.png';
import button from '../../images/home/button.png';
import { Link } from 'react-router-dom';
import "./home.css"

function Home() {
    return (
        <React.Fragment>
            <div className="main-background">
                <div className="container pt-5">
                    <div className="row pt-5">
                        <div className="col-lg-8 col-md-8 col-sm-10 col-10 mx-auto my-5 content-background px-5">
                            <div className="d-flex justify-content-center pt-5">
                                <img src={logo} alt="" className="img-fluid"/>
                            </div>
                            <p className="font-robot font-blue text-justify mt-5 pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. amet qui! Sed, distinctio maiores consequatur velit, voluptatibus deleniti voluptate suscipit corrupti odio amet inventore sunt, esse molestiae et iusto tenetur laboriosam ipsam ab nemo harum impedit. Soluta enim magni eligendi a? Facere corporis voluptates impedit sit reiciendis deserunt harum doloribus repudiandae tempora accusantium ipsum esse suscipit, voluptatem alias assumenda vero consequatur iste odio error incidunt, iusto quibusdam repellendus. In, eveniet corrupti! Impedit ipsa at accusamus velit suscipit. Voluptates nihil omnis, aliquam modi, impedit unde.</p>
                            <div className="d-flex justify-content-center pt-5">
                                <img src={line} alt="" className="img-fluid"/>
                            </div>
                            <h4 className="font-vcr font-blue mt-5 pt-4 text-center font-weight-bold">&lt;&lt;&nbsp;&nbsp;ONGOING EVENTS&nbsp;&nbsp;&gt;&gt;</h4>
                            <div className="container">
                                <div className="row mt-5">
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="card font-blue font-robot event-block p-3">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="card font-blue font-robot event-block p-3">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="card font-blue font-robot event-block p-3">
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-5">
                                <Link to="/events">
                                    <img src={button} alt="" className="img-fluid"/>
                                </Link>                                
                            </div>                            
                        </div>
                    </div>                                        
                </div>
            </div>            
        </React.Fragment>
    )
}

export default Home
