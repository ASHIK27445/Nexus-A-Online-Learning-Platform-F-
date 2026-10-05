import { useState } from "react";
import { Check, Eye, EyeOff, ShoppingCart, Star } from "lucide-react";

const POP = "font-[family-name:Poppins,system-ui,sans-serif]";
const SAT = "font-[family-name:Satoshi,Poppins,system-ui,sans-serif]";
export const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0033e0] focus-visible:outline-offset-[3px]";
const GRID =
  "bg-[#0033e0] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const PAD_X = "px-[clamp(20px,8.3vw,108px)]";
const LIME_SHADOW = "[box-shadow:inset_0_-5px_8px_rgba(110,150,0,.45),0_8px_12px_rgba(0,0,60,.25)]";

export const LABEL = "block text-sm leading-[21px] text-[#222] mb-[5px]";
export const INPUT = `block w-full h-[47px] border border-[#e4e4ec] rounded-[14px] px-[21px] text-base bg-white text-[#222] placeholder:text-[#9a9aa8] ${FV}`;
export const SUBMIT_BTN = `h-[41px] px-6 rounded-full border-0 bg-[#c8ff00] text-[#14163b] text-base font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${FV}`;
export const SOCIAL_BTN = `w-[64px] h-[65px] rounded-2xl border border-[#dcdce4] bg-transparent text-black grid place-items-center cursor-pointer ${FV}`;
export const DIVIDER =
  "flex items-center gap-[18px] text-[#6b6b7a] mt-10 leading-6 before:content-[''] before:flex-1 before:h-px before:bg-[#dcdce4] after:content-[''] after:flex-1 after:h-px after:bg-[#dcdce4]";

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

const CollageCard = ({ title, thumb, className }) => (
  <div
    className={`absolute w-[336px] h-[345px] bg-white text-[#14163b] rounded-[18px] shadow-[0_6px_20px_-8px_rgba(0,0,60,.25)] ${className}`}
  >
    <div className="absolute left-3.5 top-3.5 w-[calc(100%-28px)] h-[175px] rounded-xl overflow-hidden">
      {thumb}
      <div className="absolute left-[11px] bottom-[11px] flex gap-[11px]">
        <Pill>17 Lessons</Pill>
        <Pill>2 hours 16 mins</Pill>
        <Pill>59 Comments</Pill>
      </div>
    </div>

    <div className="absolute left-3.5 right-3.5 top-[207px]">
      <div className="flex items-center justify-between h-7">
        <h3 className={`${POP} m-0 text-[17px] font-medium leading-7 text-[#111] whitespace-nowrap`}>
          {title}
        </h3>
        <span className="inline-flex items-center gap-1 text-base text-[#6b6b7a]">
          4.5
          <Star className="w-[18px] h-[18px] fill-[#c8ff00] text-[#c8ff00]" aria-hidden="true" />
        </span>
      </div>
      <div className="text-xs leading-[18px] text-[#6b6b7a]">
        by <span className="text-[#0033e0]">purepearl studio</span>
      </div>
      <div className="flex items-center gap-[11px] mt-3.5">
        <span className="inline-flex items-center gap-2 h-[30px] px-3.5 rounded-full bg-[#f3f3f5] text-xs text-[#555]">
          <LevelIcon />
          Beginner
        </span>
        <span className="flex items-center">
          {AV.map((color, i) => (
            <i
              key={color}
              className={`w-[30px] h-[30px] rounded-full border-2 border-white ${i ? "-ml-2" : ""}`}
              style={{ background: color }}
            />
          ))}
          <em className="not-italic w-7 h-7 -ml-2 rounded-full bg-[#111] text-white text-[11px] font-semibold grid place-items-center">
            26+
          </em>
        </span>
      </div>
      <div className="mt-[11px] leading-7">
        <b className={`${POP} text-lg font-semibold text-[#0033e0]`}>$25</b>
        <span className="text-xs text-[#6b6b7a]">/lifetime</span>
      </div>
    </div>
  </div>
);

const HappyStudents = () => (
  <div className="absolute left-[204px] top-[391px] w-[233px] h-[111px] bg-[#c8ff00] text-[#14163b] rounded-[14px] px-[15px] pt-4 z-[3]">
    <div className={`${POP} text-sm leading-5`}>Happy Students</div>
    <div className="flex items-center gap-1 text-[11px] leading-4 mt-0.5">
      <b className="font-semibold">4.5</b>
      <span className="text-[#6b6b7a]">(240)</span>
      <Star className="w-[11px] h-[11px] fill-[#0033e0] text-[#0033e0]" />
    </div>
    <div className="flex items-center mt-3">
      {AV_BIG.map((color, i) => (
        <i
          key={color}
          className={`w-9 h-9 rounded-full border-2 border-[#c8ff00] ${i ? "-ml-3" : ""}`}
          style={{ background: color }}
        />
      ))}
      <em className="not-italic w-[38px] h-[38px] -ml-2.5 rounded-full bg-[#111] text-white text-xs font-semibold grid place-items-center">
        2K+
      </em>
    </div>
  </div>
);

const Collage = () => (
  <div aria-hidden="true" className="relative w-[447px] h-[502px] mt-12 max-[1100px]:hidden">
    <CollageCard title="Build Digital Asset" className="left-0 top-20" thumb={<PlaceholderThumb />} />
    <CollageCard title="the Power of Big Data" className="left-[101px] top-0" thumb={<BigDataThumb />} />

    <span
      className={`absolute left-[47px] top-9 w-[91px] h-[88px] rounded-full border-[24px] border-[#c8ff00] -rotate-[25deg] z-[3] ${LIME_SHADOW}`}
    />

    <svg viewBox="0 0 112 122" className="absolute left-0 top-[379px] w-[112px] h-[122px] z-[3]">
      <polygon points="0,88 70,0 112,112" fill="#d6ff2e" />
      <polygon points="70,0 112,112 50,120" fill="#a9de00" />
      <polygon points="0,88 50,120 112,112" fill="#bff000" />
    </svg>

    <svg viewBox="0 0 102 108" className="absolute left-[345px] top-[316px] w-[102px] h-[108px] z-[4]">
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

export const AuthLoading = ({ label }) => (
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

export const AuthCard = ({ eyebrow, title, subtitle, children }) => (
  <div className="bg-white text-[#222] rounded-[32px] px-[clamp(24px,4.4vw,57px)] pt-[57px] pb-[47px] min-h-[708px] flex flex-col shadow-[0_8px_30px_rgba(0,0,60,.12)]">
    <span className="text-base leading-6 text-[#0033e0] self-start">{eyebrow}</span>
    <h1 className={`${POP} m-0 text-[clamp(30px,3.1vw,40px)] font-semibold leading-[1.2] text-[#222]`}>
      {title}
    </h1>
    {subtitle && <p className="m-0 mt-2 text-sm text-[#6b6b7a]">{subtitle}</p>}
    {children}
  </div>
);

export const PasswordInput = ({ id = "password", ...props }) => {
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

const AuthLayout = ({ title, description, features = [], children }) => (
  <div
    className={`${GRID} ${SAT} min-h-screen text-white text-base font-normal leading-[1.6]`}
  >
    <main
      className={`${PAD_X} pt-12 pb-[108px] grid grid-cols-2 max-[860px]:grid-cols-1 gap-[38px] items-start`}
    >
      <div>
        <h2 className={`${POP} m-0 mb-3 text-lg font-medium leading-[1.4]`}>{title}</h2>
        <p className="m-0 text-base leading-[26px] max-w-[440px] text-white/90">{description}</p>
        {features.length > 0 && (
          <ul className="list-none p-0 mt-7 mb-0 grid gap-3.5">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-white/90">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-[#c8ff00] text-[#14163b] shrink-0">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        )}
        <Collage />
      </div>
      {children}
    </main>
  </div>
);

export default AuthLayout;