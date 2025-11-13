import { getDB } from "../config/database.js";

const jobCollection = () => getDB().collection("jobs");

// ✅ Seed jobs - only run once to populate initial data
export const seedJobs = async (req, res) => {
  try {
    const existingJobs = await jobCollection().countDocuments();

    if (existingJobs > 0) {
      return res.status(200).json({ 
        message: "Jobs already seeded", 
        count: existingJobs 
      });
    }

    const jobs = [
      {
        title: "Frontend Developer (React)",
        company: "TechNova Solutions",
        location: "Remote",
        mode: "Remote",
        experience: "1-2 years",
        skills: ["React", "JavaScript", "CSS", "REST API"],
        experienceLevel: "Intermediate",
        jobType: "Full-time",
        salary: "Negotiable",
        details:
          "Develop and maintain React-based front-end applications with a focus on performance and user experience.",
        recruiterEmail: "hr@technovasolutions.com",
      },
      {
        title: "UI/UX Design Intern",
        company: "Creative Minds Studio",
        location: "Dhaka, Bangladesh",
        mode: "Onsite",
        experience: "0-1 year",
        skills: ["Figma", "Adobe XD", "Design Principles"],
        experienceLevel: "Beginner",
        jobType: "Internship",
        salary: "8000 BDT/month",
        details:
          "Assist in creating visually appealing and user-friendly design prototypes and mockups.",
        recruiterEmail: "jobs@creativeminds.com",
      },
      {
        title: "Backend Developer (Node.js)",
        company: "Cloudify Ltd.",
        location: "Remote",
        mode: "Remote",
        experience: "2+ years",
        skills: ["Node.js", "Express", "MongoDB", "JWT"],
        experienceLevel: "Intermediate",
        jobType: "Full-time",
        salary: "Negotiable",
        details:
          "Develop backend APIs, ensure security and scalability for production-grade systems.",
        recruiterEmail: "careers@cloudify.com",
      },
      {
        title: "Freelance Data Analyst",
        company: "DataWorks",
        location: "Remote",
        mode: "Remote",
        experience: "3+ years",
        skills: ["Python", "Pandas", "Power BI"],
        experienceLevel: "Advanced",
        jobType: "Freelance",
        salary: "$30/hour",
        details:
          "Analyze datasets and build interactive dashboards to support business decisions.",
        recruiterEmail: "contact@dataworks.com",
      },
    ];

    const result = await jobCollection().insertMany(jobs);
    res.status(201).json({ 
      message: "Jobs seeded successfully", 
      insertedCount: result.insertedCount 
    });
  } catch (error) {
    console.error("Error seeding jobs:", error);
    res.status(500).json({ message: "Error seeding jobs", error: error.message });
  }
};

// ✅ Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await jobCollection().find().toArray();
    res.status(200).json({ 
      success: true, 
      count: jobs.length, 
      data: jobs 
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

// ✅ Add a new job (for users to add jobs later)
export const addJob = async (req, res) => {
  try {
    const job = req.body;
    
    // Basic validation
    if (!job.title || !job.company) {
      return res.status(400).json({ 
        message: "Title and company are required" 
      });
    }

    const result = await jobCollection().insertOne(job);
    res.status(201).json({ 
      message: "Job added successfully", 
      jobId: result.insertedId 
    });
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Error adding job", error: error.message });
  }
};