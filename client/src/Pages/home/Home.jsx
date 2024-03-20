import React from "react";

import "./Home.css";
import Featured from "../../Components/featured/Featured";
import TrustedBy from "../../Components/trustedBy/TrustedBy";

import Footter from "../../Components/footer/Footter.jsx";
import Navbar from "../../Components/navbar/Navbar.jsx";

import {
  PersonFill,
  PersonWorkspace,
  PersonLinesFill,
  QuestionSquare,
  Heart,
  StarFill,
  ArrowUpRight,
  CheckCircle,
  Check2Circle,
  CurrencyDollar,
  AwardFill,
  Safe2Fill,
} from "react-bootstrap-icons";
import FreelancerList from "../../Components/Freelancer.jsx";
import { freelancers } from "../../data.js";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="homee">
        <Navbar />
        <Featured></Featured>
      </div>

      {/* section icons */}

      <section className="service text-center   need  py-5">
        <div className="container  py-5">
          <div className="row ">
            <h2>Need something done?</h2>
            <p>Most viewed and all-time top-selling services</p>
            <div className="col-lg-3 col-md-6 col-6 mt-5   ">
              <div className="bg-white me-1 p-4 shadow rounded-2">
                <div class=" icon m-auto d-flex justify-content-center align-items-center w-40 h-40  rounded-circle mb-3">
                  <PersonFill className="fs-2" />
                </div>

                <h6 className="mt-3">Post a job</h6>
                <p>
                  It’s free and easy to post a job. Simply fill in a title,
                  description.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-6 mt-5 ">
              <div className="bg-white me-1 p-4 shadow rounded-2">
                {" "}
                <div class=" icon m-auto d-flex justify-content-center align-items-center w-40 h-40  rounded-circle mb-3">
                  <PersonWorkspace className="fs-2" />
                </div>
                <h6 className="mt-3">Choose freelancers</h6>
                <p>
                  It’s free and easy to post a job. Simply fill in a title,
                  description.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-6 mt-5 ">
              <div className="bg-white me-1 p-4 shadow rounded-2">
                <div class=" icon m-auto d-flex justify-content-center  align-items-center w-40 h-40  rounded-circle mb-3">
                  <PersonLinesFill className="fs-2" />
                </div>
                <h6 className="mt-3 ">Pay safely</h6>
                <p>
                  It’s free and easy to post a job. Simply fill in a title,
                  description.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6 mt-5 ">
              <div className="bg-white me-1 p-4 shadow rounded-2">
                <div class=" icon m-auto d-flex justify-content-center align-items-center w-40 h-40  rounded-circle mb-3">
                  <QuestionSquare className="fs-2" />
                </div>

                <h6 className="mt-3">We’re here to help</h6>
                <p>
                  It’s free and easy to post a job. Simply fill in a title,
                  description.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section Popular Services */}

      {/* section Find talent your way */}

      <div className="bg-white py-5">
        <div className="container py-4 ">
          <div className="row">
            <div className="col-md-6 text-start client-content">
              <div className="">
                <p className="text-success">For clients</p>
                <h3>Find talent your way</h3>
                <p>
                  Work with the largest network of independent professionals and
                  <br></br> get things done—from quick turnarounds to big
                  transformations.
                </p>
                <p>
                  Work with the largest network of independent professionals and
                  <br></br> get things done—from quick turnarounds to big
                  transformations.
                </p>

                <button className="  bttn p-3 rounded-5">Contact Us</button>
              </div>
            </div>
            <div className="col-md-6 ul">
              <img
                src="https://demoapus1.com/freeio-new/wp-content/uploads/2022/09/h2.png"
                className="w-100"
                alt="..."
              />
              <div class="elementor-widget-container p-5">
                <ul class="tick-2 ">
                  <li className="p-1">
                    <CheckCircle className="bg-white rounded-5 text-success me-3" />
                    The best for every budget
                  </li>
                  <li className="p-1">
                    <CheckCircle className="bg-white rounded-5 text-success me-3" />
                    work done quickly
                  </li>
                  <li className="p-1">
                    <CheckCircle className="bg-white rounded-5 text-success me-3" />
                    Protected payments, every time{" "}
                  </li>
                  <li className="p-1">
                    <CheckCircle className="bg-white rounded-5 text-success me-3" />
                    24/7 support
                  </li>
                </ul>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrustedBy></TrustedBy>

      {/* section Browse talent by category  */}

      {/* A whole world of freelance talent at your fingertips */}
      <section>
        <div className="container text-start talent">
          <div className="row">
            <div className="col-lg-6 mb-5">
              <img
                src="https://demoapus1.com/freeio-new/wp-content/uploads/2022/09/h51.jpg"
                alt=""
                className="w-100"
              />
            </div>
            <div className="col-lg-6 p-5 mt-5">
              <h3 className="mb-5 mt-5">
                A whole world of freelance talent at your fingertips
              </h3>

              <div className="mb-2">
                <h5 className="">
                  {" "}
                  <AwardFill className="fs-3 mt-1 text-muted me-2" /> Proof of
                  quality
                </h5>
                <p className="ms-5 text-muted ">
                  Check any pro’s work samples, client reviews, and identity
                  verification.
                </p>
              </div>

              <div className="mb-2">
                {" "}
                <h5 className="">
                  {" "}
                  <CurrencyDollar className="fs-3 text-muted mt-1 me-2" /> No
                  cost until you hire
                </h5>
                <p className="ms-5 text-muted ">
                  Check any pro’s work samples, client reviews, and identity
                  verification.
                </p>
              </div>

              <div className="mb-2">
                {" "}
                <h5 className="">
                  {" "}
                  <Check2Circle className="fs-3 mt-1 text-muted me-2" />
                  Safe and secure
                </h5>
                <p className="ms-5 text-muted ">
                  Check any pro’s work samples, client reviews, and identity
                  verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions*/}

      <div className=" py-5 container text-center">
        <h2>Frequently Asked Questions</h2>
        <p>Lorem ipsum dolor sit amet, consectetur.</p>
        <div className="accordion mt-5" id="accordionExample">
          <div className="accordion-item">
            <div className="accordion-header ">
              <button
                className="accordion-button collapsed py-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse1"
                aria-expanded="false"
                aria-controls="collapse1"
                fdprocessedid="qrmk1x"
              >
                What methods of payments are supported?
              </button>
            </div>
            <div
              id="collapse1"
              className="accordion-collapse collapse py-3"
              data-bs-parent="#accordionExample"
              style={{}}
            >
              <div className="accordion-body">
                {" "}
                Cras vitae ac nunc orci. Purus amet tortor non at phasellus
                ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus,
                scelerisque volutpat nec sit vel donec. Sagittis, id volutpat
                erat vel.{" "}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header">
              <button
                className="accordion-button collapsed py-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
                fdprocessedid="aqr2ml"
              >
                Can I cancel at anytime?{" "}
              </button>
            </div>
            <div
              id="collapse2"
              className="accordion-collapse collapse py-3"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{" "}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header">
              <button
                className="accordion-button collapsed py-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse3"
                aria-expanded="false"
                aria-controls="collapse3"
                fdprocessedid="onrq8d"
              >
                How do I get a receipt for my purchase?{" "}
              </button>
            </div>
            <div
              id="collapse3"
              className="accordion-collapse collapse py-3"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Cras vitae ac nunc orci. Purus amet tortor non at phasellus
                ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus,
                scelerisque volutpat nec sit vel donec. Sagittis, id volutpat
                erat vel.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header">
              <button
                className="accordion-button collapsed py-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse4"
                aria-expanded="false"
                aria-controls="collapse4"
                fdprocessedid="zcsnh"
              >
                Which license do I need?
              </button>
            </div>
            <div
              id="collapse4"
              className="accordion-collapse collapse py-3"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-header">
              <button
                className="accordion-button collapsed py-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse5"
                aria-expanded="false"
                aria-controls="collapse5"
                fdprocessedid="n11q4g"
              >
                How do I get access to a theme I purchased?{" "}
              </button>
            </div>
            <div
              id="collapse5"
              className="accordion-collapse collapse py-3"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {" "}
                Cras vitae ac nunc orci. Purus amet tortor non at phasellus
                ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus,
                scelerisque volutpat nec sit vel donec. Sagittis, id volutpat
                erat vel.{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* our Blogs */}
      <section className="py-5 text-center">
        <h2>Our Blogs</h2>
        <p>See how you can up your career status</p>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mb-3">
              <div className="card">
                <img
                  src="https://demoapus1.com/freeio-new/wp-content/uploads/2023/07/h19-2.jpg"
                  alt=""
                  className="w-100"
                />
                <div className="p-3">
                  <h5 className="mt-3">Freelancawy</h5>
                  <p className="text-muted">
                    {" "}
                    This represents a general way to reference online
                    marketplaces where freelancers can find work and clients can
                    hire them{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3">
              <div className="card">
                <img
                  src="https://demoapus1.com/freeio-new/wp-content/uploads/2023/07/h19-4.jpg"
                  alt=""
                  className="w-100"
                />
                <div className="p-3">
                  <h5 className="mt-3">Freelancawy</h5>
                  <p className="text-muted">
                    {" "}
                    This represents a general way to reference online
                    marketplaces where freelancers can find work and clients can
                    hire them{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3">
              <div className="card">
                <img
                  src="https://demoapus1.com/freeio-new/wp-content/uploads/2023/07/h19-3.jpg"
                  alt=""
                  className="w-100"
                />
                <div className="p-3">
                  <h5 className="mt-3">Freelancawy</h5>
                  <p className="text-muted">
                    {" "}
                    This represents a general way to reference online
                    marketplaces where freelancers can find work and clients can
                    hire them{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3">
              <div className="card">
                <img
                  src="https://demoapus1.com/freeio-new/wp-content/uploads/2023/07/h19-5.jpg"
                  alt=""
                  className="w-100"
                />
                <div className="p-3">
                  <h5 className="mt-3">Freelancawy</h5>
                  <p className="text-muted">
                    {" "}
                    This represents a general way to reference online
                    marketplaces where freelancers can find work and clients can
                    hire them{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footter></Footter>
    </>
  );
}
