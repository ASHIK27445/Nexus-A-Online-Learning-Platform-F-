import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Browse Courses", href: "#" },
      { name: "Become Instructor", href: "#" },
      { name: "Student Dashboard", href: "#" },
      { name: "Pricing Plans", href: "#" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" },
      { name: "Contact", href: "#" }
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Events", href: "#" }
    ],
    legal: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Licenses", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
    { icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
    { icon: Youtube, href: "#", color: "hover:bg-red-600" }
  ];

  return (
    <footer className="relative bg-linear-to-b from-gray-900 via-black to-black border-t border-white/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated with <span className="bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Latest Courses</span>
              </h3>
              <p className="text-gray-400 text-lg">
                Subscribe to our newsletter and never miss exclusive offers, new course launches, and expert tips
              </p>
            </div>
            
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 transition-all duration-300 backdrop-blur-sm"
                />
                <button className="group px-8 py-4 bg-linear-to-r from-amber-400 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105">
                  <span>Subscribe</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-linear-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">Nexus</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering learners worldwide with premium education. Transform your career with cutting-edge courses from industry experts.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="https://github.com/ASHIK27445" className="flex items-center space-x-3 text-gray-400 hover:text-amber-400 transition-colors group">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>mdashikulislam27889@gmail.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-3 text-gray-400 hover:text-amber-400 transition-colors group">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+880 (170) 567-890</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Agargoan, Dhaka-1207</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center group">
                    <span className="w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center group">
                    <span className="w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center group">
                    <span className="w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center group">
                    <span className="w-0 h-0.5 bg-amber-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-gray-400 text-sm flex items-center space-x-2">
              <span>© {currentYear} Nexus. All rights reserved. Made with</span>
              <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
              <span>by AI ASHIK</span>
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all duration-300 hover:scale-110`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;