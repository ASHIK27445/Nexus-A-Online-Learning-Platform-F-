import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { AuthContext } from '../../Auth/AuthContext';

const Login = () => {
    const { loginUser, user, signInWithGoogle } = use(AuthContext);
    const [loginloading, setLoginloading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!user) {
            setLoginloading(true);
            loginUser(email, password)
                .then(res => {
                    setTimeout(() => {
                        setLoginloading(false);
                        navigate(location?.state ? `${location?.state}` : '/');
                        toast.success(`Welcome back!`, {
                            autoClose: 1200
                        });
                    }, 2000);
                })
                .catch(e => {
                    setLoginloading(false);
                    if (e.code === 'auth/invalid-credential') {
                        toast.error("Invalid email or password. Please try again.", {
                            autoClose: 1500
                        });
                    }
                }); 
        } else {
            toast.error('User is already logged in', {
                autoClose: 1200,
                style: {
                    background:'black',
                    color:'red'
                }
            });
        }
    };

    const handleGoogleSignIn = () => {
        if (!user) {
            signInWithGoogle()
                .then((result) => {
                    toast.success("Welcome back");
                    navigate(location?.state ? `${location?.state}` : '/');
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        } else {
            toast.error("User Already Logged In!");
        }
    };

    const handleForgetPassword = () => {
        navigate('/forgetPassword', { state: { email } });
    };

    if (loginloading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black flex justify-center items-center">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-20 h-20 border-4 border-amber-400 border-t-transparent rounded-full"
                />
            </div>
        );
    } 

    return (
        <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black pb-20 pt-35 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Branding */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400 text-sm font-semibold">Welcome Back</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            <span className="text-white">Continue Your</span>
                            <br />
                            <span className="bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                                Learning Journey
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Access your courses, track your progress, and achieve your learning goals with EduLux premium education platform.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-4">
                            {[
                                'Access to all your enrolled courses',
                                'Track your learning progress',
                                'Earn certificates and achievements',
                                'Connect with instructors and peers'
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="w-6 h-6 bg-linear-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-300">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Login to Your Account</h2>
                                <p className="text-gray-400">Enter your credentials to continue</p>
                            </div>

                            {/* Google Sign In */}
                            <motion.button
                                onClick={handleGoogleSignIn}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-full font-semibold flex items-center justify-center space-x-3 transition-all duration-300 mb-6"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span>Continue with Google</span>
                            </motion.button>

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-gray-700"></div>
                                <span className="px-4 text-gray-500 text-sm">or login with email</span>
                                <div className="flex-1 border-t border-gray-700"></div>
                            </div>

                            {/* Login Form */}
                            <div className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your.email@example.com"
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                            className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <span className="text-gray-400">New user? </span>
                                        <NavLink to="/register" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                                            Register here
                                        </NavLink>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleForgetPassword}
                                        className="text-sm text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="button"
                                    onClick={handleLogin}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center space-x-2 group"
                                >
                                    <span>Login to Account</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;