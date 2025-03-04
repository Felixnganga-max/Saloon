import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Scissors,
  Phone,
  Users,
  Info,
  Home,
  Calendar,
  Heart,
  Star,
  Sparkles,
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle WhatsApp redirect
  const handleWhatsAppRedirect = (message) => {
    // Replace with your actual WhatsApp business number
    const phoneNumber = "1234567890";
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const navLinks = [
    {
      name: "Home",
      icon: <Home size={18} />,
      href: "/",
      action: null,
    },
    {
      name: "Services",
      icon: <Scissors size={18} />,
      href: "/services",
      action: null,
    },
    {
      name: "Book Now",
      icon: <Calendar size={18} />,
      href: "#",
      action: () =>
        handleWhatsAppRedirect(
          "Hello! I'd like to book an appointment. Please let me know the available slots."
        ),
    },
    {
      name: "Contact",
      icon: <Phone size={18} />,
      href: "#",
      action: () =>
        handleWhatsAppRedirect("Hello! I have a question about your services."),
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black shadow-lg py-2" : "bg-black/90 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative transition-all duration-300 transform group-hover:rotate-12">
              <div className="h-10 w-10 bg-gradient-to-br from-pink-300 to-yellow-300 rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-pink-500/30">
                <Scissors size={24} className="text-black" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 animate-pulse">
                <Star size={12} fill="#FFD700" stroke="none" />
              </div>
              <div
                className="absolute -bottom-1 -left-1 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              >
                <Sparkles size={12} fill="#FF69B4" stroke="none" />
              </div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl md:text-2xl tracking-tight group-hover:tracking-wider transition-all duration-300">
                GlamCut
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-yellow-300 to-pink-300 font-extrabold">
                  Pro
                </span>
              </h1>
              <p className="text-gray-300 text-xs font-light -mt-1 transition-all duration-300 group-hover:text-pink-200">
                Salon & Kinyozi
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`flex items-center text-white group relative ${
                  link.name === "Book Now"
                    ? "bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-pink-500/30 transform hover:-translate-y-1"
                    : "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-300 hover:to-yellow-300 transition-all duration-300"
                }`}
                onClick={(e) => {
                  if (link.action) {
                    e.preventDefault();
                    link.action();
                  }
                  setActiveLink(link.name);
                }}
              >
                <span
                  className={`mr-1 transition-all duration-300 ${
                    link.name === "Book Now"
                      ? ""
                      : "group-hover:scale-125 group-hover:rotate-12"
                  }`}
                >
                  {link.icon}
                </span>
                <span
                  className={
                    link.name === "Book Now" ? "font-bold" : "font-medium"
                  }
                >
                  {link.name}
                </span>
                {link.name === "Book Now" && (
                  <Heart size={14} className="ml-1 text-white animate-pulse" />
                )}
                {link.name !== "Book Now" && activeLink === link.name && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 to-yellow-300 transform scale-x-100 origin-left transition-transform duration-300"></span>
                )}
                {link.name !== "Book Now" && activeLink !== link.name && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 to-yellow-300 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                )}
              </a>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-pink-300 transition-all duration-300 focus:outline-none transform hover:rotate-12"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 py-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 bg-black/95 rounded-xl shadow-inner backdrop-blur-sm">
          <div className="flex flex-col space-y-3 py-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                  link.name === "Book Now"
                    ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-white justify-center font-bold transform hover:scale-105"
                    : "text-white hover:bg-gray-800/50 hover:text-pink-200"
                }`}
                onClick={(e) => {
                  if (link.action) {
                    e.preventDefault();
                    link.action();
                  }
                  setIsOpen(false);
                  setActiveLink(link.name);
                }}
              >
                <span
                  className={`mr-3 ${
                    activeLink === link.name ? "animate-bounce" : ""
                  }`}
                >
                  {link.icon}
                </span>
                <span>{link.name}</span>
                {link.name === "Book Now" && (
                  <Heart size={14} className="ml-2 text-white animate-pulse" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 animate-gradient"></div>

      <style jsx>{`
        @keyframes animate-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: animate-gradient 3s ease infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
