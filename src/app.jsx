import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/ui/navbar';
import Main from './pages/main';
import Auth from './pages/auth';
import Users from './pages/users';
import Error404 from './pages/error404';
import ProtectedRoute from './components/common/protectedRoute';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => (
  <>
    <AppLoader>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/auth" component={Auth} />
        <ProtectedRoute path="/users/:userId?/:status?" component={Users} />
        <Route path="/404" component={Error404} />
        <Redirect to="/" path="/main" />
        <Redirect to="/auth/login" path="/login" />
        <Redirect to="/auth/register" path="/register" />
        <Redirect to="/404" />
      </Switch>
    </AppLoader>
    <ToastContainer />
  </>
);

export default App;
