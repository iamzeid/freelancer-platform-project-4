import React from 'react';

const OrderButton = () => {
  const initiateOrder = async () => {
    try {
      // Replace with your actual order details
      const orderDetails = {
        gigId: "Gig1",
        title: "Order1",
        price: 100,
        sellerId: "user1",
        buyerId: "user2",
        isCompleted: false,
        payment_intent: "pi_1",
      };
  
      // Create a checkout session
      const response = await fetch('http://localhost:8800/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
  
      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Check if the response data has an approval_url
      if (data.approval_url) {
        window.location.href = data.approval_url;
      } else {
        console.error('Error: Approval URL is missing in response data');
      }
    } catch (error) {
      console.error('Error initiating order:', error);
  
      // Log the response body if available
      if (error.response && error.response.body) {
        console.error('Response body:', error.response.body);
      }
    }
  };

  return (
    <button onClick={initiateOrder}>
      Initiate Order with PayPal
    </button>
  );
};

export default OrderButton;
