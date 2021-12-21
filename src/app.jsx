import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './layouts/login';
import Users from './layouts/users';
import Main from './layouts/main';
import Error404 from './layouts/error404';

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/users/:userId?" component={Users} />
      <Route path="/404" component={Error404} />
      <Redirect to="/" path="/main" />
      <Redirect to="/404" />
    </Switch>
  </>
);

export default App;
