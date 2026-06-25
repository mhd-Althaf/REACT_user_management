import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor to handle session/token expiration automatically
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server returns 401 (Not Authorized / Token failed), log out client-side
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default API;