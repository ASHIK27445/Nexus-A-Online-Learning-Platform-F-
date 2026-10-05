import { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Share2,
  Star,
  Users,
  BarChart2,
  Play,
  Video,
  Newspaper,
  Contact,
  Headset,
  Check,
  X,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";

const API = "https://backend-olp.vercel.app";

const GRID =
  "bg-[#6D28D9] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#6D28D9] focus-visible:outline-offset-[3px]";
const WRAP = "max-w-[1160px] mx-auto px-5";
const TWO_COL =
  "grid grid-cols-[1.75fr_1fr] max-[860px]:grid-cols-1 gap-14 max-[860px]:gap-8";
const BTN_ACC = `inline-block border-0 rounded-full px-6 py-3 font-semibold text-[15px] cursor-pointer bg-[#c8ff00] text-[#14163b] ${FV}`;
const HERO_PILL =
  "inline-flex items-center gap-2 bg-white text-[#14163b] rounded-full px-[18px] py-2.5 text-sm";
const H3 = "m-0 mb-3 text-lg font-medium leading-[1.15] text-[#14163b]";
const P = "m-0 mb-4 text-[15px] leading-[1.7] text-[#5a5d80] max-w-[80ch]";

const VIDEO_SRC = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const VIDEO_POSTER = "https://picsum.photos/seed/bytespace-player/1200/800";

const tabs = [
  { id: "about", label: "About" },
  { id: "lesson", label: "Lesson" },
  { id: "reviews", label: "Reviews" },
];

const sideLessons = [
  ["01", "Introduction to Digital Assets", "12 mins"],
  ["02", "Design Principles for Impacts", "21 mins"],
  ["03", "Advanced Techniques in Digital Creation", "16 mins"],
];

const includes = [
  { label: "Learning Resources", Icon: Newspaper },
  { label: "Quality Lesson Videos", Icon: Video },
  { label: "Certificate of Completion", Icon: Contact },
  { label: "Private Consultation", Icon: Headset },
];

const sneak = [1, 2, 3, 4].map((n) => `https://picsum.photos/seed/bytespace-sneak-${n}/480/360`);

const keys = [
  "Foundational Concepts",
  "Design Principles Mastery",
  "Advanced Techniques in Digital Creation",
  "Project Showcase and Critique",
  "Optimizing for Various Platforms",
  "Digital Asset Management Best Practices",
  "Monetization Strategies",
  "Capstone Project: Building Your Portfolio",
];

const modules = [
  [
    "Module 1: Introduction to Digital Assets",
    "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
  ],
  [
    "Module 2: Design Principles for Impact",
    "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
  ],
  [
    "Module 4: User-Centric Design Strategies",
    "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
  ],
  [
    "Module 5: Interactive Media and Engagement",
    "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
  ],
  [
    "Module 6: Project Showcase and Critique",
    "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
  ],
  [
    "Module 7: Optimizing Digital Assets for Various Platforms",
    "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
  ],
];

const ratings = [
  { width: 93, count: 720 },
  { width: 37, count: 120 },
  { width: 9, count: 21 },
  { width: 5, count: 12 },
  { width: 5, count: 16 },
];

const reviews = [
  {
    name: "PurePearl Studio",
    avatar: "https://i.pravatar.cc/120?img=12",
    text: "The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
  },
  {
    name: "Albert Flores",
    avatar: "https://i.pravatar.cc/120?img=15",
    text: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
  },
  {
    name: "Cody Fisher",
    avatar: "https://i.pravatar.cc/120?img=33",
    text: "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
  },
  {
    name: "Brooklyn Simmons",
    avatar: "https://i.pravatar.cc/120?img=47",
    text: "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
  },
];

function Avatar({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`rounded-full object-cover bg-[#e4e4e4] shrink-0 ${className}`}
    />
  );
}

function Stars({ className = "", value = 5 }) {
  return (
    <span className={`flex gap-1 text-[#444] ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(value) ? "fill-current" : "opacity-30"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`border-0 rounded-full px-4 py-2 text-sm font-medium cursor-pointer inline-flex items-center gap-1.5 ${FV} ${
        active ? "bg-[#c8ff00] text-[#14163b]" : "bg-[#f1f2f4] text-[#333]"
      }`}
    >
      {children}
    </button>
  );
}

function VideoPlayer({ poster }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    videoRef.current?.play();
  };

  return (
    <div className="relative rounded-[22px] overflow-hidden bg-[#e4e4e4] aspect-[3/2]">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={poster || VIDEO_POSTER}
        controls={started}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      {!started && (
        <button
          type="button"
          aria-label="Play video"
          onClick={start}
          className={`absolute inset-0 m-auto w-[58px] h-[58px] rounded-full bg-white/85 text-[#7a5f52] grid place-items-center border-0 cursor-pointer ${FV}`}
        >
          <Play className="w-6 h-6 fill-current ml-0.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function AboutTab({ course }) {
  const features = Array.isArray(course?.features) ? course.features : [];

  return (
    <div>
      <h3 className={H3}>Description</h3>
      {course?.description && <p className={P}>{course.description}</p>}
      <p className={P}>
        Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "Build Digital Assets: A Comprehensive Guide." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.
      </p>
      <p className={P}>
        In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.
      </p>
      <p className={P}>
        As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.
      </p>

      {features.length > 0 && (
        <>
          <h3 className={`${H3} mt-8`}>What's Included</h3>
          <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-3 mb-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 border border-[#dfe1f5] rounded-2xl p-4"
              >
                <span className="grid place-items-center w-8 h-8 rounded-full bg-[#c8ff00] text-[#14163b] shrink-0">
                  <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <b className="block text-[15px] font-medium leading-[1.4]">{feature?.title}</b>
                  {feature?.description && (
                    <span className="text-sm text-[#5a5d80]">{feature.description}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className={`${H3} mt-8`}>Sneak Peak</h3>
      <div className="grid grid-cols-4 max-[860px]:grid-cols-2 gap-3 mb-8">
        {sneak.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Course preview ${i + 1}`}
            loading="lazy"
            className="w-full aspect-[4/3] rounded-[14px] object-cover bg-[#f1f2f4]"
          />
        ))}
      </div>

      <h3 className={H3}>Key Points</h3>
      <ul className="list-none p-0 m-0 mt-4 grid gap-3 text-[15px] text-[#5a5d80]">
        {keys.map((k) => (
          <li key={k} className="flex items-center gap-3">
            <span className="grid place-items-center w-5 h-5 rounded-full bg-[#6D28D9] text-white shrink-0">
              <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {k}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LessonTab() {
  return (
    <div>
      <h3 className={H3}>Explore the Modules</h3>
      <p className={P}>
        Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and hands-on experiences.
      </p>

      <h3 className={`${H3} mt-6`}>Lesson List</h3>
      <div className="grid gap-5 mb-6">
        {modules.map(([title, description]) => (
          <div key={title} className="flex gap-5 items-start">
            <div className="w-[72px] h-[72px] rounded-[22px] bg-[#c8ff00] grid place-items-center shrink-0 max-[860px]:w-14 max-[860px]:h-14 max-[860px]:rounded-2xl">
              <Video className="w-6 h-6 text-[#14163b]" aria-hidden="true" />
            </div>
            <div>
              <h4 className="m-0 mb-1 text-[15px] font-medium leading-[1.4]">{title}</h4>
              <p className="m-0 text-sm leading-[1.7] text-[#5a5d80]">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className={H3}>Lesson Content</h3>
      <p className={P}>
        Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements. Download resources, complete assignments, and test your understanding with quizzes.
      </p>

      <h3 className={`${H3} mt-6`}>Lesson Progress Tracking</h3>
      <p className={P}>
        Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey.
      </p>
      <div className="border border-[#dfe1f5] rounded-2xl px-5 py-4 mt-4">
        <span className="text-[13px]">Learning Progress</span>
        <b className="block text-[32px] font-semibold leading-[1.3] my-1">55%</b>
        <div className="h-2 rounded-lg bg-[#ebebeb] overflow-hidden">
          <i className="block h-full w-[55%] bg-[#c8ff00]" />
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ course }) {
  const [filter, setFilter] = useState(0);
  const avg = Number(course?.rating);

  return (
    <div>
      <h3 className={H3}>What Learners Are Saying</h3>
      <p className={P}>
        Discover what our learners have to say about their experience with 'Build Digital Assets: A Comprehensive Guide.' Read reviews and ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.
      </p>

      <div className="flex gap-10 max-[860px]:gap-6 items-center border border-[#dfe1f5] rounded-2xl p-6 mb-6 flex-wrap">
        <div className="bg-[#c8ff00] px-8 py-5 text-center text-[#14163b]">
          <span className="block text-[13px]">Ratings</span>
          <b className="block text-[32px] font-bold leading-[1.2]">
            {Number.isFinite(avg) && avg > 0 ? avg : "4.7"}
          </b>
        </div>
        <div className="flex-1 grid gap-2 min-w-[220px]">
          {ratings.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center text-[13px] text-[#5a5d80]"
            >
              <div className="h-[7px] rounded bg-[#e8e8e8] overflow-hidden">
                <i className="block h-full bg-[#c8ff00] rounded" style={{ width: `${r.width}%` }} />
              </div>
              <Stars value={5 - i} />
              <span className="w-8 text-right">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className={H3}>Individual Reviews:</h3>
      <div className="flex flex-wrap gap-2.5 mt-3 mb-5">
        <FilterChip active={filter === 0} onClick={() => setFilter(0)}>
          All rating
        </FilterChip>
        {[5, 4, 3, 2, 1].map((n) => (
          <FilterChip key={n} active={filter === n} onClick={() => setFilter(n)}>
            <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            {n}
          </FilterChip>
        ))}
      </div>

      {reviews.map((r) => (
        <div key={r.name} className="border border-[#dfe1f5] rounded-2xl p-[26px] mb-4">
          <div className="flex justify-between items-center gap-2.5">
            <div className="flex gap-3 items-center">
              <Avatar src={r.avatar} alt={r.name} className="w-11 h-11" />
              <div>
                <b className="block font-medium leading-[1.4]">{r.name}</b>
                <span className="text-[13px] text-[#5a5d80]">UI/UX Designer</span>
              </div>
            </div>
            <span className="text-[13px] text-[#5a5d80]">a year ago</span>
          </div>
          <Stars className="my-4" />
          <p className="m-0 text-sm leading-[1.7] text-[#5a5d80]">{r.text}</p>
        </div>
      ))}
    </div>
  );
}

function EnrollToast({ onClose }) {
  return (
    <div role="status" className="fixed top-6 right-6 max-[560px]:left-4 max-[560px]:right-4 z-50 animate-[bsSlideIn_.5s_ease-out_forwards]">
      <div className="bg-[#6D28D9] text-white px-5 py-4 rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,30,120,.6)] flex items-center gap-4 border border-white/20">
        <span className="grid place-items-center w-11 h-11 rounded-full bg-[#c8ff00] text-[#14163b] shrink-0">
          <Check className="w-5 h-5" strokeWidth={3} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h4 className="m-0 font-semibold text-base">Successfully Enrolled!</h4>
          <p className="m-0 text-sm text-white/80">You can now access this course</p>
        </div>
        <button
          type="button"
          aria-label="Close notification"
          onClick={onClose}
          className={`ml-2 rounded-lg p-1 text-white hover:bg-white/20 transition-colors ${FV}`}
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function CourseDetails() {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState("about");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
    let cancelled = false;
    setLoading(true);

    axios
      .get(`${API}/course/${id}`)
      .then((res) => !cancelled && setCourse(res.data))
      .catch((err) => console.log(err))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!user?.email || !course?._id) return;
    let cancelled = false;

    axios
      .get(`${API}/enroll/check`, { params: { email: user.email, courseID: course._id } })
      .then((res) => !cancelled && setIsEnrolled(Boolean(res.data.enrolled)))
      .catch((err) => console.log(err));

    return () => {
      cancelled = true;
    };
  }, [user?.email, course?._id]);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(t);
  }, [showToast]);

  const handleEnroll = () => {
    if (!user?.email) {
      navigate("/login");
      return;
    }
    if (isEnrolled || enrolling) return;

    setEnrolling(true);
    axios
      .post(`${API}/enroll`, { email: user.email, course })
      .then(() => {
        setIsEnrolled(true);
        setShowToast(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setEnrolling(false));
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: course?.title ?? document.title, url: location.href });
    } else {
      navigator.clipboard?.writeText(location.href);
    }
  };

  const shell =
    "min-h-screen bg-white text-[#14163b] text-base font-normal leading-[1.6] font-[family-name:Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif] [padding-top:env(safe-area-inset-top,0px)] [padding-bottom:env(safe-area-inset-bottom,0px)]";

  if (loading) {
    return (
      <div className={`${shell} grid place-items-center`}>
        <p className="text-[#5a5d80]">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={`${shell} grid place-items-center`}>
        <div className="text-center">
          <p className="text-[#5a5d80] mb-4">Course not found.</p>
          <Link to="/allCourses" className={BTN_ACC}>
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  const instructor = course.instructor;
  const price = Number(course.price) || 0;
  const oprice = Number(course.oprice) || 0;
  const hasDiscount = oprice > price;
  const discount = hasDiscount ? Math.round(((oprice - price) / oprice) * 100) : 0;
  const lessons = Number(course.lessons) || 0;
  const moreVideos = Math.max(lessons - sideLessons.length, 0);

  return (
    <div className={shell}>
      <style>{`
        @keyframes bsSlideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {showToast && <EnrollToast onClose={() => setShowToast(false)} />}

      <div className={`${GRID} text-white`}>
        <div className="pt-14 max-[860px]:pt-8 pb-14">
          <div className={WRAP}>
            <div className="flex justify-between items-start gap-5 flex-wrap">
              <div className="min-w-0">
                <h1 className="m-0 font-semibold leading-[1.15] tracking-[-.01em] text-[clamp(26px,3.6vw,38px)]">
                  {course.title}
                </h1>
                {course.category && (
                  <p className="mt-2 text-[20px] max-[860px]:text-[17px] font-semibold leading-[1.3]">
                    {course.category}
                  </p>
                )}
                {instructor?.name && (
                  <p className="mt-5 text-[15px]">
                    by{" "}
                    <Link to="/creator-profile" className={`text-[#c8ff00] ${FV}`}>
                      {instructor.name}
                    </Link>
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={share}
                className={`${BTN_ACC} inline-flex items-center gap-2`}
              >
                <Share2 className="w-4 h-4" aria-hidden="true" />
                Share
              </button>
            </div>

            <div className="flex gap-3 flex-wrap mt-6">
              {course.courseType && (
                <span className={HERO_PILL}>
                  <TrendingUp className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
                  {course.courseType}
                </span>
              )}
              {course.rating != null && (
                <span className={HERO_PILL}>
                  <Star className="w-4 h-4 text-[#6D28D9] fill-current" aria-hidden="true" />
                  {course.rating}
                  {course.reviews != null && ` (${course.reviews} reviews)`}
                </span>
              )}
              {course.students != null && (
                <span className={HERO_PILL}>
                  <Users className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
                  {course.students} Students
                </span>
              )}
              {course.duration && (
                <span className={HERO_PILL}>
                  <BarChart2 className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
                  {course.duration}
                </span>
              )}
            </div>

            <div className={`${TWO_COL} items-start mt-14 max-[860px]:mt-8`}>
              <VideoPlayer poster={course.imageURL} />

              <aside className="relative z-10 min-[861px]:-mb-[600px] bg-white text-[#14163b] border border-[#dfe1f5] rounded-[20px] p-8 max-[860px]:p-6">
                <h3 className="m-0 mb-4 text-xl font-medium leading-[1.2]">
                  {lessons} Lessons{course.duration ? ` (${course.duration})` : ""}
                </h3>
                {sideLessons.map(([number, title, duration]) => (
                  <div key={number} className="flex items-start py-[7px] text-[15px] leading-[1.35]">
                    <span className="w-[30px] shrink-0">{number}</span>
                    <span className="w-[190px] max-w-full">{title}</span>
                    <span className="ml-auto pl-2 text-[#6D28D9] text-sm whitespace-nowrap">
                      {duration}
                    </span>
                  </div>
                ))}
                {moreVideos > 0 && (
                  <p className="m-0 mt-1 text-sm text-[#5a5d80]">{moreVideos} more videos</p>
                )}
                <p className="m-0 mt-5 text-sm leading-[1.7] text-[#5a5d80]">
                  Ready to Dive In? Enroll Now and Start Learning Today!
                </p>

                <div className="mt-3 mb-4 flex items-baseline gap-2 flex-wrap">
                  <span className="text-4xl font-semibold leading-[1.2] text-[#6D28D9]">
                    ${price}
                  </span>
                  {hasDiscount && (
                    <span className="text-base text-[#8a8ea8] line-through">${oprice}</span>
                  )}
                  <span className="text-sm text-[#14163b]">/lifetime</span>
                  {hasDiscount && (
                    <span className="ml-auto bg-[#14163b] text-white text-xs font-bold rounded-full px-2.5 py-1">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleEnroll}
                  disabled={isEnrolled || enrolling}
                  className={`${BTN_ACC} block w-full text-center py-3 disabled:cursor-not-allowed disabled:bg-[#e4e6f0] disabled:text-[#5a5d80]`}
                >
                  {isEnrolled ? "Already Enrolled" : enrolling ? "Enrolling..." : "Enroll Now"}
                </button>

                {course.title === "JWT Token" && isEnrolled && (
                  <Link
                    to="/jwt-token"
                    className={`block w-full text-center mt-3 rounded-full px-6 py-3 font-semibold text-[15px] bg-[#6D28D9] text-white ${FV}`}
                  >
                    Explore the course
                  </Link>
                )}

                <h3 className="m-0 mt-6 mb-3 text-xl font-medium leading-[1.2]">
                  This course include
                </h3>
                <ul className="list-none p-0 m-0 grid gap-3 text-sm text-[#5a5d80]">
                  {includes.map(({ label, Icon }) => (
                    <li key={label} className="flex items-center gap-3">
                      <Icon className="w-[18px] h-[18px] text-[#6D28D9] shrink-0" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>

                {instructor?.name && (
                  <>
                    <div className="flex gap-3 items-center border-t border-[#dfe1f5] pt-4 mt-5">
                      {instructor.avatar && (
                        <Avatar src={instructor.avatar} alt={instructor.name} className="w-11 h-11" />
                      )}
                      <div className="min-w-0">
                        <b className="block font-medium leading-[1.4] truncate">{instructor.name}</b>
                        {instructor.title && (
                          <span className="text-[13px] text-[#5a5d80]">{instructor.title}</span>
                        )}
                      </div>
                    </div>
                    <Link
                      to="/creator-profile"
                      className={`inline-block mt-3 border-[1.5px] border-[#dfe1f5] rounded-full px-4 py-1.5 text-sm text-[#333] ${FV}`}
                    >
                      See Full Profile
                    </Link>
                  </>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>

      <main className="pt-14 pb-20 max-[860px]:pt-10 max-[860px]:pb-14 min-[861px]:min-h-[520px]">
        <div className={WRAP}>
          <div className={TWO_COL}>
            <div className="min-w-0">
              <div role="tablist" className="flex gap-3 mb-8">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`border-0 rounded-full px-5 py-2.5 text-[15px] cursor-pointer ${FV} ${
                      tab === t.id ? "bg-[#c8ff00] text-[#14163b]" : "bg-[#f1f2f4] text-[#333]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {tab === "about" && <AboutTab course={course} />}
              {tab === "lesson" && <LessonTab />}
              {tab === "reviews" && <ReviewsTab course={course} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}