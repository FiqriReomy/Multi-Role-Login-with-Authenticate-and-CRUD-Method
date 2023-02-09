import { Login, Logout, UserRefreshToken, AccountInfo, isAdmin } from "../controllers/AuthControllers.js";
import express from "express";

export const AuthRoute = express.Router();

AuthRoute.get("/admin", isAdmin);
AuthRoute.get("/me", AccountInfo);
AuthRoute.get("/token", UserRefreshToken);
AuthRoute.post("/login", Login);
AuthRoute.delete("/logout", Logout);
