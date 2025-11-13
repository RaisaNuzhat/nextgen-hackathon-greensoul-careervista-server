import { getResources } from "../models/resourceModel.js";

export const getAllResources = async (req, res) => {
  try {
    const resources = await getResources();
    res.send(resources);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error", error });
  }
};