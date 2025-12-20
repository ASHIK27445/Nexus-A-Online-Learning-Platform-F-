import React from 'react';
import { Award, Users, Clock, Shield, Zap, Trophy, Target, Globe, Sparkles } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Industry-Certified",
      description: "Gain recognized certifications from top institutions",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry veterans with real-world experience",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with lifetime access",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Shield,
      title: "Money-Back Guarantee",
      description: "100% satisfaction or your money back",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Cutting-Edge Content",
      description: "Latest industry trends and technologies",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Trophy,
      title: "Career Support",
      description: "Personalized guidance and job network access",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: Target,
      title: "Project-Based",
      description: "Build real-world projects for your portfolio",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Join 50,000+ learners worldwide",
      color: "from-teal-400 to-cyan-500"
    }
  ];

  return (
    <section className="relative py-24 bg-linear-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-linear-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/30 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-white">Premium Features</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Why Choose
            </span>
            <br />
            <span className="text-white">EduLux Premium</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the difference that premium education makes in your career trajectory
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-linear-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-3xl transition-all duration-500"></div>
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-amber-400 group-hover:to-orange-500 group-hover:bg-clip-text transition-all">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;