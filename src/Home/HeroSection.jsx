import React from 'react';
import { ArrowRight, Play, Sparkles, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router';
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center z-10">
        {/* Premium Badge */}
        <div className="mb-8 inline-block animate-fadeIn">
          <span className="px-6 py-2.5 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold backdrop-blur-sm inline-flex items-center space-x-2 hover:border-amber-500/50 transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to Premium Learning Experience</span>
          </span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent inline-block">
            Elevate Your
          </span>
          <br />
          <span className="text-white inline-block mt-2">Future Today</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeIn" style={{animationDelay: '0.4s'}}>
          Experience world-class education with cutting-edge courses designed by industry experts. Transform your career with luxury learning.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 animate-fadeIn" style={{animationDelay: '0.6s'}}>
          <Link to="/allCourses"  className="group px-10 py-5 bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center space-x-3 hover:scale-105">
            <span>Explore Courses</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          <button className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/20 hover:bg-white/20 hover:border-amber-400/50 transition-all duration-300 flex items-center space-x-3 hover:scale-105">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 fill-white" />
            </div>
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fadeIn" style={{animationDelay: '0.8s'}}>
          {[
            { icon: TrendingUp, number: '50K+', label: 'Active Students', color: 'from-blue-400 to-cyan-400' },
            { icon: Award, number: '200+', label: 'Premium Courses', color: 'from-amber-400 to-orange-600' },
            { icon: Sparkles, number: '98%', label: 'Success Rate', color: 'from-purple-400 to-pink-400' }
          ].map((stat, idx) => (
            <div key={idx} className="group relative p-8 rounded-2xl bg-linear-to-br from-white/5 to-white/2 border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-linear-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-500"></div>
              <div className="relative">
                <div className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-5xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;