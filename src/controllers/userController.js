// Remove the duplicate import - keep only one
import { findUserByEmail, addUser, getAllUsers } from "../models/userModel.js";

// Add or update user
export const createUser = async (req, res) => {
  try {
    const user = req.body;

    // check if user already exists
    const isExist = await findUserByEmail(user.email);
    if (isExist) {
      return res.send({ message: "User already exists", insertedId: null });
    }

    const result = await addUser(user);
    console.log(user);
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