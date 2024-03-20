import React, { useEffect, useState } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";
import Navbar from "./navbar/Navbar";

export default function CreateGig() {
  // POST "http://localhost:8800/api/gigs/" to create a new gig
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [revisionNumber, setRevisionNumber] = useState("");
  const [features, setFeatures] = useState([]);
  const [timeZone, setTimeZone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  shortTitle: Path `shortTitle` is required., revisionNumber: Path `revisionNumber` is required.

    const newGig = {
      userId,
      title,
      desc,
      cat,
      price,
      shortTitle: title,
      shortDesc,
      deliveryTime,
      revisionNumber: 1,
      features,
      timeZone,
    };
    try {
      const res = await fetch("http://localhost:8800/api/gigs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGig),
        credentials: 'include',
      
      }
      );
      const data = await res.json();
      alert("Gig Created Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("currentuser")).user);
  }, []);

  return (
    // Create Gig (React + Bootstrap) {title, cat, desc, photo, price, delivery time in days, tags}
    <div className="browse">
      <div className="homee">
        <Navbar />
      </div>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-1">
            <h1 className="text-center text-success">Create New Gig</h1>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label htmlFor="title " className="mb-2">Gig Title</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cat " className="mb-2">Category</label>
                <input
                  onChange={(e) => setCat(e.target.value)}
                  type="text"
                  className="form-control"
                  id="cat"
                  name="cat"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="desc " className="mb-2">Description</label>
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  className="form-control"
                  id="desc"
                  name="desc"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="photo " className="mb-2">Photo</label>
                <input
                  onChange={(e) => setCover(e.target.files[0])}
                  type="file"
                  className="form-control"
                  id="photo"
                  name="photo"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price " className="mb-2">Price</label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="deliveryTime " className="mb-2">Delivery Time (in days)</label>
                <input
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  type="number"
                  className="form-control"
                  id="deliveryTime"
                  name="deliveryTime"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="instructions " className="mb-2">Instructions</label>
                <textarea
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="form-control"
                  id="instructions"
                  name="instructions"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100 mt-2 mb-5">
                <PlusCircleFill /> Create Gig
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
