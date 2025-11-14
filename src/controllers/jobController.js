import { getDB } from "../config/database.js";

const jobCollection = () => getDB().collection("jobs");
const userCollection = () => getDB().collection("users");


export const seedJobs = async (req, res) => {
  try {
    const newJobs = [
         {
    title: "Frontend Developer (React)",
    company: "TechNova Solutions",
    location: "Chittagong",
    mode: "Remote",
    experience: "1-2 years",
    skills: ["React", "JavaScript", "CSS", "REST API"],
    experienceLevel: "Intermediate",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Develop and maintain React-based front-end applications with a focus on performance and user experience.",
    recruiterEmail: "hr@technovasolutions.com",
    image: "https://img.freepik.com/free-vector/front-end-programming-illustration_23-2148937877.jpg",
  },
  {
    title: "UI/UX Design Intern",
    company: "Creative Minds Studio",
    location: "Dhaka",
    mode: "Onsite",
    experience: "0-1 year",
    skills: ["Figma", "Adobe XD", "Design Principles"],
    experienceLevel: "Beginner",
    jobType: "Internship",
    salary: "8000 BDT/month",
    details: "Assist in creating visually appealing and user-friendly design prototypes and mockups.",
    recruiterEmail: "jobs@creativeminds.com",
    image: "https://img.freepik.com/free-vector/ui-ux-design-concept-illustration_114360-2391.jpg",
  },
  {
    title: "Backend Developer (Node.js)",
    company: "Cloudify Ltd.",
    location: "Rajshahi",
    mode: "Remote",
    experience: "2+ years",
    skills: ["Node.js", "Express", "MongoDB", "JWT"],
    experienceLevel: "Intermediate",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Develop backend APIs, ensure security and scalability for production-grade systems.",
    recruiterEmail: "careers@cloudify.com",
    image: "https://img.freepik.com/free-vector/backend-developer-programming-illustration_23-2148937885.jpg",
  },
  {
    title: "Freelance Data Analyst",
    company: "DataWorks",
    location: "Kushtia",
    mode: "Remote",
    experience: "3+ years",
    skills: ["Python", "Pandas", "Power BI"],
    experienceLevel: "Advanced",
    jobType: "Freelance",
    salary: "$30/hour",
    details: "Analyze datasets and build interactive dashboards to support business decisions.",
    recruiterEmail: "contact@dataworks.com",
    image: "https://img.freepik.com/free-vector/data-analytics-illustration_23-2148937862.jpg",
  },
  {
    title: "Mobile App Developer",
    company: "Appify",
    location: "Dhaka",
    mode: "Onsite",
    experience: "2 years",
    skills: ["React Native", "JavaScript", "REST API"],
    experienceLevel: "Intermediate",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Build and maintain mobile applications for iOS and Android.",
    recruiterEmail: "hr@appify.com",
    image: "https://img.freepik.com/free-vector/mobile-app-development-concept-illustration_114360-7825.jpg",
  },
  {
    title: "Python Developer",
    company: "DataSol",
    location: "Sylhet",
    mode: "Remote",
    experience: "1-2 years",
    skills: ["Python", "Django", "REST API"],
    experienceLevel: "Intermediate",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Develop backend systems and APIs using Python and Django.",
    recruiterEmail: "jobs@datasol.com",
    image: "https://img.freepik.com/free-vector/python-programming-concept-illustration_114360-7831.jpg",
  },
  {
    title: "Frontend Intern",
    company: "TechNova Solutions",
    location: "Chittagong",
    mode: "Onsite",
    experience: "0-1 year",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    experienceLevel: "Beginner",
    jobType: "Internship",
    salary: "7000 BDT/month",
    details: "Assist in developing React-based front-end applications.",
    recruiterEmail: "internships@technova.com",
    image: "https://img.freepik.com/free-vector/programmer-illustration_114360-2263.jpg",
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Chittagong",
    mode: "Remote",
    experience: "3+ years",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    experienceLevel: "Advanced",
    jobType: "Full-time",
    salary: "$50/hour",
    details: "Manage cloud infrastructure and automate deployment pipelines.",
    recruiterEmail: "careers@cloudtech.com",
    image: "https://img.freepik.com/free-vector/devops-engineer-concept-illustration_114360-7850.jpg",
  },
  {
    title: "Graphic Designer",
    company: "DesignHive",
    location: "Dhaka",
    mode: "Onsite",
    experience: "1-2 years",
    skills: ["Photoshop", "Illustrator", "Branding"],
    experienceLevel: "Intermediate",
    jobType: "Part-time",
    salary: "12000 BDT/month",
    details: "Create visually appealing graphics for marketing and social media.",
    recruiterEmail: "hr@designhive.com",
    image: "https://i.ibb.co/67cwjvBv/digital-art-style-illustration-graphic-designer.jpg",
  },
  {
    title: "Full Stack Developer",
    company: "NextGen Solutions",
    location: "Chittagong",
    mode: "Onsite",
    experience: "3 years",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    experienceLevel: "Intermediate",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Develop full-stack applications with MERN stack.",
    recruiterEmail: "hr@nextgen.com",
    image: "https://i.ibb.co/zVVJKQgb/person-front-computer-working-html.jpg",
  },
  {
    title: "SEO Specialist",
    company: "WebBoost",
    location: "Dhaka",
    mode: "Remote",
    experience: "1-3 years",
    skills: ["SEO", "Google Analytics", "Content Marketing"],
    experienceLevel: "Intermediate",
    jobType: "Freelance",
    salary: "$20/hour",
    details: "Improve website visibility and search ranking for clients.",
    recruiterEmail: "jobs@webboost.com",
    image: "https://i.ibb.co/Mxqp0RGt/magnifying-glass-with-seo-concepts.jpg",
  },
  {
    title: "Project Manager",
    company: "InnovateX",
    location: "Dhaka",
    mode: "Onsite",
    experience: "4+ years",
    skills: ["Agile", "Scrum", "Team Management"],
    experienceLevel: "Advanced",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Lead software development projects and ensure timely delivery.",
    recruiterEmail: "pm@innovatex.com",
    image: "https://i.ibb.co/HT1BXgCF/office-workers-using-finance-graphs.jpg",
  },
  {
    title: "Content Writer",
    company: "WriteRight",
    location: "Rajshahi",
    mode: "Remote",
    experience: "1 year",
    skills: ["Writing", "SEO", "Copywriting"],
    experienceLevel: "Beginner",
    jobType: "Freelance",
    salary: "$15/hour",
    details: "Write high-quality content for blogs, websites, and marketing.",
    recruiterEmail: "contact@writeright.com",
    image: "https://i.ibb.co/SD25xc2Y/medium-shot-man-taking-notes-podcast.jpg",
  },
  {
    title: "QA Engineer",
    company: "TechNova Solutions",
    location: "Chittagong",
    mode: "Onsite",
    experience: "2-3 years",
    skills: ["Testing", "Selenium", "Jest"],
    experienceLevel: "Intermediate",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Test web applications and ensure software quality.",
    recruiterEmail: "qa@technova.com",
    image: "https://i.ibb.co/VcycWZDb/saas-concept-collage.jpg",
  },
  {
    title: "Digital Marketing Intern",
    company: "MarketGenius",
    location: "Dhaka",
    mode: "Onsite",
    experience: "0-1 year",
    skills: ["Social Media", "SEO", "Analytics"],
    experienceLevel: "Beginner",
    jobType: "Internship",
    salary: "7000 BDT/month",
    details: "Assist in digital marketing campaigns and analytics.",
    recruiterEmail: "intern@marketgenius.com",
    image: "https://i.ibb.co/rGjTWqvr/digital-marketing-with-icons-business-people.jpg",
  },
  {
    title: "Machine Learning Engineer",
    company: "AI Labs",
    location: "Sylhet",
    mode: "Remote",
    experience: "2+ years",
    skills: ["Python", "TensorFlow", "Scikit-learn"],
    experienceLevel: "Advanced",
    jobType: "Full-time",
    salary: "$40/hour",
    details: "Develop ML models and deploy them in production systems.",
    recruiterEmail: "careers@ailabs.com",
    image: "https://i.ibb.co/qYb2wdYD/regular-human-job-performed-by-anthropomorphic-futuristic-robot.jpg",
  },
  {
    title: "React Native Developer",
    company: "Appify",
    location: "Chittagong",
    mode: "Remote",
    experience: "1-2 years",
    skills: ["React Native", "JavaScript", "API Integration"],
    experienceLevel: "Intermediate",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Build mobile apps for iOS and Android using React Native.",
    recruiterEmail: "hr@appify.com",
    image: "https://i.ibb.co/rKJRtGHL/representation-user-experience-interface-design.jpg",
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureTech",
    location: "Dhaka",
    mode: "Onsite",
    experience: "3 years",
    skills: ["Network Security", "Penetration Testing", "Firewalls"],
    experienceLevel: "Intermediate",
    jobType: "Full-time",
    salary: "Negotiable",
    details: "Protect company systems and data from cyber threats.",
    recruiterEmail: "security@securetech.com",
    image: "https://i.ibb.co/k6xqDVcm/cybersecurity-concept-illustration.jpg",
  }
    ];

    // Directly insert without checking for duplicates
    const result = await jobCollection().insertMany(newJobs);

    res.status(201).json({
      success: true,
      message: `${result.insertedCount} jobs added successfully`,
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds
    });

  } catch (error) {
    console.error("Error seeding jobs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to seed jobs",
      error: error.message
    });
  }
};


// ✅ Seed jobs - only run once to populate initial data
// export const seedJobs = async (req, res) => {
//   try {
//     const existingJobs = await jobCollection().countDocuments();

//     if (existingJobs > 0) {
//       return res.status(200).json({ 
//         message: "Jobs already seeded", 
//         count: existingJobs 
//       });
//     }

//     const jobs = [
 
// ];


//     const result = await jobCollection().insertMany(jobs);
//     res.status(201).json({ 
//       message: "Jobs seeded successfully", 
//       insertedCount: result.insertedCount 
//     });
//   } catch (error) {
//     console.error("Error seeding jobs:", error);
//     res.status(500).json({ message: "Error seeding jobs", error: error.message });
//   }
// };

// ✅ Get all jobs (with optional filters)
export const getJobs = async (req, res) => {
  try {
    const { title, location, jobType } = req.query;
    const query = {};

    if (title && title.trim() !== "") {
      query.title = { $regex: title.trim(), $options: "i" };
    }
    if (location && location.trim() !== "") {
      query.location = { $regex: location.trim(), $options: "i" };
    }
    if (jobType && jobType.trim() !== "") {
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


export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { ObjectId } = await import('mongodb');
    
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

// ✅ Get recommended jobs for a user
export const getRecommendedJobs = async (req, res) => {
  try {
    const { userId } = req.params;
    const { ObjectId } = await import('mongodb');
    
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }

    // Get user data
    const user = await userCollection().findOne({ _id: new ObjectId(userId) });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Parse user skills (handle both string and array formats)
    let userSkills = [];
    if (typeof user.skills === 'string') {
      try {
        userSkills = JSON.parse(user.skills);
      } catch (e) {
        userSkills = user.skills.split(',').map(s => s.trim());
      }
    } else if (Array.isArray(user.skills)) {
      userSkills = user.skills;
    }

    // Normalize skills to lowercase for matching
    const normalizedUserSkills = userSkills.map(skill => skill.toLowerCase());

    // Get all jobs
    const allJobs = await jobCollection().find({}).toArray();

    // Calculate match percentage for each job
    const jobsWithMatch = allJobs.map(job => {
      let matchScore = 0;
      let matchedSkills = [];

      // Normalize job skills
      const jobSkills = Array.isArray(job.skills) 
        ? job.skills.map(s => s.toLowerCase()) 
        : [];

      // Calculate skill match
      normalizedUserSkills.forEach(userSkill => {
        if (jobSkills.includes(userSkill)) {
          matchedSkills.push(
            // Find original casing from user skills or job skills
            userSkills.find(s => s.toLowerCase() === userSkill) || 
            job.skills.find(s => s.toLowerCase() === userSkill)
          );
          matchScore += 1;
        }
      });

      // Calculate percentage based on user's skills
      const matchPercentage = normalizedUserSkills.length > 0
        ? Math.round((matchScore / normalizedUserSkills.length) * 100)
        : 0;

      // Career track matching bonus
      let trackBonus = 0;
      if (user.careerTrack && job.title) {
        const track = user.careerTrack.toLowerCase();
        const title = job.title.toLowerCase();
        
        if (track.includes('web') && (title.includes('web') || title.includes('frontend') || title.includes('backend') || title.includes('full stack'))) {
          trackBonus = 10;
        } else if (track.includes('data') && (title.includes('data') || title.includes('analyst'))) {
          trackBonus = 10;
        } else if (track.includes('design') && (title.includes('design') || title.includes('ui') || title.includes('ux'))) {
          trackBonus = 10;
        }
      }

      // Experience level matching
      let experienceBonus = 0;
      if (user.experience && job.experienceLevel) {
        const userExp = user.experience.toLowerCase();
        const jobExp = job.experienceLevel.toLowerCase();
        
        if (userExp.includes('fresher') && (jobExp.includes('beginner') || jobExp.includes('entry'))) {
          experienceBonus = 5;
        } else if (userExp.includes('intermediate') && jobExp.includes('intermediate')) {
          experienceBonus = 5;
        } else if (userExp.includes('advanced') && jobExp.includes('advanced')) {
          experienceBonus = 5;
        }
      }

      const finalMatchPercentage = Math.min(100, matchPercentage + trackBonus + experienceBonus);

      return {
        ...job,
        matchPercentage: finalMatchPercentage,
        matchedSkills: matchedSkills,
        skillMatchCount: matchScore
      };
    });

    // Sort by match percentage (highest first)
    jobsWithMatch.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Filter jobs with at least some match (>0%) or return top jobs anyway
    const recommendedJobs = jobsWithMatch.filter(job => job.matchPercentage > 0);
    
    // If no matches found, return top 6 jobs anyway
    const finalJobs = recommendedJobs.length > 0 
      ? recommendedJobs 
      : jobsWithMatch.slice(0, 6);

    res.status(200).json({
      success: true,
      count: finalJobs.length,
      data: finalJobs,
      userProfile: {
        skills: userSkills,
        careerTrack: user.careerTrack,
        experience: user.experience
      }
    });

  } catch (error) {
    console.error("Error fetching recommended jobs:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch recommended jobs", 
      error: error.message 
    });
  }
};


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
        "https://img.freepik.com/free-vector/job-vacancy-hiring-recruitment-illustration_23-2148670036.jpg",
      createdAt: new Date(),
    };

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