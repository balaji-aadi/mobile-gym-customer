// SessionCards.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const sessions = [
  {
    title: "Morning HIIT Blast",
    trainer: "Sarah Johnson",
    time: "7:00AM",
    location: "Central Park",
    rating: 4.9,
    status: "Activated",
    image:
      "https://images.unsplash.com/photo-1583454110551-21d1d9ab03ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Strength & Power",
    trainer: "Sarah Johnson",
    time: "6:00PM",
    location: "Central Park",
    rating: 4.9,
    status: "Activated",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Evening Cardio Burn",
    trainer: "Sarah Johnson",
    time: "5:00PM",
    location: "Central Park",
    rating: 4.8,
    status: "Activated",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bcfc0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Core Stability",
    trainer: "Sarah Johnson",
    time: "9:00AM",
    location: "Central Park",
    rating: 4.7,
    status: "Activated",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
  },
];

const MySessionPage = () => {
  return (
    // <div className="bg-custom-cream min-h-screen p-6 flex justify-center">
    <div className="  rounded-xl  p-6 w-full mx-auto mb-20 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6 text-center">My Sessions</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden w-full sm:w-[48%] lg:w-[30%]"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySessionPage;
