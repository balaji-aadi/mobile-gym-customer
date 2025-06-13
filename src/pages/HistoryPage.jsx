import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, User, Filter, Search, Download, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sessionHistory = [
    {
      id: 1,
      title: 'Morning HIIT Blast',
      trainer: 'Sarah Johnson',
      date: '2024-01-18',
      time: '7:00 AM',
      duration: '45 min',
      location: 'Central Park',
      status: 'completed',
      rating: 5,
      feedback: 'Amazing session! Really pushed me to my limits.',
      price: 25,
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Strength & Power',
      trainer: 'Mike Chen',
      date: '2024-01-16',
      time: '6:00 PM',
      duration: '60 min',
      location: 'Downtown Gym',
      status: 'completed',
      rating: 4,
      feedback: 'Great workout, learned proper form for deadlifts.',
      price: 35,
      image: 'https://images.pexels.com/photos/1552108/pexels-photo-1552108.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Sunset Yoga Flow',
      trainer: 'Emma Davis',
      date: '2024-01-14',
      time: '7:30 PM',
      duration: '50 min',
      location: 'Riverside Park',
      status: 'completed',
      rating: 5,
      feedback: 'So relaxing and peaceful. Perfect end to the day.',
      price: 20,
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Cardio Dance Party',
      trainer: 'Maria Santos',
      date: '2024-01-12',
      time: '6:30 PM',
      duration: '45 min',
      location: 'Studio Downtown',
      status: 'cancelled',
      price: 22,
      image: 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Functional CrossTraining',
      trainer: 'Alex Rodriguez',
      date: '2024-01-20',
      time: '8:00 AM',
      duration: '55 min',
      location: 'Sports Complex',
      status: 'upcoming',
      price: 30,
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const bookingHistory = [
    {
      id: 1,
      sessionTitle: 'Morning HIIT Blast',
      bookingDate: '2024-01-15',
      sessionDate: '2024-01-18',
      status: 'completed',
      amount: 25,
      bookingId: 'BK001'
    },
    {
      id: 2,
      sessionTitle: 'Strength & Power',
      bookingDate: '2024-01-12',
      sessionDate: '2024-01-16',
      status: 'completed',
      amount: 35,
      bookingId: 'BK002'
    },
    {
      id: 3,
      sessionTitle: 'Functional CrossTraining',
      bookingDate: '2024-01-18',
      sessionDate: '2024-01-20',
      status: 'confirmed',
      amount: 30,
      bookingId: 'BK003'
    }
  ];

  const filteredSessions = sessionHistory.filter(session => {
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">History & Bookings</h1>
        <p className="text-gray-600">View your past sessions, bookings, and activity history</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'sessions', label: 'Session History' },
            { id: 'bookings', label: 'Booking History' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Session History Tab */}
      {activeTab === 'sessions' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search sessions or trainers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {filteredSessions.map(session => (
              <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:w-48">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{session.title}</h3>
                        <p className="text-gray-600 flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>with {session.trainer}</span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                        <span className="text-lg font-bold text-primary-600">${session.price}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(session.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.time} ({session.duration})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{session.location}</span>
                      </div>
                      {session.rating && (
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            {renderStars(session.rating)}
                          </div>
                        </div>
                      )}
                    </div>

                    {session.feedback && session.status === 'completed' && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700 italic">"{session.feedback}"</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {session.status === 'completed' && (
                        <>
                          <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm">
                            <Download className="h-4 w-4" />
                            <span>Download Receipt</span>
                          </button>
                          <button className="flex items-center space-x-1 text-secondary-600 hover:text-secondary-700 text-sm">
                            <MessageCircle className="h-4 w-4" />
                            <span>Contact Trainer</span>
                          </button>
                        </>
                      )}
                      {session.status === 'upcoming' && (
                        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSessions.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No sessions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Booking History Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Booking History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Session
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Session Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookingHistory.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.bookingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.sessionTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(booking.bookingDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(booking.sessionDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${booking.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-primary-600 hover:text-primary-700 mr-4">
                        View Details
                      </button>
                      {booking.status === 'completed' && (
                        <button className="text-secondary-600 hover:text-secondary-700">
                          Download Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;