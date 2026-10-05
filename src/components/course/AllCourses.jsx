import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  BarChart2,
  Shapes,
  ListFilter,
  Star,
  Loader,
} from "lucide-react";

const GRID =
  "bg-[#0033e0] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0033e0] focus-visible:outline-offset-[3px]";
const WRAP = "max-w-[1240px] mx-auto px-5";
const BTN_ACC = `inline-block border-0 rounded-full px-6 py-3 font-semibold text-[15px] cursor-pointer bg-[#c8ff00] text-[#14163b] ${FV}`;
const OUTLINE_CHIP = `inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#dfe1f5] bg-white text-[#333] px-4.5 py-3 text-[15px] font-medium cursor-pointer ${FV}`;
const PAGE_BTN = `w-11 h-11 grid place-items-center rounded-full border-[1.5px] border-[#dfe1f5] bg-white text-[#14163b] cursor-pointer ${FV}`;
const THUMB_PILL = "relative bg-white/85 text-[#14163b] text-xs px-2.5 py-1 rounded-full";

const PAGE_SIZE = 9;

const grads = [
  "#7aa2ff,#ffd08a",
  "#c9ccd6,#eef0f6",
  "#0b1d3a,#1c6b8a",
  "#20242e,#aab2c5",
  "#f4f6ff,#5fd39b",
  "#ffb3c7,#ffe08a",
];

const AV_COLORS = ["#ffb3c7", "#b8c2ff", "#ffc93c"];

function CourseCard({ course, i }) {
  const to = `/viewDetails/${course?._id}`;
  const instructor = course?.instructor;

  return (
    <article className="relative bg-white border border-[#dfe1f5] rounded-[20px] p-4 flex flex-col">
      <Link to={to} tabIndex={-1} aria-hidden="true" className="block">
        <div
          className="relative h-47.5 rounded-[14px] overflow-hidden flex items-end justify-between gap-1.5 px-3.5 pb-5"
          style={{ background: `linear-gradient(135deg,${grads[i % grads.length]})` }}
        >
          {course?.imageURL && (
            <img
              src={course.imageURL}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {course?.courseType && (
            <span className="absolute top-3 right-3 bg-[#c8ff00] text-[#14163b] text-xs font-semibold px-2.5 py-1 rounded-full">
              {course.courseType}
            </span>
          )}
          {course?.lessons != null && course.lessons !== "" && (
            <span className={THUMB_PILL}>{course.lessons} Lessons</span>
          )}
          {course?.duration && <span className={THUMB_PILL}>{course.duration}</span>}
          {course?.reviews != null && course.reviews !== "" && (
            <span className={THUMB_PILL}>{course.reviews} Reviews</span>
          )}
        </div>
      </Link>

      <div className="flex items-center justify-between gap-2 mt-3.5">
        <h3 className="m-0 min-w-0 flex-1 truncate text-lg font-semibold leading-[1.3] tracking-[-.01em]">
          <Link to={to} className={`after:absolute after:inset-0 after:content-[''] ${FV}`}>
            {course?.title}
          </Link>
        </h3>
        {course?.rating != null && course.rating !== "" && (
          <span className="inline-flex items-center gap-1 text-sm text-[#8a8ea8] shrink-0">
            {course.rating}
            <Star className="w-3.5 h-3.5 fill-[#d4d4d8] text-[#d4d4d8]" aria-hidden="true" />
          </span>
        )}
      </div>

      {course?.description && (
        <p className="m-0 mt-1 text-sm text-[#5a5d80] line-clamp-2">{course.description}</p>
      )}

      {instructor?.name && (
        <span className="relative z-10 mt-2 inline-flex items-center gap-2 text-xs text-[#0033e0] self-start">
          {instructor.avatar && (
            <img
              src={instructor.avatar}
              alt=""
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span>
            by {instructor.name}
            {instructor.title && <span className="text-[#8a8ea8]"> · {instructor.title}</span>}
          </span>
        </span>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-2.5">
        {course?.category && (
          <span className="inline-flex items-center gap-1.5 bg-[#f1f2f4] text-[#5a5d80] rounded-full px-3 py-1.5 text-xs">
            <BarChart2 className="w-3.5 h-3.5" aria-hidden="true" />
            {course.category}
          </span>
        )}
        {course?.students != null && course.students !== "" && (
          <span className="flex items-center">
            {AV_COLORS.map((color, n) => (
              <i
                key={color}
                className={`w-7 h-7 rounded-full border-2 border-white ${n === 0 ? "ml-0" : "-ml-2"}`}
                style={{ background: color }}
              />
            ))}
            <em className="not-italic font-semibold text-[11px] bg-[#c8ff00] text-[#14163b] rounded-full px-2 py-1.5 -ml-2">
              {course.students}
            </em>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 mt-2.5">
        <div className="flex items-baseline gap-1">
          <b className="text-xl font-bold text-[#0033e0]">${course?.price}</b>
          {course?.oprice && (
            <span className="text-xs text-[#8a8ea8] line-through">${course.oprice}</span>
          )}
          <span className="text-[11px] text-[#5a5d80]">/lifetime</span>
        </div>
        <Link
          to={to}
          className={`relative z-10 inline-block rounded-full px-4 py-2 text-[13px] font-semibold bg-[#c8ff00] text-[#14163b] ${FV}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://backend-olp.vercel.app/allCourses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const id = "bytespace-poppins";
    if (document.getElementById(id)) return;

    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";

    const stylesheet = document.createElement("link");
    stylesheet.id = id;
    stylesheet.rel = "stylesheet";
    stylesheet.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";

    document.head.append(preconnect, stylesheet);
  }, []);

  const uniqueCategories = useMemo(
    () => [...new Set(courses.map((course) => course?.category).filter(Boolean))],
    [courses]
  );

  const handleSelectCategory = (category) => {
    setSelectCategory(category);
    setPage(1);
  };

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchCat = selectCategory ? course?.category === selectCategory : true;
      const matchQuery = q ? (course?.title || "").toLowerCase().includes(q) : true;
      return matchCat && matchQuery;
    });
  }, [selectCategory, query, courses]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedCourses = filteredCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const categoryPills = ["", ...uniqueCategories];

  return (
    <div className="min-h-screen bg-white text-[#14163b] text-base font-normal leading-[1.6] font-[Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif] pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className={`${GRID} text-white text-center`}>
        <div className="pt-12.5 pb-18 max-[860px]:pt-6 max-[860px]:pb-12">
          <div className={WRAP}>
            <h1 className="m-0 mb-8 font-semibold leading-[1.15] tracking-[-.01em] text-[clamp(26px,2.3vw,34px)]">
              Find Your Next Course
            </h1>
            <form
              className="flex gap-4 justify-center flex-wrap"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="flex items-center gap-2.5 bg-white rounded-full px-6 h-13 w-[min(460px,100%)] text-[#8a8ea8]">
                <Search className="w-4.5 h-4.5 shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  className="flex-1 min-w-0 border-0 bg-transparent text-[#14163b] text-[15px] h-full outline-none placeholder:text-[#8a8ea8]"
                />
              </label>
              <button
                type="submit"
                className={`${BTN_ACC} inline-flex items-center gap-2 h-13 px-7 font-medium`}
              >
                Courses
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <main className="pt-18 pb-18 max-[860px]:pt-10 max-[860px]:pb-14">
        <div className={WRAP}>
          <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
            <div className="flex flex-wrap gap-4">
              <button type="button" className={OUTLINE_CHIP}>
                <Filter className="w-4 h-4" aria-hidden="true" />
                Filter
              </button>
              <button type="button" className={OUTLINE_CHIP}>
                <BarChart2 className="w-4 h-4" aria-hidden="true" />
                Level
              </button>
              <button type="button" className={OUTLINE_CHIP}>
                <Shapes className="w-4 h-4" aria-hidden="true" />
                Category
              </button>
            </div>
            <button type="button" className={OUTLINE_CHIP}>
              <ListFilter className="w-4 h-4" aria-hidden="true" />
              Most relevant
            </button>
          </div>

          <div
            role="group"
            aria-label="Filter by category"
            className="flex flex-wrap gap-x-4.5 gap-y-3 mb-16 max-[860px]:mb-8"
          >
            {categoryPills.map((c) => {
              const active = selectCategory === c;
              return (
                <button
                  key={c || "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleSelectCategory(c)}
                  className={`border-0 rounded-full px-4 py-3 text-sm font-medium cursor-pointer ${FV} ${
                    active ? "bg-[#c8ff00] text-[#14163b]" : "bg-[#f1f2f4] text-[#333]"
                  }`}
                >
                  {c || "All"}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#5a5d80]">
              <Loader className="w-12 h-12 text-[#0033e0] animate-spin mb-4" aria-hidden="true" />
              <p className="m-0 text-base">Loading courses...</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-10 max-[860px]:gap-6">
                {pagedCourses.map((course, index) => (
                  <CourseCard
                    key={course?._id || course?.id || index}
                    course={course}
                    i={(currentPage - 1) * PAGE_SIZE + index}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="flex justify-center items-center gap-2 mt-18 max-[860px]:mt-10"
                >
                  <button
                    type="button"
                    aria-label="Previous page"
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    className={PAGE_BTN}
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPages }, (_, k) => k + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-current={currentPage === n ? "page" : undefined}
                      onClick={() => setPage(n)}
                      className={`w-8.5 h-11 border-0 bg-transparent text-sm font-semibold cursor-pointer ${FV} ${
                        currentPage === n ? "text-[#b5b5b5]" : "text-[#14163b]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label="Next page"
                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                    className={PAGE_BTN}
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="m-0 text-[#5a5d80] text-lg">No courses available at the moment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllCourses;