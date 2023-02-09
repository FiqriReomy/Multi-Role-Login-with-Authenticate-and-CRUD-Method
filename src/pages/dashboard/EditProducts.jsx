import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ErrMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setErrMessage(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setErrMessage(error.response.data.msg);
      }
    }
  };

  return (
    <div className="px-5">
      <div className="heading px-2 border-b-2 mb-5">
        <div className="text-[25px] font-semibold mb-2">PRODUCTS</div>
        <div className="text-[20px]  mb-2">Edit Product</div>
      </div>

      <div className="card-content mt-2">
        <div className="px-2">
          <div className="text-center min-h-[20px] py-2">
            <p className="">{ErrMessage}</p>
          </div>
          <form className="mb-2" onSubmit={updateProduct}>
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
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
