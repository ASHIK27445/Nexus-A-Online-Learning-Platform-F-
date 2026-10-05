import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const FV =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0033e0] focus-visible:outline-offset-[3px]";
const WRAP = "max-w-[1240px] mx-auto px-5";

const mainLinks = [
  { name: "Browse Courses", href: "/allCourses" },
  { name: "Become Instructor", href: "#" },
  { name: "Student Dashboard", href: "#" },
  { name: "Pricing Plans", href: "#" },
  { name: "About Us", href: "/aboutUs" },
  { name: "Careers", href: "#" },
  { name: "Press Kit", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Help Center", href: "#" },
  { name: "Community", href: "#" },
  { name: "Events", href: "#" },
];

const legalLinks = [
  { name: "Terms of Service", href: "/termsofservice" },
  { name: "Privacy Policy", href: "/privacyPolicy" },
  { name: "Cookie Policy", href: "#" },
  { name: "Licenses", href: "#" },
];

const contacts = [
  { Icon: Mail, text: "mdashikulislam27889@gmail.com", href: "mailto:mdashikulislam27889@gmail.com" },
  { Icon: Phone, text: "+880 (170) 567-890", href: "tel:+1234567890" },
  { Icon: MapPin, text: "Agargoan, Dhaka-1207" },
];

const FooterLink = ({ href, className = "", children }) =>
  href.startsWith("/") ? (
    <Link to={href} className={`${className} ${FV}`}>
      {children}
    </Link>
  ) : (
    <a href={href} className={`${className} ${FV}`}>
      {children}
    </a>
  );

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="border-t border-[#dfe1f5] bg-white text-[#14163b] pt-14 pb-7 font-[Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif]">
      <div className={WRAP}>
        <div className="grid grid-cols-[1.2fr_1.4fr] max-[860px]:grid-cols-1 gap-12 max-[860px]:gap-7">
          <div>
            <Link
              to="/"
              className={`flex items-center gap-2 font-bold text-2xl leading-[1.1] tracking-[-.02em] text-[#14163b] ${FV}`}
            >
              <svg viewBox="0 -10 32 42" aria-hidden="true" className="w-7 block">
                      {/* crown */}
                      <path
                        d="M3 -1L2 -8L5.5 -5L8 -9L10.5 -5L14 -8L13 -1Z"
                        fill="#c8ff00"
                        stroke="#c8ff00"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      {/* existing logo */}
                      <path
                        d="M4 3h8v9l13 5-13 5v7H4z"
                        fill="#c8ff00"
                        stroke="#c8ff00"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
              </svg>
              Nexus
            </Link>
            <p className="text-[#5a5d80] text-[13px] mt-2.5">
              Stay Updated with Latest Courses. Subscribe to our newsletter and never miss exclusive offers, new course launches, and expert tips
            </p>
            <form className="flex gap-2 mt-4 max-w-95" onSubmit={handleSubscribe}>
              <input
                type="email"
                aria-label="Email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 min-w-0 border-[1.5px] border-[#dfe1f5] bg-white text-[#14163b] rounded-full px-4 py-2.5 text-[15px] ${FV}`}
              />
              <button
                type="submit"
                className={`inline-block border-0 rounded-full px-6 py-3 font-bold text-[15px] cursor-pointer bg-[#c8ff00] text-[#14163b] ${FV}`}
              >
                Subscribe
              </button>
            </form>
            <p className="text-[#5a5d80] text-[13px] mt-2.5">
              By subscribing, you agree to our Privacy Policy and consent to receive updates
            </p>
            <ul className="list-none p-0 mt-4 mb-0 grid gap-1.5 text-[13px] text-[#5a5d80]">
              {contacts.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {href ? (
                    <a href={href} className={`hover:text-[#14163b] ${FV}`}>
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-3 max-[860px]:grid-cols-2 gap-x-6 gap-y-1.5 content-start"
          >
            {mainLinks.map(({ name, href }) => (
              <FooterLink key={name} href={href} className="text-sm text-[#5a5d80] py-1.5">
                {name}
              </FooterLink>
            ))}
          </nav>
        </div>

        <div className="flex justify-between flex-wrap gap-3 mt-10 pt-5 border-t border-[#dfe1f5] text-[#5a5d80] text-sm">
          <span className="flex items-center gap-1.5 flex-wrap">
            © {new Date().getFullYear()} ByteSpace. All rights reserved. Made with
            <Heart className="w-4 h-4 fill-[#0033e0] text-[#0033e0]" aria-hidden="true" />
            by AI ASHIK
          </span>
          <div className="flex gap-5 flex-wrap">
            {legalLinks.map(({ name, href }) => (
              <FooterLink key={name} href={href}>
                {name}
              </FooterLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;