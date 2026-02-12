import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';

export const createProject = async (req, res) => {
  try {
    console.log('Create project request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    const projectData = {
      ...req.body,
      createdBy: req.user._id
    };

    console.log('Project data before image processing:', projectData);

    // Convert uploaded file to Base64 and store in database
    if (req.file) {
      try {
        console.log('Processing uploaded file...');
        const filePath = req.file.path; // Already absolute path from multer
        const fileData = fs.readFileSync(filePath);
        const base64Image = `data:${req.file.mimetype};base64,${fileData.toString('base64')}`;
        projectData.image = base64Image;
        
        // Clean up the temporary file
        fs.unlinkSync(filePath);
        console.log('File processed and deleted successfully');
      } catch (fileError) {
        console.error('Error processing uploaded file:', fileError);
        // Continue without image if file processing fails
      }
    }

    console.log('Project data after image processing:', projectData);

    const project = new Project(projectData);
    await project.save();

    await project.populate('createdBy', 'username email role');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Detailed error in createProject:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating project',
      error: error.message
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { client: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(query)
      .populate('createdBy', 'username email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching projects',
      error: error.message
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'username email role');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: { project }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching project',
      error: error.message
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const updateData = { ...req.body };

    // Convert uploaded file to Base64 and store in database
    if (req.file) {
      try {
        const filePath = req.file.path; // Already absolute path from multer
        const fileData = fs.readFileSync(filePath);
        const base64Image = `data:${req.file.mimetype};base64,${fileData.toString('base64')}`;
        updateData.image = base64Image;
        
        // Clean up the temporary file
        fs.unlinkSync(filePath);
      } catch (fileError) {
        console.error('Error processing uploaded file:', fileError);
        // Continue without image if file processing fails
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username email role');

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: { project: updatedProject }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating project',
      error: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting project',
      error: error.message
    });
  }
};
