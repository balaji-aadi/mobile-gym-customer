import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDistanceFilter from "../components/CustomDistanceFilter";
import { Link, useLocation, useParams } from "react-router-dom";
import { useLoading } from "../loader/LoaderContext";
import { CategoryApi } from "../Api/Category.api";

const sampleInstructors = [
    {
        name: "Mariela Carrod...",
        activities: "YOGA",
        location: "South Beach",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        name: "Tricksee",
        activities: "DANCE | POLE FITNESS",
        location: "Miss Fit Academy",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        name: "Odyssey",
        activities: "POLE FITNESS",
        location: "Miss Fit Academy",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        name: "Moxie",
        activities: "POLE FITNESS",
        location: "Miss Fit Academy",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        name: "Susan",
        activities: "CYCLING | OTHER | ...",
        location: "NuYu Revolution",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        name: "Kristina McMa...",
        activities: "INTERVAL TRAINING...",
        location: "BOARD30 Ponte Ve...",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    // Add more as needed
];

const SubscriptionsPage = () => {
    const [selectedTab, setSelectedTab] = useState("classes");
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [showMoreActivities, setShowMoreActivities] = useState(false);
    const [selectedTime, setSelectedTime] = useState("Anytime");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDistance, setSelectedDistance] = useState("Auto (25 miles)");
    const [classPage, setClassPage] = useState(1);
    const [instructorPage, setInstructorPage] = useState(1);
    const classesPerPage = 6;
    const instructorsPerPage = 6;
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("name");
    const { handleLoading } = useLoading();
    const [classes, setClasses] = useState([])

    // {
    //   id: 1,
    //   type: "CIRCUIT TRAINING",
    //   name: "Total Body Workout - High Intensity Circuit",
    //   location: "Metzger | 7.4 mi",
    //   time: "5:15am - 6:15am PDT",
    //   trainer: "Tiffany Thurston",
    //   rating: 5,
    //   reviews: 1969,
    //   price: 26.25,
    //   image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg",
    // },

    console.log("id>>>", id)
    console.log("name>>>", type)


    const getAllCategoriesById = async () => {
        handleLoading(true);
        try {
            const res = await CategoryApi.getAllCategoriesById(id);
            setClasses(res?.data?.data);
        } catch (error) {
            console.log("Error", error);
        } finally {
            handleLoading(false);
        }
    };

    useEffect(() => {
        if (type === "cat") {
            getAllCategoriesById()
        }
    }, [type])

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

    const filteredClasses = classes.filter((classItem) => {
        if (
            searchQuery &&
            !classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !classItem.trainer.first_name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }
        if (
            selectedActivities.length > 0 &&
            !selectedActivities.some((activity) =>
                classItem.categoryId?.cName.toLowerCase().includes(activity.toLowerCase())
            )
        ) {
            return false;
        }

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
    const paginatedClasses = filteredClasses.slice((classPage - 1) * classesPerPage, classPage * classesPerPage);
    const totalClassPages = Math.ceil(filteredClasses.length / classesPerPage);

    const filteredInstructors = sampleInstructors.filter((inst) =>
        searchQuery === "" ||
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.activities.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const paginatedInstructors = filteredInstructors.slice((instructorPage - 1) * instructorsPerPage, instructorPage * instructorsPerPage);
    const totalInstructorPages = Math.ceil(filteredInstructors.length / instructorsPerPage);

    const visibleActivities = showMoreActivities ? activities : activities.slice(0, 8);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Top bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center gap-4 mb-4 md:mb-0 flex-wrap">
                        <button
                            className={`px-4 py-2 rounded-full font-semibold text-sm ${selectedTab === "classes" ? "bg-gray-200" : "bg-transparent text-gray-500"}`}
                            onClick={() => setSelectedTab("classes")}
                        >
                            CLASSES
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full font-semibold text-sm ${selectedTab === "instructors" ? "bg-gray-200" : "bg-transparent text-gray-500"}`}
                            onClick={() => setSelectedTab("instructors")}
                        >
                            INSTRUCTORS
                        </button>
                        {/* Date Filter */}
                        <div className="flex items-center gap-2 ml-2">
                            <CustomDatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
                        </div>
                        {/* Distance Filter */}
                        <div className="flex items-center gap-2 ml-2">
                            <CustomDistanceFilter
                                value={selectedDistance}
                                onChange={setSelectedDistance}
                                options={["Auto (25 miles)", "1 mile", "5 miles", "10 miles", "15 miles", "50 miles", "50+ miles"]}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">
                            Home / Fitness / {selectedTab === "classes" ? "Classes" : "Instructors"} /
                        </span>
                        <span className="text-gray-700 font-semibold text-sm">
                            {selectedTab === "classes"
                                ? `${(classPage - 1) * classesPerPage + 1}-${Math.min(classPage * classesPerPage, filteredClasses.length)} results of ${filteredClasses.length}`
                                : `${(instructorPage - 1) * instructorsPerPage + 1}-${Math.min(instructorPage * instructorsPerPage, filteredInstructors.length)} results of ${filteredInstructors.length}`
                            }
                        </span>
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    Best {selectedTab === "classes" ? "Classes" : "Instructors"} in India, OR Dubai
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    {selectedTab === "classes" && (
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
                            </div>
                        </aside>
                    )}

                    {/* Main Content */}
                    <main className="flex-1 mb-10">
                        {selectedTab === "classes" ? (
                            <>
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
                                    {paginatedClasses.map((classItem, index) => (
                                        <Link
                                            key={index}
                                            className="bg-white rounded-xl shadow overflow-hidden cursor-pointer"
                                            to={`/sessions/${classItem._id}`}
                                        >
                                            <div className="relative h-40">
                                                <img
                                                    src={classItem.media}
                                                    alt={classItem.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold">
                                                    {classItem.categoryId?.cName}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-bold text-lg">{classItem.name}</div>
                                                    <div className="text-right">
                                                        <span className="font-bold text-lg">${classItem.price}</span>
                                                    </div>
                                                </div>
                                                <div className="text-gray-700 mb-2">
                                                    {classItem.streetName}
                                                </div>
                                                <div className="text-gray-700 mb-3">
                                                    {classItem.startTime} - {classItem.endTime} w/ {classItem.trainer?.first_name || 'Trainer'}
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="flex text-yellow-400 mr-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i}>★</span>
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-500 text-sm">
                                                        {/* Assuming reviews count is not in your data */}
                                                        {/* {classItem.reviews || 0} reviews */}
                                                        0 reviews
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Pagination
                                    currentPage={classPage}
                                    totalPages={totalClassPages}
                                    onPageChange={setClassPage}
                                />
                            </>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {paginatedInstructors.map((inst, idx) => (
                                        <div key={idx} className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
                                            <img src={inst.image} alt={inst.name} className="w-20 h-20 rounded-full object-cover" />
                                            <div>
                                                <div className="font-bold text-lg">{inst.name}</div>
                                                <div className="uppercase text-xs font-semibold text-gray-600">{inst.activities}</div>
                                                <div className="text-gray-500 text-sm">{inst.location}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Pagination
                                    currentPage={instructorPage}
                                    totalPages={totalInstructorPages}
                                    onPageChange={setInstructorPage}
                                />
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsPage;