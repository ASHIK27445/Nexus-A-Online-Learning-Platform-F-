import React, { use, useEffect, useState } from 'react';
import { 
  Star, Users, BookOpen, Clock, Play, X, Check, TrendingUp
} from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router';
import { AuthContext } from '../../Auth/AuthContext';

const DetailsCourse = () => {
  const {user} = use(AuthContext)
  const {id} = useParams()
  const [showToast, setShowToast] = useState(false);
  const [course, setCourse] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(()=>{
    axios.get(`http://localhost:3000/course/${id}`)
      .then(res => setCourse(res.data))
      .catch(err=> console.log(err))
  },[id])
  
  useEffect(()=>{
    axios.get(`http://localhost:3000/enroll/check?email=${user?.email}&courseID=${course?._id}`)
      .then(res=> setIsEnrolled(res.data.enrolled))
      .catch(err=> console.log(err))
  },[user?.email, course?._id])

  const handleEnroll = () => {
    const enrollData = {
      email: user?.email,
      course: course
    }
    console.log(enrollData)

    axios.post('http://localhost:3000/enroll', enrollData)
      .then((res) => {  
        setIsEnrolled(true)
        console.log(res.data)
      })
      .catch(err => console.log(err))

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 mt-20">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 z-50 animate-slideIn">
          <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-green-500/50 flex items-center space-x-4 border border-green-400/30 backdrop-blur-sm">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Successfully Enrolled!</h4>
              <p className="text-sm text-green-50">You can now access this course</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 hover:bg-white/20 rounded-lg p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-gray-900 via-black to-purple-900/20">
        <div className="absolute inset-0">
          <img src={course?.image} alt={course?.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-between items-center gap-10">
            {/* Left Content */}
            <div className="w-1/2">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-full mb-6">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-semibold text-sm">{course?.courseType}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {course?.title}
              </h1>

              {/* Category */}
              <p className="text-xl text-amber-400 mb-6">{course?.category}</p>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">{course?.description}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(course?.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <span className="text-white font-bold">{course?.rating}</span>
                  <span className="text-gray-400">({course?.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>{course?.students} students</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>{course?.lessons} lectures</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>{course?.duration}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center space-x-4 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <img src={course?.instructor?.avatar} alt={course?.instructor?.name} className="w-16 h-16 rounded-full border-2 border-amber-400" />
                <div>
                  <p className="text-sm text-gray-400">Instructor</p>
                  <h3 className="text-xl font-bold text-white">{course?.instructor?.name}</h3>
                  <p className="text-sm text-amber-400">{course?.instructor?.title}</p>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Course? Card */}
            <div className="w-2/5">
              <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 leading-tight">
                Enroll Now!
              </h1>
              <div className="sticky top-8 bg-linear-to-br from-gray-900 to-black border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20">
                {/* Preview Image */}
                <div className="relative h-48">
                  <img src={course?.image} alt={course?.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl shadow-amber-500/50">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    {Math.round(((course?.oprice - course?.price) / course?.oprice) * 100)}% OFF
                  </div>
                </div>
                <div className="p-6">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-3 mb-2">
                      <span className="text-4xl font-bold bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                        ${course?.price}
                      </span>
                      <span className="text-xl text-gray-500 line-through">${course?.originalPrice}</span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <button 
                    onClick={handleEnroll}
                    disabled={isEnrolled}
                    className={`w-full py-4 bg-linear-to-r text-white text-lg font-bold rounded-full hover:shadow-2xl transition-all duration-300 
                      ${isEnrolled ? 
                        ' from-gray-500 to-gray-600' : 
                        'hover:scale-105  hover:shadow-amber-500/50 from-amber-400 to-orange-600'}`}
                  >
                    {isEnrolled ? 'Already Enrolled': 'Enroll Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {course?.features && course?.features.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            What's <span className="bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Included</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course?.features.map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-start space-x-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DetailsCourse;