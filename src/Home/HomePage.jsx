
import PopularCourses from "../components/course/PopularCourses";
import TopCourses from "../components/course/TopCourses";
import TopInstructors from "../components/course/TopInstructors";
import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";

const HomePage = () => {
  

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black">
      <HeroSection />
      <TopInstructors></TopInstructors>
      <PopularCourses></PopularCourses>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default HomePage;