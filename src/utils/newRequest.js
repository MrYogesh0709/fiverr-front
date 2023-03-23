import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fiver-back.onrender.com/api/",
  // baseURL: "https://localhost:5000/api/",
  withCredentials: true,
});

export default newRequest;
