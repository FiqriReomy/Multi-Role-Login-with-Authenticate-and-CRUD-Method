import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/ProductsControllers.js";
import { VerifyRoles } from "../middleware/Authenticate.js";

export const ProductsRoute = express.Router();

ProductsRoute.get("/products", VerifyRoles, getProducts);
ProductsRoute.get("/products/:id", VerifyRoles, getProductById);
ProductsRoute.post("/products", VerifyRoles, createProduct);
ProductsRoute.patch("/products/:id", VerifyRoles, updateProduct);
ProductsRoute.delete("/products/:id", VerifyRoles, deleteProduct);
