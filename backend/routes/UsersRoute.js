import express from "express";
import { AdminOnly, VerifyRoles } from "../middleware/Authenticate.js";
import { UserRefreshToken } from "../controllers/AuthControllers.js";
import { getUsers, getUsersById, RegisterUsers, UpdateUsers, DeleteUsers } from "../controllers/UsersController.js";

export const UsersRoute = express.Router();

UsersRoute.get("/users", VerifyRoles, getUsers);
UsersRoute.get("/token", UserRefreshToken);
UsersRoute.get("/users/:id", AdminOnly, getUsersById);
UsersRoute.post("/users", RegisterUsers);
UsersRoute.patch("/users/:id", UpdateUsers);
UsersRoute.delete("/users/:id", DeleteUsers);

