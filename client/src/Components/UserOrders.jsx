import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedOrders, setCompletedOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("currentuser")).user;
      const response = await axios.get(`http://localhost:8800/api/user/orders/${userId}`, { withCredentials: true });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user orders:', error.message);
      setError('Failed to fetch user orders. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:8800/api/orders/${orderId}/complete`);
      setCompletedOrders([...completedOrders, orderId]);
      fetchOrders();
    } catch (error) {
      console.error('Error completing order:', error.message);
    }
  };

  return (
    <div>
      <h2 className="text-success m-4">User Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <ul className="list-group m-4 mb-5">
          {orders.map(order => (
            <li key={order._id} className="list-group-item">
              <p className="mb-1">Title: {order.title}</p>
              <p className="mb-1">Price: ${order.price}</p>
              {!order.isCompleted && (
                <button className="btn btn-success mr-2" onClick={() => handleCompleteOrder(order._id)}>Complete Order</button>
              )}
              {completedOrders.includes(order._id) && (
                <span className="text-success">Order completed!</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrders;
