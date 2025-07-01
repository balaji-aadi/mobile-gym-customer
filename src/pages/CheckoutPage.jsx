import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import trainer from "../Assests/trainer.jpg";

const steps = [
  {
    title: "Personal Information",
    subtitle: "STEP 1 OF 5",
    content: ({ onClose }) => (
      <Formik
        initialValues={{
          phone: "",
          name: "Seema Sahu",
          email: "seemacse1@gmail.com",
        }}
        onSubmit={(_, { setSubmitting }) => {
          setSubmitting(false);
          onClose();
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="mt-4">
            <div className="mb-1 text-gray-700">
              {values.name} · {values.email}
            </div>
            <label className="block text-sm mb-1" htmlFor="phone">
              Phone Number
            </label>
            <Field
              id="phone"
              name="phone"
              placeholder="(---) --- ----"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-custom-dark text-white px-4 py-3 rounded font-medium tracking-widest text-xs uppercase cursor-pointer"
            >
              Add Number
            </button>
          </Form>
        )}
      </Formik>
    ),
    summary: <span>Seema Sahu · seemacse1@gmail.com</span>,
  },
  {
    title: "Select a pricing option",
    subtitle: "STEP 3 OF 5",
    content: ({ onClose }) => {
      const pricingOptions = [
        {
          label: "50% off first month of Platinum",
          value: "platinum-50",
          price: "-$69.50",
        },
        {
          label: "Drop In: Flexible Pricing",
          value: "dropin-flex",
          price: "$22.00",
          originalPrice: "$25.00",
        },
        {
          label: "Drop-in",
          value: "dropin",
          price: "$25.00",
        },
        {
          label: "New Student Special - 21 Days for $59",
          value: "student-special",
          price: "$59.00",
        },
        {
          label: "Young Adult/Teen 10 class card",
          value: "teen-10card",
          price: "$120.00",
        },
        {
          label: "10 Class Card",
          value: "10card",
          price: "$199.00",
        },
      ];
      return (
        <Formik
          initialValues={{ pricingOption: pricingOptions[0].value }}
          onSubmit={(_, { setSubmitting }) => {
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="mt-4">
              <label className="block text-sm mb-2 font-medium">
                PRICING OPTION
              </label>
              <div className="relative mb-4">
                <Field
                  as="select"
                  name="pricingOption"
                  className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white text-gray-900 font-medium"
                  style={{ fontSize: "1rem" }}
                >
                  {pricingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}{" "}
                      {option.originalPrice
                        ? `was ${option.originalPrice}`
                        : ""}{" "}
                      {option.price}
                    </option>
                  ))}
                </Field>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  ▼
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-custom-dark text-white px-4 py-3 rounded font-medium tracking-widest text-xs uppercase cursor-pointer"
              >
                Select Option
              </button>
            </Form>
          )}
        </Formik>
      );
    },
    summary: <span>Pricing option selected</span>,
  },
  {
    title: "Pay with",
    subtitle: "STEP 4 OF 5",
    content: () => (
      <div className="flex items-center mt-2">
        <span className="material-icons mr-2 text-gray-500">credit_card</span>
        <button className="border border-gray-300 rounded px-6 py-2">
          Select
        </button>
      </div>
    ),
    summary: (
      <span className="flex items-center">
        <span className="material-icons mr-2 text-gray-500">credit_card</span>
        Card
      </span>
    ),
  },
  {
    title: "Review your order",
    subtitle: "STEP 5 OF 5",
    content: () => (
      <div className="text-gray-400 text-sm">Order review goes here.</div>
    ),
    summary: null,
  },
];

// Dummy summary data
const dummySummaryData = {
  image: trainer,
  category: "YOGA",
  title: "At home 45 min. Yoga",
  time: "Friday, Jun 27 from 6:00am - 6:45am PDT",
  instructor: {
    name: "Adam Latham",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  location: {
    studio: "Twist Yoga",
    address: [
      "3970 Mercantile Drive",
      "100, Lake Oswego, OR",
      "97035",
      "Walluga",
    ],
  },
  logo: "https://i.ibb.co/0j1Yw1v/logo.png",
  offer: "50% OFF FIRST MONTH OF PLATINUM",
  originalPrice: "$-69.50",
  total: "$-69.50",
};

export default function CheckoutPage() {
  const [openStep, setOpenStep] = useState(null);

  return (
    <div className="min-h-screen bg-[#fcfcfa] flex flex-col items-center py-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left: Steps */}
        <div className="flex-1 bg-white rounded p-8 shadow-sm">
          <h1 className="text-2xl font-semibold mb-8">Checkout</h1>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="mb-6 border-b last:border-b-0 border-gray-200 pb-6 last:pb-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2
                    className={`text-xl font-semibold ${
                      idx === 4 ? "text-gray-400" : ""
                    }`}
                  >
                    {idx + 1}. {step.title}
                  </h2>
                  <div className="text-xs tracking-widest text-gray-400 mt-1">
                    {step.subtitle}
                  </div>
                  {step.summary && !openStep?.[idx] && (
                    <div className="mt-2 text-sm text-gray-700">
                      {step.summary}
                    </div>
                  )}
                </div>
                <button
                  className="text-sm text-gray-500 hover:underline focus:outline-none"
                  onClick={() =>
                    setOpenStep((s) => ({ ...s, [idx]: !s?.[idx] }))
                  }
                >
                  Edit
                </button>
              </div>
              {openStep?.[idx] && (
                <div className="mt-4">
                  {typeof step.content === "function"
                    ? step.content({
                        onClose: () =>
                          setOpenStep((s) => ({ ...s, [idx]: false })),
                      })
                    : step.content}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Right: Summary */}
        <div className="w-full md:w-96 bg-white rounded p-6 shadow-sm flex flex-col gap-6">
          <div>
            <img
              src={dummySummaryData.image}
              alt={dummySummaryData.category}
              className="w-full h-52 object-cover rounded mb-4"
            />
            <div className="text-xs tracking-widest text-gray-400 mb-1">
              {dummySummaryData.category}
            </div>
            <div className="font-medium mb-1">{dummySummaryData.title}</div>
            <div className="text-xs text-gray-500 mb-2">
              {dummySummaryData.time}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src={dummySummaryData.instructor.avatar}
                alt="Instructor"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-[10px] uppercase text-gray-400">
                  Instructor
                </div>
                <div className="text-xs">
                  {dummySummaryData.instructor.name}
                </div>
              </div>
            </div>
            <hr className="mt-5 mb-5"></hr>
            <div className="mt-2">
              <div className="font-medium">
                {dummySummaryData.location.studio}
              </div>
              <div className="text-xs text-gray-500">
                {dummySummaryData.location.address.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <img src={dummySummaryData.logo} alt="Logo" className="h-6" />
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-xs mb-2">
              <span>{dummySummaryData.offer}</span>
              <span className="line-through">
                {dummySummaryData.originalPrice}
              </span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total:</span>
              <span>{dummySummaryData.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
