import { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Eye, EyeOff, ShoppingCart, Star } from "lucide-react";
import { AuthContext } from "../../Auth/AuthContext";

const POP = "font-[family-name:Poppins,system-ui,sans-serif]";
const SAT = "font-[family-name:Satoshi,Poppins,system-ui,sans-serif]";
const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0033e0] focus-visible:outline-offset-[3px]";
const GRID =
  "bg-[#0033e0] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const PAD_X = "px-[clamp(20px,8.3vw,108px)]";
const LABEL = "block text-sm leading-[21px] text-[#222] mb-[5px]";
const INPUT = `block w-full h-[47px] border border-[#e4e4ec] rounded-[14px] px-[21px] text-base bg-white text-[#222] placeholder:text-[#9a9aa8] ${FV}`;
const LIME_SHADOW = "[box-shadow:inset_0_-5px_8px_rgba(110,150,0,.45),0_8px_12px_rgba(0,0,60,.25)]";

const FONTS = [
  {
    id: "bytespace-poppins",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
  },
  {
    id: "bytespace-satoshi",
    href: "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap",
  },
];

const AV = ["#f2a7c0", "#e0b48a", "#f2c14e", "#6b7a8f"];
const AV_BIG = [...AV, "#8fd3b0", "#c8a0e8", "#e8d0b0"];

const leftBars = [
  [34, 44, 90],
  [44, 70, 64],
  [54, 92, 42],
  [64, 104, 30],
  [74, 114, 20],
  [84, 120, 14],
  [94, 126, 8],
];

const rightBars = [
  [150, 60, 74],
  [160, 40, 94],
  [170, 52, 82],
  [180, 74, 60],
  [190, 96, 38],
  [200, 112, 22],
  [210, 122, 12],
];

const Pill = ({ children }) => (
  <span className="bg-[rgba(215,215,222,.78)] text-[#555] text-xs h-7 px-3 rounded-full inline-flex items-center whitespace-nowrap">
    {children}
  </span>
);

const Bars = ({ bars }) => (
  <g fill="#27b5d6">
    {bars.map(([x, y, height]) => (
      <rect key={x} x={x} y={y} width="6" height={height} />
    ))}
  </g>
);

const LevelIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="#666" aria-hidden="true">
    <rect x="1" y="8" width="3" height="5" rx=".5" />
    <rect x="5.5" y="5" width="3" height="8" rx=".5" />
    <rect x="10" y="2" width="3" height="11" rx=".5" />
  </svg>
);

const BigDataThumb = () => (
  <svg viewBox="0 0 307 175" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
    <rect width="307" height="175" fill="#f4e9ee" />
    <rect x="22" y="14" width="262" height="146" rx="6" fill="#0b0f14" />
    <Bars bars={leftBars} />
    <Bars bars={rightBars} />
    <path
      d="M30 138C90 130 120 150 170 134S250 120 276 140"
      stroke="#e85d9a"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const PlaceholderThumb = () => (
  <div className="w-full h-full bg-[linear-gradient(135deg,#c4c6cc,#d9dade)] grid place-items-center">
    <ShoppingCart className="w-14 h-14 text-white/40" />
  </div>
);

const CourseCard = ({ title, thumb, className }) => (
  <div
    className={`absolute w-84 h-86.25 bg-white text-[#14163b] rounded-4.5 shadow-[0_6px_20px_-8px_rgba(0,0,60,.25)] ${className}`}
  >
    <div className="absolute left-3.5 top-3.5 w-[calc(100%-28px)] h-43.75 rounded-xl overflow-hidden">
      {thumb}
      <div className="absolute left-2.75 bottom-2.75 flex gap-2.75">
        <Pill>17 Lessons</Pill>
        <Pill>2 hours 16 mins</Pill>
        <Pill>59 Comments</Pill>
      </div>
    </div>

    <div className="absolute left-3.5 right-3.5 top-51.75">
      <div className="flex items-center justify-between h-7">
        <h3 className={`${POP} m-0 text-[17px] font-medium leading-7 text-[#111] whitespace-nowrap`}>
          {title}
        </h3>
        <span className="inline-flex items-center gap-1 text-base text-[#6b6b7a]">
          4.5
          <Star className="w-4.5 h-4.5 fill-[#c8ff00] text-[#c8ff00]" aria-hidden="true" />
        </span>
      </div>
      <div className="text-xs leading-4.5 text-[#6b6b7a]">
        by <span className="text-[#0033e0]">purepearl studio</span>
      </div>
      <div className="flex items-center gap-2.75 mt-3.5">
        <span className="inline-flex items-center gap-2 h-7.5 px-3.5 rounded-full bg-[#f3f3f5] text-xs text-[#555]">
          <LevelIcon />
          Beginner
        </span>
        <span className="flex items-center">
          {AV.map((color, i) => (
            <i
              key={color}
              className={`w-7.5 h-7.5 rounded-full border-2 border-white ${i ? "-ml-2" : ""}`}
              style={{ background: color }}
            />
          ))}
          <em className="not-italic w-7 h-7 -ml-2 rounded-full bg-[#111] text-white text-2.75 font-semibold grid place-items-center">
            26+
          </em>
        </span>
      </div>
      <div className="mt-2.75 leading-7">
        <b className={`${POP} text-lg font-semibold text-[#0033e0]`}>$25</b>
        <span className="text-xs text-[#6b6b7a]">/lifetime</span>
      </div>
    </div>
  </div>
);

const HappyStudents = () => (
  <div className="absolute left-51 top-97.75 w-58.25 h-27.75 bg-[#c8ff00] text-[#14163b] rounded-[14px] px-3.75 pt-4 z-3">
    <div className={`${POP} text-sm leading-5`}>Happy Students</div>
    <div className="flex items-center gap-1 text-2.75 leading-4 mt-0.5">
      <b className="font-semibold">4.5</b>
      <span className="text-[#6b6b7a]">(240)</span>
      <Star className="w-2.75 h-2.75 fill-[#0033e0] text-[#0033e0]" />
    </div>
    <div className="flex items-center mt-3">
      {AV_BIG.map((color, i) => (
        <i
          key={color}
          className={`w-9 h-9 rounded-full border-2 border-[#c8ff00] ${i ? "-ml-3" : ""}`}
          style={{ background: color }}
        />
      ))}
      <em className="not-italic w-9.5 h-9.5 -ml-2.5 rounded-full bg-[#111] text-white text-xs font-semibold grid place-items-center">
        2K+
      </em>
    </div>
  </div>
);

const Collage = ({ className }) => (
  <div aria-hidden="true" className={`${className} w-111.75 h-125.5 max-[1100px]:hidden`}>
    <CourseCard title="Build Digital Asset" className="left-0 top-20" thumb={<PlaceholderThumb />} />
    <CourseCard title="the Power of Big Data" className="left-25.25 top-0" thumb={<BigDataThumb />} />

    <span
      className={`absolute left-11.75 top-9 w-22.75 h-22 rounded-full border-24 border-[#c8ff00] -rotate-25 z-3 ${LIME_SHADOW}`}
    />

    <svg viewBox="0 0 112 122" className="absolute left-0 top-94.75 w-28 h-30.5 z-3">
      <polygon points="0,88 70,0 112,112" fill="#d6ff2e" />
      <polygon points="70,0 112,112 50,120" fill="#a9de00" />
      <polygon points="0,88 50,120 112,112" fill="#bff000" />
    </svg>

    <svg viewBox="0 0 102 108" className="absolute left-86.25 top-79 w-25.5 h-27 z-4">
      <path
        d="M14 84C30 50 62 30 84 18M12 66C34 40 60 22 86 34M20 94C44 70 70 60 88 66M16 50C40 22 66 14 82 8"
        stroke="#fff"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
    </svg>

    <HappyStudents />
  </div>
);

const Loading = ({ label }) => (
  <div className={`${GRID} ${SAT} min-h-screen grid place-items-center text-white`}>
    <div className="text-center">
      <div
        role="status"
        aria-label={label}
        className="w-20 h-20 mx-auto rounded-full border-4 border-white/25 border-t-[#c8ff00] animate-spin"
      />
      <p className={`${POP} mt-6 mb-0 text-xl font-medium`}>{label}</p>
    </div>
  </div>
);

// const LogoHeader = () => (
//   <header className={`${PAD_X} h-23 flex items-center`}>
//     <Link to="/" aria-label="ByteSpace home" className={FV}>
//       <svg viewBox="0 -10 32 42" aria-hidden="true" className="w-7 block">
//         {/* crown */}
//         <path
//           d="M3 -1L2 -8L5.5 -5L8 -9L10.5 -5L14 -8L13 -1Z"
//           fill="#c8ff00"
//           stroke="#c8ff00"
//           strokeWidth="1.5"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M4 3h8v9l13 5-13 5v7H4z"
//           fill="#c8ff00"
//           stroke="#c8ff00"
//           strokeWidth="3"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </Link>
//   </header>
// );

const PasswordField = ({ id = "password", ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        required
        className={`${INPUT} pr-12`}
        {...props}
      />
      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className={`absolute right-4 top-1/2 -translate-y-1/2 border-0 bg-transparent text-[#6b6b7a] hover:text-[#222] cursor-pointer ${FV}`}
      >
        {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
};

const SOCIAL_BTN = `w-[64px] h-[65px] rounded-2xl border border-[#dcdce4] bg-transparent text-black grid place-items-center cursor-pointer ${FV}`;
const DIVIDER =
  "flex items-center gap-4.5 text-[#6b6b7a] mt-[68px] mr-[13px] leading-6 before:content-[''] before:flex-1 before:h-px before:bg-[#dcdce4] after:content-[''] after:flex-1 after:h-px after:bg-[#dcdce4]";

const Login = () => {
  const { loginUser, user, signInWithGoogle } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    FONTS.forEach(({ id, href }) => {
      if (document.getElementById(id)) return;

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.append(link);
    });
  }, []);

  const redirectBack = () => navigate(location?.state ? `${location.state}` : "/");

  const handleLogin = (e) => {
    e.preventDefault();

    if (user) {
      toast.error("User is already logged in", { autoClose: 1200 });
      return;
    }

    setLoading(true);
    loginUser(email, password)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          redirectBack();
          toast.success("Welcome back!", { autoClose: 1200 });
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error.code === "auth/invalid-credential"
            ? "Invalid email or password. Please try again."
            : error.message,
          { autoClose: 1500 }
        );
      });
  };

  const handleGoogleSignIn = () => {
    if (user) {
      toast.error("User Already Logged In!");
      return;
    }

    signInWithGoogle()
      .then(() => {
        toast.success("Welcome back");
        redirectBack();
      })
      .catch((error) => toast.error(error.message));
  };

  const handleForgetPassword = () => {
    navigate("/forgetPassword", { state: { email } });
  };

  if (loading) return <Loading label="Signing you in..." />;

  return (
    <div
      className={`${GRID} ${SAT} min-h-screen text-white text-base font-normal leading-[1.6] pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]`}
    >
      {/* <LogoHeader /> */}

      <main
        className={`${PAD_X} pt-10 pb-27 grid grid-cols-2 max-[860px]:grid-cols-1 gap-9.5 items-start`}
      >
        <div>
          <h2 className={`${POP} m-0 mb-3 text-lg font-medium leading-[1.4]`}>
            Continue Your Learning Journey
          </h2>
          <p className="m-0 text-base leading-6.5 max-w-102.5 text-white/90">
            Access your courses, track your progress, and achieve your learning goals with the Nexus premium education platform.
          </p>
          <Collage className="relative mt-19.75" />
        </div>

        <div className="bg-white text-[#222] rounded-4xl px-[clamp(24px,4.4vw,57px)] pt-14.25 pb-9 min-h-177 flex flex-col shadow-[0_8px_30px_rgba(0,0,60,.12)]">
          <form className="flex flex-col flex-1" onSubmit={handleLogin}>
            <span className="text-base leading-6 text-[#0033e0] self-start">Sign In</span>
            <h1 className={`${POP} m-0 text-[clamp(30px,3.1vw,40px)] font-semibold leading-[1.2] text-[#222]`}>
              Welcome Back
            </h1>

            <label htmlFor="email" className={`${LABEL} mt-8.25`}>
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="designer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT}
            />

            <label htmlFor="password" className={`${LABEL} mt-4.5`}>
              Password
            </label>
            <PasswordField
              autoComplete="current-password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between mt-5.5">
              <button
                type="button"
                onClick={handleForgetPassword}
                className={`border-0 bg-transparent p-0 text-sm text-[#0033e0] cursor-pointer ${FV}`}
              >
                Forgot Password?
              </button>
              <button
                type="submit"
                className={`h-10.25 w-23.5 rounded-full border-0 bg-[#c8ff00] text-[#14163b] text-base font-medium cursor-pointer ${FV}`}
              >
                Sign In
              </button>
            </div>

            <div className={DIVIDER}>or</div>

            <div className="flex gap-4 justify-center mt-9">
              <button
                type="button"
                aria-label="Continue with Google"
                onClick={handleGoogleSignIn}
                className={SOCIAL_BTN}
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>
            </div>

            <p className="m-0 mt-auto pt-7 text-center text-sm leading-5.5 text-[#6b6b7a]">
              New user?{" "}
              <Link to="/register" className={`text-[#0033e0] ${FV}`}>
                Register here
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;