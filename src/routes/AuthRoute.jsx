/* eslint-disable */
import React from 'react';
import { Route , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      !localStorage.getItem('token')
      ? (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
      ) : (
      <Redirect to="/trainee" />
      )
    )}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.object.isRequired,
};
export default AuthRoute;
