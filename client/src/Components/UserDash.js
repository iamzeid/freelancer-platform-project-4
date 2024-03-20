import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UserDashboardWithChart = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8800/api/users')
            .then(response => {
                setUserData(response.data || []);
                console.log('Fetched user data:', response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const generateDataPoints = () => {
        const dataPoints = [];
        userData.forEach((user, index) => {
            const createdAt = new Date(user.createdAt);
            const offsetY = Math.sin(index) * 10; // Adjust the amplitude as needed
            dataPoints.push({ x: createdAt, y: 1 + offsetY });
        });
        // Sort data points by date
        dataPoints.sort((a, b) => a.x - b.x);
        return dataPoints;
    };

    const options = {
        animationEnabled: true,
        title: {
            text: "User Registration Over Time"
        },
        axisX: {
            title: "Date",
            valueFormatString: "DD MMM YYYY"
        },
        axisY: {
            title: "Number of Registrations"
        },
        data: [{
            type: "spline",
            color: "rgba(56, 24, 217, 0.5)",
            markerColor: "rgba(56, 24, 217, 1)",
            dataPoints: generateDataPoints()
        }]
    };

    return (
        <div>
            <h2 className="btn btn-success rounded-5 text-center animate_animated animate_fadeIn">
                Total Users: {userData.length}
            </h2>
            <div className='card shadow mt-3'>
                <div className='card-body'>
                    <CanvasJSChart options={options} />
                </div>
            </div>
        </div>
    );
};

export default UserDashboardWithChart;
