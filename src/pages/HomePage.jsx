import  { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { sessions } from "./dummyData";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar, FaApple, FaAndroid } from "react-icons/fa";
import HorizontalScroll from "../components/HorizontalScroll";
import FeaturedSessionCard from "../components/FeaturedSessionCard";
import fitness from "../Assests/fitness.jpg";
import wellness from "../Assests/wellness.jpg";
import liveness from "../Assests/liveness.jpg";

const HomePage = () => {
  const user = true;

  const featuredSessions = [
    {
      image:
        "https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&w=400",
      category: "Circuit Training",
      price: 26.25,
      oldPrice: 35.0,
      title: "Total Body Workout...",
      studio: "Inspired Life Fitness",
      location: "Metzger | 7.4 mi",
      time: "5:15am - 6:15am PDT",
      trainer: "Tiffany Thurston",
      rating: 5,
      reviews: 1969,
    },
    {
      image:
        "https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&w=400",
      category: "Circuit Training",
      price: 26.25,
      oldPrice: 35.0,
      title: "Total Body Workout...",
      studio: "Inspired Life Fitness",
      location: "Metzger | 7.4 mi",
      time: "6:30am - 7:30am PDT",
      trainer: "Tiffany Thurston",
      rating: 5,
      reviews: 1969,
    },
    {
      image:
        "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&w=400",
      category: "Yoga",
      price: 22.0,
      oldPrice: 25.0,
      title: "In-studio 45 min. Y...",
      studio: "Twist Yoga",
      location: "Walluga | 7.5 mi",
      time: "7:30am - 8:15am PDT",
      trainer: "Ali Matt",
      rating: 5,
      reviews: 1104,
    },
    {
      image:
        "https://images.pexels.com/photos/1552108/pexels-photo-1552108.jpeg?auto=compress&w=400",
      category: "Yoga",
      price: 24.0,
      oldPrice: 28.0,
      title: "Sun & Meditation",
      studio: "Ether & Stone",
      location: "11.8 mi",
      time: "8:30am - 9:30am PDT",
      trainer: "Jes Nunn",
      rating: 4.5,
      reviews: 201,
    },
  ];

  const [location, setLocation] = useState("Select location");
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");
  const locationRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
            throw new Error("Failed to fetch location data");
          }

          const data = await response.json();
          const address = data.address || {};

          let locationParts = [
            address.city || address.town || address.village,
            address.state,
            address.country,
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
        setLocError(
          "Please enable location permissions in your browser settings"
        );
        console.error("Geolocation permission error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const topCategories = [
    "Pilates",
    "Barre",
    "Dance",
    "Circuit Training",
    "Yoga",
    "HIIT",
    "Strength",
    "Cardio",
    "Boxing",
    "Meditation",
  ];

  return (
    <div className="animate-fade-in bg-second mb-10 pb-10">
      {/* Hero Section */}
      <section
        className="relative text-gray-900"
        style={{
          backgroundImage: `url('https://www.mindbodyonline.com/explore/static/media/hero.9d2f31ee.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "30rem",
          height: "25rem",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center justify-center min-h-[400px] md:min-h-[600px]">
          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center animate-slide-up text-[#FCEEE5]">
            Discover the best in fitness & wellness
          </h1>
          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-xl md:max-w-2xl mx-auto text-center animate-slide-up text-[#FCEEE5]">
            Your new favorite studios, salons, and spas are just a search away.
          </p>
          {/* Search Bar with Location - Side by Side */}
          <div className="w-full max-w-lg sm:max-w-3xl mx-auto mb-6 md:mb-8 animate-slide-up flex flex-col sm:flex-row gap-2 bg-white rounded-lg shadow-lg">
            <div className="flex-1 relative flex items-center px-4">
              <span className="text-gray-400 mr-2">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full px-2 py-3 md:py-4 border-0 focus:outline-none text-gray-900 bg-transparent text-sm md:text-base"
              />
            </div>
            {/* Location Dropdown */}
            <div
              className="w-full sm:w-96 relative flex items-center px-4 border-t sm:border-t-0 sm:border-l border-gray-200"
              ref={locationRef}
            >
              <span className="text-gray-400 mr-2">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin"
                >
                  <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div
                className="w-full px-2 py-3 md:py-4 border-0 focus:outline-none text-primary-700 font-semibold bg-transparent cursor-pointer text-sm md:text-base"
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
                    <svg
                      width="30"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-navigation"
                    >
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    {locLoading ? "Detecting..." : "Use Current Location"}
                  </button>
                  {locError && (
                    <div className="text-red-500 px-6 pb-3 text-sm">
                      {locError}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button className="bg-primary hover:bg-primary-700 text-white px-4 md:px-6 flex items-center justify-center min-h-[48px]">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>
          {/* App CTA */}
          <div className="flex items-center gap-2 animate-slide-up">
            <FaApple className="text-xl md:text-2xl text-white" />
            <FaAndroid className="text-xl md:text-2xl text-white" />
            <span className="text-white font-semibold text-sm md:text-base">
              Get the app today
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-second py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
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
      {user && (
        <section className="bg-second pb-10 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left mb-8 md:mb-12">
              <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 capitalize">
                My Training Logs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
        </section>
      )}

      {/* Explore OutBox Section */}
      <section className="bg-second py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-10">
            Explore OutBox
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Fitness Card */}
            <div className="relative cursor-pointer hover:scale-105 transition-transform duration-300 flex-1 rounded-2xl overflow-hidden shadow-lg min-w-[300px] max-w-[400px]">
              <img
                src={fitness}
                alt="Fitness"
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <span className="text-white text-2xl font-bold drop-shadow-lg">
                  Fitness
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            {/* Wellness Card */}
            <div className="relative hover:scale-105 transition-transform duration-300 flex-1 cursor-pointer rounded-2xl overflow-hidden shadow-lg min-w-[300px] max-w-[400px]">
              <img
                src={wellness}
                alt="Wellness"
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <span className="text-white text-2xl font-bold drop-shadow-lg">
                  Wellness
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            {/* Liveness Card */}
            <div className="relative flex-1 hover:scale-105 transition-transform duration-300 cursor-pointer rounded-2xl overflow-hidden shadow-lg min-w-[300px] max-w-[400px]">
              <img
                src={liveness}
                alt="Liveness"
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <span className="text-white text-2xl font-bold drop-shadow-lg">
                  Liveness
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Sessions Section */}
      <section className="bg-second py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 capitalize">
            Top fitness Sessions
          </h2>
          <HorizontalScroll
            items={topCategories}
            renderItem={(cat) => (
              <div className="w-40 h-40 md:w-56 md:h-56 hover:bg-primary cursor-pointer flex items-center justify-center rounded-full bg-green-50 text-lg md:text-2xl font-semibold text-gray-800 shadow-md">
                {cat}
              </div>
            )}
          />
        </div>
      </section>

      {/* Featured Sessions */}
      <section className="bg-second py-10 md:py-16 pl-2 md:pl-4 pr-2 md:pr-14">
        <div className="mx-auto px-2 md:px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-2 md:gap-0">
            <h2 className="text-xl md:text-3xl font-bold capitalize pl-0 md:pl-14">
              Find your new favorite classes
            </h2>
            <Link
              to="/subscriptions"
              className="text-primary-600 font-semibold flex items-center gap-1 "
            >
              Show all (21) <span>&rarr;</span>
            </Link>
          </div>
          <HorizontalScroll
            items={featuredSessions}
            renderItem={(session) => <FeaturedSessionCard {...session} />}
            itemClass="mr-4 md:mr-6"
          />
        </div>
      </section>

      {/* Location near you Sessions */}
      <section className="bg-second py-10 md:py-16 pl-2 md:pl-4 pr-2 md:pr-14">
        <div className="mx-auto px-2 md:px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-2 md:gap-0">
            <h2 className="text-xl md:text-3xl font-bold capitalize pl-0 md:pl-14">
              Locations near you
            </h2>
            <Link
              to="/subscriptions"
              className="text-primary-600 font-semibold flex items-center gap-1 "
            >
              Show all (21) <span>&rarr;</span>
            </Link>
          </div>
          <HorizontalScroll
            items={featuredSessions}
            renderItem={(session) => <FeaturedSessionCard {...session} />}
            itemClass="mr-4 md:mr-6"
          />
        </div>
      </section>

      {/* Top Reviewed Deals Sessions */}
      <section className="bg-second py-10 md:py-16 pl-2 md:pl-4 pr-2 md:pr-14">
        <div className="mx-auto px-2 md:px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-2 md:gap-0">
            <h2 className="text-xl md:text-3xl font-bold capitalize pl-0 md:pl-14">
              Top Reviewed Deals
            </h2>
            <Link
              to="/subscriptions"
              className="text-primary-600 font-semibold flex items-center gap-1 "
            >
              Show all (21) <span>&rarr;</span>
            </Link>
          </div>
          <HorizontalScroll
            items={featuredSessions}
            renderItem={(session) => <FeaturedSessionCard {...session} />}
            itemClass="mr-4 md:mr-6"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-10 md:py-16 bg-second relative rounded-xl mx-auto w-[98%] md:w-[90%] max-w-[1200px] px-2 md:px-4 xl:px-32"
        data-name="Section.outBoxApp"
        style={{
          backgroundImage: `url('https://www.mindbodyonline.com/explore/static/media/mb-app-background-desktop.165fd981.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-0 md:px-4">
          <div className=" lg:ml-0 lg:mr-auto lg:pl-8 xl:pl-[35rem] 2xl:pl-32">
            <h6 className="mb-0 text-xs md:text-sm font-semibold">
              OutBox Fitness
            </h6>
            <h5 className="text-lg md:text-2xl font-bold mt-2 mb-2 md:mb-4">
              The best in wellness is at your fingertips
            </h5>
            <p className="mb-4 md:mb-6 text-sm md:text-base">
              Whatever you're seeking—from fitness to beauty & beyond—you'll
              find it on the OutBox app. Download to start your search.
            </p>
            <div className="w-full relative">
              <div className="flex">
                <div className="w-auto">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded flex items-center text-sm md:text-base"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    GET THE APP
                    <span aria-hidden="true" className="ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M12 15l-5-5h10l-5 5z" />
                      </svg>
                    </span>
                  </button>

                  {showDropdown && (
                    <div className="absolute mt-1 w-40 md:w-48 bg-white rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <a
                          href="#ios"
                          className="block px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100"
                        >
                          iOS App
                        </a>
                        <a
                          href="#android"
                          className="block px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Android App
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
