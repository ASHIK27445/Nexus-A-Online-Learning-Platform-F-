import { useEffect, useMemo, useState } from "react";
import { Sparkles, Loader } from "lucide-react";
import CourseCard from "./CourseCard";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState("")
  

  useEffect(() => {
    fetch("https://backend-olp.vercel.app/allCourses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const uniqueCategories = useMemo(()=>
    [...new Set(courses.map(course=>course?.category).filter(Boolean))],
    [courses]
  )

  const handleSelectCategory = (category) =>{
    setSelectCategory(category)
  }

  const filteredCourses = useMemo(()=>{
    return selectCategory 
    ? 
    courses.filter(courses=>{
return courses?.category === selectCategory}) :
      courses
  }, [selectCategory, courses])

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading courses...</p>
        </div>
      </div>
    );
  }

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
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">All Courses</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Featured</span>
            <br />
            <span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              All Courses
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Curated by industry leaders. Designed for excellence. Built for your success.
          </p>
        </div>

        {/* Category Filter Dropdown */}
        <div className="mb-8 flex items-center justify-between border-2 border-amber-50 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 flex-1">
            <label className="text-sm font-medium text-white whitespace-nowrap">
              Filter by Category:
            </label>
            <select
              value={selectCategory || ''}
              onChange={(e) => handleSelectCategory(e.target.value)}
              className="flex-1 max-w-xs px-4 py-2 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-50 focus:border-black outline-none transition-all"
            >
              <option value="" className="text-black">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category} className="text-black">
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-white ml-4">
            <span className="font-semibold text-white">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses
            .map((course, index) => (
              <div
                key={course?._id || index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No courses available at the moment.</p>
          </div>
        )}
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

export default AllCourses;