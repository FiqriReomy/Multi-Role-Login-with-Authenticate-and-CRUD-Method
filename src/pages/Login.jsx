import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ErrMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email: Email,
        password: Password,
      });
      navigate("/");
    } catch (error) {
      setErrMessage(error.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="form min-w-[400px] border border-black rounded p-5">
        <div className="title text-center text-[25px] font-semibold mb-5">LOGIN FORM</div>
        <div className="title text-center text-red-500 font-semibold mb-5">{ErrMessage}</div>
        <form className="w-full " onSubmit={Login}>
          <div className="field mb-5 px-5">
            <input className="py-2 px-2 w-full border" type="text" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div className="field mb-5 px-5">
            <input className="py-2 px-2 w-full border" type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
          </div>
          <div className="field flex flex-wrap mb-5 px-3">
            <div className="wrapper px-2 w-full">
              <button className="py-2 px-5 bg-neutral-500 text-white w-full">LOGIN</button>
            </div>
          </div>
        </form>
        <div className="text-center">
          sudah punya akun ? login{" "}
          <Link to="/login" className="text-red-500">
            {" "}
            disini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
