import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      if (error) {
        navigate("/");
      }
    }
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <div className="px-5">
      <div className="heading px-2 border-b-2 mb-5">
        <div className="text-[25px] font-semibold mb-2">USERS </div>
        <div className="text-[20px]  mb-2">List of Users</div>
      </div>
      <div className="mb-5">
        <Link to="/addusers" className="py-2 px-4 bg-green-500 rounded text-white ">
          TAMBAH USERS
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 bg-slate-400 border">No</th>
            <th className="text-left py-2 px-4 bg-slate-400 border">Name</th>
            <th className="text-left py-2 px-4 bg-slate-400 border">Email</th>
            <th className="text-left py-2 px-4 bg-slate-400 border">Role</th>
            <th className="text-left py-2 px-4 bg-slate-400 border text-center max-w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b-2 border">{index + 1}</td>
              <td className="py-2 px-4 border-b-2 border">{user.name}</td>
              <td className="py-2 px-4 border-b-2 border">{user.email}</td>
              <td className="py-2 px-4 border-b-2 border">{user.role}</td>
              <td className="py-2 px-4 border-b-2 border">
                <div className="div flex gap-2 items-center justify-center">
                  <Link to={`/editusers/${user.id}`} className="py-2 px-4 bg-blue-500 rounded">
                    Edit
                  </Link>
                  <button onClick={() => deleteUser(user.id)} className="py-2 px-4 bg-red-500 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
