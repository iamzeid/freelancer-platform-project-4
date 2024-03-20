import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/api/orders/allOrders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Calculate counts for completed and not completed orders
    const completedCount = orders.filter(order => order.isCompleted).length;
    const notCompletedCount = orders.filter(order => !order.isCompleted).length;

    // Update the chart data
    const options = {
      title: {
        text: 'Order Completion Status'
      },
      data: [{
        type: 'pie',
        startAngle: 240,
        yValueFormatString: '##0',
        indexLabel: '{label} {y}',
        dataPoints: [
          { label: 'Completed', y: completedCount, color: 'rgba(200, 255,200, 1)' },
          { label: 'Not Completed', y: notCompletedCount, color: 'rgba(255, 200, 255, 1)' }
        ]
      }]
    };

    setOptions(options);
  }, [orders]);

  const [options, setOptions] = useState(null);

  return (
    <div>
      <h2 className="btn btn-success rounded-5 text-center animate_animated animate_fadeIn">
        Total Orders: {orders.length}
      </h2>
      <div className='card shadow mt-3'>
        <div className='card-body'>
          {options && <CanvasJSChart options={options} />}
        </div>
      </div>
    </div>
  );
}
