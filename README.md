# 🎓 Nexus - Online Learning Platform

A premium full-stack online learning platform built with modern web technologies. Features course management, user authentication, enrollment tracking, and a stunning dark-themed UI with smooth animations.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Firebase authentication with email/password and Google Sign-In
- **Course Management** - Full CRUD operations for courses
- **Enrollment System** - Students can enroll in courses with automatic duplicate prevention
- **Instructor Dashboard** - Manage and track your courses with detailed analytics
- **Student Dashboard** - View enrolled courses and track learning progress
- **Course Discovery** - Browse all courses, popular courses, and top instructors
- **Responsive Design** - Beautiful, modern UI that works on all devices

### 🎨 UI/UX Features
- **Premium Dark Theme** - Elegant gradient-based design with amber/orange accents
- **Smooth Animations** - Framer Motion powered transitions and interactions
- **Floating Particles** - Dynamic background elements for visual appeal
- **Interactive Cards** - Hover effects and micro-interactions
- **Toast Notifications** - SweetAlert2 powered success/error messages
- **Fuzzy Text Effects** - Unique canvas-based text animations for error pages

### 👨‍🏫 Instructor Features
- Create and publish new courses
- Update existing course content
- Delete courses
- View student enrollment statistics
- Track course ratings and reviews

### 👨‍🎓 Student Features
- Browse all available courses
- View detailed course information
- Enroll in courses
- Track enrolled courses
- View learning progress

---

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **SweetAlert2** - Beautiful alert modals

### Backend
- **Node.js** - Runtime environment
- **Express.js v5.2.1** - Web framework
- **MongoDB** - NoSQL database
- **MongoDB Atlas** - Cloud database hosting

### Authentication
- **Firebase Authentication** - User management and authentication

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Firebase project
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend_olp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend root directory:
   ```env
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   
   Server will run on `https://backend-olp.vercel.app`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a `firebase.init.js` file with your Firebase configuration:
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### Course Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/course/popular` | Retrieve all popular courses |
| `GET` | `/allCourses` | Get all available courses |
| `GET` | `/myCourses/:email` | Get courses by instructor email |
| `GET` | `/myCourse/:id` | Get specific course by ID (for editing) |
| `GET` | `/course/:id` | Get course details by ID |
| `POST` | `/dashboard/addCourse` | Create a new course |
| `PUT` | `/updatedCourse/:id` | Update existing course |
| `DELETE` | `/delete/:id` | Delete a course |

### Enrollment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/enroll/check?email=&courseID=` | Check if user is enrolled in a course |
| `GET` | `/myenroll/:email` | Get all enrollments for a user |
| `POST` | `/enroll` | Enroll user in a course |

---

## 🗄️ Database Structure

### Collections

#### `courses`
```javascript
{
  _id: ObjectId,
  level: String,
  category: String,
  title: String,
  description: String,
  rating: Number,
  reviews: Number,
  students: Number,
  lessons: String,
  duration: String,
  price: Number,
  oprice: Number,
  imageURL: String,
  courseType: String, // "top", "premium", "trending", "popular"
  features: [{
    title: String,
    description: String
  }],
  instructor: {
    name: String,
    title: String,
    avatar: String,
    email: String
  },
  createdAt: Date
}
```

#### `enroll`
```javascript
{
  _id: ObjectId,
  email: String,
  course: [{
    _id: String,
    title: String,
    description: String,
    imageURL: String,
    category: String,
    rating: Number,
    students: Number,
    duration: String,
    lessons: String,
    enrollAt: Date
  }]
}
```

---

## 🎨 Pages & Components

### Main Pages
- **Home Page** - Hero section, top instructors, popular courses, why choose us
- **All Courses** - Browse all available courses
- **Course Details** - Detailed view of a course with enrollment option
- **Login/Register** - User authentication
- **Instructor Dashboard** - Add/edit/delete courses, view statistics
- **Student Dashboard** - View enrolled courses and progress
- **Error Page** - Custom 404 page with fuzzy text effect

### Key Components
- **Navbar** - Navigation with user authentication state
- **Footer** - Newsletter subscription, social links, contact info
- **Course Card** - Reusable course display component
- **Hero Section** - Landing page hero with animations
- **Why Choose Us** - Feature showcase section
- **Top Instructors** - Display featured instructors

---

## 🔒 Security Features

- Environment variable protection for sensitive data
- Firebase authentication for secure user management
- CORS enabled for cross-origin requests
- MongoDB connection with Stable API versioning
- Input validation for enrollment and course operations
- Email-based authorization for instructor operations

---

## 🎯 Key Highlights

- **Automated Course Assignment** - Random assignment of course types, ratings, and statistics
- **Duplicate Prevention** - Automatic check to prevent duplicate enrollments
- **Real-time Updates** - Instant feedback with toast notifications
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Modern Animations** - Smooth transitions with Framer Motion
- **Clean Code** - Well-structured and maintainable codebase

---

## 📝 License

This project is licensed under the ISC License.

---

## 📧 Contact

**Developer:** Md Ashikul Islam  
**Email:** mdashikulislam27889@gmail.com  
**GitHub:** [ASHIK27445](https://github.com/ASHIK27445)

For questions, support, or feedback, feel free to reach out!

---

## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB Atlas for database hosting
- React and Express.js communities
- Tailwind CSS for the utility-first framework
- Framer Motion for animation capabilities
- All open-source contributors

---

<div align="center">
  <strong>Built with ❤️ for transforming online education</strong>
  <br />
  <sub>Nexus - Where Knowledge Meets Excellence</sub>
</div>