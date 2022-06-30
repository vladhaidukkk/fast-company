import React from 'react';
import MainLayout from '../components/layout/mainLayout';
import MainFirebaseLayout from '../components/layout/mainFirebaseLayout';
import configKeys from '../config.json';

const Main = () => {
  return configKeys.isFirebase ? <MainFirebaseLayout /> : <MainLayout />;
};

export default Main;
