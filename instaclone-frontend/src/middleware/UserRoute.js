import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "./../context/Auth";

function UserRoute({ component: Component, ...rest }) {
    const { userData, setUserData } = useAuth();

    if (userData){
        if (new Date().getTime() > userData.ts) {
        	setUserData(null)
        }
    } 

    return (
      <Route
        {...rest}
        render={props =>
          userData ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }

export default UserRoute;