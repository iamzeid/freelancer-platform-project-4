import React from 'react';
import UserDashboardWithChart from './UserDash';
import OrderDashboard from './OrdersDash';
import GigDashboardWithChart from './GigsDash';

const Dashboard = () => {
  return (
    <div>
      <UserDashboardWithChart></UserDashboardWithChart>
      <OrderDashboard></OrderDashboard>
      <GigDashboardWithChart></GigDashboardWithChart>
    </div>
  );
}

export default Dashboard;
