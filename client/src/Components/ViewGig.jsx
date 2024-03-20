import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const OrderButton = ({ gigId }) => {
  const initiateOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8800/api/gigs/single/${gigId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch gig details. Status: ${response.status}`
        );
      }

      const gigData = await response.json();

      const orderDetails = {
        gigId: gigData._id,
        title: gigData.title,
        price: gigData.price,
        sellerId: gigData.sellerId,
        // buyerId: "user2",
        // payment_intent: "pi_1",
      };

      const paymentResponse = await fetch(
        "http://localhost:8800/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!paymentResponse.ok) {
        throw new Error(
          `Failed to initiate payment. Status: ${paymentResponse.status}`
        );
      }

      const paymentData = await paymentResponse.json();

      if (paymentData.approval_url) {
        window.location.href = paymentData.approval_url;
      } else {
        console.error("Error: Approval URL is missing in response data");
      }
    } catch (error) {
      console.error("Error initiating order:", error.message);
    }
  };

  return (
    <button className="btn btn-success w-100" onClick={initiateOrder}>
      <Icon.BagFill /> Pay Now
    </button>
  );
};

export default function ViewGig() {
  const [user, setUser] = useState({});
  const [gig, setGig] = useState({});
  const [reviews, setReviews] = useState([]);
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState(5);
  const params = useParams();
  const gigId = params.id; // Extract gigId from params

  const [review, setReview] = useState({
    desc: "",
    star: 5,
  });

  const submitReview = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8800/api/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem("currentuser")).user,
        desc: desc,
        star: star,
        gigId: gigId,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Review submitted successfully.");
          setDesc("");
          setStar(5);
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    const fetchGig = async () => {
      const response = await fetch(
        `http://localhost:8800/api/gigs/single/${gigId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setGig(data);
        });
    };

    const fetchReviews = async () => {
      const response = await fetch(
        `http://localhost:8800/api/reviews/${gigId}`
      );
      const data = await response.json();
      setReviews(data);
      console.log(data);
    };

    fetchGig();
    fetchReviews();

    // Submit review
  }, [gigId]);

  return (
    <>
      <div className="homee">
        <Navbar />
      </div>
      <div className="browse profile py-5 mt-5">
        <div className="container">
          <div className="row">
            <h1 className="fs-4 mt-2 text-muted p-2 fw-bold mt-2 bg-white  rounded-3">
              {gig.title}
            </h1>
            <div className="col-md-6">
              {/* <div className="mt-2 mb-2 bg-white p-2  rounded-3">
                <div className="d-flex align-items-center">
                  <img
                    src="/img/anon.png"
                    width={50}
                    height={50}
                    alt="Seller"
                    className="img-fluid rounded-circle"
                  />
                  <div className="ms-2">
                    <p className="text-muted">
                      <strong><a href={`/user/` + gig.userId}>Seller</a></strong>
                      <br />
                      <Icon.StarFill /> <Icon.StarFill /> <Icon.StarFill />{" "}
                      <Icon.StarFill /> <Icon.StarHalf /> 4.5 (200 review){" "}
                      <br />
                    </p>
                  </div>
                </div>
              </div> */}

              <img
                src="/img/gig.jpg"
                alt={gig.title}
                className="img-fluid w-100 rounded-3"
              />

              <p className="mt-2 text-muted p-2 fw-bold mt-2 bg-white  rounded-3">
                {gig.desc}
              </p>
            </div>
            <div className="col-md-6">
              <div>
                <p className="text-muted mt-2 bg-white p-3 rounded-3">
                  <h2 className="fs-5 mt-2 mb-2">
                    <Icon.InfoCircleFill /> About This Gig:
                  </h2>
                  <strong>Features:</strong>
                  <ul>
                    {gig.features &&
                      gig.features?.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                  <p>
                    <span className="mb-2 fw-bold">Category:</span> {gig.cat}
                  </p>
                  <p>
                    <span className="mb-2 fw-bold ">Delivery Time:</span>{" "}
                    {gig.deliveryTime} day(s)
                  </p>

                  {/* <p>
                    {" "}
                    <span className="mb-2 fw-bold">Rating:</span>{" "}
                    {[...Array(gig.totalStars)].map((e, i) => (
                      <Icon.StarFill key={i} />
                    ))}
                    {[...Array(5 - gig.totalStars)].map((e, i) => (
                      <Icon.Star key={i} />
                    ))}{" "}
                    ({gig.starNumber})
                  </p> */}

                  <p>
                    <span className="mb-2 fw-bold">Revisions:</span>{" "}
                    {gig.revisionNumber} revision(s)
                  </p>

                  <h2 className="text-center mt-4">
                    <strong className="mb-2">Price:</strong> ${gig.price}
                  </h2>
                </p>
              </div>
              <div>
                <OrderButton gigId={gigId} />
                {/* <button className="btn btn-danger w-100 mt-2">
                    <Icon.HeartFill /> Add to Favorites
                  </button> */}
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div>
                  <h2 className="fs-5 mt-4 mb-2">
                    <Icon.ChatLeftTextFill /> Reviews
                  </h2>
                  {/* <div className="mt-2 bg-white p-3 rounded-3">
                <div className="d-flex align-items-center">
                  <img
                    src="https://placehold.co/50?text=J"
                    alt="Seller"
                    className="img-fluid rounded-circle"
                  />
                  <div className="ms-2">
                    <p className="text-muted">
                      <strong>John Smith</strong>
                      <br />
                      <Icon.StarFill /> <Icon.StarFill /> <Icon.StarFill />{" "}
                      <Icon.StarFill /> <Icon.StarFill /> 5.0
                      <br />I am very happy with the website that John created
                      for me.
                    </p>
                  </div>
                </div>
              </div> */}

                  {reviews.length === 0 && (
                    <div className="alert alert-success mt-2">
                      No reviews available for this gig.
                    </div>
                  )}

                  {reviews.map((review, index) => (
                    <div key={index} className="mt-2 bg-white p-3 rounded-3">
                      <div className="d-flex align-items-center">
                        <img
                          src={review.userId?.img || "/img/anon.png"}
                          alt="Seller"
                          className="img-fluid rounded-circle"
                          width={50}
                          height={50}
                        />
                        <div className="ms-2">
                          <p className="text-muted">
                            <strong>
                              {review.userId?.username || "Anonymous User"}
                            </strong>
                            <br />
                            {/* Loop as star count */}
                            {[...Array(review.star)].map((e, i) => (
                              <Icon.StarFill key={i} />
                            ))}
                            {[...Array(5 - review.star)].map((e, i) => (
                              <Icon.Star key={i} />
                            ))}{" "}
                            {review.star}
                            <br />
                            {review.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <br />
                  <br />

                  <h2 className="fs-5 mt-4 mb-2">
                    <Icon.PlusCircleFill /> Submit a Review
                  </h2>

                  <div className="mt-2 bg-white p-3 rounded-3">
                    {/* Submit Review */}
                    <form action="/gig/review" method="POST">
                      <div className="form-group">
                        <label htmlFor="review">Review</label>
                        <textarea
                          onChange={(e) => {
                            setDesc(e.target.value);
                          }}
                          className="form-control"
                          id="review"
                          name="review"
                          required
                        />

                        <label htmlFor="rating">Rating</label>
                        <select
                          onChange={(e) => {
                            setStar(e.target.value);
                          }}
                          className="form-select"
                          id="rating"
                          name="rating"
                          required
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Good</option>
                          <option value="3">3 - Average</option>
                          <option value="2">2 - Poor</option>
                          <option value="1">1 - Bad</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-success w-100 mt-4"
                        onClick={submitReview}
                      >
                        <Icon.PlusCircleFill /> Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
