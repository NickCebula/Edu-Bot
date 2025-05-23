import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../assets/Subjects.css";

export default function Subjects({ username = "Guest" }) {
  return (
    <>
      <NavBar
        title="Edu-Bot"
        username={username}
        links={[
          { to: "/subjects", label: "SUBJECTS" },
          { to: "/evaluations", label: "EVALUATIONS" },
          { to: "/profile", label: "PROFILE" },
        ]}
      />
      <div className="container">
        <h2>SUBJECTS</h2>
        <div className="subjects">
          <Link className="subject-btn math" to="/math">MATH</Link>
          <Link className="subject-btn reading" to="/reading">READING</Link>
          <Link className="subject-btn spelling" to="/spelling">SPELLING</Link>
          <Link className="subject-btn test" to="/test">TEST</Link>
        </div>
      </div>
    </>
  );
}
