import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  return (
    <div className="px-5">
      <div className="heading px-2 border-b-2 mb-5">
        <div className="text-[25px] font-semibold mb-2">PRODUCTS LIST</div>
        <div className="text-[20px]  mb-2">List of Products</div>
      </div>
      <div className="mb-5">
        <Link to="/addusers" className="py-2 px-4 bg-green-500 rounded text-white ">
          TAMBAH PRODUCT
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 bg-slate-400 border">No</th>
            <th className="text-left py-2 px-4 bg-slate-400 border">Name</th>
            <th className="text-left py-2 px-4 bg-slate-400 border">price</th>
            <th className="text-left py-2 px-4 bg-slate-400 border">Created By</th>
            <th className="text-left py-2 px-4 bg-slate-400 border">Role</th>
            <th className="text-left py-2 px-4 bg-slate-400 border text-center max-w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b-2 border">{index + 1}</td>
              <td className="py-2 px-4 border-b-2 border">{product.name}</td>
              <td className="py-2 px-4 border-b-2 border">{product.price}</td>
              <td className="py-2 px-4 border-b-2 border">{product.user.name}</td>
              <td className="py-2 px-4 border-b-2 border">{product.user.role}</td>
              <td className="py-2 px-4 border-b-2 border">
                <div className="div flex gap-2 items-center justify-center">
                  <Link to={`/editproducts/${product.id}`} className="py-2 px-4 bg-blue-500 rounded">
                    Edit
                  </Link>
                  <button onClick={() => deleteProduct(product.id)} className="py-2 px-4 bg-red-500 rounded">
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

export default Products;
