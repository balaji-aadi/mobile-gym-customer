import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Users,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  Dumbbell,
  Heart,
  Zap,
  Target,
} from "lucide-react";
import { sessions } from "./dummyData";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar, FaApple, FaAndroid } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user, logout } = useAuth();
  const categories = [
    {
      id: 1,
      name: "Strength Training",
      description: "Build muscle and increase power",
      icon: Dumbbell,
      color: "bg-blue-500",
      subcategories: ["Weightlifting", "Bodyweight", "Powerlifting"],
    },
    {
      id: 2,
      name: "Cardio",
      description: "Improve cardiovascular health",
      icon: Heart,
      color: "bg-red-500",
      subcategories: ["HIIT", "Running", "Cycling"],
    },
    {
      id: 3,
      name: "Yoga & Flexibility",
      description: "Enhance flexibility and mindfulness",
      icon: Target,
      color: "bg-green-500",
      subcategories: ["Hatha Yoga", "Vinyasa", "Stretching"],
    },
    {
      id: 4,
      name: "Functional Training",
      description: "Real-world movement patterns",
      icon: Zap,
      color: "bg-purple-500",
      subcategories: ["CrossTraining", "TRX", "Kettlebell"],
    },
  ];

  const featuredSessions = [
    {
      id: 1,
      title: "Morning HIIT Blast",
      trainer: "Sarah Johnson",
      time: "7:00 AM",
      duration: "45 min",
      spots: 8,
      rating: 4.9,
      price: "$25",
      image:
        "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 2,
      title: "Strength & Power",
      trainer: "Mike Chen",
      time: "6:00 PM",
      duration: "60 min",
      spots: 6,
      rating: 4.8,
      price: "$35",
      image:
        "https://images.pexels.com/photos/1552108/pexels-photo-1552108.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      title: "Sunset Yoga Flow",
      trainer: "Emma Davis",
      time: "7:30 PM",
      duration: "50 min",
      spots: 12,
      rating: 5.0,
      price: "$20",
      image:
        "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const [location, setLocation] = useState("Select location");
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");
  const locationRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUseCurrentLocation = () => {
    setLocLoading(true);
    setLocError("");

    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser");
      setLocLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch location data');
          }

          const data = await response.json();
          const address = data.address || {};

          let locationParts = [
            address.city || address.town || address.village,
            address.state,
            address.country
          ].filter(Boolean);

          setLocation(locationParts.join(", ") || "Current Location");
        } catch (error) {
          setLocError("Could not determine your location");
          console.error("Geolocation error:", error);
        } finally {
          setLocLoading(false);
          setLocationDropdown(false);
        }
      },
      (error) => {
        setLocLoading(false);
        setLocError("Please enable location permissions in your browser settings");
        console.error("Geolocation permission error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="animate-fade-in bg-custom-cream">
      {/* Hero Section */}
      <section
        className="relative text-gray-900"
        style={{
          backgroundImage: `url('https://www.mindbodyonline.com/explore/static/media/hero.9d2f31ee.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "30rem",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center min-h-[600px]">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center animate-slide-up text-[#FCEEE5]">
            Discover the best in fitness & wellness
          </h1>
          {/* Subheading */}
          <p className="text-lg md:text-xl mb-8  max-w-2xl mx-auto text-center animate-slide-up text-[#FCEEE5]">
            Your new favorite studios, salons, and spas are just a search away.
          </p>
          {/* Search Bar with Location - Side by Side */}
          <div className="max-w-2xl w-full mx-auto mb-8 animate-slide-up flex gap-2 bg-white rounded-lg shadow-lg">
            <div className="flex-1 relative flex items-center px-4">
              <span className="text-gray-400 mr-2">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full px-2 py-4 border-0 focus:outline-none text-gray-900 bg-transparent"
              />
            </div>
            {/* Location Dropdown */}
            <div className="w-72 relative flex items-center px-4 border-l border-gray-200" ref={locationRef}>
              <span className="text-gray-400 mr-2">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                  <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div
                className="w-full px-2 py-4 border-0 focus:outline-none text-primary-700 font-semibold bg-transparent cursor-pointer"
                onClick={() => {
                  setLocationDropdown(!locationDropdown);
                }}
              >
                {location}
              </div>

              {locationDropdown && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white shadow-lg border z-20">
                  <button
                    className="w-full flex items-center gap-2 px-6 py-4 hover:bg-gray-50 text-left text-gray-700 font-medium"
                    onClick={handleUseCurrentLocation}
                    disabled={locLoading}
                  >
                    <svg width="30" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    {locLoading ? "Detecting..." : "Use Current Location"}
                  </button>
                  {locError && <div className="text-red-500 px-6 pb-3 text-sm">{locError}</div>}
                </div>
              )}
            </div>
            <button className="bg-primary hover:bg-primary-700 text-white px-6 flex items-center justify-center">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
          {/* App CTA */}
          <div className="flex items-center gap-2 animate-slide-up">
            <FaApple className="text-2xl text-white" />
            <FaAndroid className="text-2xl text-white" />
            <span className="text-white font-semibold">Get the app today</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Happy Members" },
              { number: "50+", label: "Expert Trainers" },
              { number: "100+", label: "Daily Sessions" },
              { number: "15+", label: "Locations" },
            ].map((stat, index) => (
              <div key={index} className="animate-scale-in">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* My Sessions */}
     {user&& <section className="bg-custom-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              My Sessions
            </h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessions.map((session, index) => (
                      <Link
                        key={index}
                        to={`/my-session/${index}`}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <img
                          src={session.image}
                          alt={session.title}
                          className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{session.title}</h3>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              {session.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-4">
                            with {session.trainer}
                          </p>
                          <div className="flex justify-between text-sm text-gray-600 flex-wrap gap-2">
                            <span>{session.time}</span>
                            <span className="flex items-center gap-1">
                              <IoLocationOutline className="text-lg" />
                              {session.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaStar className="text-yellow-400" />
                              {session.rating}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
          </div>
        </div>
      </section>}


      {/* Categories Section */}
      <section className="bg-custom-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Workout Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of fitness programs designed to meet
              your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to="/sessions"
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div
                    className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.map((sub, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Sessions */}
      <section className="bg-custom-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Today's Featured Sessions
            </h2>
            <p className="text-xl text-gray-600">
              Join these popular sessions happening today
            </p>
          </div>

          <div className="cursor-pointer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSessions.map((session) => (
              <Link
                key={session.id}
                to={`/sessions/${session.id}`} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-primary-600">
                    {session.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {session.title}
                  </h3>
                  <p className="text-gray-600 mb-4">with {session.trainer}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{session.spots} spots</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {session.rating}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-custom-dark hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Come to You
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track our mobile gym locations in real-time and find the perfect
              spot for your workout
            </p>
          </div>

          <div className="bg-custom-gray rounded-xl p-8 text-center">
            <MapPin className="h-16 w-16 text-primary-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Live Location Tracking</h3>
            <p className="text-gray-300 mb-6">
              See where our mobile gyms are right now and get directions to the
              nearest location
            </p>
            <Link
              to="/locations"
              className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MapPin className="h-5 w-5" />
              <span>View Live Locations</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of members who've already discovered the convenience
            of mobile fitness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-secondary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              to="/sessions"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Browse Sessions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
