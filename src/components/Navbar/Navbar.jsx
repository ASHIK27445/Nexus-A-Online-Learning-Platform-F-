import { ChevronRight, Crown, LogOut, Menu, User, X } from "lucide-react";
import { use, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const {user, logoutUser} = use(AuthContext)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const handleLogout = () => {
        logoutUser()
            .then(()=> toast("logout Successful"))
            .catch((error)=> toast.error(error.massage))
    }
    return(
        <div>
            <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl' : 'bg-black/90 backdrop-blur-xl shadow-2xl'}`}>
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition"></div>
                        <Crown className="w-10 h-10 text-white relative z-10 transform group-hover:rotate-12 transition-transform" />
                        </div>
                        <span className="text-3xl font-black bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        NEXUS
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" className="text-white hover:text-blue-400 transition-all font-semibold relative group">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
                        </NavLink>
                        <NavLink to="/allCourses" className="text-white hover:text-blue-400 transition-all font-semibold relative group">
                        Courses
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
                        </NavLink>
                        <NavLink to="/login" className="text-white hover:text-blue-400 transition-all font-semibold relative group">
                        Login
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
                        </NavLink>
                        <NavLink to="/register" className="text-white hover:text-blue-400 transition-all font-semibold relative group">
                        Register
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
                        </NavLink>
                        <NavLink to="/dashboard/addCourse" className="text-white hover:text-blue-400 transition-all font-semibold relative group">
                        Add Course
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
                        </NavLink>
                        <NavLink to="/myCourses" className="text-white hover:text-blue-400 transition-all font-semibold relative group">
                        My Courses
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
                        </NavLink>
                        <NavLink to="/myEnrollCourse" className="text-white hover:text-blue-400 transition-all font-semibold relative group">
                        My Enroll Courses
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
                        </NavLink>
                        <NavLink to="/topInstructors" className="text-white hover:text-blue-400 transition-all font-semibold relative group">
                        Top Instructors
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all"></span>
                        </NavLink>
                        {user && (
                        <div className="relative">
                            <button
                            onClick={() => setDashboardOpen(!dashboardOpen)}
                            className="text-white hover:text-blue-400 transition-all font-semibold flex items-center space-x-1"
                            >
                            <span>Dashboard</span>
                            <ChevronRight className={`w-4 h-4 transform transition-transform ${dashboardOpen ? 'rotate-90' : ''}`} />
                            </button>
                            
                            {dashboardOpen && (
                            <div className="absolute top-full mt-4 w-56 bg-linear-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl shadow-2xl py-3 overflow-hidden backdrop-blur-xl">
                                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10"></div>
                                <a href="#enrolled" className="relative block px-6 py-3 text-white hover:bg-white/10 transition-all">My Enrolled Courses</a>
                                <NavLink to="/dashboard/addCourse" className="relative block px-6 py-3 text-white hover:bg-white/10 transition-all">Add Course</NavLink>
                                <a href="#my-courses" className="relative block px-6 py-3 text-white hover:bg-white/10 transition-all">My Added Courses</a>
                            </div>
                            )}
                        </div>
                        )}

                        {user ? (
                        <button
                            className="relative flex items-center space-x-2 bg-linear-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-red-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <LogOut className="w-5 h-5 relative z-10" />
                            <span onClick={handleLogout} className="relative z-10">Logout</span>
                        </button>
                        ) : (
                        <button
                            className="relative flex items-center space-x-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <User className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Login</span>
                        </button>
                        )}
                    </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-white bg-linear-to-r from-blue-500 to-purple-600 p-2 rounded-lg"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                </div>

                {/* Mobile Navigation */}
                {/* {mobileMenuOpen && (
                <div className="md:hidden mt-6 pb-4 bg-linear-to-br from-gray-900 to-black rounded-2xl p-6 border border-purple-500/20">
                    <a href="#home" className="block py-3 text-white hover:text-blue-400 font-semibold">Home</a>
                    <a href="#courses" className="block py-3 text-white hover:text-blue-400 font-semibold">Courses</a>
                    {isAuthenticated && (
                    <>
                        <a href="#enrolled" className="block py-3 text-white hover:text-blue-400 font-semibold">My Enrolled Courses</a>
                        <a href="#add-course" className="block py-3 text-white hover:text-blue-400 font-semibold">Add Course</a>
                        <a href="#my-courses" className="block py-3 text-white hover:text-blue-400 font-semibold">My Added Courses</a>
                    </>
                    )}
                    {isAuthenticated ? (
                    <button onClick={onLogout} className="mt-4 w-full bg-linear-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold">
                        Logout
                    </button>
                    ) : (
                    <button onClick={onLogin} className="mt-4 w-full bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold">
                        Login
                    </button>
                    )}
                </div>
                )} */}

            </nav>
            </header>
        </div>
    )
}
export default Navbar
