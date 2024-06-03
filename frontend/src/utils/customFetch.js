import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:5100/api",
});

export default customFetch;
