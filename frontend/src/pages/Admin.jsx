import React, { useEffect, useState } from "react";
import "../css/admin.scss";
import { createScientist, updateScientist } from "../features/scientistActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdCreate } from "react-icons/md";

const Admin = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    nationality: "",
    biography: "",
    imageURL: "",
  });
  const [file, setFile] = useState("");

  const router = useNavigate();

  useEffect(() => {
    if (id) {
      fetchScientist();
    }
  }, []);

  const fetchScientist = async () => {
    try {
      const response = await axios.get(
        `https://science-2.vercel.app/api/scientists/${id}`
      );
      console.log(response.data);
      const { name, field, biography, imageURL } = response.data;
      console.log(name, field, imageURL);
      setFormData({ ...formData, name, field, imageURL, biography });
    } catch (error) {
      console.error("Error fetching scientist:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBiographyChange = (value) => {
    setFormData({ ...formData, biography: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updateScientist({
        ...formData,
        id: id,
        imageURL: file,
      });
      toast.success("Scientists successfully updated");
    } else {
      await createScientist({
        ...formData,
        imageURL: file,
      });

      toast.success("Scientists successfully created!");
    }

    setFormData({
      name: "",
      field: "",
      nationality: "",
      biography: "",
    });

    setFile("");

    setTimeout(() => {
      router("/dashboard/allscientists");
    }, 3000);
  };

  return (
    <div className="admin-container">
      <div className="admin-title">
        <h1>Welcome</h1>
      </div>
      <div className="panel-bio">
        <form onSubmit={handleSubmit}>
          <div className="form-inner">
            <label>Name of Scientist:</label>
            <input
              placeholder="E.g., Einstein"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-inner">
            <label>Field:</label>
            <input
              placeholder="E.g., Physics"
              type="text"
              name="field"
              value={formData.field}
              onChange={handleChange}
            />
          </div>

          <div className="form-inner">
            <label>Nationality:</label>
            <input
              placeholder="E.g., German"
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
          </div>

          <div className="form-inner">
            <label>Image:</label>
            <input type="file" name="file" onChange={handleFileChange} />
          </div>
          <button type="submit">
            {id ? "Update" : "Create"}
            <MdCreate />
          </button>
        </form>
        <div className="biography-add">
          <h1>Biography:</h1>
          <div className="quill-container">
            <ReactQuill
              placeholder="Write something about your favorite scientist"
              style={{ height: "22.5rem" }}
              theme="snow"
              value={formData.biography}
              onChange={handleBiographyChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
