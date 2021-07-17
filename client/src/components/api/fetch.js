import axios from "axios";

const publicFetch = axios.create({
  baseURL: "http://localhost:3030/",
  // baseURL: "/",
});

export { publicFetch };
