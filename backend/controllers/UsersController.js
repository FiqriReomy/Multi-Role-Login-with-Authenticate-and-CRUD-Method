import { Users } from "../models/Users.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    if (req.role !== "admin") return res.status(403).json({ msg: `Unauthorized Access` });
    const response = await Users.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const RegisterUsers = async (req, res) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  // // empty data field check
  // if (req.body === null) return res.status(500).json({ msg: `all data must be filled` });

  //   password match checking
  if (password !== passwordConfirm) return res.status(500).json({ msg: `password did not match` });

  // email existance checking
  const isEmailExist = await Users.findOne({ where: { email: email } });
  if (isEmailExist) return res.status(500).json({ msg: `email is already exist` });

  //   password encryption methods
  const salt = await bcrypt.genSalt();
  const HashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({ name, email, password: HashPassword, role: role });
    res.status(200).json({ msg: `registration is success` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const UpdateUsers = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, email, password, passwordConfirm, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    const salt = await bcrypt.genSalt();
    hashPassword = await bcrypt.hash(password, salt);
  }
  if (password !== passwordConfirm) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const DeleteUsers = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

