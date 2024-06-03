import React, { useEffect, useState } from "react";
import "../css/allscientists.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllScientists,
  deleteScientistAction,
} from "../features/scientistActions";
import { deleteScientist, setScientists } from "../features/scientistSlice";
import { FcAbout } from "react-icons/fc";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllScientists = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const dispatch = useDispatch();
  const scientists = useSelector((state) => state.scientist.scientists);

  const getScientists = async () => {
    const scientists = await getAllScientists();
    dispatch(setScientists(scientists));
  };

  useEffect(() => {
    getScientists();
  }, []);

  const handleDelete = async (scientist, e) => {
    e.preventDefault();
    console.log(scientist._id);
    await deleteScientistAction(scientist._id);
    dispatch(deleteScientist(scientist._id));
    toast.success("Deleted");
  };

  const filterScientists = () => {
    if (!scientists) return [];

    const searchInputLower = searchInput.toLowerCase();
    const searchCategoryLower = searchCategory.toLowerCase();

    return scientists.filter((scientist) => {
      const scientistName = scientist.name ? scientist.name.toLowerCase() : "";
      const scientistField = scientist.field ? scientist.field.toLowerCase() : "";
      return (
        (scientistName.includes(searchInputLower) || scientistField.includes(searchInputLower)) &&
        (searchCategoryLower === "" || scientistField.includes(searchCategoryLower))
      );
    });
  };

  return (
    <div className="science-container">
      <div className="science-components">
        <div className="science-up-components">
          <input
            type="text"
            placeholder="Name of scientist"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        </div>
        <div className="science-main-container">
          <div className="science-main-components">
            {filterScientists().length === 0 ? (
              <div className="not-found">
                <img src="/not-found.png" />
                <span>No scientists matching search criteria</span>
              </div>
            ) : (
              <>
                {filterScientists().map((scientist, index) => (
                  <div key={index} className="allscientist-components">
                    <img src={scientist.imageURL} alt="Einstein"></img>
                    <p
                      style={{
                        color: "black",
                        fontSize: "24px",
                        marginTop: "30px",
                        marginLeft:"5px",
                      }}
                      className="albert"
                    >
                      {scientist.name}
                    </p>
                    <p>{scientist.field}</p>
                    <div className="button">
                      <Link
                        className="science-button"
                        to={`/dashboard/scientist/${scientist._id}`}
                      >
                        <span>About</span>
                        <FcAbout size={20} />
                      </Link>
                    </div>
                    <div className="icons-edit-delete">
                      <Link
                        to={`/dashboard/admin/${scientist._id}`}
                        style={{ cursor: "pointer", color: "black" }}
                      >
                        <MdOutlineEdit></MdOutlineEdit>
                      </Link>
                      <i
                        type="button"
                        onClick={(e) => handleDelete(scientist, e)}
                        style={{ cursor: "pointer" }}
                      >
                        <IoIosCloseCircleOutline></IoIosCloseCircleOutline>
                      </i>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllScientists;
