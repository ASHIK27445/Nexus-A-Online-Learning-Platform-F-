import React, { useEffect, useState } from 'react';
import { Star, Users, BookOpen, Award, Linkedin, Twitter, Github } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router';

const TopInstructors = () => {
    const [course, setCourses] = useState([])
    useEffect(()=>{
        axios.get('https://backend-olp.vercel.app/topInstructors')
            .then(res => setCourses(res.data))
            .catch(err=> console.log(err))
    })

  return (
    <section className="relative py-24 bg-linear-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="px-6 py-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold">
              Meet Our Experts
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Top Instructors
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Learn from world-class educators who have trained thousands and shaped the future of their industries
          </p>
        </div>

        {/* Instructors Grid - 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {course
          .sort((a,b)=> b.rating - a.rating)
          .slice(0,8)
          .map((c, index) => (
            <div
              key={c?._id}
              className="group relative opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              {/* Card */}
              <div className="relative bg-linear-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/0 to-purple-500/0 group-hover:from-amber-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={c?.instructor?.avatar} 
                    alt={c?.instructor?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-white text-sm font-bold">{c?.rating}</span>
                  </div>

                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="https://www.linkedin.com/" className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300">
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://www.x.com/" className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-blue-300 rounded-full flex items-center justify-center transition-colors duration-300">
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a href="https://www.github.com/" className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors duration-300">
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {c?.instructor?.name}
                  </h3>
                  <p className="text-amber-400 text-sm font-semibold mb-4">{c?.instructor?.title}</p>
                  

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-800">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-lg font-bold text-white">{c?.students}</div>
                      <div className="text-xs text-gray-400">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-lg font-bold text-white">{c?.lessons}</div>
                      <div className="text-xs text-gray-400">Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-lg font-bold text-white">{c?.reviews}</div>
                      <div className="text-xs text-gray-400">Reviews</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center p-12 rounded-3xl bg-linear-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-white mb-4">
            Want to Become an Instructor?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our elite community of educators and share your expertise with students around the globe
          </p>
          <Link to='https://www.gmail.com/' className="px-8 py-4 bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
            Apply to Teach
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
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default TopInstructors;