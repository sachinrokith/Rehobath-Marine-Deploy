// ES Module version for creating admin users
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Define User schema inline to avoid import issues
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'subadmin'], default: 'subadmin' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = new User({
      username: 'admin',
      email: 'admin@rms.com',
      password: adminPassword,
      role: 'admin',
      isActive: true
    });

    await admin.save();
    console.log('✅ Admin user created: admin@rms.com / admin123');

    // Create sub-admin user
    const subAdminPassword = await bcrypt.hash('subadmin123', 12);
    const subAdmin = new User({
      username: 'subadmin',
      email: 'subadmin@rms.com',
      password: subAdminPassword,
      role: 'subadmin',
      isActive: true
    });

    await subAdmin.save();
    console.log('✅ Sub-admin user created: subadmin@rms.com / subadmin123');

    console.log('\n🎉 Users created successfully! You can now login.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();
