import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
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
    <div className="px-2">
      <div className="heading px-2 border-b-2 mb-5">
        <div className="text-[25px] font-semibold mb-2">USERS</div>
        <div className="text-[20px]  mb-2">Edit Users Information</div>
      </div>

      <div className="card-content">
        <div className="content px-5">
          <form onSubmit={updateUser}>
            <p className="has-text-centered">{msg}</p>
            <div className="field mb-5">
              <label className="label">Name</label>
              <div className="control">
                <input type="text" className="w-full py-2 px-2 border" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              </div>
            </div>
            <div className="field mb-5">
              <label className="label">Email</label>
              <div className="control">
                <input type="text" className="w-full py-2 px-2 border" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
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
        </div>
      </div>
    </div>
  );
};

export default EditUsers;
