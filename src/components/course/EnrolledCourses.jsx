import { use, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Star,
  Target,
  Users,
} from "lucide-react";
import { AuthContext } from "../../Auth/AuthContext";

const API = "https://backend-olp.vercel.app";

const ROUTES = {
  allCourses: "/allCourses",
  courseDetails: (id) => `/viewDetails/${id}`,
  learn: (course) => (course.title === "JWT Token" ? "/jwt-token" : `/viewDetails/${course._id}`),
};

const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#6D28D9] focus-visible:outline-offset-[3px]";
const WRAP = "max-w-[1160px] mx-auto px-5";
const GRID =
  "bg-[#6D28D9] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const SHAPE = "absolute z-[1]";
const TRIANGLE = "[clip-path:polygon(45%_0,100%_88%,0_100%)]";
const BLOB = "rounded-[50px_50px_100px_100px]";
const BTN_ACC = `inline-flex items-center justify-center gap-2 border-0 rounded-full px-6 py-3 font-bold text-[15px] cursor-pointer bg-[#c8ff00] text-[#14163b] ${FV}`;
const BTN_SOFT = `inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold text-[15px] cursor-pointer border-[1.5px] border-[#dfe1f5] bg-white text-[#333] hover:bg-[#f1f2f4] transition-colors ${FV}`;
const THUMB_PILL = "relative bg-white/85 text-[#14163b] text-[11px] px-2 py-[3px] rounded-full";

const clampPct = (v) => Math.min(100, Math.max(0, Number(v) || 0));

const formatDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

function StatCard({ Icon, label, value, hint }) {
  return (
    <div className="bg-white border border-[#dfe1f5] rounded-[18px] p-6 shadow-[0_20px_40px_-28px_rgba(0,30,120,.4)]">
      <i className="grid place-items-center w-12 h-12 mb-4 rounded-full bg-[#c8ff00] text-[#14163b]">
        <Icon className="w-[22px] h-[22px]" aria-hidden="true" />
      </i>
      <p className="m-0 text-sm text-[#5a5d80]">{label}</p>
      <b className="block text-[32px] font-semibold leading-[1.2] text-[#14163b]">{value}</b>
      <span className="text-xs text-[#8a8ea8]">{hint}</span>
    </div>
  );
}

function EnrolledCard({ course }) {
  const progress = clampPct(course.progress);
  const enrolledOn = formatDate(course.enrollAt);

  return (
    <article className="bg-white border border-[#dfe1f5] rounded-[18px] overflow-hidden flex flex-col shadow-[0_20px_40px_-28px_rgba(0,30,120,.4)]">
      <div className="relative h-[200px] flex items-end justify-between gap-1.5 p-3.5 bg-[linear-gradient(135deg,#dfe6ff,#f4ffc9)]">
        {course.imageURL && (
          <img
            src={course.imageURL}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {course.category && (
          <span className="absolute top-3 left-3 z-[1] bg-white text-[#6D28D9] text-[11px] font-bold px-2.5 py-1 rounded-full">
            {course.category}
          </span>
        )}
        <span className="absolute top-3 right-3 z-[1] inline-flex items-center gap-1 bg-[#c8ff00] text-[#14163b] text-[11px] font-bold px-2.5 py-1 rounded-full">
          <BarChart3 className="w-3 h-3" aria-hidden="true" />
          {progress}%
        </span>
        {course.lessons != null && <span className={THUMB_PILL}>{course.lessons} Lessons</span>}
        {course.duration && <span className={THUMB_PILL}>{course.duration}</span>}
      </div>

      <div className="p-[22px] flex flex-col gap-3 flex-1">
        <h3 className="m-0 text-xl font-bold leading-[1.3] tracking-[-.02em] line-clamp-2">
          {course.title}
        </h3>

        <div className="flex items-center gap-x-4 gap-y-1 flex-wrap text-sm text-[#5a5d80]">
          {course.rating != null && (
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#6D28D9] text-[#6D28D9]" aria-hidden="true" />
              <b className="font-semibold text-[#14163b]">{course.rating}</b>
            </span>
          )}
          {course.students != null && (
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
              {Number(course.students).toLocaleString()} students
            </span>
          )}
          {course.duration && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
              {course.duration}
            </span>
          )}
        </div>

        {enrolledOn && (
          <div className="inline-flex items-center gap-2 self-start bg-[#eef2ff] text-[#5a5d80] text-sm rounded-full px-3.5 py-1.5">
            <Calendar className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
            Enrolled on {enrolledOn}
          </div>
        )}

        <div className="mt-1">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#5a5d80]">Course Progress</span>
            <b className="font-semibold text-[#6D28D9]">{progress}%</b>
          </div>
          <div
            role="progressbar"
            aria-label="Course progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="h-2 rounded-lg bg-[#eaeaf2] overflow-hidden"
          >
            <i
              className="block h-full bg-[#c8ff00] transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-auto pt-3">
          <Link to={ROUTES.learn(course)} className={`${BTN_ACC} flex-1`}>
            Continue Learning
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link to={ROUTES.courseDetails(course._id)} className={BTN_SOFT}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function EnrolledCourses() {
  const { user } = use(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fontId = "bytespace-poppins";
    if (document.getElementById(fontId)) return;

    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";

    const stylesheet = document.createElement("link");
    stylesheet.id = fontId;
    stylesheet.rel = "stylesheet";
    stylesheet.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";

    document.head.append(preconnect, stylesheet);
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    let cancelled = false;
    setLoading(true);

    axios
      .get(`${API}/myenroll/${user.email}`)
      .then((res) => !cancelled && setEnrolledCourses(res.data.course || []))
      .catch((err) => {
        console.log(err);
        if (!cancelled) setEnrolledCourses([]);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  const stats = useMemo(() => {
    const total = enrolledCourses.length;
    const completed = enrolledCourses.filter((c) => clampPct(c.progress) >= 100).length;
    const avgProgress = total
      ? Math.round(enrolledCourses.reduce((sum, c) => sum + clampPct(c.progress), 0) / total)
      : 0;
    return { total, completed, avgProgress };
  }, [enrolledCourses]);

  return (
    <div className="min-h-screen bg-white text-[#14163b] text-base font-normal leading-[1.6] font-[family-name:Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif] [padding-top:env(safe-area-inset-top,0px)] [padding-bottom:env(safe-area-inset-bottom,0px)]">
      <header className={`relative ${GRID} text-white overflow-hidden pt-32 pb-28 max-[860px]:pt-24`}>
        <span className={`${SHAPE} left-[-70px] top-[60px] w-[230px] h-[210px] rounded-[70px] bg-[#c8ff00] -rotate-[22deg] max-[860px]:scale-[.6]`} />
        <span className={`${SHAPE} right-[-80px] top-[40px] w-[210px] h-[280px] ${BLOB} bg-[#c8ff00] -rotate-[14deg] max-[860px]:scale-[.6]`} />
        <span className={`${SHAPE} right-[22%] bottom-[-30px] w-[110px] h-[120px] bg-white ${TRIANGLE} max-[860px]:hidden`} />

        <div className={`${WRAP} relative z-[2] text-center`}>
          <h1 className="m-0 font-semibold leading-[1.1] tracking-[-.02em] text-[clamp(36px,6vw,64px)]">
            My Journey
          </h1>
          <p className="mt-5 mx-auto max-w-[60ch] text-[17px] text-white/[.92]">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ""}. Continue your learning adventure, track your progress and reach your goals.
          </p>
        </div>
      </header>

      <main className="relative z-[3] pb-20 max-[860px]:pb-14">
        <div className={WRAP}>
          <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-5 -mt-16">
            <StatCard Icon={BookOpen} label="Enrolled" value={stats.total} hint="Active courses" />
            <StatCard Icon={Award} label="Completed" value={stats.completed} hint="Finished courses" />
            <StatCard Icon={Target} label="Average Progress" value={`${stats.avgProgress}%`} hint="Across all courses" />
          </div>

          <section className="mt-12" aria-labelledby="enrolled-courses">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
              <h2
                id="enrolled-courses"
                className="m-0 font-bold leading-[1.1] tracking-[-.02em] text-[clamp(24px,3vw,32px)]"
              >
                Your Courses
                <span className="ml-3 text-sm font-normal text-[#5a5d80]">
                  ({stats.total} {stats.total === 1 ? "course" : "courses"})
                </span>
              </h2>
            </div>

            {loading ? (
              <p className="text-center text-[#5a5d80] py-16">Loading your courses...</p>
            ) : enrolledCourses.length === 0 ? (
              <div className="text-center border border-[#dfe1f5] rounded-[18px] py-20 px-5">
                <i className="grid place-items-center w-16 h-16 mx-auto mb-5 rounded-full bg-[#c8ff00] text-[#14163b]">
                  <BookOpen className="w-7 h-7" aria-hidden="true" />
                </i>
                <h3 className="m-0 mb-2 text-xl font-semibold">No enrolled courses yet</h3>
                <p className="m-0 mb-6 text-[#5a5d80]">
                  Start your learning journey by enrolling in a course!
                </p>
                <Link to={ROUTES.allCourses} className={BTN_ACC}>
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-6">
                {enrolledCourses.map((course) => (
                  <EnrolledCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}