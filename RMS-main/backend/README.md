# RMS Backend

A robust backend system for Resource Management System with authentication and role-based access control.

## Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin and Sub-admin roles with different permissions
- **Password Security**: Bcrypt hashing for secure password storage
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS Support**: Cross-origin resource sharing configuration
- **Error Handling**: Centralized error handling middleware

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── projectController.js # Project CRUD operations
│   └── subAdminController.js # Sub-admin management
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── roleAuth.js          # Role-based authorization
│   └── validation.js        # Input validation
├── models/
│   ├── User.js              # User schema
│   └── Project.js           # Project schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── projects.js          # Project routes
│   └── subAdmins.js         # Sub-admin routes
├── utils/
│   └── jwtUtils.js          # JWT utilities
├── .env                     # Environment variables
├── package.json             # Dependencies
└── server.js                # Main server file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Projects (Accessible by both admin and subadmin)
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects (with pagination)
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Sub-admin Management (Admin only)
- `POST /api/subadmins` - Create sub-admin
- `GET /api/subadmins` - Get all sub-admins
- `GET /api/subadmins/:id` - Get single sub-admin
- `PUT /api/subadmins/:id` - Update sub-admin
- `DELETE /api/subadmins/:id` - Delete sub-admin

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rms_db
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Start the server:
```bash
npm run dev
```

## Usage Examples

### Register Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### Create Project (with token)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My Project",
    "description": "A sample project",
    "technologies": ["React", "Node.js"],
    "status": "active"
  }'
```

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- CORS configuration
- Input validation and sanitization
- Role-based access control
- Helmet.js for security headers
