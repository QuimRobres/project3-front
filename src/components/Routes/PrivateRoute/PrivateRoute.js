import React from 'react'
import { Route } from 'react-router-dom';
import Spinner from '../../General/Spinner/Spinner';
import { withAuth } from '../../../context/auth.context';

function PrivateRoute ({ isLoggedIn, isLoading, exact, path, component_user, component_login }) {

  const ComponentForLogin = component_login;
  const ComponentForUser = component_user;

  if (isLoading) return <Spinner />;

  return (
    <Route
      exact={exact}
      path={path}
      render={
        function(props) {
          if (!isLoggedIn) return <ComponentForLogin {...props}/>
          else if (isLoggedIn) return <ComponentForUser />
        }
      }
    />
    )
}

export default withAuth(PrivateRoute);