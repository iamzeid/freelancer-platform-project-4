import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilFill } from "react-bootstrap-icons";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [desc, setDesc] = useState(null);
  const [title, setTitle] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);
  const [skills, setSkills] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const getUser = async () => {
    try {
      const url = `http://localhost:8800/api/users/${
        JSON.parse(localStorage.getItem("currentuser")).user
      }`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8800/api/users/${
        JSON.parse(localStorage.getItem("currentuser")).user
      }`;
      let info = {};
      if (img) {
        info.img = img;
      }
      if (certificate) {
        info.certificate = certificate;
      }
      if (desc) {
        info.desc = desc;
      }
      if (title) {
        info.title = title;
      }
      if (education) {
        info.education = education;
      }
      if (experience) {
        info.experience = experience;
      }
      if (skills) {
        info.skills = skills;
      }

      const { data } = await axios.post(url, info, {
        withCredentials: true,
      });
      setUser(data);
      setSubmitted(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-2">
            <h1 className="text-center">Edit My Profile</h1>
            <form encType="multipart/form-data">
              {/* 
            img
            desc
            title
            education
            experience
            skills
            certificate
            */}
              <div className="form-group">
                <img
                  src={user?.img}
                  alt="Profile"
                  className="d-block mx-auto img-fluid rounded-circle mb-3"
                  width={100}
                  height={100}
                />
                <h2 className="text-center">
                  <a
                    href={
                      "/user/" +
                      JSON.parse(localStorage.getItem("currentuser")).user
                    }
                  >
                    {user?.username}
                  </a>
                </h2>

                <label htmlFor="img">Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  id="img"
                  name="img"
                  onChange={(e) => setImg(e.target.files[0])} // Update state on file change
                />

                <label htmlFor="desc">About Me</label>
                <textarea
                  className="form-control"
                  id="desc"
                  name="desc"
                  value={desc || user?.desc} // Use state value if available, else use user's value
                  onChange={(e) => setDesc(e.target.value)} // Update state on input change
                />

                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={title || user?.title} // Use state value if available, else use user's value
                  onChange={(e) => setTitle(e.target.value)} // Update state on input change
                />

                <label htmlFor="education">Education</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="education"
                  name="education"
                  value={education || user?.education} // Use state value if available, else use user's value
                  onChange={(e) => setEducation(e.target.value)} // Update state on input change
                />

                <label htmlFor="experience">Experience</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="experience"
                  name="experience"
                  value={experience || user?.experience} // Use state value if available, else use user's value
                  onChange={(e) => setExperience(e.target.value)} // Update state on input change
                />

                <label htmlFor="skills">Skills</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="skills"
                  name="skills"
                  value={skills || user?.skills} // Use state value if available, else use user's value
                  onChange={(e) => setSkills(e.target.value)} // Update state on input change
                />

                <label htmlFor="certificate">Certificate</label>
                <input
                  type="file"
                  className="form-control"
                  id="certificate"
                  name="certificate"
                  onChange={(e) => setCertificate(e.target.files[0])} // Update state on file change
                />

                <button
                  type="submit"
                  className="btn btn-success w-100 mt-2"
                  onClick={handleSubmit}
                >
                  <PencilFill /> Save Changes
                </button>

                {submitted && (
                  <div className="alert alert-success mt-2" role="alert">
                    Your profile has been updated!
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
