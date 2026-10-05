import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  Github,
  Globe,
  Linkedin,
  Play,
  Shield,
  Star,
  Target,
  Trophy,
  Twitter,
  Users,
  Zap,
  TrendingUp, 
  Check
} from "lucide-react";

const API = "https://backend-olp.vercel.app";

const ROUTES = {
  allCourses: "/allCourses",
  courseDetails: (id) => `/viewDetails/${id}`,
  applyToTeach: "https://www.gmail.com/",
};

const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0033e0] focus-visible:outline-offset-[3px]";
const WRAP = "max-w-[1160px] mx-auto px-5";
const BTN_ACC = `inline-flex items-center gap-2 border-0 rounded-full px-6 py-3 font-bold text-[15px] cursor-pointer bg-[#c8ff00] text-[#14163b] ${FV}`;
const BTN_GHOST = `inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-[15px] cursor-pointer border-[1.5px] border-white/40 bg-white/10 text-white ${FV}`;
const GRID =
  "bg-[#0033e0] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const H2 = "m-0 font-bold leading-[1.1] tracking-[-.02em] text-[clamp(28px,4vw,42px)]";
const CTR_P = "mt-4 mx-auto text-[#5a5d80] max-w-[70ch]";
const SECTION = "py-20 max-[860px]:py-14";
const MINI =
  "absolute bg-white text-[#14163b] rounded-2xl px-[18px] py-[14px] text-left shadow-[0_10px_30px_-12px_rgba(0,0,0,.35)]";
const MINI_SMALL = "block text-xs text-[#8a8ea8]";
const SHAPE = "absolute z-[1]";
const THUMB_PILL = "relative bg-white/85 text-[#14163b] text-[11px] px-2 py-[3px] rounded-full";
const TRIANGLE = "[clip-path:polygon(45%_0,100%_88%,0_100%)]";
const BLOB = "rounded-[50px_50px_100px_100px]";
const SPLIT = "grid grid-cols-2 max-[860px]:grid-cols-1 gap-14 max-[860px]:gap-7 items-center";
const VISUAL =
  "relative min-h-[340px] rounded-3xl overflow-hidden bg-[linear-gradient(135deg,#dfe6ff,#f4ffc9)]";

const avatar = (n, size = 120) => `https://i.pravatar.cc/${size}?img=${n}`;

const grads = [
  "#7aa2ff,#ffd08a",
  "#c9ccd6,#eef0f6",
  "#0b1d3a,#1c6b8a",
  "#20242e,#aab2c5",
  "#f4f6ff,#5fd39b",
  "#ffb3c7,#ffe08a",
];

const growthStats = [
  ["12K", "Students"],
  ["70+", "Courses"],
  ["16", "Creators"],
];

const partners = [
  { name: "Google", slug: "google" },
  { name: "Figma", slug: "figma" },
  { name: "Spotify", slug: "spotify" },
  { name: "Airbnb", slug: "airbnb" },
  { name: "Stripe", slug: "stripe" },
];

const features = [
  { Icon: Award, title: "Industry-Certified", description: "Gain recognized certifications from top institutions" },
  { Icon: Users, title: "Expert Instructors", description: "Learn from industry veterans with real-world experience" },
  { Icon: Clock, title: "Flexible Learning", description: "Study at your own pace with lifetime access" },
  { Icon: Shield, title: "Money-Back Guarantee", description: "100% satisfaction or your money back" },
  { Icon: Zap, title: "Cutting-Edge Content", description: "Latest industry trends and technologies" },
  { Icon: Trophy, title: "Career Support", description: "Personalized guidance and job network access" },
  { Icon: Target, title: "Project-Based", description: "Build real-world projects for your portfolio" },
  { Icon: Globe, title: "Global Community", description: "Join 50,000+ learners worldwide" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
  { label: "X", href: "https://www.x.com/", Icon: Twitter },
  { label: "GitHub", href: "https://www.github.com/", Icon: Github },
];

const quotes = [
  {
    avatar: avatar(5),
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    text: "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    avatar: avatar(13),
    name: "James L.",
    role: "Lifelong Learner",
    text: "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    avatar: avatar(25),
    name: "Alex B.",
    role: "Inspired Creator",
    text: "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
  },
];

const perks = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

function useFetch(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    axios
      .get(`${API}${path}`)
      .then((res) => !cancelled && setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading };
}

function SectionHeader({ title, description }) {
  return (
    <div className="text-center">
      <h2 className={H2}>{title}</h2>
      <p className={CTR_P}>{description}</p>
    </div>
  );
}

function Avatars({ from, count, extra }) {
  return (
    <span className="flex items-center mt-1.5">
      {Array.from({ length: count }, (_, i) => (
        <img
          key={i}
          src={avatar(from + i, 60)}
          alt=""
          loading="lazy"
          className={`w-[26px] h-[26px] rounded-full border-2 border-white object-cover bg-[#e4e4e4] ${
            i === 0 ? "ml-0" : "-ml-2"
          }`}
        />
      ))}
      <em className="not-italic font-semibold text-xs bg-[#c8ff00] rounded-full px-2 py-1 -ml-2">
        {extra}
      </em>
    </span>
  );
}

function Portrait({ src, className }) {
  return (
    <img
      src={src}
      alt=""
      className={`absolute left-1/2 bottom-0 rounded-t-full object-cover bg-[#0a2bb0] ${className}`}
    />
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 rounded-lg bg-[#eaeaf2] overflow-hidden">
      <i className="block h-full bg-[#c8ff00]" style={{ width: `${value}%` }} />
    </div>
  );
}
function CourseCard({ course, i }) {
  const to = ROUTES.courseDetails(course._id);
  const instructor = course.instructor;
  const hasDiscount = course.oprice && Number(course.oprice) > Number(course.price);

  return (
    <article className="relative bg-white border border-[#dfe1f5] rounded-[18px] overflow-hidden flex flex-col">
      <Link to={to} tabIndex={-1} aria-hidden="true" className="block">
        <div
          className="relative h-[170px] flex items-end justify-between gap-1.5 p-3.5"
          style={{ background: `linear-gradient(135deg,${grads[i % grads.length]})` }}
        >
          {course.imageURL && (
            <img
              src={course.imageURL}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {course.courseType && (
            <span className="absolute top-3 right-3 z-[1] inline-flex items-center gap-1 bg-[#c8ff00] text-[#14163b] text-[11px] font-bold px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" aria-hidden="true" />
              {course.courseType}
            </span>
          )}
          {course.lessons != null && (
            <span className={THUMB_PILL}>{course.lessons} Lessons</span>
          )}
          {course.duration && <span className={THUMB_PILL}>{course.duration}</span>}
          {course.students != null && (
            <span className={THUMB_PILL}>{course.students} Students</span>
          )}
        </div>
      </Link>

      <div className="p-[18px] flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-center gap-2">
          {course.category && (
            <span className="text-[11px] font-semibold text-[#0033e0] bg-[#eef2ff] rounded-full px-2.5 py-1 truncate">
              {course.category}
            </span>
          )}
          {course.rating != null && (
            <span className="text-sm text-[#5a5d80] inline-flex items-center gap-1 shrink-0 ml-auto">
              <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              {course.rating}
              {course.reviews != null && (
                <span className="text-xs">({course.reviews})</span>
              )}
            </span>
          )}
        </div>

        <h3 className="m-0 text-base font-bold leading-[1.3] tracking-[-.02em] line-clamp-2">
          <Link to={to} className={`after:absolute after:inset-0 after:content-[''] ${FV}`}>
            {course.title}
          </Link>
        </h3>

        {course.description && (
          <p className="m-0 text-sm text-[#5a5d80] line-clamp-2">{course.description}</p>
        )}

        {instructor?.name && (
          <div className="flex items-center gap-2 mt-1">
            {instructor.avatar && (
              <img
                src={instructor.avatar}
                alt=""
                loading="lazy"
                className="w-8 h-8 rounded-full object-cover bg-[#e4e4e4]"
              />
            )}
            <div className="min-w-0 leading-tight">
              <p className="m-0 text-xs font-semibold truncate">{instructor.name}</p>
              {instructor.title && (
                <p className="m-0 text-[11px] text-[#5a5d80] truncate">{instructor.title}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <b className="text-lg font-extrabold">${course.price ?? 0}</b>
          {hasDiscount && (
            <span className="text-xs text-[#8a8ea8] line-through">${course.oprice}</span>
          )}
          <span className="text-[11px] text-[#5a5d80]">/lifetime</span>
        </div>
      </div>
    </article>
  );
}

function PopularCourses() {
  const { data: courses, loading } = useFetch("/course/popular");
  const [active, setActive] = useState("Featured");

  const categories = useMemo(
    () => ["Featured", ...new Set(courses.map((c) => c.category).filter(Boolean))],
    [courses]
  );

  const visible = useMemo(
    () =>
      (active === "Featured" ? courses : courses.filter((c) => c.category === active)).slice(0, 6),
    [courses, active]
  );

  return (
    <section id="courses" className={SECTION}>
      <div className={WRAP}>
        <SectionHeader
          title="Popular Courses"
          description="Discover our most sought-after courses, handpicked by industry experts and loved by thousands of students worldwide"
        />

        {categories.length > 1 && (
          <div
            role="group"
            aria-label="Filter by category"
            className="flex flex-wrap gap-2.5 justify-center mx-auto my-8 max-w-[900px]"
          >
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={active === c}
                onClick={() => setActive(c)}
                className={`border-0 rounded-full px-4 py-2 text-sm font-medium cursor-pointer ${FV} ${
                  active === c ? "bg-[#c8ff00] text-[#14163b]" : "bg-[#f1f2f4] text-[#333]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-[#5a5d80] mt-10">Loading courses...</p>
        ) : visible.length === 0 ? (
          <p className="text-center text-[#5a5d80] mt-10">No courses found.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 mt-10">
            {visible.map((course, i) => (
              <CourseCard key={course._id} course={course} i={i} />
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <p className="m-0 mb-4 text-[#5a5d80]">Can't find what you're looking for?</p>
          <Link to={ROUTES.allCourses} className={BTN_ACC}>
            View All Courses
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProfessionalGrowth() {
  return (
    <section
      id="growth"
      className={`${SECTION} bg-[#eef2ff] bg-[radial-gradient(circle_at_15%_0,rgba(200,255,0,.4),transparent_45%),radial-gradient(circle_at_10%_60%,rgba(120,120,255,.2),transparent_40%)]`}
    >
      <div className={WRAP}>
        <div className={`${SPLIT} mb-16`}>
          <div>
            <h2 className={H2}>Your Path to Professional Growth Starts Here!</h2>
            <p className="text-[#5a5d80] mt-5 text-[15px]">
              Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely, we have the resources you need.
            </p>
            <div className="flex gap-10 mt-7">
              {growthStats.map(([value, label]) => (
                <div key={label}>
                  <b className="block font-semibold text-[28px] leading-[1.1] text-[#0033e0]">
                    {value}
                  </b>
                  <span className="text-sm text-[#5a5d80]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={VISUAL}>
            <div className="absolute left-1/2 top-[60px] w-[380px] h-[380px] -ml-[190px] rounded-full bg-[#c8ff00]" />
            <Portrait src={avatar(47, 500)} className="w-[190px] h-[200px] -ml-[95px]" />
            <div className={`${MINI} left-4 top-5`}>
              <b className="font-medium">Learn at Your Own Pace</b>
              <small className={MINI_SMALL}>Lifetime access to every course</small>
            </div>
            <div className={`${MINI} right-4 bottom-6`}>
              <b className="font-medium">Active Learners</b>
              <Avatars from={9} count={4} extra="2K+" />
            </div>
          </div>
        </div>

        <div className={SPLIT}>
          <div className={VISUAL}>
            <div className="absolute left-1/2 top-[60px] w-[380px] h-[380px] -ml-[190px] rounded-full bg-[#c8ff00]" />
            <Portrait src={avatar(15, 500)} className="w-[190px] h-[200px] -ml-[95px]" />
            <div className={`${MINI} left-4 top-6 !bg-[#0033e0] !text-white`}>
              <b className="font-medium">Earn From Your Courses</b>
              <small className="block text-xs text-[#cfd8ff]">Monetize your expertise</small>
            </div>
            <div className={`${MINI} right-4 bottom-5`}>
              <b className="font-medium">Happy Students</b>
              <Avatars from={6} count={4} extra="2K+" />
            </div>
          </div>

          <div>
            <h2 className={H2}>Create &amp; Manage Courses Easily.</h2>
            <p className="mt-5 text-[15px]">
              <b>ByteSpace</b> supports individuals or entities in the creation, publication, and administration of educational courses.
            </p>
            <ul className="list-none p-0 mt-[22px] mb-0 grid gap-3">
              {perks.map((perk) => (
                <li key={perk}>
                  <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-[#0033e0] text-white mr-3">
                    <Check className="w-3 h-3" aria-hidden="true" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <div className={`relative ${GRID} text-white overflow-hidden text-center pt-[72px] max-[860px]:pt-12`}>
      <span className={`${SHAPE} left-[-70px] top-[250px] w-[230px] h-[210px] rounded-[70px] bg-[#c8ff00] -rotate-[22deg] max-[860px]:opacity-90 max-[860px]:rotate-0 max-[860px]:scale-[.6]`} />
      <span className={`${SHAPE} left-[60px] top-[400px] w-[170px] h-[170px] rounded-full border-[38px] border-white [transform:scaleX(.8)_rotate(-20deg)] max-[860px]:hidden`} />
      <span className={`${SHAPE} right-[-80px] top-[230px] w-[210px] h-[280px] ${BLOB} bg-[#c8ff00] -rotate-[14deg] max-[860px]:opacity-90 max-[860px]:rotate-0 max-[860px]:scale-[.6]`} />
      <span className={`${SHAPE} right-[180px] top-[450px] w-[110px] h-[120px] bg-white ${TRIANGLE} max-[860px]:opacity-90 max-[860px]:scale-[.6]`} />
      <span className={`${SHAPE} right-[-10px] bottom-[-30px] w-[150px] h-20 rounded-[40px] bg-white -rotate-[10deg]`} />

      <div className={`${WRAP} relative z-[2]`}>
        <h1 className="m-0 mx-auto max-w-[12em] font-semibold leading-[1.1] tracking-[-.02em] text-[clamp(36px,6.2vw,76px)]">
          Elevate Your Future Today
        </h1>
        <p className="text-[17px] mt-[30px] mb-10 mx-auto max-w-[60ch] text-white/[.92]">
          Experience world-class education with cutting-edge courses designed by industry experts. Transform your career with luxury learning.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to={ROUTES.allCourses} className={BTN_ACC}>
            Explore Courses
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <button type="button" className={BTN_GHOST}>
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            Watch Demo
          </button>
        </div>

        <div className="relative h-[300px] max-[860px]:h-[280px] max-w-[900px] mx-auto mt-14">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-10 w-[760px] h-[760px] -ml-[380px] max-[860px]:w-[520px] max-[860px]:h-[520px] max-[860px]:-ml-[260px] rounded-full bg-[#c8ff00]"
          />
          <img
            src={avatar(32, 500)}
            alt=""
            className="absolute left-1/2 bottom-0 rounded-t-full object-cover bg-[#0a2bb0] w-[250px] h-[260px] -ml-[125px] max-[860px]:w-[180px] max-[860px]:h-[187px] max-[860px]:-ml-[90px]"
          />
          <div className={`${MINI} left-0 top-20 max-[860px]:top-2.5`}>
            <b className="font-medium">200+ Premium Courses</b>
            <small className={MINI_SMALL}>Designed by industry experts</small>
          </div>
          <div className={`${MINI} left-10 bottom-5`}>
            <b className="font-medium">Active Students</b>
            <Avatars from={1} count={5} extra="50K+" />
          </div>
          <div className={`${MINI} right-0 top-[100px] w-[210px] max-[860px]:top-20 max-[860px]:w-40`}>
            <small className="block text-[13px] text-[#14163b]">Success Rate</small>
            <b className="block font-semibold text-[44px] max-[860px]:text-[32px] leading-[1.1] mt-1.5 mb-2">
              98%
            </b>
            <ProgressBar value={98} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnerLogos() {
  return (
    <div aria-label="Partners" className="bg-[#f1f2f4] py-11 text-[#555]">
      <div className={`${WRAP} flex justify-between max-[860px]:justify-center items-center gap-x-8 gap-y-5 flex-wrap font-bold text-xl leading-[1.1]`}>
        {partners.map(({ name, slug }) => (
          <span key={slug} className="inline-flex items-center gap-2">
            <img
              src={`https://cdn.simpleicons.org/${slug}/555555`}
              alt=""
              loading="lazy"
              className="w-[26px] h-[26px]"
            />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}


function WhyChooseUs() {
  return (
    <section className="py-20 max-[860px]:pb-14">
      <div className={WRAP}>
        <SectionHeader
          title="Why Choose Nexus Premium"
          description="Experience the difference that premium education makes in your career trajectory"
        />
        <div className="grid grid-cols-4 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1 gap-4 mt-10">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="border border-[#dfe1f5] bg-white rounded-2xl px-5 py-6 text-center"
            >
              <i className="grid place-items-center w-12 h-12 mx-auto mb-4 rounded-full bg-[#c8ff00] text-[#14163b]">
                <Icon className="w-[22px] h-[22px]" aria-hidden="true" />
              </i>
              <h3 className="m-0 mb-2 text-[17px] font-semibold leading-[1.2]">{title}</h3>
              <p className="m-0 text-sm leading-[1.6] text-[#5a5d80]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstructorCard({ item }) {
  const stats = [
    { Icon: Users, value: item.students, label: "Students" },
    { Icon: BookOpen, value: item.lessons, label: "Lessons" },
    { Icon: Award, value: item.reviews, label: "Reviews" },
  ];

  return (
    <article className="group bg-white border border-[#dfe1f5] rounded-[18px] overflow-hidden flex flex-col">
      <div className="relative h-[240px] bg-[#e4e4e4] overflow-hidden">
        {item.instructor?.avatar && (
          <img
            src={item.instructor.avatar}
            alt={item.instructor.name ?? "Instructor"}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white text-[#14163b] rounded-full px-3 py-1 text-sm font-semibold">
          <Star className="w-3.5 h-3.5 fill-[#0033e0] text-[#0033e0]" aria-hidden="true" />
          {item.rating}
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={`w-10 h-10 grid place-items-center rounded-full bg-white text-[#14163b] hover:bg-[#c8ff00] transition-colors ${FV}`}
            >
              <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="m-0 text-lg font-bold leading-[1.2] tracking-[-.01em]">
          {item.instructor?.name}
        </h3>
        <p className="m-0 mt-1 mb-4 text-sm text-[#0033e0]">{item.instructor?.title}</p>
        <div className="grid grid-cols-3 gap-3 mt-auto pt-4 border-t border-[#dfe1f5] text-center">
          {stats.map(({ Icon, value, label }) => (
            <div key={label}>
              <Icon className="w-4 h-4 mx-auto text-[#0033e0]" aria-hidden="true" />
              <div className="text-base font-bold">{value}</div>
              <div className="text-xs text-[#5a5d80]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function TopInstructors() {
  const { data, loading } = useFetch("/topInstructors");

  const top = useMemo(
    () => [...data].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 8),
    [data]
  );

  return (
    <section
      id="creators"
      className={`${SECTION} bg-[#eef2ff] bg-[radial-gradient(circle_at_15%_0,rgba(200,255,0,.4),transparent_45%),radial-gradient(circle_at_10%_60%,rgba(120,120,255,.2),transparent_40%)]`}
    >
      <div className={WRAP}>
        <SectionHeader
          title="Top Instructors"
          description="Learn from world-class educators who have trained thousands and shaped the future of their industries"
        />

        {loading ? (
          <p className="text-center text-[#5a5d80] mt-10">Loading instructors...</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 mt-10">
            {top.map((item) => (
              <InstructorCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BecomeInstructor() {
  return (
    <section className={`relative overflow-hidden ${GRID} text-white text-center py-24`}>
      <span className={`${SHAPE} left-[-90px] top-[-20px] w-[230px] h-[210px] rounded-[70px] bg-[#c8ff00] -rotate-[40deg] scale-[.8]`} />
      <span className={`${SHAPE} right-[-60px] bottom-[-70px] w-[210px] h-[280px] ${BLOB} bg-white rotate-[20deg] scale-[.7]`} />
      <span className={`${SHAPE} right-[24%] top-5 w-[110px] h-[120px] bg-[#c8ff00] ${TRIANGLE}`} />
      <div className={`${WRAP} relative z-[2]`}>
        <h2 className={`${H2} max-w-[14em] mx-auto mb-5`}>Want to Become an Instructor?</h2>
        <p className="max-w-[76ch] mx-auto mb-8 text-white/90 text-[15px]">
          Join our elite community of educators and share your expertise with students around the globe
        </p>
        <a href={ROUTES.applyToTeach} className={BTN_ACC}>
          Apply to Teach
        </a>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className={`${SECTION} bg-[linear-gradient(180deg,rgba(200,255,0,.28),transparent_40%)]`}>
      <div className={WRAP}>
        <div className={`${SPLIT} mb-12`}>
          <h2 className={H2}>Discover What Our Community Is Saying</h2>
          <p className="text-[#5a5d80] text-[15px]">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly from those who have experienced the transformative journey of learning and creating on our platform. Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>
        <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-6">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="m-0 bg-white border border-[#dfe1f5] rounded-[18px] p-[26px] flex flex-col gap-4 shadow-[0_20px_40px_-28px_rgba(0,30,120,.4)]"
            >
              <img
                src={q.avatar}
                alt={q.name}
                loading="lazy"
                className="w-14 h-14 rounded-full object-cover bg-[#e4e4e4]"
              />
              <div>
                <b className="font-bold">{q.name}</b>
                <small className="block text-[13.33px] text-[#0033e0]">{q.role}</small>
              </div>
              <blockquote className="m-0 text-[#5a5d80] text-sm">“{q.text}”</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
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

  return (
    <div
      id="top"
      className="min-h-screen bg-white text-[#14163b] text-base font-normal leading-[1.6] font-[family-name:Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif] [padding-top:env(safe-area-inset-top,0px)] [padding-bottom:env(safe-area-inset-bottom,0px)]"
    >
      <main>
        <Hero />
        <PartnerLogos />
        <PopularCourses />
        <ProfessionalGrowth />
        <WhyChooseUs />
        <TopInstructors />
        <BecomeInstructor />
        <Testimonials />
      </main>
    </div>
  );
}