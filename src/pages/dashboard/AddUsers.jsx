import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Auth();
  }, []);

  const ResetField = () => {
    setName("");
    setEmail("");
    setRole("");
    setPassword("");
    setPasswordConfirm("");
  };

  const Auth = async () => {
    try {
      await axios.get("http://localhost:5000/admin");
    } catch (e) {
      if (e) navigate("/");
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        role: role,
      });
      navigate("/userslist");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="p-2">
      <div className="heading px-2 border-b-2 mb-5">
        <div className="text-[25px] font-semibold mb-2">USERS</div>
        <div className="text-[20px]  mb-2">Add New Users</div>
      </div>

      <div className="card-content mt-2">
        <div className="px-2">
          <div className="text-center min-h-[20px] py-2">
            <p className="">{msg}</p>
          </div>
          <form className="mb-2" onSubmit={saveUser}>
            <div className="field mb-2">
              <label className="label">Name</label>
              <div className="control">
                <input type="text" className="w-full py-2 px-2 border" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              </div>
            </div>
            <div className="field mb-2">
              <label className="label">Email</label>
              <div className="control">
                <input type="text" className="w-full py-2 px-2 border" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>
            </div>
            <div className="field mb-2">
              <label className="label">Password</label>
              <div className="control">
                <input type="password" className="w-full py-2 px-2 border" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="* * * *" />
              </div>
            </div>
            <div className="field mb-2">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input type="password" className="w-full py-2 px-2 border" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="* * * *" />
              </div>
            </div>
            <div className="field mb-5">
              <label className="label">Role</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select value={role} className="w-full py-2 px-2 border" onChange={(e) => setRole(e.target.value)}>
                    <option value=""></option>
                    <option value="admin">admin</option>
                    <option value="users">users</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field mb-2">
              <div className="control">
                <button type="submit" className="py-1 px-4 bg-green-500 text-white rounded">
                  SIMPAN
                </button>
              </div>
            </div>
          </form>
          <button onClick={ResetField} className="py-1 px-4 bg-green-500 text-white rounded">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
