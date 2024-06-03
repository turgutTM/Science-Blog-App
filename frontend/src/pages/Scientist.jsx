import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/singlescientist.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteScientist } from "../features/userSlice";
import toast from "react-hot-toast";
import Modal from "./Modal";
import StarRating from "./StarRating"; // Import the StarRating component

const Scientist = () => {
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const [scientistData, setScientistData] = useState(null);
  const [likeClicked, setLikeClicked] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchScientistData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5100/api/scientists/${id}`
        );
        setScientistData(response.data);
      } catch (error) {
        console.error("Error fetching scientist data:", error);
      }
    };

    fetchScientistData();
  }, [id]);

  const handleAddToCart = async () => {
    if (currentUser._id) {
      dispatch(toggleFavoriteScientist({ scientistId: id }));
      await axios.post(`http://localhost:5100/api/scientists/${id}/favorite`, {
        userId: currentUser._id,
      });
    } else {
      toast.error("Please log in to add this scientist to favorites.");
    }
  };

  const handleRating = async (rating) => {
    if (currentUser._id) {
      await axios.post(`http://localhost:5100/api/scientists/${id}/rate`, {
        userId: currentUser._id,
        rating,
      });
      toast.success(`You rated this article ${rating} stars!`);
    } else {
      toast.error("Please log in to rate this scientist.");
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="singlescience-container">
      {scientistData && (
        <div className="singlescience-components">
          <div className="header-text">
            <p>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  fontFamily: "Roboto Serif, serif",
                  color: "black",
                  marginRight: "100px",
                }}
              >
                Science...
              </span>{" "}
            </p>
            <div className="list">
              <button className="listmodal" onClick={toggleModal}>
                <AiOutlineUnorderedList />
              </button>
            </div>
          </div>
          <div className="biography-main">
            <div className="header-photo">
              <img src={scientistData.imageURL} alt={scientistData.name} />
            </div>
            <div className="biography-field">
              <div
                className="biography-field-text"
                dangerouslySetInnerHTML={{ __html: scientistData.biography }}
              />
            </div>
          </div>
          <div className="emotions">
            <button
              className="addfav"
              style={{
                cursor: "pointer",
                background: "transparent",
                border: "none",
              }}
              onClick={handleAddToCart}
            >
              {currentUser?.favoriteScientists?.includes(id) ? (
                <MdFavorite size={24} style={{ color: "red" }} />
              ) : (
                <MdFavoriteBorder size={24} />
              )}
            </button>
            <div className="star-rating-container">
              <StarRating onRate={handleRating} />{" "}
            </div>
          </div>
          <div className="footer">
            <span>
              <a
                style={{ color: "white" }}
                target="_blank"
                href="https://www.instagram.com/"
              >
                <FaInstagram style={{ cursor: "pointer" }} />
              </a>
              <a
                style={{ color: "white" }}
                href="https://github.com/turgutTM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub style={{ cursor: "pointer" }} />
              </a>
              <a
                style={{ color: "white" }}
                href="https://www.linkedin.com/in/turgut-muradl%C4%B1-9714522b1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn style={{ cursor: "pointer" }} />
              </a>
            </span>
          </div>
        </div>
      )}
      <Modal isOpen={modal} toggle={toggleModal} />
    </div>
  );
};

export default Scientist;
