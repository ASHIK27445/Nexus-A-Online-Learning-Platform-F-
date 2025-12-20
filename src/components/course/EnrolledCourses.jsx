import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Calendar, ArrowRight, GraduationCap, Star, Clock, 
  PlayCircle, Award, TrendingUp, Sparkles, CheckCircle, Target,
  BarChart3, Zap, Users, ChevronRight, Video, List
} from 'lucide-react';
import { Link } from 'react-router';

const EnrolledCourses = () => {
  const {user} = use(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/myenroll/${user?.email}`)
      .then(res => {
        setEnrolledCourses(res.data.course);
        setIsLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setIsLoaded(true);
      });
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-linear-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-60 -right-40 w-96 h-96 bg-linear-to-bl from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-linear-to-t from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-[0.02]"></div>
      </div>

      {/* Header Section */}
      <div className="relative pt-32 pb-16">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-2 h-2 rounded-full bg-linear-to-r from-emerald-400 to-teal-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-500/80 font-light">Learning Hub</p>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
              My{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-linear-to-r from-emerald-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  Journey
                </span>
                <motion.div 
                  className="absolute -inset-2 bg-linear-to-r from-emerald-500/20 to-teal-500/20 blur-2xl -z-10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </h1>

            <div className="flex items-center gap-4 mb-3">
              <p className="text-2xl text-gray-300 font-light">
                Welcome back, <span className="text-white font-semibold">{user?.displayName}</span>
              </p>
              <div className="px-4 py-1.5 bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-sm text-emerald-400 font-medium">Student</span>
              </div>
            </div>
            <p className="text-gray-500 text-lg font-light max-w-2xl">
              Continue your learning adventure. Track your progress and achieve your goals.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            {/* Total Enrolled */}
            <motion.div 
              className="group relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative p-8 bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-500/10 to-transparent rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <Sparkles className="w-5 h-5 text-emerald-400/40 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Enrolled</p>
                  <p className="text-5xl font-black text-white mb-1 tracking-tight">{enrolledCourses?.length}</p>
                  <p className="text-xs text-emerald-400/60">Active courses</p>
                </div>
              </div>
            </motion.div>


            {/* Completed */}
            <motion.div 
              className="group relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative p-8 bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-linear-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <CheckCircle className="w-5 h-5 text-blue-400/40 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Completed</p>
                  <p className="text-5xl font-black text-white mb-1 tracking-tight">0%</p>
                  <p className="text-xs text-blue-400/60">Finished courses</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24">
        {enrolledCourses?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-32"
          >
            <div className="relative inline-block mb-8">
              <motion.div 
                className="absolute inset-0 bg-linear-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative w-32 h-32 bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl backdrop-blur-xl flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-gray-600" />
              </div>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">No enrolled courses yet</h3>
            <p className="text-gray-400 text-lg mb-8">Start your learning journey by enrolling in a course!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all"
            >
              Browse Courses
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrolledCourses.map((course, index) => (
                <motion.div
                  key={course?._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(course?._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative"
                >
                  {/* Hover Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl transition-all duration-500"
                    animate={{ opacity: hoveredCard === course?._id ? 1 : 0 }}
                  />
                  
                  <div className="relative bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
                    {/* Course Image */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.img 
                        src={course?.imageURL} 
                        alt={course?.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                          <span className="text-sm text-blue-500 font-semibold">{course?.category}</span>
                        </div>
                      </div>

                      {/* Progress Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-full flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-emerald-400 font-semibold">0%</span>
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCard === course?._id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <PlayCircle className="w-10 h-10 text-white fill-white/20" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                        {course?.title}
                      </h3>

                      {/* Course Meta */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm text-gray-300 font-semibold">{course?.rating || '4.8'}</span>
                        </div>
                        <span className="text-gray-700">•</span>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">{course?.students || '1.2k'} students</span>
                        </div>
                        <span className="text-gray-700">•</span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">{course?.duration || '12h 30m'}</span>
                        </div>
                      </div>

                      {/* Enrollment Date */}
                      <div className="flex items-center gap-2 mb-5 px-3 py-2 bg-white/5 rounded-lg border border-white/5">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-400">
                          Enrolled on {new Date(course?.enrollAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-5">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Course Progress</span>
                          <span className="text-emerald-400 font-semibold">0%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course?.progress || 0}%` }}
                            transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                            className="h-full bg-linear-to-r from-emerald-500 to-teal-600 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                          </motion.div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleViewDetails(course?._id)}
                          className="flex-1 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all group/button"
                        >
                          <span>Continue Learning</span>
                          <motion.div
                            animate={{ x: hoveredCard === course?._id ? 5 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.div>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-white rounded-xl font-semibold transition-all"
                        >
                          <Link to={`/viewDetails/${course?._id}`}>Details</Link>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default EnrolledCourses;