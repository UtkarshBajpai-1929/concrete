import axios from "axios";

const API = axios.create({
  baseURL: "http://10.136.136.39:8000",
});

export const getMaaCurve = async () => {
  const response = await API.get("/data");
  console.log("API Response:", response.data); // Log the response data for debugging
  return response.data;
};
