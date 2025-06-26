import React, { useState } from "react";

const SubscriptionsPage = () => {
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState("All");
    const [lastMinuteOffers, setLastMinuteOffers] = useState(true);
    const [showMoreActivities, setShowMoreActivities] = useState(false);
    const [selectedTime, setSelectedTime] = useState("Anytime");
    const [selectedDistance, setSelectedDistance] = useState("Auto (25 miles)");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("24");

    const activities = [
        "Yoga",
        "Barre",
        "Pilates",
        "Cycling",
        "Bootcamp",
        "Meditation",
        "Strength-Training",
        "Crossfit",
        "HIIT",
        "Dance",
        "Boxing",
        "Martial Arts",
        "Swimming",
        "Running",
        "Functional Training",
        "Stretching",
        "Aerial Yoga",
        "Hot Yoga",
    ];

    const experienceTypes = ["All", "Virtual", "In-person"];
    const timeOptions = [
        "Anytime",
        "Early Morning (Before 08:00 AM)",
        "Morning (08:00 AM to 12:00 PM)",
        "Afternoon (12:00 PM to 04:00 PM)",
        "Evening (04:00 PM to 07:00 PM)",
        "Night (After 07:00 PM)",
    ];
    const distanceOptions = [
        "Auto (25 miles)",
        "1 mile",
        "5 miles",
        "10 miles",
        "15 miles",
        "50 miles",
        "50+ miles",
    ];

    const classes = [
        {
            type: "CIRCUIT TRAINING",
            title: "Total Body Workout - High Intensity Circuit",
            studio: "Inspired Life Fitness",
            location: "Metzger | 7.4 mi",
            time: "5:15am - 6:15am PDT",
            trainer: "Tiffany Thurston",
            rating: 5,
            reviews: 1969,
            price: 26.25,
            oldPrice: 35.0,
            image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg",
        },
        {
            type: "CIRCUIT TRAINING",
            title: "Total Body Workout - Strength Focus",
            studio: "Inspired Life Fitness",
            location: "Metzger | 7.4 mi",
            time: "6:30am - 7:30am PDT",
            trainer: "Tiffany Thurston",
            rating: 5,
            reviews: 1969,
            price: 26.25,
            oldPrice: 35.0,
            image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg",
        },
        {
            type: "TWIST YOGA",
            title: "In-studio 45 min. Yoga Flow",
            studio: "Twist Yoga",
            location: "Walluga | 7.5 mi",
            time: "7:30am - 8:15am PDT",
            trainer: "Ali Matt",
            rating: 5,
            reviews: 1104,
            price: 22.0,
            oldPrice: 25.0,
            image: "https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg",
        },
        {
            type: "YOGA",
            title: "Sun & Meditation",
            studio: "Ether & Stone",
            location: "11.8 mi",
            time: "8:30am - 9:30am PDT",
            trainer: "Jes Nunn",
            rating: 4.5,
            reviews: 201,
            price: 24.0,
            oldPrice: 28.0,
            image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
        },
        {
            type: "TWIST YOGA",
            title: "In-Studio Power Yoga",
            studio: "Twist Yoga",
            location: "Walluga | 7.5 mi",
            time: "9:30am - 10:30am PDT",
            trainer: "Carlo Bunting",
            rating: 5,
            reviews: 1000,
            price: 22.0,
            oldPrice: 25.0,
            image: "https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg",
        },
        {
            type: "YOGA",
            title: "Restorative COREYOGA",
            studio: "CORE Fitness + Yoga",
            location: "20.2 mi",
            time: "10:30am - 11:30am PDT",
            trainer: "Kristen Hebe",
            rating: 5,
            reviews: 154,
            price: 20.0,
            oldPrice: 24.0,
            image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
        },
    ];

    const filteredClasses = classes.filter((classItem) => {
        // Filter by search query
        if (
            searchQuery &&
            !classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !classItem.studio.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !classItem.trainer.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }

        // Filter by selected activities
        if (
            selectedActivities.length > 0 &&
            !selectedActivities.some((activity) =>
                classItem.type.toLowerCase().includes(activity.toLowerCase())
            )
        ) {
            return false;
        }

        // Filter by time
        if (selectedTime !== "Anytime") {
            const timeRange = selectedTime.match(/\d{1,2}:\d{2}\s*[AP]M/g);
            if (timeRange) {
                const [startTime, endTime] = timeRange;
                const classStartTime = classItem.time.split(" - ")[0];
                if (
                    !(
                        classStartTime >= startTime &&
                        classStartTime <= endTime
                    )
                ) {
                    return false;
                }
            } else if (selectedTime.includes("Before")) {
                const cutoffTime = selectedTime.match(/\d{1,2}:\d{2}\s*[AP]M/)[0];
                const classStartTime = classItem.time.split(" - ")[0];
                if (classStartTime >= cutoffTime) return false;
            } else if (selectedTime.includes("After")) {
                const cutoffTime = selectedTime.match(/\d{1,2}:\d{2}\s*[AP]M/)[0];
                const classStartTime = classItem.time.split(" - ")[0];
                if (classStartTime <= cutoffTime) return false;
            }
        }

        return true;
    });

    const visibleActivities = showMoreActivities ? activities : activities.slice(0, 8);

    const daysInMonth = 30;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Top bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0 flex-wrap">
                        <button className="px-4 py-2 bg-gray-200 rounded-full font-semibold text-sm">
                            CLASSES
                        </button>
                        <button className="px-4 py-2 bg-transparent rounded-full font-semibold text-sm text-gray-500">
                            STUDIOS
                        </button>
                        <button className="px-4 py-2 bg-transparent rounded-full font-semibold text-sm text-gray-500">
                            INSTRUCTORS
                        </button>
                        <span className="ml-6 text-gray-500 text-sm">
                            DATE{" "}
                            <span className="font-semibold text-gray-700 ml-2">
                                Tuesday, 24 Jun '25
                            </span>
                        </span>
                        <span className="ml-6 text-gray-500 text-sm">
                            TIME{" "}
                            <span className="font-semibold text-gray-700 ml-2">
                                Anytime, 04:00 AM to 11:30 PM
                            </span>
                        </span>
                        <span className="ml-6 text-gray-500 text-sm">
                            DISTANCE{" "}
                            <span className="font-semibold text-gray-700 ml-2">
                                Auto (25 miles)
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">
                            Home / Fitness / Classes /{" "}
                        </span>
                        <span className="text-gray-700 font-semibold text-sm">
                            1-12 results of 21
                        </span>
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    Best Classes in Portland, OR
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold text-lg">FILTERS</span>
                                <button className="text-sm text-primary-600 font-semibold">
                                    Clear all
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full p-2 border border-gray-300 rounded-lg pl-8"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <svg
                                        className="absolute left-2 top-3 h-4 w-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="font-semibold text-gray-800 mb-2">Suggested</div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={lastMinuteOffers}
                                        onChange={() => setLastMinuteOffers(!lastMinuteOffers)}
                                        className="accent-primary-600"
                                    />
                                    <span className="text-gray-700">Last minute offers</span>
                                </label>
                            </div>

                            <div className="mb-6">
                                <div className="font-semibold text-gray-800 mb-2">
                                    Activities
                                </div>
                                {visibleActivities.map((activity) => (
                                    <label
                                        key={activity}
                                        className="flex items-center gap-2 mb-1 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedActivities.includes(activity)}
                                            onChange={() =>
                                                setSelectedActivities((prev) =>
                                                    prev.includes(activity)
                                                        ? prev.filter((a) => a !== activity)
                                                        : [...prev, activity]
                                                )
                                            }
                                            className="accent-primary-600"
                                        />
                                        <span className="text-gray-700">{activity}</span>
                                    </label>
                                ))}
                                <button
                                    className="text-primary-600 text-sm mt-2"
                                    onClick={() => setShowMoreActivities(!showMoreActivities)}
                                >
                                    {showMoreActivities ? "Show less" : "+16 more"}
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="font-semibold text-gray-800 mb-2">Time</div>
                                {timeOptions.map((time) => (
                                    <label
                                        key={time}
                                        className="flex items-center gap-2 mb-1 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="time"
                                            checked={selectedTime === time}
                                            onChange={() => setSelectedTime(time)}
                                            className="accent-primary-600"
                                        />
                                        <span className="text-gray-700">{time}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mb-6">
                                <div className="font-semibold text-gray-800 mb-2">Distance</div>
                                {distanceOptions.map((distance) => (
                                    <label
                                        key={distance}
                                        className="flex items-center gap-2 mb-1 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="distance"
                                            checked={selectedDistance === distance}
                                            onChange={() => setSelectedDistance(distance)}
                                            className="accent-primary-600"
                                        />
                                        <span className="text-gray-700">{distance}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mb-6">
                                <div className="font-semibold text-gray-800 mb-2">Calendar</div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                        <div key={day} className="text-gray-500">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1">
                                    {days.map((day) => (
                                        <button
                                            key={day}
                                            className={`p-2 rounded-full text-sm ${day.toString() === selectedDate
                                                    ? "bg-primary-600 text-white"
                                                    : "hover:bg-gray-100"
                                                }`}
                                            onClick={() => setSelectedDate(day.toString())}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="font-semibold text-lg mb-2">
                                Try ClassPass for free
                            </div>
                            <p className="text-gray-700 mb-4">
                                Get 1 month free to book the best studio fitness classes near you.
                            </p>
                            <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold">
                                GET 1 MONTH FREE
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-gray-700">
                                {filteredClasses.length} classes found
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 text-sm">Sort By</span>
                                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                    <option>Relevance</option>
                                    <option>Price</option>
                                    <option>Rating</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredClasses.map((classItem, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow overflow-hidden"
                                >
                                    <div className="relative h-40">
                                        <img
                                            src={classItem.image}
                                            alt={classItem.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold">
                                            {classItem.type}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-bold text-lg">{classItem.title}</div>
                                            <div className="text-right">
                                                <span className="font-bold text-lg">${classItem.price}</span>
                                                {classItem.oldPrice && (
                                                    <span className="text-sm text-gray-500 line-through ml-1">
                                                        ${classItem.oldPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-gray-700 mb-2">
                                            {classItem.studio} | {classItem.location}
                                        </div>
                                        <div className="text-gray-700 mb-3">
                                            {classItem.time} w/ {classItem.trainer}
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex text-yellow-400 mr-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>★</span>
                                                ))}
                                            </div>
                                            <span className="text-gray-500 text-sm">
                                                {classItem.reviews} reviews
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsPage;