import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, Star, ArrowLeft } from 'lucide-react';

// Example static data (replace with API call or context as needed)
const dummySessions = [
  {
    id: '1',
    title: 'HIIT Burnout',
    image: '/images/hiit.jpg',
    price: '$15',
    trainer: 'Alex Fitman',
    time: '6:00 AM - 7:00 AM',
    spots: 10,
    rating: 4.7,
    description: 'An intense HIIT session to burn fat and build endurance. Suitable for all levels.',
  },
  // Add more sessions here...
];

const SessionDetailPage = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const found = dummySessions.find((s) => s.id === id);
    setSession(found || null);
  }, [id]);

  if (!session) {
    return (
      <div className="h-[100vh] max-w-4xl mx-auto px-4 py-10 text-center text-gray-600">
        <p>Session not found.</p>
        <Link to="/sessions" className="text-primary-600 hover:underline">
          Go back to sessions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/sessions" className="flex items-center text-sm text-gray-600 hover:text-primary-600 mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to sessions
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img src={session.image} alt={session.title} className="w-full h-64 object-cover" />

        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{session.title}</h1>
            <div className="bg-primary-100 text-primary-600 px-4 py-1 rounded-full font-semibold text-sm">
              {session.price}
            </div>
          </div>

          <p className="text-gray-700 mb-4">with {session.trainer}</p>

          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{session.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{session.spots} spots</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{session.rating}</span>
            </div>
          </div>

          <p className="text-gray-800 leading-relaxed mb-6">{session.description}</p>

          <div className="flex justify-center">
            <Link className="bg-custom-dark hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition"
          to="/payment">
            Book This Session
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailPage;
