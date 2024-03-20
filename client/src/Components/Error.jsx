import React from "react";

export default function Error() {
  return (
    <div>
      <h1>Error 404: Page not found</h1>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <a className="btn btn-success w-100" href="/">Go to Home</a>
    </div>
  );
}
