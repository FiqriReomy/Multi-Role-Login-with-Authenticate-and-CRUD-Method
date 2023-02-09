import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Layout from "./Layout";

const Auth = () => {
  const [Email, setEmail] = useState("");
  const [Expired, setExpired] = useState("");
  const [isAdmin, setRole] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      const decoded = jwt_decode(response.data.accessToken);
      setEmail(decoded.email);
      setExpired(decoded.exp);
      if (decoded.role === "admin") {
        setRole(true);
      } else {
        setRole(false);
      }
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date().getTime();
      const ExpTime = Expired * 1000;
      if (ExpTime < currentTime) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        const decoded = jwt_decode(response.data.accessToken);
        setEmail(decoded.email);
        setExpired(decoded.exp);
      } else {
        await axios.delete("http://localhost:5000/logout");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div>
      <Navbar email={Email} />
      <Layout isAdmin={isAdmin} />
    </div>
  );
};

export default Auth;
