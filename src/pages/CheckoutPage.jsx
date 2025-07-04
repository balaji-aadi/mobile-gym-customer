import  { useState } from "react";
import trainer from "../Assests/trainer.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import StripePayment from "./Payment/StripePayment";
import Description from "../components/Description";


function formatTimeTo12Hour(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function CheckoutPage() {
  const location = useLocation();
  const [isPaymentPage, setisPaymentPage] = useState(false);

  const classData = location.state?.classData || {};


  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <div className="w-full max-w-6xl flex mt-5 flex-col md:flex-row justify-center gap-8 ">
        {/* Left: section */}

        <div className="w-full md:w-1/2">
          <img
            src={classData?.media || trainer}
            alt={classData?.name || "Session Image"}
            className="w-full h-72 object-cover object-center rounded mb-4"
          />
          <div className="text-lg tracking-widest text-gray-400 mb-1">
            {classData?.sessionType?.sessionName?.toUpperCase() || "SESSION"}
          </div>
          <div className="text-xl font-medium mb-1 capitalize ">
            {classData?.name || "Session Title"}
          </div>
          <div className="text-xs font-medium mb-1 capitalize ">
            <Description description={classData?.description} />
          </div>
          <div className="text-md text-gray-500 mb-2">
            {classData?.date?.length > 0 && (
              <>
                <div>
                  {new Date(classData.date[0]).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {classData?.date?.[1] && (
                    <>
                      {" "}
                      -{" "}
                      {new Date(classData.date[1]).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  )}
                </div>
                <div>
                  {/* <span className="font-semibold">Time:</span>{" "} */}
                  {formatTimeTo12Hour(classData.startTime)} -{" "}
                  {formatTimeTo12Hour(classData.endTime)}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={
                classData?.trainer?.profile_image ||
                "https://randomuser.me/api/portraits/men/32.jpg"
              }
              alt="Instructor"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-[10px] uppercase text-gray-400">
                Instructor
              </div>
              <div className="text-xs">
                {classData?.trainer?.first_name} {classData?.trainer?.last_name}
              </div>
            </div>
          </div>
          <hr className="mt-5 mb-5" />
        </div>

        {/* Right: section */}
        <div className="w-full md:w-1/2 bg-white rounded p-6 shadow-sm flex flex-col gap-6">
          {/* Offer  sections  start*/}
          <h3 className="ml-5  text-xl font-bold">Order Summary</h3>
          <div className="bg-[#fafbfc] rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              {/* <span className="font-medium">$178.00</span> */}
              <span>AED {classData?.price}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Tax</span>
              {/* <span className="font-medium">$17.80</span> */}
              <span className="font-medium">0</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>

            <div className="flex justify-between font-medium text-lg">
              <span>Total:</span>
              <span>AED {classData?.price}</span>
            </div>
            <hr className="mt-3 "></hr>
          </div>
          {/* <div className="h-2 "></div> */}

          <div className="bg-[#fafbfc] rounded-lg shadow-sm p-4 mb-4 border border-gray-100">
            <div className="flex items-center mb-2 text-sm text-gray-700">
              <span className="material-icons text-base mr-2 text-blue-500">
                local_offer
              </span>
              Have a promo code?
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
              />
              <button className="bg-custom-dark text-white px-5 py-2 rounded font-medium text-sm ">
                Apply
              </button>
            </div>
            {/* Pay Now Button */}
            <button
              className="w-full bg-custom-dark text-white py-3 rounded font-semibold text-lg  mt-4"
              onClick={() => setisPaymentPage(true)}
            >
              Pay Now
            </button>
          </div>

          {isPaymentPage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 relative">
                <StripePayment
                  setisPaymentPage={setisPaymentPage}
                  isPaymentPage={isPaymentPage}
                  classData={classData}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-10 md:mt-12 w-full max-w-6xl mx-auto">
        <h3 className="text-xl sm:text-3xl font-semibold mb-3 sm:mb-4">
          Location
        </h3>
        <div className="flex flex-col gap-1 sm:gap-2 mb-3 sm:mb-4 mt-6 sm:mt-10">
          <div className="flex items-center gap-1 sm:gap-2 text-gray-700 text-sm sm:text-base">
            {/* Phone icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 inline-block"
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
            {classData?.trainer?.phone_number || "(503) 729-0349"}
          </div>
          <div className="text-gray-800 text-sm sm:text-base">
            {classData?.streetName ||
              "10121 Southwest Nimbus Avenue Suite C2, Tigard, OR 97223"}
          </div>
          <div className="text-gray-600 text-sm sm:text-base">
            {classData?.city?.name || "Metzger"}
          </div>
        </div>
        <div className="w-full h-40 xs:h-52 sm:h-64 md:h-72 rounded-lg overflow-hidden border mt-6 sm:mt-10">
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
    </div>
  );
}
