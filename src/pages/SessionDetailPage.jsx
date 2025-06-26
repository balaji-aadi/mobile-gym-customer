import React from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { ErrorMessage } from "formik";

const classData = {
  image: "/BookingImage.jpg",
  title: "Strength / Cardio Split",
  instructor: "Jessica Lambert",
  about:
    "Full Strength Training. A unique balance of work that involves groups. Focus is on body balance, strength to achieve the desired and holistic coordination. This class is designed to push your fitness level and build your core.",
  highlights: [
    { icon: "💧", label: "Asian-owned" },
    { icon: "🧼", label: "Veteran-owned" },
    { icon: "🅿️", label: "Women-owned" },
  ],
  // amenities: [
  //   { image: "/car.png", label: "Parking" },
  // Add more amenities as needed
  // ],
};

export default function SessionDetailPage() {
  const dummySlotOptions = [
    { label: "10:00 AM - 11:00 AM", value: "slot1" },
    { label: "11:00 AM - 12:00 PM", value: "slot2" },
  ];

  const dummyPetSizeOptions = [
    { label: "Small", value: "size1" },
    { label: "Medium", value: "size2" },
    { label: "Large", value: "size3" },
  ];

  // State for reviews pagination
  const [visibleReviews, setVisibleReviews] = React.useState(3);
  const reviewsPerPage = 3;

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + reviewsPerPage);
  };

  const hasMoreReviews = visibleReviews < dummyReviews.length;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Gym Info Header Section */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src="/logo/logo.png"
          alt="Gym Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="font-medium text-base">Inspired Life Fitness</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600 text-sm">Metzger, Tigard, OR</span>
        <span className="flex items-center ml-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-base">
              ★
            </span>
          ))}
        </span>
        <span className="text-xs text-gray-500 ml-2">1969 reviews</span>
      </div>
      {/* Top section: Image + Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        {/* <div className="md:w-1/2 w-full flex justify-center items-center">
          <img
            src={classData.image}
            alt="Class"
            className="rounded-lg object-cover w-full max-h-72"
          />
        </div> */}
        <div className="md:w-1/2 w-full flex justify-center items-center h-[350px]">
          <img
            src={classData.image}
            alt="Class"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Details + Form */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{classData.title}</h2>
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Instructor"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700 text-sm">
              {classData.instructor}
            </span>
          </div>
          {/* Formik Form */}
          <Formik
            initialValues={{ date: "", slotTime: "", petSize: "" }}
            onSubmit={(values) => {
              alert(
                `Booked for ${values.date} at ${values.slotTime} (Pet Size: ${values.petSize})`
              );
            }}
          >
            {(formik) => (
              <Form className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg shadow">
                <div className="flex gap-8">
                  <div className="w-full">
                    <InputField
                      type="date"
                      label="Date"
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      type="select"
                      label="Slot Time"
                      name="slotTime"
                      value={formik.values.slotTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      options={dummySlotOptions}
                    />
                    <ErrorMessage
                      name="slotTime"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
                <InputField
                  type="select"
                  label="Select Category"
                  name="petSize"
                  value={formik.values.petSize}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={dummyPetSizeOptions}
                  required
                />
                <ErrorMessage
                  name="petSize"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />

                <button
                  type="submit"
                  className="bg-black text-white rounded py-2 mt-2 hover:bg-gray-800"
                >
                  Book
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* About the class */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-3xl font-md mb-4">About the class</h3>
        <div>
          <div className="text-xs font-semibold tracking-widest text-gray-700 mb-2">
            DESCRIPTION
          </div>
          <DescriptionWithShowMore
            text={classData.aboutLong || classData.about}
          />
        </div>
      </div>
      <hr className="mt-10"></hr>
      {/* Highlights */}
      <div className="mt-8">
        <h4 className="text-3xl font-md mb-2">Highlights</h4>
        <div className="flex gap-16 justify-start items-center pb-2">
          <Highlights iconType="store" label="Asian-owned" />
          <Highlights iconType="badge" label="Veteran-owned" />
          <Highlights iconType="female" label="Women-owned" />
        </div>
      </div>
      <hr className="mt-10"></hr>

      {/* Amenities */}
      {/* <div className="mt-8">
        <h4 className="text-3xl font-md mb-2">Amenities</h4>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {classData.amenities.map((a, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center rounded-xl  min-w-[220px] max-w-[220px]"
            >
              <span className="text-lg  mt-5 font-semibold text-gray-800">
                {a.label}
              </span>

              {a.image ? (
                <img
                  src={a.image}
                  alt={a.label}
                  className="w-32 mt-10  h-24 object-contain mb-4"
                />
              ) : (
                <span className="text-7xl mb-4">{a.icon}</span>
              )}
            </div>
          ))}
        </div>
      </div> */}

      {/* Location Section */}
      <div className="mt-12">
        <h3 className="text-3xl font-semibold mb-4 ">Location</h3>
        <div className="flex flex-col gap-2 mb-4 mt-10">
          <div className="flex items-center gap-2 text-gray-700 text-base">
            {/* Phone icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-1.1 1.1a16.06 16.06 0 006.36 6.36l1.1-1.1a2 2 0 011.95-.45l1.2.3A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
              />
            </svg>
            (503) 729-0349
          </div>
          <div className="text-gray-800 text-base ">
            10121 Southwest Nimbus Avenue Suite C2, Tigard, OR 97223
          </div>
          <div className="text-gray-600 text-base ">Metzger</div>
        </div>
        <div className="w-full h-72 rounded-lg overflow-hidden border mt-10">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=10121+Southwest+Nimbus+Avenue+Suite+C2,+Tigard,+OR+97223&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <hr className="mt-8"></hr>
      {/* Reviews Section */}
      <div className="mt-16">
        {/* <h3 className="text-3xl font-semibold mb-6">Reviews</h3> */}
        <div className="flex flex-col gap-12">
          {dummyReviews.slice(0, visibleReviews).map((review, idx) => (
            <div key={idx} className="flex flex-col gap-2 border-b pb-8">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg text-gray-800">
                  {review.name}
                </span>
                <span className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating
                          ? "text-yellow-400 text-base"
                          : "text-gray-300 text-base"
                      }
                    >
                      ★
                    </span>
                  ))}
                </span>
              </div>
              <div className="text-gray-500 text-sm mb-1">{review.date}</div>
              <div className="text-gray-700 text-base mb-1">
                {review.classTitle} with {review.instructor}
              </div>
              {review.text && (
                <div className="text-gray-700 text-base mt-1">
                  {review.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 ">
          {hasMoreReviews ? (
            <button
              onClick={handleLoadMore}
              className=" text-custom-dark  px-6 py-2 rounded-lg "
            >
              Load More
            </button>
          ) : (
            <p className="text-gray-500 text-sm">No more reviews</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DescriptionWithShowMore({ text, maxChars = 250 }) {
  const [showMore, setShowMore] = React.useState(false);
  if (text.length <= maxChars) {
    return <p className="text-gray-700 text-base max-w-2xl">{text}</p>;
  }
  return (
    <p className="text-gray-700 text-base max-w-2xl">
      {showMore ? text : text.slice(0, maxChars) + "..."}
      {!showMore && (
        <button
          className="ml-1 text-gray-500 underline text-sm hover:text-black focus:outline-none"
          onClick={() => setShowMore(true)}
        >
          show more
        </button>
      )}
    </p>
  );
}

function Highlights({ iconType, label }) {
  let icon = null;
  const iconClass = "h-8 w-8 text-teal-500";
  if (iconType === "store") {
    icon = (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7V6a2 2 0 012-2h14a2 2 0 012 2v1M3 7l1.34 8.03A2 2 0 006.32 17h11.36a2 2 0 001.98-1.97L21 7M3 7h18"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V17M8 11V17M12 11V17"
        />
      </svg>
    );
  } else if (iconType === "badge") {
    icon = (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 17.657V21l-5-2-5 2v-3.343A8 8 0 1117 17.657z"
        />
        <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  } else if (iconType === "female") {
    icon = (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 13v7M9 20h6"
        />
      </svg>
    );
  }
  return (
    <div className="flex flex-col items-center min-w-[120px]">
      {icon}
      <span className="text-gray-500 text-base font-normal mt-2 tracking-wide">
        {label}
      </span>
    </div>
  );
}

// Dummy reviews data
const dummyReviews = [
  {
    name: "Cathy R",
    date: "September 5, 2024",
    rating: 5,
    classTitle: "Strength / Cardio Split",
    instructor: "Jessica Lamberger",
    text: "Coach Jess is fabulous!",
  },
  {
    name: "kirksey n",
    date: "July 3, 2024",
    rating: 5,
    classTitle: "Strength / Cardio Split",
    instructor: "Shawn Thurston",
    text: "",
  },
  {
    name: "Lorenzo C",
    date: "February 17, 2024",
    rating: 3,
    classTitle: "Strength / Cardio Split",
    instructor: "Jeff Walsh",
    text: "",
  },
  {
    name: "Sarah M",
    date: "January 15, 2024",
    rating: 5,
    classTitle: "Strength / Cardio Split",
    instructor: "Jessica Lamberger",
    text: "Amazing workout! Really pushed my limits and felt great afterwards.",
  },
  {
    name: "Mike T",
    date: "December 28, 2023",
    rating: 4,
    classTitle: "Strength / Cardio Split",
    instructor: "Shawn Thurston",
    text: "Great class, instructor was very motivating and helpful.",
  },
  {
    name: "Jennifer L",
    date: "December 10, 2023",
    rating: 5,
    classTitle: "Strength / Cardio Split",
    instructor: "Jeff Walsh",
    text: "Perfect balance of strength and cardio. Will definitely come back!",
  },
  {
    name: "David K",
    date: "November 22, 2023",
    rating: 4,
    classTitle: "Strength / Cardio Split",
    instructor: "Jessica Lamberger",
    text: "Challenging but rewarding workout. Instructor knows how to motivate.",
  },
  {
    name: "Lisa P",
    date: "November 8, 2023",
    rating: 5,
    classTitle: "Strength / Cardio Split",
    instructor: "Shawn Thurston",
    text: "Best fitness class I've ever taken! Highly recommend.",
  },
  {
    name: "Robert W",
    date: "October 30, 2023",
    rating: 3,
    classTitle: "Strength / Cardio Split",
    instructor: "Jeff Walsh",
    text: "Good workout, but a bit too intense for beginners.",
  },
];
