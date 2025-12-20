import { createBrowserRouter } from "react-router"
import HomePage from "../Home/HomePage";
import App from "../App";
import Demo from "../Demo"
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import PrivateRouter from "../components/Authentication/PrivateRouter";
import Dashboard from "../components/Dashboard/Dashboard";
import AddCourse from "../components/course/AddCourse";
import DetailsCourse from "../components/course/DetailsCourse";
import MyCourses from "../components/course/MyCourse";
import AllCourses from "../components/course/AllCourses";
import UpdateCourse from "../components/course/UpdateCourse";
import EnrolledCourses from "../components/course/EnrolledCourses";
import TopInstructors from "../components/course/TopInstructors";

export const router = createBrowserRouter([
    {
        path:'/', Component: App ,
        children: [
            {
                index: true, Component: HomePage
            },
            {
                path:"/login", Component: Login
            },
            {
                path:'/register', Component: Register
            },
            {
                path: '/dashboard', element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>
            },
            {
                path: '/dashboard/addCourse', element: <PrivateRouter><AddCourse></AddCourse></PrivateRouter>
            },
            {
                path: '/viewDetails/:id', element: <PrivateRouter><DetailsCourse></DetailsCourse></PrivateRouter>
            },
            {
                path: '/myCourses', element: <PrivateRouter><MyCourses></MyCourses></PrivateRouter>
            },
            {
                path:'/allCourses', element: <AllCourses></AllCourses>
            },
            {
                path:'/updateCourse/:id', element: <PrivateRouter><UpdateCourse></UpdateCourse></PrivateRouter>
            },
            {
                path:'/myEnrollCourse', element:<PrivateRouter><EnrolledCourses></EnrolledCourses></PrivateRouter> 
            }
        ]
    }
])