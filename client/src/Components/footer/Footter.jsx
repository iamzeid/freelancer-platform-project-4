import React from "react";
import "./Footer.css";
import { Facebook, Twitter, Instagram, Linkedin } from "react-bootstrap-icons";
function Footter() {
  return (
    <div className="footer text-white p-4">
      <div className="conainer p-5">
        <div className="row  me-0   ">
          <div className="col-lg-8 col-12 mb-3 text-lg-start text-sm-center">
            <span className="me-3">Terms of Service</span>
            <span className="me-3">Privacy Policy</span>
            <span className="me-3">Site Map</span>
          </div>
          <div className="col-lg-4 col-12 mb-3">
            <span className="me-4">Follow Us</span>
            <span className="me-4">
              <Facebook></Facebook>
            </span>
            <span className="me-4">
              <Twitter></Twitter>
            </span>
            <span className="me-4">
              <Instagram></Instagram>
            </span>
            <span className="me-4">
              <Linkedin></Linkedin>
            </span>
          </div>
        </div>
        <hr className="w-100 mb-4 m-auto text-white"></hr>
        <div className="row py-4">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-start">
            <h5 className="mb-3">About</h5>
            <p>About Us</p>
            <p>Become Seller</p>
            <p>Jobs on Freeio</p>
            <p>Pricing</p>
            <p>Services Freeio</p>
            <p>Terms of Service</p>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-start">
            <h5 className="mb-3">Categories</h5>
            <p>Design & Creative</p>
            <p>Development & IT</p>
            <p>Music & Audio</p>
            <p>Music & Audio</p>
            <p>Programming & Tech</p>
            <p>Digital Marketing</p>
            <p>Finance & Accountingl</p>
            <p>Writing & Translation</p>
            <p>Trendingy</p>
            <p>Lifest</p>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-start">
            <h5 className="mb-3">Support</h5>
            <p>Help & Support</p>
            <p>FAQ Freeio</p>
            <p>Contact Us</p>
            <p>Servicesp</p>
            <p>Terms of Service</p>
          </div>
          <div className="col-lg-3  col-sm-6 col-12 text-start">
            <h5 className="mb-3">Subscribe</h5>

            <div className="input-group d-flex justify-content-between p-2 rounded-2">
              <input
                className="form-contro"
                type="email"
                name="EMAIL"
                placeholder="Your email address"
                required=""
              />

              <button className="btn btn-second  " type="submit">
                <span className="text-white">Send</span>
              </button>
            </div>
            <h5 className="mb-4 mt-5 ">Apps</h5>
            <p>ios App</p>
            <p>Andriod App</p>
          </div>
        </div>
        <hr className="w-100 mb-3 m-auto text-white"></hr>
        <p className="text-start text-white text-muted">
          © Freeio. 2024 CreativeLayers. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footter;
