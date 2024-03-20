import React from "react";
import "./Navbar.css";
import { CashCoin } from "react-bootstrap-icons";
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg p-3  position-fixed w-100 ">
        <div className="container-fluid ">
          <a className="navbar-brand text-white fs-4" href="/">
            <CashCoin /> Freelancawy
          </a>

          <button
            className="navbar-toggler  text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
        </div>
        <div className="collapse navbar-collapse  ms-sm-auto" id="navbarNav">
          <ul className="navbar-nav ms-auto   ">
            <li className="nav-item px-4 ">
              <a
                className="nav-link active text-white fs-5"
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>

            <li className="nav-item px-4">
              <a className="nav-link text-white fs-5" href="/search">
                Search
              </a>
            </li>

            {localStorage.getItem("currentuser") ? (
              <>
                <li className="nav-item px-4">
                  <a className="nav-link text-white fs-5" href="/gig/create">
                    Create
                  </a>
                </li>

                <li className="nav-item px-4">
                  <a
                    className="nav-link text-white fs-5"
                    href={`/user/${
                      JSON.parse(localStorage.getItem("currentuser")).user
                    }`}
                  >
                    Profile
                  </a>
                </li>
                <li className="nav-item px-4">
                  <a className="nav-link text-white fs-5" href="/logout">
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item px-4">
                  <a className="nav-link text-white fs-5" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item px-4">
                  <a className="nav-link text-white fs-5" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <hr className="m-auto mb-3"></hr>
    </>
  );
}
