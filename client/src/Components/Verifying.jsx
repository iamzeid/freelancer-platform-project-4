import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';

const Verifying = () => {
  const { token } = useParams(); // Extract the token from the URL params
  const { search } = useLocation(); // Use the location hook to get the query parameters
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    // Function to handle verification
    const handleVerification = async () => {
      try {
        // Send a request to your backend to verify the token
        const response = await axios.get(`/api/verify/${token}${search}`);
        console.log(response.data); // Log the verification response
        // Redirect to the home page after successful verification
        navigate.push('/');
      } catch (error) {
        console.error('Verification error:', error);
        // Handle the error, such as displaying an error message to the user
      }
    };

    // Call the handleVerification function when the component mounts
    handleVerification();
  }, [token, search, navigate]); // Add token, search, and navigate to the dependency array

  return (
    <div>
      <h1>Verifying Email...</h1>
      {/* You can add a loading spinner or message here */}
    </div>
  );
};

export default Verifying;
