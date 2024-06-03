import axios from "axios";
import { addScientist, setScientists } from "./scientistSlice";
import { useDispatch } from "react-redux";

const BASE_URL = "http://localhost:5100/api";

const getAllScientists = async () => {
  const { data } = await axios.get(`${BASE_URL}/scientists`);
  console.log(data);

  return data;
};

const deleteScientistAction = async (id) => {
  await axios.delete(`${BASE_URL}/scientists/${id}`);
};

const createScientist = async (scientist) => {
  const { name, field, nationality, biography, imageURL } = scientist;
  console.log(imageURL);
  const newScientist = {
    name,
    field,
    nationality,
    biography,
  };

  const formData = new FormData();
  formData.append("image", imageURL);

  try {
    const { data } = await axios.post(
      `${BASE_URL}/scientists/upload`,
      formData
    );
    newScientist.imageURL = data.image.src;
  } catch (error) {
    console.log(error);
  }
  const { data } = await axios.post(`${BASE_URL}/scientists`, newScientist);

  console.log(data);
  return data.post;
};

const updateScientist = async (scientist) => {
  const { name, field, nationality, biography, imageURL } = scientist;

  const newScientist = {
    name,
    field,
    nationality,
    biography,
  };

  const formData = new FormData();
  formData.append("image", imageURL);

  try {
    const { data } = await axios.post(
      `${BASE_URL}/scientists/upload`,
      formData
    );
    newScientist.imageURL = data.image.src;
  } catch (error) {
    console.log(error);
  }
  const { data } = await axios.patch(`${BASE_URL}/scientists/${scientist.id}`, newScientist);

  console.log(data);
  return data.post;
};

export { getAllScientists, createScientist, deleteScientistAction, updateScientist };
