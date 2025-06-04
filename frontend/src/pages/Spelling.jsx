import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function Spelling({ username = "Guest" }) {
  const navigate = useNavigate();

  return (
    <>
      <NavBar
        title="Edu-Bot"
        username={username}
      />
      <div className="container">
        <h2>SPELLING</h2>
        <div className="spelling-content">
          <p>Welcome to the Spelling section!</p>
          <button onClick={() => navigate("/subjects")} className="back-btn">Back to Subjects</button>
        </div>
      </div>
    </>
  );
}