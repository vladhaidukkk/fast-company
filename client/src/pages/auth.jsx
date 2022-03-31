import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';

const Auth = () => (
  <div className="container">
    <div className="row mt-4">
      <div className="col-md-6 offset-md-3 shadow p-4 rounded">
        <Switch>
          <Route path="/auth/login" component={LoginForm} />
          <Route path="/auth/register" component={RegisterForm} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  </div>
);

export default Auth;
