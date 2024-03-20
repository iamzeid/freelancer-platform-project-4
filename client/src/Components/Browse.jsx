import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from 'react-player'; // Install react-player package
import { CameraVideo } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { StarFill, ArrowUpRight, Heart } from "react-bootstrap-icons";
import Navbar from "./navbar/Navbar";

export default function Browse() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const toggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  const [gigs, setGigs] = useState([]);

  const [searchTerm, setSearchTerm] = useState(null);
  const [searchCat, setSearchCat] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:8800/api/gigs/", {
        search: searchTerm, // Send search term if any
      });
      setGigs(response.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching gigs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let params = {};
      if (searchTerm && searchTerm.length > 0) params.search = searchTerm;
      if (searchCat && searchCat.length > 0) params.cat = searchCat;


      const response = await axios.get("http://localhost:8800/api/gigs/", {
        params,
      });
      setGigs(response.data);
    } catch (err) {
      console.error(err);
      setError("Error searching for gigs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="homee">
        <Navbar />
      </div>

      <div className="browse text-start mt-5 p-5">
        <div className="container">
          <h3>Design & Creative</h3>
          <p>
            Give your visitor a smooth online experience with a solid UX design
          </p>
          <a
            className="text-decoration-none mb-3 text-white"
            onClick={toggleVideo}
          >
            <CameraVideo className="bg-success rounded-circle p-2 fs-1" />{" "}
            <span className="fs-6 text-black ">How Freelancawy Works</span>
          </a>
          {isVideoOpen && (
            <div className="video-container mt-3">
              <ReactPlayer
            url='https://www.youtube.com/embed/7e90gBu4pas?autoplay=0&controls=1'
            playing={isVideoOpen}
            width='70%'
            height='360px'
          />
              <button
                onClick={toggleVideo}
                className="rounded-3 mt-2 border-0 bg-success"
              >
                Close Video
              </button>
            </div>
          )}
        </div>

        <div className="App container">
          <header className="py-3 mb-4  rounded-3">
            <h5 className="text-start mt-4 mb-4">Gig Search</h5>
            <form onSubmit={handleSearch} className="d-flex my-2">
              <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title ..."
                className="form-control me-2"
              />
              <input
                type="text"
                onChange={(e) => setSearchCat(e.target.value)}
                placeholder="Search by category ..."
                className="form-control me-2 "
              />
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </form>
          </header>
          <div className="gig-list container">
            {isLoading && <p className="text-center">Loading gigs...</p>}
            {error && <p className="text-center text-danger">{error}</p>}
            {gigs.length > 0 ? (
              <div className=" row ">
                {gigs.map((gig) => (
                  <div className="col-lg-4 col-md-6 py-3 col-sm-6 col-12 ">
                    <div className="card p-3 h-100">
                      <p key={gig.id} className="freelancer-item"></p>
                      <img src={gig.images[0]} alt="" />
                      <img
                        src="https://demoapus1.com/freeio-new/wp-content/uploads/2022/11/service11-600x450.jpg"
                        className="  m-auto img-thumbnail"
                      />
                      {/* <div className="ico  d-flex justify-content-center align-items-center">
                        {" "}
                        <Heart />
                      </div> */}

                      <h6 className="mt-3 mb-1 text-center">{gig.title}</h6>
                      <p className="text-muted text-center small">{gig.desc}</p>

                      <span className="text-center">
                        <StarFill className="star  " /> {gig.totalStars}{" "}
                        <span className="text-muted review ms-2 ">
                          (Review)
                        </span>
                      </span>

                      <br></br>
                      <button className="me-3 btn1 mt-3 border-0 rounded-5 ">
                        {gig.cat}
                      </button>
                      <button className="me-3 btn1 mt-3  border-0 rounded-5">
                        {gig.shortTitle}
                      </button>
                      <div className="card-footer m-auto  mt-4">
                        <p>
                          <span className="fw-bold">Desception:</span>{" "}
                          {gig.shortDesc}
                        </p>
                        <p>
                          <span className="fw-bold">Price: $</span> {gig.price}
                        </p>
                        <p>
                          <span className="fw-bold">Delivery Time:</span>{" "}
                          {gig.deliveryTime} days
                        </p>
                      </div>
                      <Link
                        to={`/gig/${gig._id}`}
                        className="w-100 m-auto text-success text-decoration-none text-center view rounded-5 p-2 "
                      >
                        View details <ArrowUpRight className="ms-2 fs-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted">
                {searchTerm || searchCat
                  ? "No gigs found matching your search."
                  : "Search for gigs by entering a term above."}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
