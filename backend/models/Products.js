import { Sequelize } from "sequelize";
import { database } from "../config/Database.js";
import { Users } from "./Users.js";

const { DataTypes } = Sequelize;

export const Products = database.define(
  "product",
  {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Products);
Products.belongsTo(Users, { foreignKey: "userId" });
