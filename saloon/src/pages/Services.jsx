import React, { useState, useEffect, useRef } from "react";
import {
  Scissors,
  Moon,
  Sparkles,
  Heart,
  Star,
  TrendingUp,
  Clock,
  Palette,
  Percent,
  Award,
  ChevronRight,
  Tag,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  // State for selected category, search, and animation
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(8);
  const [bookingModal, setBookingModal] = useState({
    open: false,
    service: null,
  });

  // Add state for storing fetched services and loading state
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(10000);

  const servicesRef = useRef(null);

  // Mock service categories - in real app, this would come from database
  const categories = [
    { id: "all", name: "All", icon: <Sparkles size={18} /> },
    { id: "hair", name: "Hair", icon: <Scissors size={18} /> },
    { id: "braids", name: "Braids", icon: <TrendingUp size={18} /> },
    { id: "dreadlocks", name: "Dreadlocks", icon: <Moon size={18} /> },
    { id: "barber", name: "Barber", icon: <Scissors size={18} /> },
    { id: "nails", name: "Nails", icon: <Palette size={18} /> },
    { id: "facial", name: "Facial", icon: <Sparkles size={18} /> },
  ];

  const handleWhatsAppBooking = (service) => {
    // Format the message for WhatsApp
    const message = encodeURIComponent(
      `Hello! I'd like to book the ${service.name} service. Please let me know the available appointments.`
    );
    // Replace with your actual WhatsApp business number
    const phoneNumber = "1234567890";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://saloon-e7dp.vercel.app/api/services/"
        );

        // Check if the response is OK and content type is JSON
        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Response is not valid JSON");
        }

        const data = await response.json();
        setServicesData(data);
        console.log(data);

        // Set max price based on the highest price in services
        if (data.length > 0) {
          const highestPrice = Math.max(
            ...data.map((service) => service.price)
          );
          setMaxPrice(highestPrice);
          setPriceRange([0, highestPrice]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on selected category and search query
  const filteredServices = servicesData
    .filter(
      (service) =>
        (selectedCategory === "All" ||
          service.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (service) =>
        service.price >= priceRange[0] && service.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortBy === "popular") return b.popular - a.popular;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "rating") return 0; // Removed rating since your model doesn't have it
      return 0;
    })
    .slice(0, visibleCount);

  // Trigger animation when category changes
  useEffect(() => {
    setAnimateCards(true);
    const timer = setTimeout(() => setAnimateCards(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Format price in KES
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format duration in hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours} hr${hours > 1 ? "s" : ""} ${mins > 0 ? `${mins} min` : ""}`
      : `${mins} min`;
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="bg-gradient-to-b from-blue-900 to-purple-950 py-20 min-h-screen"
      id="services"
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our Premium{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-yellow-300 to-pink-300 animate-gradient">
              Services
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Experience the ultimate in beauty and grooming with our range of
            premium services. Our skilled professionals use only top-quality
            products to ensure your satisfaction.
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={scrollToServices}
              className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
            >
              <Sparkles size={18} className="mr-2" />
              Explore Services
            </button>
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center backdrop-blur-sm"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isFiltersOpen ? "max-h-96 opacity-100 mb-8" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 border border-gray-800 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-black/50 text-white w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-400 transition-all"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Price Range
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step={Math.max(500, Math.floor(maxPrice / 20))}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-pink-500 to-yellow-400"
                  />
                  <span className="text-white font-medium">
                    {formatPrice(priceRange[1])}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black/50 text-white w-full px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-400 transition-all"
                >
                  <option value="popular">Most Popular</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="duration">Duration</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">View</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      viewMode === "grid"
                        ? "border-pink-400 bg-pink-500/20 text-white"
                        : "border-gray-700 text-gray-400 hover:text-white"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      viewMode === "list"
                        ? "border-pink-400 bg-pink-500/20 text-white"
                        : "border-gray-700 text-gray-400 hover:text-white"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Services Section */}
      <div className="container mx-auto px-4" ref={servicesRef}>
        {/* Categories Navigation */}
        <div className="mb-12 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex space-x-2 md:justify-center min-w-min">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center px-5 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold shadow-lg shadow-pink-500/20"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white backdrop-blur-sm"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                {selectedCategory === category.name && (
                  <span className="ml-1 animate-pulse">
                    <Star size={10} fill="#FFD700" stroke="none" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg mb-4">
              Error loading services: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Services Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <div
                      key={service._id}
                      className={`bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 group hover:border-pink-400/50 transition-all duration-500 shadow-lg hover:shadow-pink-500/20 ${
                        animateCards ? "animate-fade-in" : "opacity-100"
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                      onMouseEnter={() => setHoveredService(service._id)}
                      onMouseLeave={() => setHoveredService(null)}
                    >
                      {/* FIX: Make the entire card clickable with Link covering the image area */}
                      <div className="relative h-48 overflow-hidden">
                        <Link
                          to={`/services/${service._id}`}
                          className="block absolute inset-0"
                        >
                          <img
                            src={service.images[0]}
                            alt={service.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </Link>
                        {service.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
                            <Percent size={12} className="mr-1" />
                            {service.discount}% OFF
                          </div>
                        )}
                        {service.popular && (
                          <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
                            <TrendingUp size={12} className="mr-1" />
                            Popular
                          </div>
                        )}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 pointer-events-none ${
                            hoveredService === service._id ? "opacity-100" : ""
                          }`}
                        >
                          <div className="flex flex-wrap gap-2 mb-2 pointer-events-none">
                            {service.tags &&
                              service.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white"
                                >
                                  #{tag}
                                </span>
                              ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // Prevent link navigation
                              e.stopPropagation(); // Stop event bubbling
                              handleWhatsAppBooking(service);
                            }}
                            className="mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 text-white text-sm font-bold py-2 rounded-lg w-full transition-all duration-300 pointer-events-auto"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                      <Link to={`/services/${service._id}`} className="block">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-white font-bold text-lg group-hover:text-pink-300 transition-colors">
                              {service.name}
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-3 h-10">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-300 text-sm">
                              <Clock size={14} className="mr-1" />
                              {formatDuration(service.duration)}
                            </div>
                            <div className="flex items-center">
                              {service.discount > 0 ? (
                                <div className="flex flex-col items-end">
                                  <span className="text-gray-400 text-xs line-through">
                                    {formatPrice(service.price)}
                                  </span>
                                  <span className="text-white font-bold">
                                    {formatPrice(
                                      service.price -
                                        (service.price * service.discount) / 100
                                    )}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-white font-bold">
                                  {formatPrice(service.price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-10">
                    <div className="text-pink-300 mb-4">
                      <Scissors size={48} className="animate-bounce" />
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">
                      No Services Found
                    </h3>
                    <p className="text-gray-400 mb-4 text-center">
                      We couldn't find any services matching your current
                      filters.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                        setPriceRange([0, maxPrice]);
                      }}
                      className="text-pink-300 hover:text-pink-200 font-medium flex items-center"
                    >
                      <span>Reset Filters</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <div
                      key={service._id}
                      className={`bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 group hover:border-pink-400/50 transition-all duration-500 shadow-lg hover:shadow-pink-500/20 ${
                        animateCards ? "animate-fade-in" : "opacity-100"
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 relative">
                          <Link
                            to={`/services/${service._id}`}
                            className="block h-full"
                          >
                            <img
                              src={service.images[0]}
                              alt={service.name}
                              className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </Link>
                          {service.discount > 0 && (
                            <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                              <Percent size={12} className="mr-1" />
                              {service.discount}% OFF
                            </div>
                          )}
                          {service.popular && (
                            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                              <TrendingUp size={12} className="mr-1" />
                              Popular
                            </div>
                          )}
                        </div>
                        <div className="md:w-3/4 p-4 md:p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <Link
                                to={`/services/${service._id}`}
                                className="block"
                              >
                                <h3 className="text-white font-bold text-xl group-hover:text-pink-300 transition-colors">
                                  {service.name}
                                </h3>
                              </Link>
                            </div>
                            <p className="text-gray-400 mb-4">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {service.tags &&
                                service.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-4">
                              <div className="flex items-center text-gray-300 text-sm">
                                <Clock size={14} className="mr-1" />
                                {formatDuration(service.duration)}
                              </div>
                              <div className="flex items-center text-gray-300 text-sm">
                                <Tag size={14} className="mr-1" />
                                <span className="capitalize">
                                  {service.category}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              {service.discount > 0 ? (
                                <div className="flex flex-col items-end">
                                  <span className="text-gray-400 text-xs line-through">
                                    {formatPrice(service.price)}
                                  </span>
                                  <span className="text-white font-bold text-lg">
                                    {formatPrice(
                                      service.price -
                                        (service.price * service.discount) / 100
                                    )}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-white font-bold text-lg">
                                  {formatPrice(service.price)}
                                </span>
                              )}
                              <button
                                onClick={() => handleWhatsAppBooking(service)}
                                className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center"
                              >
                                Book Now
                                <ChevronRight size={16} className="ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-10">
                    <div className="text-pink-300 mb-4">
                      <Scissors size={48} className="animate-bounce" />
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">
                      No Services Found
                    </h3>
                    <p className="text-gray-400 mb-4 text-center">
                      We couldn't find any services matching your current
                      filters.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchQuery("");
                        setPriceRange([0, maxPrice]);
                      }}
                      className="text-pink-300 hover:text-pink-200 font-medium flex items-center"
                    >
                      <span>Reset Filters</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Load More Button */}
            {filteredServices.length > 0 &&
              visibleCount < servicesData.length && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm flex items-center"
                  >
                    Load More Services
                  </button>
                </div>
              )}

            {/* Featured and Popular Services Section */}
            {selectedCategory === "All" && (
              <div className="mt-20">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-yellow-300 to-pink-300">
                    Most Popular
                  </span>{" "}
                  Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {servicesData
                    .filter((service) => service.popular)
                    .slice(0, 3)
                    .map((service) => (
                      <div
                        key={`popular-${service._id}`}
                        className="relative overflow-hidden rounded-xl group"
                      >
                        {/* FIX: Added proper Link for the entire image area */}
                        <Link
                          to={`/services/${service._id}`}
                          className="block absolute inset-0 z-10"
                        >
                          <span className="sr-only">View {service.name}</span>
                        </Link>
                        <img
                          src={service.images[0]}
                          alt={service.name}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h4 className="text-white font-bold text-xl mb-2 group-hover:text-pink-300 transition-colors">
                            {service.name}
                          </h4>
                          <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-300 text-sm">
                              <Clock size={14} className="mr-1" />
                              {formatDuration(service.duration)}
                            </div>
                            <div className="flex items-center">
                              {service.discount > 0 ? (
                                <div className="flex flex-col items-end">
                                  <span className="text-gray-400 text-xs line-through">
                                    {formatPrice(service.price)}
                                  </span>
                                  <span className="text-white font-bold">
                                    {formatPrice(
                                      service.price -
                                        (service.price * service.discount) / 100
                                    )}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-white font-bold">
                                  {formatPrice(service.price)}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // Prevent link navigation
                              e.stopPropagation(); // Stop event bubbling
                              handleWhatsAppBooking(service);
                            }}
                            className="mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 text-white text-sm font-bold py-2 rounded-lg w-full transition-all duration-300 relative z-20"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
        {/* Booking Modal */}
        {bookingModal.open && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-gray-800 shadow-xl max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-2xl font-bold">Book Service</h3>
                <button
                  onClick={() =>
                    setBookingModal({ open: false, service: null })
                  }
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/services/${service._id}`} // Ensure `service._id` is correct
                    className="block" // Ensure the link is block-level for proper sizing
                  >
                    <img
                      src={bookingModal.service.images[0]}
                      alt={bookingModal.service.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </Link>
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {bookingModal.service.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {formatDuration(bookingModal.service.duration)}
                    </p>
                    <p className="text-white font-bold">
                      {bookingModal.service.discount > 0
                        ? formatPrice(
                            bookingModal.service.price -
                              (bookingModal.service.price *
                                bookingModal.service.discount) /
                                100
                          )
                        : formatPrice(bookingModal.service.price)}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="bg-black/50 text-white w-full px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-1">
                      Select Time
                    </label>
                    <input
                      type="time"
                      className="bg-black/50 text-white w-full px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-pink-400 transition-all"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    // Handle booking logic here
                    setBookingModal({ open: false, service: null });
                  }}
                  className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-400 hover:to-yellow-300 text-white px-6 py-3 rounded-lg font-semibold w-full transition-all duration-300"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
