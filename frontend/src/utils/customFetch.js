import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://science-2.vercel.app/api",
});

export default customFetch;
