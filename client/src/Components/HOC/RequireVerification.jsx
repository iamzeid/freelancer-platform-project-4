import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequireVerification = ({ children }) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        // Fetch the user's verification status from the backend API
        const response = await axios.get("/api/user/verification-status");
        const isVerified = response.data.isVerified;

        if (!isVerified) {
          // Redirect to the verification page if the user is not verified
          navigate("/verification");
        } else {
          setVerified(true);
        }
      } catch (error) {
        console.error("Error fetching verification status:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchVerificationStatus();
  }, [navigate]);

  // Render children only when the verification status is verified
  return verified ? <>{children}</> : null;
};

export default RequireVerification;
