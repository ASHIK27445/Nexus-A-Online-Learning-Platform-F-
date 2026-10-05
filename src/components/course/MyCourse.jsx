import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import {
  Award,
  BookOpen,
  Clock,
  Edit,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { AuthContext } from "../../Auth/AuthContext";

const API = "https://backend-olp.vercel.app";

const ROUTES = {
  updateCourse: (id) => `/updateCourse/${id}`,
};

const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#6D28D9] focus-visible:outline-offset-[3px]";
const WRAP = "max-w-[1160px] mx-auto px-5";
const GRID =
  "bg-[#6D28D9] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const SHAPE = "absolute z-[1]";
const TRIANGLE = "[clip-path:polygon(45%_0,100%_88%,0_100%)]";
const BLOB = "rounded-[50px_50px_100px_100px]";
const TH = "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#5a5d80]";

const SWAL_CLASSES = {
  popup: "!rounded-[20px] !font-[inherit]",
  title: "!text-[#14163b] !font-semibold",
  htmlContainer: "!text-[#5a5d80]",
  confirmButton: `!rounded-full !bg-[#c8ff00] !text-[#14163b] !font-semibold !px-6 !py-3 !shadow-none ${FV}`,
  cancelButton: `!rounded-full !bg-[#f1f2f4] !text-[#333] !font-semibold !px-6 !py-3 !shadow-none ${FV}`,
};

const swal = (options) =>
  Swal.fire({
    buttonsStyling: false,
    customClass: SWAL_CLASSES,
    ...options,
  });

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

function CourseRow({ course, onDelete, deleting }) {
  const price = Number(course.price) || 0;
  const oprice = Number(course.oprice) || 0;

  return (
    <tr className="border-t border-[#dfe1f5] align-middle">
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-[#f1f2f4]">
            {course.imageURL && (
              <img
                src={course.imageURL}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="m-0 text-base font-bold leading-[1.3] tracking-[-.01em] line-clamp-1">
              {course.title}
            </h3>
            {course.description && (
              <p className="m-0 mt-1 text-sm text-[#5a5d80] line-clamp-1 max-w-[320px]">
                {course.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 text-xs text-[#5a5d80]">
              {course.duration && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {course.duration}
                </span>
              )}
              {course.lessons != null && (
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="w-3 h-3" aria-hidden="true" />
                  {course.lessons} lessons
                </span>
              )}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        {course.category && (
          <span className="inline-block whitespace-nowrap text-[11px] font-semibold text-[#6D28D9] bg-[#eef2ff] rounded-full px-2.5 py-1">
            {course.category}
          </span>
        )}
      </td>

      <td className="px-6 py-5">
        <div className="grid gap-1.5 text-sm text-[#5a5d80]">
          {course.rating != null && (
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#6D28D9] text-[#6D28D9]" aria-hidden="true" />
              <b className="font-semibold text-[#14163b]">{course.rating}</b>
            </span>
          )}
          {course.students != null && (
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Users className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
              {Number(course.students).toLocaleString()} students
            </span>
          )}
        </div>
      </td>

      <td className="px-6 py-5">
        <b className="block text-xl font-extrabold text-[#6D28D9]">${price}</b>
        {oprice > price && (
          <span className="text-xs text-[#8a8ea8] line-through">${oprice}</span>
        )}
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-2">
          <Link
            to={ROUTES.updateCourse(course._id)}
            aria-label={`Edit ${course.title}`}
            className={`grid place-items-center w-10 h-10 rounded-full bg-[#f1f2f4] text-[#14163b] hover:bg-[#c8ff00] transition-colors ${FV}`}
          >
            <Edit className="w-4 h-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => onDelete(course)}
            disabled={deleting}
            aria-label={`Delete ${course.title}`}
            className={`grid place-items-center w-10 h-10 rounded-full bg-[#f1f2f4] text-[#14163b] cursor-pointer hover:bg-[#ffe1e1] hover:text-[#c62828] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${FV}`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function MyCourses() {
  const { user } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
      .get(`${API}/myCourses/${user.email}`)
      .then((res) => !cancelled && setMyCourses(res.data))
      .catch((err) => console.log(err))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  const stats = useMemo(() => {
    const totalStudents = myCourses.reduce((sum, c) => sum + (Number(c.students) || 0), 0);
    const avgRating = myCourses.length
      ? myCourses.reduce((sum, c) => sum + (Number(c.rating) || 0), 0) / myCourses.length
      : 0;
    return { totalStudents, avgRating };
  }, [myCourses]);

  const handleDelete = async (course) => {
    const { isConfirmed } = await swal({
      title: "Delete this course?",
      text: `"${course.title}" will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });
    if (!isConfirmed) return;

    setDeletingId(course._id);
    try {
      await axios.delete(`${API}/delete/${course._id}`);
      setMyCourses((prev) => prev.filter((c) => c._id !== course._id));
      swal({
        title: "Deleted Successfully!",
        text: "The course has been deleted successfully.",
        icon: "success",
        confirmButtonText: "Got it!",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      swal({
        title: "Error!",
        text: `${err.message}. Please try again.`,
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#14163b] text-base font-normal leading-[1.6] font-[family-name:Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif] [padding-top:env(safe-area-inset-top,0px)] [padding-bottom:env(safe-area-inset-bottom,0px)]">
      <header className={`relative ${GRID} text-white overflow-hidden pt-32 pb-28 max-[860px]:pt-24`}>
        <span className={`${SHAPE} left-[-70px] top-[60px] w-[230px] h-[210px] rounded-[70px] bg-[#c8ff00] -rotate-[22deg] max-[860px]:scale-[.6]`} />
        <span className={`${SHAPE} right-[-80px] top-[40px] w-[210px] h-[280px] ${BLOB} bg-[#c8ff00] -rotate-[14deg] max-[860px]:scale-[.6]`} />
        <span className={`${SHAPE} right-[22%] bottom-[-30px] w-[110px] h-[120px] bg-white ${TRIANGLE} max-[860px]:hidden`} />

        <div className={`${WRAP} relative z-[2] text-center`}>
          <h1 className="m-0 font-semibold leading-[1.1] tracking-[-.02em] text-[clamp(36px,6vw,64px)]">
            My Courses
          </h1>
          <p className="mt-5 mx-auto max-w-[60ch] text-[17px] text-white/[.92]">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ""}. Track performance, refine your content and inspire your learners.
          </p>
        </div>
      </header>

      <main className="relative z-[3] pb-20 max-[860px]:pb-14">
        <div className={WRAP}>
          <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-5 -mt-16">
            <StatCard
              Icon={BookOpen}
              label="Total Courses"
              value={myCourses.length}
              hint="Published programs"
            />
            <StatCard
              Icon={Users}
              label="Total Students"
              value={stats.totalStudents.toLocaleString()}
              hint="Enrolled learners"
            />
            <StatCard
              Icon={Award}
              label="Average Rating"
              value={stats.avgRating.toFixed(1)}
              hint="Learner satisfaction"
            />
          </div>

          <section className="mt-12" aria-labelledby="your-courses">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
              <h2
                id="your-courses"
                className="m-0 font-bold leading-[1.1] tracking-[-.02em] text-[clamp(24px,3vw,32px)]"
              >
                Your Courses
                <span className="ml-3 text-sm font-normal text-[#5a5d80]">
                  ({myCourses.length} {myCourses.length === 1 ? "course" : "courses"})
                </span>
              </h2>
              {user?.email && (
                <span className="text-sm text-[#5a5d80] truncate max-w-full">{user.email}</span>
              )}
            </div>

            {loading ? (
              <p className="text-center text-[#5a5d80] py-16">Loading courses...</p>
            ) : myCourses.length === 0 ? (
              <div className="text-center border border-[#dfe1f5] rounded-[18px] py-20 px-5">
                <i className="grid place-items-center w-16 h-16 mx-auto mb-5 rounded-full bg-[#c8ff00] text-[#14163b]">
                  <BookOpen className="w-7 h-7" aria-hidden="true" />
                </i>
                <h3 className="m-0 mb-2 text-xl font-semibold">No courses yet</h3>
                <p className="m-0 text-[#5a5d80]">Courses you create will show up here.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#dfe1f5] rounded-[18px] overflow-hidden shadow-[0_20px_40px_-28px_rgba(0,30,120,.4)]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] border-collapse">
                    <thead className="bg-[#eef2ff]">
                      <tr>
                        <th scope="col" className={TH}>Course</th>
                        <th scope="col" className={TH}>Category</th>
                        <th scope="col" className={TH}>Stats</th>
                        <th scope="col" className={TH}>Price</th>
                        <th scope="col" className={`${TH} text-right`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myCourses.map((course) => (
                        <CourseRow
                          key={course._id}
                          course={course}
                          onDelete={handleDelete}
                          deleting={deletingId === course._id}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}