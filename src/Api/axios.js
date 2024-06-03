import axios from "axios";

const axiosInstance = axios.create({
  //deployed version of amazon server on render.com
  baseURL: "https://amazon-backend-deploy-qdzl.onrender.com/",
});
export { axiosInstance };
//Local instance of firebase functions
//http://127.0.0.1:5001/e-clone-by-solomon/us-central1/api
