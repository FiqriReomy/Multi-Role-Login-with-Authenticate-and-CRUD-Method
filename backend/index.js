// packages call
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { database } from "./config/Database.js";
import { AuthRoute } from "./routes/AuthRoute.js";
import { ProductsRoute } from "./routes/ProductsRoute.js";
import { UsersRoute } from "./routes/UsersRoute.js";

// default settings
dotenv.config();
const { PORT, DB_NAME } = process.env;
const app = express();

// recognize incoming Request Object as JSON
app.use(express.json());

// parsing cookie to get a cookie and its value
app.use(cookieParser());

// specify origin to access API from frontend
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// routes define

app.use(AuthRoute);
app.use(UsersRoute);
app.use(ProductsRoute);

// checking connection of database and route are working fine
app.listen(PORT, async () => {
  try {
    await database.authenticate();
    // await database.sync();
    console.log(`database connected to ${DB_NAME}`);
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Server up and running on port ${PORT}...`);
});
