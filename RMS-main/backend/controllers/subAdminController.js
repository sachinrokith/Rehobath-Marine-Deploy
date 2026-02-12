import User from '../models/User.js';

export const createSubAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    const subAdmin = new User({
      username,
      email,
      password,
      role: 'subadmin'
    });

    await subAdmin.save();

    res.status(201).json({
      success: true,
      message: 'Sub-admin created successfully',
      data: { user: subAdmin }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error creating sub-admin',
      error: error.message
    });
  }
};

export const getSubAdmins = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    let query = { role: 'subadmin' };
    
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const subAdmins = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        subAdmins,
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
      message: 'Server error fetching sub-admins',
      error: error.message
    });
  }
};

export const getSubAdmin = async (req, res) => {
  try {
    const subAdmin = await User.findOne({
      _id: req.params.id,
      role: 'subadmin'
    });

    if (!subAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Sub-admin not found'
      });
    }

    res.json({
      success: true,
      data: { subAdmin }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching sub-admin',
      error: error.message
    });
  }
};

export const updateSubAdmin = async (req, res) => {
  try {
    const { username, email, isActive } = req.body;
    
    const subAdmin = await User.findOne({
      _id: req.params.id,
      role: 'subadmin'
    });

    if (!subAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Sub-admin not found'
      });
    }

    if (email && email !== subAdmin.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    if (username && username !== subAdmin.username) {
      const existingUser = await User.findOne({ username, _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists'
        });
      }
    }

    const updatedSubAdmin = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, isActive },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Sub-admin updated successfully',
      data: { subAdmin: updatedSubAdmin }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating sub-admin',
      error: error.message
    });
  }
};

export const deleteSubAdmin = async (req, res) => {
  try {
    const subAdmin = await User.findOne({
      _id: req.params.id,
      role: 'subadmin'
    });

    if (!subAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Sub-admin not found'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Sub-admin deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting sub-admin',
      error: error.message
    });
  }
};
