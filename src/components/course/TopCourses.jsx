import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
const TopCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/course.json")
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

  if (loading) return <p className="text-white text-center mt-10">Loading courses...</p>;
    return(
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-linear-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 px-6 py-3 rounded-full mb-6">
            <span className="text-sm font-semibold text-white">Premium Courses</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-white">Featured</span>
            <br />
            <span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Elite Courses
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Curated by industry leaders. Designed for excellence. Built for your success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id || index} course={course} />
          ))}
        </div>
      </div>
    )
}
export default TopCourses