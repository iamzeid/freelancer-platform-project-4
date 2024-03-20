import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function Profile() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8800/api/users/${params.id}`
        );
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    const getGigs = async () => {
      try {
        // send cookie to server
        const response = await fetch(
          `http://localhost:8800/api/gigs?userId=${params.id}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setGigs(data);
      } catch (error) {
        console.error("Error fetching gigs", error);
      }
    };

    getUser();
    getGigs();
  }, [params.id]);

  return (
    <>
      <div className="homee">
        <Navbar />
      </div>

      <div className="container py-5 mt-5">
        <h1 className="text-center text-success animated fadeInDown">
          Profile
        </h1>
        {loading && <p className="animated fadeIn text-muted">Loading...</p>}
        {error && (
          <p className="animated shake text-danger">Error fetching user</p>
        )}

        <div className="p-4 rounded profile shadow-sm">
          <div className=" row text-start">
            <div className="col-md-3">
              <img
                src="/img/anon.png"
                alt={user.username}
                width={200}
                height={200}
                className="rounded-circle mb-3"
              />
            </div>
            <div className="col-md-4 mt-5 py-5">
              <h2 className="h3 mb-3">{user.username}</h2>
              <h6 className="text-muted"> {user.title}</h6>
              {localStorage.getItem("currentuser") &&
              JSON.parse(localStorage.getItem("currentuser")).user ===
                user._id ? (
                <a href="/edit-profile" className="btn btn-success mt-3">
                  Edit Profile
                </a>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="mt-4 ms-5">
            <h5 className="mb-3">About Freelancer</h5>
            <p className="text-muted w-75">{user.desc}</p>
            <h5 className="mb-3">Education</h5>
            <p>{user.education}</p>

            <h5 className="mb-3">Experience</h5>
            <p>{user.experience}</p>
            <h5 className="mb-3">Skills</h5>
            <p>{user.skills}</p>
          </div>

          <h2 className="h4 mt-5 ms-5 mb-4">Gigs</h2>
          <div className="row">
            {gigs.map((gig) => (
              <div className="col-md-6">
                <div className="card animated p-4 mb-4 fadeInUp" key={gig._id}>
                  <img src="/img/gig.jpg" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{gig.title}</h5>
                    <p className="card-text">{gig.desc}</p>
                  </div>
                  <div className="card-footer">
                    <a
                      className="btn btn-success w-100"
                      href={"/gig/" + gig._id}
                    >
                      View Gig
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
