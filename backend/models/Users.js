import { DataTypes } from "sequelize";
import { database } from "../config/Database.js";

export const Users = database.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "users",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
