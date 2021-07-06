import React from "react";
import { withRouter } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

let user = localStorage.getItem("user") || null;

const PrivateLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user ? (
        <>
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default withRouter(PrivateLayout);
