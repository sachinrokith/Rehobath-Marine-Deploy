import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const checkProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Count all projects
    const totalProjects = await Project.countDocuments();
    console.log(`Total projects in database: ${totalProjects}`);
    
    // Get all projects
    const allProjects = await Project.find({});
    console.log('All projects:', allProjects.length);
    
    // Get completed projects
    const completedProjects = await Project.find({ status: 'completed' });
    console.log(`Completed projects: ${completedProjects.length}`);
    
    // Show project details
    allProjects.forEach((project, index) => {
      console.log(`Project ${index + 1}:`);
      console.log(`  Name: ${project.name}`);
      console.log(`  Status: ${project.status}`);
      console.log(`  Image: ${project.image || 'No image'}`);
      console.log(`  Client: ${project.client}`);
      console.log('---');
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkProjects();
