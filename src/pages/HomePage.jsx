import React from "react";
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
import { FaStar } from "react-icons/fa";
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

  return (
    <div className="animate-fade-in bg-custom-cream">
      {/* Hero Section */}
      <section className="relative  bg-primary  text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Your Fitness Journey Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-up">
              Mobile gym sessions that come to you. Anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/sessions"
                className="bg-custom-coral text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <span>Book Your Session</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/locations"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </Link>
            </div>
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
