import React, { useEffect, useState } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("currentuser");
  }, []);
  return (
    <div className="contianer">
      <h1 className="text-center">Logout</h1>
      <p>
        You have been logged out. Click <a href="/login">here</a> to login
        again.
      </p>
    </div>
  );
}
