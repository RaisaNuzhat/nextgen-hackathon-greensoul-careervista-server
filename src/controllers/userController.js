// controllers/userController.js
import { findUserByEmail, addOrUpdateUser, getAllUsers } from "../models/userModel.js";

// Add or update user
export const createOrUpdateUser = async (req, res) => {
  try {
    const user = req.body;

    // check if user already exists
    const isExist = await findUserByEmail(user.email);
    if (isExist) {
      return res.send(isExist); // return existing user
    }

    const result = await addOrUpdateUser(user);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

// Get user by email
export const getUserByEmailController = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error });
  }
};
