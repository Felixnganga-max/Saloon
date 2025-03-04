import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Tag,
  Star,
  MessageCircle,
} from "lucide-react";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/services/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch service");
        const data = await response.json();
        setService(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleWhatsAppBooking = () => {
    // Format the message for WhatsApp
    const message = encodeURIComponent(
      `Hello! I'd like to book the ${service.name} service. Please let me know the available appointments.`
    );
    // Replace with your actual WhatsApp business number
    const phoneNumber = "1234567890";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (service?.images?.length > 0) {
      setActiveImageIndex((prev) =>
        prev === service.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (service?.images?.length > 0) {
      setActiveImageIndex((prev) =>
        prev === 0 ? service.images.length - 1 : prev - 1
      );
    }
  };

  const openImageViewer = (index) => {
    setActiveImageIndex(index);
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-purple-600 font-bold">
            Loading
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-50 to-orange-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4 flex justify-center">
            ⚠️
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Oops!</h2>
          <p className="text-center text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-blue-500 text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
          <p className="text-gray-700">
            The service you're looking for might have been removed or doesn't
            exist.
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Format tags if they exist
  const formattedTags = Array.isArray(service.tags)
    ? service.tags
    : typeof service.tags === "string"
    ? service.tags.split(",").map((tag) => tag.trim())
    : [];

  // Calculate discounted price if applicable
  const hasDiscount = service.discount && parseFloat(service.discount) > 0;
  const discountedPrice = hasDiscount
    ? parseFloat(service.price) * (1 - parseFloat(service.discount) / 100)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 relative">
            {service.images && service.images.length > 0 ? (
              <div className="relative h-64 md:h-full">
                <img
                  src={service.images[activeImageIndex]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  onClick={() => setShowImageViewer(true)}
                />
                {service.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition duration-300"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition duration-300"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                {service.popular && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black font-bold px-4 py-1 rounded-full shadow-md transform -rotate-12 z-10">
                    Popular!
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow-md">
                    {service.discount}% OFF
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 md:h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {service.category}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-4">
              {service.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-500 mr-4">
                <Star className="fill-current" size={20} />
                <span className="ml-1 text-lg font-bold text-gray-900">
                  4.9
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={18} />
                <span className="ml-1">{service.duration} minutes</span>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="ml-1">
                {hasDiscount ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900">
                      Ksh. {discountedPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      Ksh. {parseFloat(service.price).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    Ksh. {parseFloat(service.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                About this service
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {formattedTags.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <Tag size={18} className="text-gray-600" />
                  <h3 className="ml-1 text-lg font-bold text-gray-800">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formattedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
              >
                <MessageCircle size={20} className="mr-2" />
                Book via WhatsApp
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition duration-300"
              >
                ← Back to services
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {service.images && service.images.length > 1 && (
          <div className="px-8 py-6 bg-gray-50">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Gallery</h3>
            <div className="grid grid-cols-5 gap-3">
              {service.images.map((image, index) => (
                <div
                  key={index}
                  className={`
                    cursor-pointer rounded-lg overflow-hidden border-2 transition duration-300
                    ${
                      activeImageIndex === index
                        ? "border-purple-500 shadow-md transform scale-105"
                        : "border-transparent"
                    }
                  `}
                  onClick={() => openImageViewer(index)}
                >
                  <img
                    src={image}
                    alt={`${service.name} ${index + 1}`}
                    className="w-full h-16 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-screen Image Viewer */}
      {showImageViewer && service.images && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeImageViewer}
        >
          <div className="relative w-full max-w-4xl max-h-screen px-4">
            <img
              src={service.images[activeImageIndex]}
              alt={service.name}
              className="mx-auto max-h-[80vh] max-w-full object-contain"
            />
            {service.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 transition duration-300"
                >
                  <ChevronLeft size={32} className="text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 transition duration-300"
                >
                  <ChevronRight size={32} className="text-white" />
                </button>
              </>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="bg-black bg-opacity-50 px-4 py-2 rounded-full">
                <span className="text-white">
                  {activeImageIndex + 1} / {service.images.length}
                </span>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 bg-white bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 transition duration-300"
              onClick={closeImageViewer}
            >
              <span className="text-white text-2xl font-bold">×</span>
            </button>
          </div>
        </div>
      )}

      {/* Similar Services or Recommendations section could be added here */}
    </div>
  );
};

export default ServiceDetail;
