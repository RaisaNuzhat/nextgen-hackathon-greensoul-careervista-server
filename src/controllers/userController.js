// controllers/userController.js
import { findUserByEmail, addUser, getAllUsers, updateUser } from "../models/userModel.js";
import multer from "multer";
import { PDFExtract } from "pdf.js-extract";
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
const upload = multer({ dest: "uploads/" });

async function queryHuggingFace(prompt) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CAREERVISTA2_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:fastest",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );
  const data = await response.json();
  console.log(data?.choices[0]?.message?.content);
  if (data.error) throw new Error(data.error);
  return data?.choices[0]?.message?.content || "No response received from model.";
}

export const cvAnalyzer=async(req,res)=>{
app.post("/resume-match", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    const jobDescriptionRaw = req.body.jobDescription;
    console.log("Job Description:", jobDescriptionRaw);

    if (!file) return res.status(400).send("No PDF uploaded!");
    if (!jobDescriptionRaw)
      return res.status(400).send("No job description provided!");

    // Initialize pdf.js-extract
    const pdfExtract = new PDFExtract();
    const options = {}; // default options

    // Extract PDF text
    pdfExtract.extract(file.path, options, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error parsing PDF");
      }

      // Combine text from all pages
      const resumeTextRaw = data.pages
        .map((page) => page.content.map((c) => c.str).join(" "))
        .join("\n\n");

      // Clean up uploaded file
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        } else {
          console.log("Uploaded file deleted successfully");
        }
      });

      // --- Preprocessing ---
      const resumeText = preprocess(resumeTextRaw);
      const jobDescription = preprocess(jobDescriptionRaw);

      // --- Compute similarity ---
      const similarityScore = await computeSimilarity(
        resumeText,
        jobDescription
      );

      // --- Prepare prompt for AI ---
      const aiPrompt = `
You are an expert career advisor and resume coach.

Here is a job description:
${jobDescription}

Here is the candidate's resume text:
${resumeText}

The similarity score between the resume and the job description is ${(
        similarityScore * 100
      ).toFixed(2)}%.

Based on the comparison:
1. Suggest the top  3 skills or technologies the candidate should learn to better fit this job. No extra text shpuld be provided. Just skill names.
      `;

         try {
        const aiAdvice = await queryHuggingFace(aiPrompt);

        res.json({
          similarityScore,
          percentage: (similarityScore * 100).toFixed(2) + "%",
          resumeText,
          jobDescription,
          aiAdvice,
        });
      } catch (aiError) {
        console.error("AI error:", aiError);
        res.json({
          similarityScore,
          percentage: (similarityScore * 100).toFixed(2) + "%",
          resumeText,
          jobDescription,
          aiAdvice: "AI analysis failed.",
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

}

