import { Users } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env;

export const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });
  // email existance check
  if (!user) return res.status(403).json({ msg: "email doesnt exist" });

  // password match checking
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });

  const userId = user.id;
  const userRole = user.role;
  const userEmail = user.email;

  //   generating access token and refresh token as cookies for authentication
  const accessToken = jwt.sign({ userId, userEmail, userRole }, ACCESS_TOKEN, {
    expiresIn: "15s",
  });
  const refreshToken = jwt.sign({ userId, userEmail, userRole }, REFRESH_TOKEN, {
    expiresIn: "1d",
  });

  //   updating a new refresh token to database for access
  await Users.update({ refresh_token: refreshToken }, { where: { id: userId } });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  });

  res.status(200).json({ accessToken });
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(204);
  const userId = user.id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

// akan di generate setelah login dihalaman terpisah
export const UserRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.send(400).json({ msg: `user not found` });
    jwt.verify(refreshToken, REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const userId = user.id;
      const name = user.name;
      const email = user.email;
      const role = user.role;
      const accessToken = jwt.sign({ userId, name, role, email }, ACCESS_TOKEN, {
        expiresIn: "15s",
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};

export const AccountInfo = async (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await Users.findOne({
    attributes: ["id", "name", "email"],
    where: {
      refreshToken: req.cookies.refreshToken,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const isAdmin = async (req, res, next) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ msg: "please Login to your account" });
  }
  const user = await Users.findOne({
    where: {
      refresh_token: req.cookies.refreshToken,
    },
  });
  if (user.role !== "admin") return res.status(403).json({ msg: `Access Prohibited` });
};
