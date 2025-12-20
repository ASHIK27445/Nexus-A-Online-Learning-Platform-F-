import { use, useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, User, Image, ArrowRight, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { AuthContext } from '../../Auth/AuthContext';

const Register = () => {
    const { createUserEP, profileUpdate, user, logoutUser } = use(AuthContext);
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const passwordVerification = (passWD) => {
        const newPassWordError = [];
        if (!/[A-Z]/.test(passWD)) {
            newPassWordError.push('Password must have an uppercase letter');
        }
        if (!/[a-z]/.test(passWD)) {
            newPassWordError.push('Password must have a lowercase letter');
        }
        if (passWD.length < 6) {
            newPassWordError.push('Length must be at least 6 characters');
        }
        setPassError(newPassWordError);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        passwordVerification(e.target.value);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        if (user) {
            return toast.error("Logout first!");
        } else {
            setLoading(true);
            createUserEP(email, password)
                .then(res => {
                    return profileUpdate(name, photoURL)
                        .catch(error => toast.error(error.message));
                })
                .then(() => {
                    toast.success("Account created successfully!", {
                        autoClose: 1200
                    });
                    setPassword('');
                    setPassError([]);
                    e.target.reset();
                    setLoading(false);
                    logoutUser();
                    navigate('/login');
                })
                .catch(e => {
                    setLoading(false);
                    toast.error(e.message);
                });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="relative text-center">
                    <div className="relative inline-block mb-8">
                        <div className="w-24 h-24 border-4 border-gray-800 border-t-amber-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-orange-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-white">Creating Your Account</h2>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black py-20 px-4 relative overflow-hidden mt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-6xl mx-auto relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Branding */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400 text-sm font-semibold">Join Our Community</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            <span className="text-white">Start Your</span>
                            <br />
                            <span className="bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                                Learning Adventure
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Create your account and unlock access to world-class courses, expert instructors, and a thriving learning community.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-4">
                            {[
                                'Access 200+ premium courses',
                                'Learn from industry experts',
                                'Get certified upon completion',
                                'Join a community of 50,000+ learners'
                            ].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center space-x-3 opacity-0 animate-fadeIn"
                                    style={{ animationDelay: `${0.2 + idx * 0.1}s`, animationFillMode: 'forwards' }}
                                >
                                    <div className="w-6 h-6 bg-linear-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="relative">
                        <div className="bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
                                <p className="text-gray-400">Fill in your details to get started</p>
                            </div>

                            {/* Register Form */}
                            <form onSubmit={handleRegister} className="space-y-5">
                                {/* Name Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            required
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Photo URL Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Photo URL
                                    </label>
                                    <div className="relative">
                                        <Image className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="url"
                                            name="photoURL"
                                            placeholder="https://example.com/photo.jpg"
                                            required
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="your.email@example.com"
                                            required
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
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
                                            name="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            placeholder="Create a strong password"
                                            required
                                            className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Password Requirements */}
                                    {password && (
                                        <div className="mt-3 space-y-2">
                                            {passError.length > 0 ? (
                                                passError.map((error, index) => (
                                                    <div key={index} className="flex items-center space-x-2 text-red-400 text-sm">
                                                        <XCircle className="w-4 h-4 shrink-0" />
                                                        <span>{error}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex items-center space-x-2 text-green-400 text-sm">
                                                    <CheckCircle className="w-4 h-4 shrink-0" />
                                                    <span>Password requirements met!</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Already have account */}
                                <div className="text-center text-sm">
                                    <span className="text-gray-400">Already have an account? </span>
                                    <NavLink to="/login" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                                        Login here
                                    </NavLink>
                                </div>

                                {/* Submit Button */}
                                <button
                                    disabled={passError.length > 0}
                                    className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group ${
                                        passError.length > 0
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-linear-to-r from-amber-400 to-orange-600 text-white hover:shadow-2xl hover:shadow-amber-500/50'
                                    }`}
                                >
                                    <span>Create Account</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Register;