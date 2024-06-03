import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../css/recommended.css";
import { getAllScientists } from "../features/scientistActions";
import { logoutUser } from "../features/userSlice";
import einsteinphoto from "../images/Albert-Einstein.jpg";
import { FaRegUser } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";
import { MdOutlineExpandMore } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Recommended = ({ scientist }) => {
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scientists, setScientists] = useState([]);
  const [hoveredScientistName, setHoveredScientistName] = useState("");

  useEffect(() => {
    fetchScientists();
  }, []);

  const fetchScientists = async () => {
    const scientists = await getAllScientists();
    console.log(scientists);
    setScientists(scientists.slice(0, 4));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const onMouseOverFunction = (name) => {
    setHoveredScientistName(name);
  };

  const onMouseOutFunction = () => {
    setHoveredScientistName("");
  };

  return (
    <div className="recom-container">
      <div className="recom-up">
        <div className="recom-up-science">
          <p>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "46px",
                fontFamily: "Roboto Serif, serif",
                color: "black",
              }}
            >
              Science
            </span>{" "}
            Today
          </p>
        </div>
        <div className="sign-1">
          {!currentUser.email ? (
            <>
              <Link className="auth-button" to="/register">
                Sign Up
                <FaRegUser />
              </Link>
              <Link className="auth-button" to="/login">
                Sign In
                <SlLogin />
              </Link>
            </>
          ) : (
            <button
              className="auth-button"
              style={{ marginRight: "20px" }}
              onClick={handleLogout}
            >
              Logout
              <IoIosLogOut />
            </button>
          )}
        </div>
      </div>
      <div className="recom-main-components">
        <div className="recom-left">
          <span className="recom-left-title">Recommendation for Today</span>
          <img src={einsteinphoto} alt="Einstein" />
          <p style={{ color: "black" }} className="albert">
            Albert Einstein
          </p>
          <p>Theoretical Physicist</p>
          <div className="button">
            <Link
              className="science-button"
              to={`/dashboard/scientist/6659cd5b5a3f2aa15225087e`}
            >
              About
            </Link>
          </div>
          <div className="famous-quote">
            <div className="famous-quote-text">
              <p
                style={{
                  fontFamily: "Dancing Script, cursive",
                  color: "black",
                  fontSize: "23px",
                }}
              >
                “Everybody is a genius. But if you judge a fish by its ability
                to climb a tree, it will live its whole life believing that it
                is stupid.”
              </p>
            </div>
          </div>
        </div>
        <div className="recom-right">
          <h1>More</h1>
          <div className="more-scientists">
            {scientists?.map((scientist) => {
              return (
                <Link
                  className="more-scientist"
                  key={scientist._id}
                  to={`/dashboard/scientist/${scientist._id}`}
                  onMouseOver={() => onMouseOverFunction(scientist.name)}
                  onMouseOut={onMouseOutFunction}
                >
                  <img src={scientist.imageURL} alt={scientist.name} />
                  {hoveredScientistName === scientist.name && (
                    <div className="scientist-name-overlay">
                      {scientist.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommended;
