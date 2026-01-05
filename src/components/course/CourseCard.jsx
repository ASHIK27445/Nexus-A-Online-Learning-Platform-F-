import React from 'react';
import { Star, Users, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

const CourseCard = ({ course }) => {
  return (
    <div className="group relative bg-linear-to-br from-gray-900 via-gray-900 to-black rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-3">
      {/* Glowing effect on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
      
      {/* Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-4 py-1.5 bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1">
          <TrendingUp className="w-3 h-3" />
          <span>{course?.courseType}</span>
        </span>
      </div>

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent z-10"></div>
        <img 
          src={course?.imageURL} 
          alt={course?.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Instructor Info Overlay */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-3">
          <img 
            src={course?.instructor?.avatar} 
            alt={course?.instructor?.name} 
            className="w-12 h-12 rounded-full border-2 border-amber-400 shadow-lg" 
          />
          <div>
            <p className="text-white text-sm font-semibold">{course?.instructor?.name}</p>
            <p className="text-amber-400 text-xs">{course?.instructor?.title}</p>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/50 cursor-pointer hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-6">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold">
            {course?.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-white text-sm font-bold">{course?.rating}</span>
            <span className="text-gray-400 text-xs">({course?.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
          {course?.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {course?.description}
        </p>

        {/* Course? Info */}
        <div className="flex items-center justify-between text-gray-400 text-sm mb-5 pb-5 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-amber-400" />
              <span>{course?.students}</span>
            </span>
            <span className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{course?.lessons}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{course?.duration}</span>
            </span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-2xl md:text-3xl font-bold bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              ${course?.price}
            </span>
            {course?.oprice && (
              <span className="text-gray-700 bold md:text-gray-500 line-through ml-2 text-[12px] md:text-sm">
                ${course?.oprice}
              </span>
            )}
          </div>
          <Link to={`/viewDetails/${course?._id}`} className="px-4 md:px-6 py-2.5 bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;