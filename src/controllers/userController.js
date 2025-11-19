import { findUserByEmail, addUser, getAllUsers, updateUser, getAdmin } from "../models/userModel.js";
import multer from "multer";
import { PDFExtract } from "pdf.js-extract";

export const createUser = async (req, res) => {
  try {
    const user = req.body;

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

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error });
  }
};


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

export const checkAdmin =async(req,res)=>{
      const email = req.params.email;
      console.log(email)
      if (email != req.decoded.email) {
        return res.status(403).send({ message: "Forbidden access." });
      }
      const query = { email: email };
      const result = await getAdmin(query);
      res.send(result);
    
}
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
