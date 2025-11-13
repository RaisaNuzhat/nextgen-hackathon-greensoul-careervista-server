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
        image:
          "https://img.freepik.com/free-vector/front-end-programming-illustration_23-2148937877.jpg",
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
        image:
          "https://img.freepik.com/free-vector/ui-ux-design-concept-illustration_114360-2391.jpg",
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
        image:
          "https://img.freepik.com/free-vector/backend-developer-programming-illustration_23-2148937885.jpg", 
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
        image:
          "https://img.freepik.com/free-vector/data-analytics-illustration_23-2148937862.jpg", 
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

// ✅ Get all jobs (with optional filters)
export const getJobs = async (req, res) => {
  try {
    const { title, location, jobType } = req.query;
    const query = {};

    // Apply filters if provided (case-insensitive search)
    if (title && title.trim() !== "") {
      query.title = { $regex: title.trim(), $options: "i" };
    }
    if (location && location.trim() !== "") {
      query.location = { $regex: location.trim(), $options: "i" };
    }
    if (jobType && jobType.trim() !== "") {
      // Case-insensitive exact match for job type
      query.jobType = { $regex: `^${jobType.trim()}$`, $options: "i" };
    }

    const jobs = await jobCollection().find(query).toArray();

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch jobs", 
      error: error.message 
    });
  }
};

// ✅ Get job by id
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { ObjectId } = await import('mongodb');
    
    // Validate if id is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid job ID format" 
      });
    }
    
    const job = await jobCollection().findOne({ _id: new ObjectId(id) });
    
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: job 
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching job", 
      error: error.message 
    });
  }
};

// ✅ Add new job
export const addJob = async (req, res) => {
  try {
    const {
      role,
      company,
      location,
      workMode,
      experience,
      skills,
      experienceLevel,
      jobType,
      salary,
      details,
      recruiterEmail,
      imageUrl,
    } = req.body;

    // Basic validation (match frontend required fields)
    if (
      !role ||
      !company ||
      !location ||
      !workMode ||
      !experience ||
      !experienceLevel ||
      !jobType ||
      !salary ||
      !details ||
      !recruiterEmail
    ) {
      return res.status(400).json({
        message: "All required fields must be filled.",
      });
    }

    // Construct job object (standardized keys for database)
    const newJob = {
      title: role.trim(),
      company: company.trim(),
      location: location.trim(),
      mode: workMode.trim(),
      experience: experience.trim(),
      skills: Array.isArray(skills) ? skills : [],
      experienceLevel: experienceLevel.trim(),
      jobType: jobType.trim(),
      salary: salary.trim(),
      details: details.trim(),
      recruiterEmail: recruiterEmail.trim(),
      image:
        imageUrl?.trim() ||
        "https://img.freepik.com/free-vector/job-vacancy-hiring-recruitment-illustration_23-2148670036.jpg", // fallback image
      createdAt: new Date(),
    };

    // Insert job into database
    const result = await jobCollection().insertOne(newJob);

    res.status(201).json({
      message: "Job added successfully",
      jobId: result.insertedId,
    });
  } catch (error) {
    console.error("❌ Error adding job:", error);
    res.status(500).json({
      message: "Server error while adding job",
      error: error.message,
    });
  }
};