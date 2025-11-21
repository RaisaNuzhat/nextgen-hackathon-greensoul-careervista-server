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

export const getAllResourcesForAnalytics = async (req, res) => {
  try {
    const resources = await getResources();
    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};