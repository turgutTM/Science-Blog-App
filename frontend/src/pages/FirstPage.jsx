import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/firstpage.css";

const FirstPage = () => {
  return (
    <div className="firstpage-container">
      <div className="main-page">
        <div className="main-page-components">
          <div className="main-left">
            <p className="text-left">
              <span style={{ color: "black", fontWeight: "bold" }}>
                Welcome
              </span>
              , i see you love the{" "}
              <span style={{ color: "white", fontWeight: "bold" }}>
                Science
              </span>
              <span style={{color:"white",fontWeight:"bold"}}>
              .However, knowing their names is not enough; understanding how
              they became so successful is essential. One person can change the
              world, like <span style={{ color: "yellow" }}>Einstein</span>. If
              you see this spark in yourself, keep reading.
              </span>
            </p>
            <div className="buttons">
              <Link to="/dashboard">
                <button className="button-2">Let's go</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
