import React, { useState, useEffect, useContext } from 'react';
import { 
  Star, Users, BookOpen, Clock, Edit, Trash2, Target, Sparkles, Award,
  X, Save, Loader2
} from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../Auth/AuthContext';
import {Link} from 'react-router'
const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/myCourses/${user?.email}`)
      .then(res => {
        setMyCourses(res.data);
        setIsLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setIsLoaded(true);
      });
  }, [user?.email]);


  const handleDelete = (courseId) => {
    axios.delete(`http://localhost:3000/delete/${courseId}`)
      .then(res=> {console.log(res.data)
        const filterData = myCourses.filter(course => course._id != courseId)
        setMyCourses(filterData)
      })
      .catch(err=> console.log(err))

  };


  const getBadgeColor = (badge) => {
    const colors = {
      'Trending': 'bg-amber-500/20 border-amber-500/50 text-amber-400',
      'Best Seller': 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
      'Popular': 'bg-purple-500/20 border-purple-500/50 text-purple-400',
      'New': 'bg-blue-500/20 border-blue-500/50 text-blue-400'
    };
    return colors[badge] || 'bg-gray-500/20 border-gray-500/50 text-gray-400';
  };

  return (
    <>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-linear-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-60 -right-40 w-96 h-96 bg-linear-to-bl from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-linear-to-t from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        </div>

        {/* Header */}
        <div className="relative pt-32 pb-20">
          <div className="relative max-w-7xl mx-auto px-6">
            <div className={`mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-amber-400 to-orange-500 animate-pulse-glow"></div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-500/80 font-light">Dashboard</p>
              </div>
              
              <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
                My{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-gradient-x">
                    Courses
                  </span>
                  <div className="absolute -inset-2 bg-linear-to-r from-amber-500/20 to-orange-500/20 blur-2xl -z-10"></div>
                </span>
              </h1>

              <div className="flex items-center gap-4 mb-3">
                <p className="text-2xl text-gray-300 font-light">
                  Welcome back, <span className="text-white font-semibold">{user?.displayName}</span>
                </p>
                <div className="px-4 py-1.5 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full">
                  <span className="text-sm text-amber-400 font-medium">Instructor</span>
                </div>
              </div>
              <p className="text-gray-500 text-lg font-light max-w-2xl">
                Orchestrate your educational empire. Track performance, refine content, and inspire thousands.
              </p>
            </div>

            {/* Stats Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Total Courses */}
              <div className="group relative">
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative p-8 bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-amber-500/30 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-amber-500/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-linear-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                      <Sparkles className="w-5 h-5 text-amber-400/40 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Courses</p>
                    <p className="text-5xl font-black text-white mb-1 tracking-tight">{myCourses?.length}</p>
                    <p className="text-xs text-amber-400/60">Active programs</p>
                  </div>
                </div>
              </div>

              {/* Total Students */}
              <div className="group relative">
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative p-8 bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-500/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-linear-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <Target className="w-5 h-5 text-emerald-400/40 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Students</p>
                    <p className="text-5xl font-black text-white mb-1 tracking-tight">
                      {(myCourses.reduce((sum, course) => sum + course?.students, 0) / 1000).toFixed(1)}k
                    </p>
                    <p className="text-xs text-emerald-400/60">Enrolled learners</p>
                  </div>
                </div>
              </div>

              {/* Average Rating */}
              <div className="group relative">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative p-8 bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-linear-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Star className="w-7 h-7 text-white fill-white" />
                      </div>
                      <Award className="w-5 h-5 text-purple-400/40 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Avg Rating</p>
                    <p className="text-5xl font-black text-white mb-1 tracking-tight">
                      {myCourses.length ? (myCourses.reduce((sum, course) => sum + course.rating, 0) / myCourses?.length).toFixed(1) : 0}
                    </p>
                    <p className="text-xs text-purple-400/60">Customer satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="relative max-w-7xl mx-auto px-6 pb-24">
          {myCourses.length === 0 ? (
            <div className={`text-center py-32 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="relative w-32 h-32 bg-linear-to-br from-white/[0.07] to-white/2 border border-white/10 rounded-3xl backdrop-blur-xl flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-gray-600" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">No courses found</h3>
              <p className="text-gray-400 text-lg">Try adjusting your search or filters to discover more content</p>
            </div>
          ) : (
            <div className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="bg-linear-to-r from-white/8 to-white/4 border-b border-white/10 px-8 py-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Your Courses
                    <span className="ml-4 text-sm font-normal text-gray-400">
                      ({myCourses?.length} {myCourses?.length === 1 ? 'course' : 'courses'})
                    </span>
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow"></div>
                    <span>Filtered by: {user?.email}</span>
                  </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Stats</th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {myCourses.map((course, index) => (
                        <tr key={course?._id} className="group hover:bg-white/3 transition-all duration-300"
                          style={{ 
                            opacity: isLoaded ? 1 : 0,
                            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.5s ease ${500 + index * 100}ms`
                          }}
                        >
                          {/* Course Info */}
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <img src={course?.imageURL} alt={course?.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-amber-400 transition-colors">{course?.title}</h3>
                                <p className="text-gray-500 text-sm truncate max-w-md">{course?.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Clock className="w-3 h-3 text-gray-600" />
                                  <span className="text-xs text-gray-500">{course?.duration}</span>
                                  <span className="text-gray-700">•</span>
                                  <BookOpen className="w-3 h-3 text-gray-600" />
                                  <span className="text-xs text-gray-500">{course?.lessons} lessons</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="px-6 py-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                              <span className="text-amber-400 text-sm font-semibold whitespace-nowrap">{course?.category}</span>
                            </div>
                          </td>

                          {/* Stats */}
                          <td className="px-6 py-6">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="text-white font-semibold text-sm">{course?.rating}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-emerald-400" />
                                <span className="text-gray-300 text-sm font-medium">{course?.students.toLocaleString()} students</span>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="px-6 py-6">
                            <div className="space-y-1">
                              <div className="text-2xl font-black bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                                ${course?.price}
                              </div>
                              <div className="text-sm text-gray-600 line-through">${course.oprice}</div>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-2">
                              <Link to={`/updateCourse/${course?._id}`} className="p-2 rounded-lg hover:bg-emerald-500/20 text-emerald-400 transition-all">
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button onClick={() => handleDelete(course?._id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;