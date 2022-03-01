import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import Navbar from './components/ui/navbar';
import Main from './pages/main';
import Auth from './pages/auth';
import Users from './pages/users';
import Error404 from './pages/error404';
import { ProfessionsProvider } from './hooks/useProfessions.hook';
import { AuthProvider } from './hooks/useAuth.hook';
import ProtectedRoute from './components/common/protectedRoute';
import { fetchQualities } from './store/reducers/qualities';
import { fetchProfessions } from './store/reducers/professions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQualities());
    dispatch(fetchProfessions());
  }, []);

  return (
    <>
      <AuthProvider>
        <Navbar />
        <ProfessionsProvider>
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
        </ProfessionsProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
