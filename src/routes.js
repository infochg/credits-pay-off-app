import React from 'react';
import Payments from './screens/Payments';
import Overview from './screens/Overview';
import Settings from './screens/Settings';
import MakePlan from './screens/MakePlan';
import Subscription from './screens/Subscription';
import Signin from './screens/Signin';
import Registration from './screens/Registration';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import Transactions from './screens/Transactions';

export const indexRoutes = [
  {
    title: 'Snapshot',
    path: '/snapshot',
    icon: 'overview',
    component: <Overview />
  },
  {
    title: 'Payments',
    path: '/payments',
    icon: 'credit-cards',
    component: <Payments />
  },
  {
    title: 'Make a Plan',
    path: '/make-a-plan',
    icon: 'make-plan',
    component: <MakePlan />
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: 'transactions',
    component: <Transactions />
  },
  {
    title: 'Subscriptions',
    path: '/subscriptions',
    icon: 'subscription',
    component: <Subscription />
  }
];

export const userRoutes = [
  {
    title: 'Settings',
    path: '/settings',
    icon: 'setting',
    component: <Settings />
  }
];

export const dashboardRoutes = indexRoutes.concat(userRoutes);

export const systemRoutes = [
  {
    path: '/registration',
    component: <Registration />
  },
  {
    path: '/signin',
    component: <Signin />
  },
  {
    path: '/forgotpassword',
    component: <ForgotPassword />
  },
  {
    path: '/reset',
    component: <ResetPassword />
  }
];
