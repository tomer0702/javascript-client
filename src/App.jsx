// import { render } from '@testing-library/react';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import {
  TextFieldDemo,
  InputDemo,
  Trainee,
  ChildrenDemo,
  Login,
  NotFound,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackbarProvider } from './contexts/index';
import apolloClient from './libs/apollo-client';

const App = () => (
  <div>
    <SnackbarProvider>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
            <PrivateRoute path="/InputDemo" component={InputDemo} />
            <PrivateRoute path="/Trainee" component={Trainee} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </Router>
      </ApolloProvider>
    </SnackbarProvider>
  </div>
);

export default App;
