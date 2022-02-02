import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/ui/navbar';
import Main from './pages/main';
import Auth from './pages/auth';
import Users from './pages/users';
import Error404 from './pages/error404';
import { ProfessionsProvider } from './hooks/useProfessions.hook';
import { QualitiesProvider } from './hooks/useQualities.hook';

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Main} />
      <ProfessionsProvider>
        <QualitiesProvider>
          <Route path="/auth" component={Auth} />
          <Route path="/users/:userId?/:status?" component={Users} />
        </QualitiesProvider>
      </ProfessionsProvider>
      <Route path="/404" component={Error404} />
      <Redirect to="/" path="/main" />
      <Redirect to="/auth/login" path="/login" />
      <Redirect to="/auth/register" path="/register" />
      <Redirect to="/404" />
    </Switch>
    <ToastContainer />
  </>
);

export default App;
