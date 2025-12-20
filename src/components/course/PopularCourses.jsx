import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight} from 'lucide-react';
import CourseCard from './CourseCard';
import axios from 'axios';
import { Link } from 'react-router';

const PopularCourses = () => {
  const [courses, setCourses] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/course/popular')
      .then(res => {
        setCourses(res.data)
      })
      .catch(err=> console.log(err))
  }, [])

  return (
    <section className="relative py-24 bg-linear-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold">Featured Courses</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              Popular Courses
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Discover our most sought-after courses, handpicked by industry experts and loved by thousands of students worldwide
          </p>

        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0,6).map((course, index) => (
            <div
              key={course._id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Can't find what you're looking for?</p>
          <Link to="/allCourses" className="group inline-flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-full text-white transition-all duration-300">
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default PopularCourses;