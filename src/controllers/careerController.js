import dotenv from "dotenv";
dotenv.config();

// Function to call HuggingFace LLM
async function queryHuggingFace(prompt) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CAREERVISTA3_TOKEN}`,
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

  if (data.error) {
    console.error("LLM ERROR:", data.error);
    throw new Error(data.error);
  }

  return data?.choices?.[0]?.message?.content || "No response from the model.";
}


export const askCareerBot = async (req, res) => {
  try {
    const { question } = req.body;
console.log(question)
    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }

    const answer = await queryHuggingFace(question);
    console.log(answer)

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get response from LLM",
      error: error.message,
    });
  }
};
