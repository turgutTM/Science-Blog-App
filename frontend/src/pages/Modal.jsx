import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import "../css/modal.css"; // Assuming you have a CSS file for styling

const Modal = ({ isOpen, toggle }) => {
  const [favoriteScientists, setFavoriteScientists] = useState([]);
  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (isOpen) {
      fetchFavoriteScientists();
    }
  }, [isOpen]);

  const fetchFavoriteScientists = async () => {
    try {
      const response = await axios.get(
        `https://science-2.vercel.app/api/scientists/getallfavoritescientists/${currentUser._id}`
      );
      console.log(response);
      setFavoriteScientists(response.data);
    } catch (error) {
      console.error("Error fetching favorite scientists:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="overlay" onClick={toggle}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h1>Favorite Scientists</h1>
              <button className="close-button" onClick={toggle}>
                <MdClose size={25} />
              </button>
            </div>
            <ul className="scientist-list">
              {favoriteScientists.map((scientist) => (
                <li key={scientist._id} className="scientist-item">
                  <img
                    src={scientist.imageURL}
                    alt={scientist.name}
                    className="scientist-image"
                  />
                  <div className="scientist-info">
                    <h2>{scientist.name}</h2>
                    <p>{scientist.field}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
