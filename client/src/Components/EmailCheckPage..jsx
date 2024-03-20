// EmailCheckPage.js

import React from 'react';

const EmailCheckPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0 text-success">Check Your Email</h2>
            </div>
            <div className="card-body">
              <p className="card-text">
                An email has been sent to your registered email address. Please check your email and follow the instructions to verify your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCheckPage;
