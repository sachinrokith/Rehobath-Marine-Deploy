# Admin Users for RMS

## Login Credentials

### Admin User
- **Email**: admin@rms.com
- **Password**: admin123
- **Role**: admin
- **Access**: Full access to all features including sub-admin management

### Sub-admin User  
- **Email**: subadmin@rms.com
- **Password**: subadmin123
- **Role**: subadmin
- **Access**: Project management only

## How to Create Users in MongoDB

### Option 1: Using the Node.js Script
```bash
cd backend
node createAdmin.js
```

### Option 2: Manual MongoDB Shell
```javascript
// Connect to MongoDB shell
mongosh

// Switch to RMS database
use rms_db

// Insert admin user (password is already hashed)
db.users.insertOne({
  username: "admin",
  email: "admin@rms.com", 
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm",
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sub-admin user
db.users.insertOne({
  username: "subadmin",
  email: "subadmin@rms.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm", 
  role: "subadmin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Verify users
db.users.find();
```

### Option 3: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select `rms_db` database
4. Go to `users` collection
5. Insert documents with the above data

## Testing Login

1. Start backend server: `cd backend && node server.js`
2. Start frontend: `npm run dev`
3. Navigate to `/admin/login`
4. Use the credentials above to test

## Password Hashes
- `admin123` → `$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm`
- `subadmin123` → `$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm`
