export default async function extractSkillsWithLLM(cvText) {
  const prompt = `You are an expert career advisor and skill analyzer. Analyze the following CV/Resume text and extract:

1. Key skills (programming languages, frameworks, tools, technologies)
2. Suggest career track among these according skills("Web Development",
    "Mobile App Development",
    "Data Science",
    "AI / ML",
    "UI/UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "Software Engineering",
    "Cybersecurity",
    "Cloud Computing",
    "Business Analysis",
    "DevOps / System Administration",
    "Finance & Accounting",
    "Human Resources (HR)",
    "Education & Training")

CV Text:
${cvText}

Respond ONLY with a valid JSON object in this exact format (no markdown, no extra text):
{
  "skills": ["skill1", "skill2", "skill3"],
  "careerTrack": ["track1", "track2", "track3"]
}

Important:
- Use proper capitalization (e.g., "JavaScript" not "javascript")
- Return only the JSON, nothing else`;

  try {
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
          temperature: 0.3,
          max_tokens: 1000,
        }),
      }
    );

    const data = await response.json();

    console.log("LLM raw response:", data?.choices[0]?.message?.content);

    const rawContent =
      data?.choices[0]?.message?.content ??
      data?.choices?.[0]?.message ??
      data?.generated_text ??
      data?.output?.[0]?.content?.[0]?.text ??
      data?.text ??
      data?.result ??
      null;

    if (!rawContent) {
      if (!response.ok) {
        throw new Error(
          `LLM API error: ${response.status} ${data?.error ?? ""}`
        );
      }
      throw new Error("LLM returned no content");
    }

    const contentStr =
      typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);

    const cleaned = contentStr.replace(/```json\n?|```/g, "").trim();

    let parsed = null;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}$/);
      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch (e2) {
          
        }
      }
    }

    if (!parsed) {
      throw new Error(
        "Unable to parse JSON from LLM response. Raw cleaned output: " +
          cleaned.slice(0, 1000)
      );
    }

    return {
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      tools: Array.isArray(parsed.tools) ? parsed.tools : [],
      careerTrack: Array.isArray(parsed.careerTrack) ? parsed.careerTrack : []
    };
  } catch (error) {
    console.error("LLM extraction error:", error);
    throw new Error(
      "Failed to extract skills with LLM: " + (error.message || error)
    );
  }
}
