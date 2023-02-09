import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const ResetField = () => {
    setName("");
    setPrice("");
  };
  return (
    <div className="px-5">
      <div className="heading px-2 border-b-2 mb-5">
        <div className="text-[25px] font-semibold mb-2">PRODUCTS</div>
        <div className="text-[20px]  mb-2">Add New Product</div>
      </div>

      <div className="card-content mt-2">
        <div className="px-2">
          <div className="text-center min-h-[20px] py-2">
            <p className="">{msg}</p>
          </div>
          <form className="mb-2" onSubmit={saveProduct}>
            <div className="field mb-2">
              <label className="label">Name</label>
              <div className="control">
                <input type="text" className="w-full py-2 px-2 border" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
              </div>
            </div>
            <div className="field mb-2">
              <label className="label">Price</label>
              <div className="control">
                <input type="text" className="w-full py-2 px-2 border" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
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

export default AddProduct;
