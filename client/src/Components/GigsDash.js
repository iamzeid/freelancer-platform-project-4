import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function GigDashboardWithChart() {
  const [gigsData, setGigsData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/api/gigs')
      .then(response => {
        setGigsData(response.data || []);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const generateChartData = () => {
    const categoryStarsMap = {};

    gigsData.forEach(gig => {
      const category = gig.cat;
      const totalStars = gig.totalStars;
      if (!categoryStarsMap[category]) {
        categoryStarsMap[category] = {
          totalStars: 0,
          count: 0
        };
      }
      categoryStarsMap[category].totalStars += totalStars;
      categoryStarsMap[category].count++;
    });

    const dataPoints = Object.keys(categoryStarsMap).map(category => ({
      label: category,
      y: categoryStarsMap[category].totalStars / categoryStarsMap[category].count
    }));

    return dataPoints;
  };

  const options = {
    animationEnabled: true,
    title: {
      text: "Average Stars per Category"
    },
    axisX: {
      title: "Category"
    },
    axisY: {
      title: "Average Stars"
    },
    data: [{
      type: "column",
      dataPoints: generateChartData()
    }]
  };

  return (
    <div>
      <h2 className="btn btn-success rounded-5 text-center animate_animated animate_fadeIn">
        Total Gigs: {gigsData.length}
      </h2>
      <div className='card shadow mt-3'>
        <div className='card-body'>
          <CanvasJSChart options={options} />
        </div>
      </div>
    </div>
  );
}
