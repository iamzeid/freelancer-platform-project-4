// VerificationPage.js

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerificationPage = () => {
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/verify/${token}`);
      } catch (error) {
        console.error('Verification error:', error);
        // Handle verification error
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0 text-success">Email Verification</h2>
            </div>
            <div className="card-body">
              <p className="card-text">
                Verifying your email address...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
