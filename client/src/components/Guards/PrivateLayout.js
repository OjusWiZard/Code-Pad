import React from "react";
import { withRouter } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

let token = localStorage.getItem("refreshToken") || null;

const PrivateLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token ? (
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
