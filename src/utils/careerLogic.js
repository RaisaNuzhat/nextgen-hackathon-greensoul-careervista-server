// utils/careerLogic.js

function generateCareerResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("skills") || q.includes("role")) {
    return "Based on common youth career paths (aligned with SDG 8), you can explore roles like Web Developer, Backend Engineer, Graphic Designer, or Data Analyst. These roles match many beginner-friendly skill sets.";
  }

  if (q.includes("backend") || q.includes("developer") || q.includes("learn next")) {
    return "To become a backend developer, learn: Node.js, Express, MongoDB, Authentication (JWT), API security, and deployment. This is a suggested path — your progress depends on consistent practice.";
  }

  if (q.includes("internship") || q.includes("chance")) {
    return "To improve your chances of an internship: build 3–4 solid projects, maintain a GitHub profile, contribute to open source, and prepare a clean CV. These suggestions increase probability but don't guarantee outcomes.";
  }

  return "I’m here to help! Ask me career-related questions such as: 'Which roles fit my skills?' or 'What should I learn next?'";
}

export default generateCareerResponse;
