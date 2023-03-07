import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fiver-back.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
