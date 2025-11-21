import { getDB } from "../config/database.js";

const jobCollection = () => getDB().collection("jobs");
const userCollection = () => getDB().collection("users");
const resourceCollection = () => getDB().collection("resources");

// Get complete analytics summary for dashboard
export const getAnalyticsSummary = async (req, res) => {
  try {
    const [users, jobs, resources] = await Promise.all([
      userCollection().find({}).toArray(),
      jobCollection().find({}).toArray(),
      resourceCollection().find({}).toArray()
    ]);

    // Process skill categories
    const skillCategories = {};
    const skillFrequency = {};
    const careerTracks = {};
    const monthlyUsers = {};

    users.forEach(user => {
      // Career tracks
      const track = user.careerTrack || 'Undecided';
      careerTracks[track] = (careerTracks[track] || 0) + 1;

      // Process skills
      let userSkills = [];
      if (Array.isArray(user.skills)) {
        userSkills = user.skills;
      } else if (typeof user.skill === 'string') {
        try {
          userSkills = JSON.parse(user.skill);
        } catch {
          userSkills = user.skill.split(',').map(s => s.trim());
        }
      }

      userSkills.forEach(skill => {
        if (skill) {
          skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
          const category = categorizeSkill(skill);
          skillCategories[category] = (skillCategories[category] || 0) + 1;
        }
      });

      // User growth by month
      if (user.timestamp) {
        const date = new Date(user.timestamp);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyUsers[monthKey] = (monthlyUsers[monthKey] || 0) + 1;
      }
    });

    // Process jobs
    const jobsByExperience = {};
    const jobsByType = {};

    jobs.forEach(job => {
      const exp = job.experienceLevel || job.experience || 'Not Specified';
      jobsByExperience[exp] = (jobsByExperience[exp] || 0) + 1;

      const type = job.jobType || 'Full-time';
      jobsByType[type] = (jobsByType[type] || 0) + 1;
    });

    // Process resources
    const resourcesByTrack = {};
    const resourcesByCost = { 'Free': 0, 'Paid': 0 };

    resources.forEach(resource => {
      const skills = resource.relatedSkills || [];
      skills.forEach(skill => {
        resourcesByTrack[skill] = (resourcesByTrack[skill] || 0) + 1;
      });

      const cost = resource.cost || 'Free';
      resourcesByCost[cost] = (resourcesByCost[cost] || 0) + 1;
    });

    // Top 10 skills
    const topSkills = Object.entries(skillFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));

    // User growth timeline (last 6 months)
    const sortedMonths = Object.keys(monthlyUsers).sort();
    const last6Months = sortedMonths.slice(-6);
    const userGrowth = last6Months.map(month => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      users: monthlyUsers[month]
    }));

    res.status(200).json({
      success: true,
      data: {
        totalUsers: users.length,
        totalJobs: jobs.length,
        totalResources: resources.length,
        usersBySkill: skillCategories,
        usersByCareer: careerTracks,
        resourcesByTrack: Object.entries(resourcesByTrack)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {}),
        topSkills,
        jobsByExperience,
        jobsByType,
        userGrowth,
        resourcesByCost
      }
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics summary',
      error: error.message
    });
  }
};

// Get skill analytics
export const getSkillAnalytics = async (req, res) => {
  try {
    const users = await userCollection().find({}).toArray();

    const skillFrequency = {};
    users.forEach(user => {
      let skills = [];

      if (Array.isArray(user.skills)) {
        skills = user.skills;
      } else if (typeof user.skill === 'string') {
        try {
          skills = JSON.parse(user.skill);
        } catch {
          skills = user.skill.split(',').map(s => s.trim());
        }
      }

      skills.forEach(skill => {
        if (skill) {
          skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
        }
      });
    });

    const topSkills = Object.entries(skillFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([skill, count]) => ({ skill, count }));

    res.status(200).json({
      success: true,
      data: topSkills
    });
  } catch (error) {
    console.error('Error fetching skill analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skill analytics',
      error: error.message
    });
  }
};

// Get career track distribution
export const getCareerTrackAnalytics = async (req, res) => {
  try {
    const users = await userCollection().find({}).toArray();

    const careerTracks = {};
    users.forEach(user => {
      const track = user.careerTrack || 'Undecided';
      careerTracks[track] = (careerTracks[track] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: careerTracks
    });
  } catch (error) {
    console.error('Error fetching career track analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch career track analytics',
      error: error.message
    });
  }
};

// Get user growth over time
export const getUserGrowthAnalytics = async (req, res) => {
  try {
    const users = await userCollection().find({}).toArray();

    const monthlyUsers = {};
    users.forEach(user => {
      if (user.timestamp) {
        const date = new Date(user.timestamp);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyUsers[monthKey] = (monthlyUsers[monthKey] || 0) + 1;
      }
    });

    const sortedData = Object.entries(monthlyUsers)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, count]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        users: count
      }));

    res.status(200).json({
      success: true,
      data: sortedData
    });
  } catch (error) {
    console.error('Error fetching user growth analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user growth analytics',
      error: error.message
    });
  }
};

// Get job analytics
export const getJobAnalytics = async (req, res) => {
  try {
    const jobs = await jobCollection().find({}).toArray();

    const jobsByExperience = {};
    const jobsByType = {};
    const jobsByLocation = {};

    jobs.forEach(job => {
      // By experience
      const exp = job.experienceLevel || job.experience || 'Not Specified';
      jobsByExperience[exp] = (jobsByExperience[exp] || 0) + 1;

      // By type
      const type = job.jobType || 'Full-time';
      jobsByType[type] = (jobsByType[type] || 0) + 1;

      // By location
      const location = job.location || 'Remote';
      jobsByLocation[location] = (jobsByLocation[location] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalJobs: jobs.length,
        byExperience: jobsByExperience,
        byType: jobsByType,
        byLocation: jobsByLocation
      }
    });
  } catch (error) {
    console.error('Error fetching job analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job analytics',
      error: error.message
    });
  }
};

// Get resource analytics
export const getResourceAnalytics = async (req, res) => {
  try {
    const resources = await resourceCollection().find({}).toArray();

    const resourcesByTrack = {};
    const resourcesByCost = { 'Free': 0, 'Paid': 0 };
    const resourcesByPlatform = {};

    resources.forEach(resource => {
      // By skill/track
      const skills = resource.relatedSkills || [];
      skills.forEach(skill => {
        resourcesByTrack[skill] = (resourcesByTrack[skill] || 0) + 1;
      });

      // By cost
      const cost = resource.cost || 'Free';
      resourcesByCost[cost] = (resourcesByCost[cost] || 0) + 1;

      // By platform
      const platform = resource.platform || 'Other';
      resourcesByPlatform[platform] = (resourcesByPlatform[platform] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalResources: resources.length,
        byTrack: resourcesByTrack,
        byCost: resourcesByCost,
        byPlatform: resourcesByPlatform
      }
    });
  } catch (error) {
    console.error('Error fetching resource analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resource analytics',
      error: error.message
    });
  }
};

// Helper function to categorize skills
function categorizeSkill(skill) {
  const skillLower = skill.toLowerCase();

  if (['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript', 'tailwind', 'bootstrap'].some(s => skillLower.includes(s))) {
    return 'Frontend';
  }
  if (['node', 'express', 'python', 'django', 'java', 'spring', 'php', 'laravel', '.net'].some(s => skillLower.includes(s))) {
    return 'Backend';
  }
  if (['mongodb', 'mysql', 'postgresql', 'redis', 'sql', 'database'].some(s => skillLower.includes(s))) {
    return 'Database';
  }
  if (['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins', 'devops'].some(s => skillLower.includes(s))) {
    return 'DevOps';
  }
  if (['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios'].some(s => skillLower.includes(s))) {
    return 'Mobile';
  }
  if (['pandas', 'numpy', 'machine learning', 'ml', 'ai', 'data', 'power bi', 'tableau'].some(s => skillLower.includes(s))) {
    return 'Data Science';
  }
  return 'Other';
}

