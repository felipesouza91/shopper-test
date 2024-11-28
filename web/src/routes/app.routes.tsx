import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ConfirmRide from '../pages/ConfirmRide';
import EstimateRide from '../pages/EstimateRide';
import RideHistory from '../pages/RideHistory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <EstimateRide />,
  },
  {
    path: '/confirm-ride',
    element: <ConfirmRide />
  },
  {
    path: '/history',
    element: <RideHistory/>
  }
  
])

const AppRouter: React.FC = () => {
  return <RouterProvider router={router}/>;
}

export default AppRouter;