// controllers/userController.js
import { findUserByEmail, addUser, getAllUsers, updateUser } from "../models/userModel.js";

// Add or update user
export const createUser = async (req, res) => {
  try {
    const user = req.body;

    // check if user already exists
    const isExist = await findUserByEmail(user.email);
    if (isExist) {
      return res.send({ message: "User already exists", insertedId: null }); // return existing user
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

export const updateUserData = async (req, res) => {
  try {
    const { email } = req.params;
    const userData = req.body;
    // console.log(userData)

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    const updatedUser = await updateUser(email, userData);

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Server Error", error });
  }
};
