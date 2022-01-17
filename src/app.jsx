import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/ui/navbar';
import Main from './pages/main';
import Auth from './pages/auth';
import Users from './pages/users';
import Error404 from './pages/error404';

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/auth" component={Auth} />
      <Route path="/users/:userId?/:status?" component={Users} />
      <Route path="/404" component={Error404} />
      <Redirect to="/" path="/main" />
      <Redirect to="/auth/login" path="/login" />
      <Redirect to="/auth/register" path="/register" />
      <Redirect to="/404" />
    </Switch>
  </>
);

export default App;
