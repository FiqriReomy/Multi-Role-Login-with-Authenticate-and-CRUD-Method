import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: Name,
        email: Email,
        password: Password,
        passwordConfirm: PasswordConfirm,
      });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 justify-center items-center">
      <div className="form min-w-[400px] border border-black rounded p-5">
        <div className="title text-center text-[25px] font-semibold mb-5">REGISTER FORM</div>
        <form className="w-full mb-5 " onSubmit={Register}>
          <div className="field mb-5 px-5">
            <input className="py-1 px-2 w-full border" type="text" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          </div>
          <div className="field mb-5 px-5">
            <input className="py-1 px-2 w-full border" type="text" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div className="field mb-5 px-5">
            <input className="py-1 px-2 w-full border" type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div className="field mb-5 px-5">
            <input className="py-1 px-2 w-full border" type="password" value={PasswordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Password confirmation" required />
          </div>
          <div className="field flex flex-wrap mb-2 px-5">
            <div className="wrapper w-full">
              <button className="py-2 px-5 bg-neutral-500 text-white w-full">DAFTAR BARU</button>
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
