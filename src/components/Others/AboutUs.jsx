// AboutUs.jsx
import React, { useEffect, useRef } from 'react';
import { 
  Users, Trophy, Zap, Globe, Heart, TrendingUp, 
  Award, Sparkles, Target, Clock, Star, Rocket, 
  BookOpen
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutUs = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    // Animate stats counter
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.to(stat, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top center',
            onEnter: () => {
              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      gsap.to(stat, {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: "power2.out"
                      });
                      observer.unobserve(entry.target);
                    }
                  });
                },
                { threshold: 0.5 }
              );
              observer.observe(stat);
            }
          }
        });
      });
    }

    // Animate team cards on scroll
    if (teamRef.current) {
      const cards = teamRef.current.querySelectorAll('.team-card');
      gsap.fromTo(cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Floating animation for decorative elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(el => {
      gsap.to(el, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      bio: "Ex-Google, 10+ years in EdTech",
      social: ["linkedin", "twitter"]
    },
    {
      name: "Sarah Chen",
      role: "Head of Curriculum",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      bio: "PhD in Education, Stanford",
      social: ["linkedin", "github"]
    },
    {
      name: "Marcus Rivera",
      role: "Lead Instructor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w-400&h=400&fit=crop&crop=face",
      bio: "Former Netflix Senior Engineer",
      social: ["linkedin", "twitter"]
    },
    {
      name: "Md. Ashikul Islam",
      role: "Full Stack Engineer",
      image: "https://avatars.githubusercontent.com/u/101524713?s=400&u=e8e160e0f363b37a381801ad9cec30beca3f77da&v=4",
      bio: "Sole developer of this platform",
      social: ["linkedin", "instagram"]
    }
  ];

  const milestones = [
    { year: "2020", event: "Platform Launch", icon: <Rocket className="w-6 h-6" /> },
    { year: "2021", event: "10K Students", icon: <Users className="w-6 h-6" /> },
    { year: "2022", event: "Global Expansion", icon: <Globe className="w-6 h-6" /> },
    { year: "2023", event: "Award Winner", icon: <Trophy className="w-6 h-6" /> },
    { year: "2024", event: "AI Integration", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black overflow-hidden" ref={sectionRef}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl floating"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl floating" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                             linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Particle animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full mb-8 animate-pulse">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Our Story</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="text-white">Redefining</span>
            <br />
            <span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Digital Education
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            We're on a mission to make world-class education accessible to everyone, 
            everywhere. Powered by innovation, driven by passion.
          </p>

          {/* Animated CTA Button */}
          <button className="group relative px-8 py-4 bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
            <span className="relative z-10">Join Our Journey</span>
            <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32" ref={statsRef}>
          {[
            { number: "50K+", label: "Students Worldwide", icon: <Users className="w-8 h-8" /> },
            { number: "200+", label: "Expert Instructors", icon: <Award className="w-8 h-8" /> },
            { number: "98%", label: "Satisfaction Rate", icon: <Star className="w-8 h-8" /> },
            { number: "500+", label: "Courses", icon: <BookOpen className="w-8 h-8" /> }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="relative group p-8 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-amber-500/20 rounded-3xl hover:border-amber-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center transform group-hover:scale-125 transition-transform duration-500">
                <div className="text-black">{stat.icon}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent mb-2 stat-number" data-target={stat.number}>
                  0
                </div>
                <p className="text-gray-300 text-sm font-semibold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto" ref={missionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mission Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-orange-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-10 bg-linear-to-br from-gray-900 to-black rounded-3xl border border-amber-500/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To democratize education by breaking down barriers and making 
                high-quality learning accessible to anyone with an internet connection.
              </p>
              <ul className="space-y-4">
                {['Accessibility First', 'Quality Education', 'Lifetime Learning', 'Global Community'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-10 bg-linear-to-br from-gray-900 to-black rounded-3xl border border-purple-500/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-linear-to-br from-purple-400 to-cyan-600 rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To create a world where anyone, anywhere can transform their life 
                through education and achieve their full potential.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'AI-Powered', value: 'Learning' },
                  { label: 'Global', value: 'Network' },
                  { label: 'Industry', value: 'Partners' },
                  { label: 'Innovation', value: 'Labs' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-amber-400 font-bold">{item.value}</div>
                    <div className="text-sm text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Our <span className="bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Journey</span>
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-amber-400 via-orange-500 to-purple-500"></div>
          
          {/* Milestones */}
          <div className="space-y-20">
            {milestones.map((milestone, idx) => (
              <div 
                key={idx}
                className={`relative flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-16 text-right' : 'pl-16'}`}>
                  <div className="group relative p-8 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl hover:scale-105 transition-all duration-500">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                      <div className="text-black">{milestone.icon}</div>
                    </div>
                    <div className={`${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-amber-400 text-2xl font-bold mb-2">{milestone.year}</div>
                      <div className="text-white text-xl font-semibold">{milestone.event}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-400 rounded-full border-4 border-black"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto" ref={teamRef}>
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Meet Our <span className="bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Dream Team</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Passionate educators, industry experts, and innovators working together 
          to revolutionize learning.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="team-card relative group"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <div className="bg-linear-to-r from-red-500 to-orange-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative bg-linear-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-amber-500/20 group-hover:border-amber-500/60 transition-all duration-500">
                {/* Image with gradient overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Social icons overlay */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {member.social.map((platform, i) => (
                      <div 
                        key={i}
                        className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                      >
                        <div className="text-white text-sm font-bold">
                          {platform === 'linkedin' ? 'in' : platform.charAt(0)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <div className="text-amber-400 text-sm font-semibold mb-3">{member.role}</div>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                  
                  {/* Stats bar */}
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Expertise</span>
                      <span className="text-amber-400">95%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-2">
                      <div 
                        className="h-full bg-linear-to-r from-amber-400 to-orange-600 rounded-full"
                        style={{ width: '95%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto mt-10">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Our <span className="bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Core Values</span>
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mb-15">
          {[
            {
              title: "Excellence",
              icon: <Trophy className="w-6 h-6 md:w-10 md:h-10" />,
              description: "We never compromise on quality. Every course is crafted with precision and care.",
              color: "from-amber-400 to-orange-600"
            },
            {
              title: "Innovation",
              icon: <Zap className="w-6 h-6 md:w-10 md:h-10" />,
              description: "Constantly pushing boundaries with cutting-edge technology and teaching methods.",
              color: "from-purple-400 to-pink-600"
            },
            {
              title: "Community",
              icon: <Heart className="w-6 h-6 md:w-10 md:h-10" />,
              description: "Building a supportive network where learners grow together and help each other succeed.",
              color: "from-cyan-400 to-blue-600"
            }
          ].map((value, idx) => (
            <div 
              key={idx}
              className="group perspective-1000"
            >
              <div className="relative min-h-80 transform-style-3d transition-transform duration-700 md:group-hover:rotate-y-180">
                {/* Front */}
                <div className={`absolute inset-0 backface-hidden bg-linear-to-br from-gray-900 to-black rounded-3xl border border-${value.color.split('-')[1]}-500/30 p-8`}>
                  <div className={`w-10 h-10 md:w-18 md:h-18 bg-linear-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <div className="text-white">{value.icon}</div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400 text-[12px] md:text-sm lg:textarea-md">{value.description}</p>
                </div>
                
                {/* Back */}
                <div className={`absolute inset-0 backface-hidden bg-linear-to-br ${value.color} rounded-3xl py-15 px-8 flex items-center justify-center transform rotate-y-180`}>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-4">100%</div>
                    <div className="text-white/90 font-semibold">Commitment</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 max-w-4xl mx-auto text-center">
        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-amber-500 via-orange-500 to-purple-500 rounded-3xl blur opacity-30"></div>
          <div className="relative p-16 bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-3xl border border-amber-500/30">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-gray-300 textarea-md md:text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
              Join 50,000+ learners who have accelerated their careers with OLP Academy.
            </p>
            <button className="group relative px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-full font-bold textarea-md md:text-lg lg:text-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="relative z-10">Start Learning Free for 7 Days</span>
              <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        /* Glow animation */
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.6); }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #ea580c);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #fbbf24, #f97316);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;