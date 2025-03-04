import React, { useState, useEffect, useRef } from "react";
import {
  Scissors,
  Star,
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  Check,
  Trophy,
  Heart,
  Sparkles,
  Phone,
  Crown,
  Gem,
  Medal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverService, setHoverService] = useState(null);
  const heroRef = useRef(null);

  // Phone number for WhatsApp - replace with your actual number
  const phoneNumber = "254700000000"; // Replace with your actual phone number

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Updated services with image field and new service types
  const services = [
    {
      name: "Luxurious Nails",
      duration: "45-60 min",
      price: "1800",
      icon: "sparkles",
      image: assets.nails,
      description: "Express your personality with our premium nail artistry",
      gradient: "from-pink-600/70 to-pink-400/70", // Pinkish gradient
    },
    {
      name: "Stylish Dreadlocks",
      duration: "120-150 min",
      price: "3500",
      icon: "crown",
      image: assets.dreadlocks, // Replace with your actual image path
      description:
        "Authentic dreadlock creation and maintenance by specialists",
      gradient: "from-purple-600/70 to-purple-400/70", // Purplish gradient
    },
    {
      name: "Premium Barbershop",
      duration: "30-45 min",
      price: "1200",
      icon: "scissors",
      image: assets.barber, // Replace with your actual image path
      description: "Precision cuts and styling for the distinguished gentleman",
      gradient: "from-pink-600/70 to-pink-400/70", // Pinkish gradient
    },
    {
      name: "Rejuvenating Facial",
      duration: "60 min",
      price: "2800",
      icon: "gem",
      image: assets.facial, // Replace with your actual image path
      description: "Restore your natural glow with our spa-grade treatments",
      gradient: "from-purple-600/70 to-purple-400/70", // Purplish gradient
    },
  ];

  // Get icon component based on service
  const getServiceIcon = (icon) => {
    switch (icon) {
      case "gem":
        return (
          <Gem
            size={22}
            className="text-pink-300 group-hover:text-white transition-colors"
          />
        );
      case "sparkles":
        return (
          <Sparkles
            size={22}
            className="text-pink-300 group-hover:text-white transition-colors"
          />
        );
      case "crown":
        return (
          <Crown
            size={22}
            className="text-pink-300 group-hover:text-white transition-colors"
          />
        );
      default:
        return (
          <Scissors
            size={22}
            className="text-pink-300 group-hover:text-white transition-colors"
          />
        );
    }
  };

  // Function to generate WhatsApp link with predefined message
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      "Hello! I'd like to book an appointment for your salon services."
    );
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div ref={heroRef} className="relative pt-20 overflow-hidden bg-gray-600">
      {/* Dark grey background with navy gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-navy-900 z-10 opacity-95"></div>

      {/* Enhanced sparkle effects - more stars and sparkles */}
      <div className="absolute inset-0 overflow-hidden z-20 opacity-80">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor:
                i % 5 === 0
                  ? "#C0C0C0" // Silver
                  : i % 5 === 1
                  ? "#DB7093" // Pinkish
                  : i % 5 === 2
                  ? "#FFFFFF" // White
                  : i % 5 === 3
                  ? "#102040" // Navy accent
                  : "#303030", // Dark grey
              boxShadow:
                i % 5 === 0
                  ? "0 0 15px 2px rgba(192, 192, 192, 0.7)"
                  : i % 5 === 1
                  ? "0 0 15px 2px rgba(219, 112, 147, 0.7)"
                  : i % 5 === 2
                  ? "0 0 15px 2px rgba(255, 255, 255, 0.7)"
                  : i % 5 === 3
                  ? "0 0 15px 2px rgba(16, 32, 64, 0.5)"
                  : "0 0 15px 2px rgba(48, 48, 48, 0.5)",
              animationDuration: `${Math.random() * 4 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Silver accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 via-gray-300 to-pink-300 z-30"></div>
      <div className="absolute top-0 left-1/4 w-0.5 h-40 bg-gradient-to-b from-gray-300 to-transparent opacity-40 z-20"></div>
      <div className="absolute top-0 right-1/3 w-0.5 h-20 bg-gradient-to-b from-gray-300 to-transparent opacity-30 z-20"></div>

      {/* Main Hero Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-30">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Column - Main Headline and CTA */}
          <div
            className={`w-full md:w-1/2 mb-16 md:mb-0 transition-all duration-1000 transform ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="max-w-xl">
              <div className="flex items-center mb-6">
                <div className="h-px bg-gradient-to-r from-pink-400 to-gray-300 w-16 mr-4"></div>
                <span className="text-pink-300 uppercase tracking-widest text-sm font-medium letter-spacing-2">
                  Exceptional Experience
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Redefine Your{" "}
                <span
                  className="text-pink-300 italic"
                  style={{ textShadow: "0 0 15px rgba(219, 112, 147, 0.5)" }}
                >
                  Elegance
                </span>{" "}
                &{" "}
                <span className="relative inline-block">
                  Style
                  <span className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-pink-300"></span>
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Where artistry meets precision. Our master stylists blend
                innovative techniques with timeless craft to create a look
                that's exclusively yours.
              </p>

              <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-6">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-300 hover:to-pink-400 text-white font-bold rounded-full transform transition-all hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-pink-500/20 flex items-center justify-center"
                  style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.3)" }}
                >
                  <Calendar size={20} className="mr-2" />
                  Book Your Experience
                  <ArrowRight size={20} className="ml-2" />
                </a>

                <Link
                  to="/services"
                  className="px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-gray-300 text-white font-medium rounded-full transition-all hover:shadow-lg flex items-center justify-center backdrop-blur-sm"
                >
                  Explore Services
                  <ChevronRight size={20} className="ml-1" />
                </Link>
              </div>

              {/* Rating indicator with silver stars - kept for design balance */}
              <div className="mt-16 flex items-center space-x-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      fill="#C0C0C0"
                      stroke="none"
                      className="mr-1"
                      style={{
                        filter: "drop-shadow(0 0 3px rgba(192, 192, 192, 0.7))",
                      }}
                    />
                  ))}
                </div>
                <div className="h-8 w-px bg-gradient-to-b from-pink-400 to-gray-500 opacity-30"></div>
                <div className="text-gray-300 text-sm">
                  <span className="font-bold text-white text-base">
                    Premium Quality
                  </span>{" "}
                  guaranteed for every client
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image or Featured Content */}
          <div
            className={`w-full md:w-1/2 h-1/2 transition-all duration-1000 transform ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            } relative`}
          >
            <div className="relative h-80 md:h-1/2 overflow-hidden rounded-2xl shadow-2xl">
              {/* Silver border accent */}
              <div className="absolute inset-0 rounded-2xl border-2 border-gray-400/30 z-50 pointer-events-none"></div>

              {/* Main service image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/90 via-pink-800/70 to-transparent z-20"></div>
              <img
                src={assets.saloon} // Replace with your actual image path
                alt="Premium Salon Experience"
                className="object-cover mx-auto w-[60%] h-1/2 transform scale-105"
              />

              {/* Floating decoration */}
              <div className="absolute bottom-8 left-8 z-30 bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl border border-pink-300/30 shadow-lg max-w-xs">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg">
                    <Crown size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-white text-lg">
                    Royal Treatment
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Experience a level of personalized care and artistry that
                  transforms your appearance and elevates your confidence
                </p>
              </div>

              {/* Floating elements - navy and pink blurs */}
              <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-900/30 rounded-full blur-3xl z-10"></div>
              <div className="absolute -right-5 top-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl z-10"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-12 -left-10 md:-left-16 bg-gradient-to-br from-gray-100/95 to-gray-100/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl z-30 max-w-xs border border-pink-100/20">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-800 text-lg">
                  Our Excellence
                </h4>
                <Medal
                  size={18}
                  className="text-gray-500"
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(192, 192, 192, 0.3))",
                  }}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    15+ Master Stylists
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    7,500+ Transformations
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-800 to-blue-900 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    10 Years of Distinction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Services Section - Our Signature Collection */}
        <div className="mt-40 mb-28 relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
            style={{ backgroundImage: assets }} // Replace `backgroundImage` with your image URL
          ></div>

          {/* Content Container */}
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14">
              <div>
                <div className="flex items-center mb-4">
                  <Crown
                    size={18}
                    className="text-gray-300 mr-3"
                    style={{
                      filter: "drop-shadow(0 0 3px rgba(192, 192, 192, 0.5))",
                    }}
                  />
                  <span className="text-pink-300 uppercase tracking-widest text-sm font-medium">
                    Exclusive Offerings
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Our Signature{" "}
                  <span
                    className="text-pink-300"
                    style={{ textShadow: "0 0 10px rgba(219, 112, 147, 0.3)" }}
                  >
                    Collection
                  </span>
                </h2>
                <p className="text-gray-300 max-w-xl text-lg">
                  Meticulously crafted services that blend luxury with
                  uncompromising results, tailored to elevate your natural
                  beauty
                </p>
              </div>
              <Link
                to="/services"
                className="mt-8 md:mt-0 flex items-center text-pink-300 hover:text-pink-200 font-medium transition-colors text-lg"
              >
                All Services
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>

            {/* Services Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/60 to-gray-900/80 backdrop-blur-lg border border-white/10 p-6 group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 h-96"
                  onMouseEnter={() => setHoverService(index)}
                  onMouseLeave={() => setHoverService(null)}
                >
                  {/* Service image with overlay */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${service.gradient} opacity-60 z-10`}
                    ></div>
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Animated gradient border on hover */}
                  <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-pink-500 via-gray-400 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                  {/* Card content container */}
                  <div className="absolute inset-0.5 rounded-lg bg-gradient-to-b from-gray-800/80 via-gray-800/60 to-gray-900/90 z-30"></div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/30 to-transparent transform transition-all duration-500 -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 z-40 rounded-xl"></div>

                  <div className="relative z-50 p-5 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400/20 to-gray-400/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      {getServiceIcon(service.icon)}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {service.name}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 group-hover:text-white transition-colors">
                      {service.description}
                    </p>

                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 mb-3">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">{service.duration}</span>
                    </div>

                    <div className="mt-auto flex justify-between items-end">
                      <div>
                        <span className="text-pink-300 group-hover:text-pink-200 text-sm">
                          From
                        </span>
                        <div className="text-white font-bold text-xl group-hover:text-gray-200 transition-colors">
                          KSh {service.price}
                        </div>
                      </div>

                      <Link
                        to="/services"
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          hoverService === index
                            ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
                            : "bg-white/10 text-white hover:bg-white/20"
                        } shadow-lg`}
                      >
                        {hoverService === index ? (
                          <Check size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Final CTA Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-black to-purple-900 p-12 md:p-16 border border-yellow-500/20 shadow-2xl">
          {/* Background decoration */}
          <div className="absolute inset-0 z-10 opacity-30">
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-t from-pink-400/20 to-transparent rounded-full blur-2xl"></div>
          </div>

          {/* Gold particle accent */}
          <div className="absolute inset-0 z-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-pulse"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 2 === 0 ? "#FFD700" : "#F472B6",
                  boxShadow:
                    i % 2 === 0
                      ? "0 0 12px 2px rgba(255, 215, 0, 0.6)"
                      : "0 0 12px 2px rgba(244, 114, 182, 0.6)",
                  animationDuration: `${Math.random() * 4 + 3}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="relative z-30 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-10 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center md:justify-start leading-tight">
                <div className="mr-5 p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg">
                  <Sparkles size={26} className="text-black" />
                </div>
                Begin Your{" "}
                <span
                  className="text-yellow-400 ml-2"
                  style={{ textShadow: "0 0 10px rgba(255, 215, 0, 0.4)" }}
                >
                  Transformation
                </span>
              </h2>
              <p className="text-pink-200 max-w-lg text-lg leading-relaxed">
                Book your exclusive appointment today and experience luxury
                redefined. First-time guests receive a complimentary style
                consultation and premium product sample.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold rounded-full transform transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center shadow-xl shadow-yellow-500/20"
                style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.3)" }}
              >
                <Calendar size={20} className="mr-2" />
                Book Your Visit
              </a>

              <a
                href={`tel:${phoneNumber}`}
                className="px-8 py-4 bg-transparent border-2 border-white hover:border-pink-300 text-white font-medium rounded-full transition-all hover:bg-white/5 flex items-center justify-center backdrop-blur-sm"
              >
                <Phone size={20} className="mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative footer accent */}
      <div className="h-2 w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 z-40 relative"></div>
    </div>
  );
};

export default Hero;
