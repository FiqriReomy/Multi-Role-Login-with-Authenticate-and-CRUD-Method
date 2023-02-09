import { Users } from "../models/Users.js";

export const VerifyRoles = async (req, res, next) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ msg: "please Login to your account" });
  }
  const user = await Users.findOne({
    where: {
      refresh_token: req.cookies.refreshToken,
    },
  });
  if (!user) return res.status(500).json({ msg: "User is not exist" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const AdminOnly = async (req, res, next) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ msg: "please Login to your account" });
  }
  const user = await Users.findOne({
    where: {
      refresh_token: req.cookies.refreshToken,
    },
  });
  if (user.role !== "admin") return res.status(403).json({ msg: `Access Prohibited` });
  next();
};
