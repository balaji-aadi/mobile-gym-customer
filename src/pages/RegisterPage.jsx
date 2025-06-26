// src/pages/RegisterPage.jsx
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import gym_register from "../../public/gym_register.jpg";
import { AuthApi } from "../Api/Auth.api.js";
import InputField from "../components/InputField.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryData, setCountryData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const fitnessGoalOptions = [
    "Weight Loss",
    "Muscle Building",
    "Cardio Fitness",
    "Flexibility",
    "Strength Training",
    "Sports Performance",
    "General Health",
    "Stress Relief",
  ];

  const registerSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),

    fitnessGoals: Yup.array()
      .min(1, "Select at least one fitness goal")
      .required("Fitness goals are required"),
    agreedToTerms: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });

  const handleSubmit = async (values, { setErrors, setStatus }) => {
    setIsLoading(true);
    try {
      // Structure the data for API
      const registrationData = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        password: values.password,
        user_role: 3, // Assuming 3 is for regular users
        age: values.age,
        gender: values.gender,
        address: values.address,
        profile_image: "https://example.com/profile.jpg",
        country: values.country,

        fitness_goals: values.fitnessGoals.join(", "),
      };

      const response = await AuthApi.register(registrationData);

      if (response?.status === 201 || response?.data?.success) {
        navigate("/login", {
          state: {
            registrationSuccess: true,
            message: "Registration successful! Please login.",
          },
        });
      } else {
        setStatus("Registration failed. Please try again.");
        if (response?.data?.errors) {
          const apiErrors = {};
          Object.entries(response.data.errors).forEach(([field, messages]) => {
            apiErrors[field] = Array.isArray(messages)
              ? messages.join(" ")
              : messages;
          });
          setErrors(apiErrors);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "An error occurred. Please try again.";

      setStatus(errorMessage);

      if (error?.response?.data?.errors) {
        const apiErrors = {};
        Object.entries(error.response.data.errors).forEach(
          ([field, messages]) => {
            apiErrors[field] = Array.isArray(messages)
              ? messages.join(" ")
              : messages;
          }
        );
        setErrors(apiErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountry = async () => {
    try {
      const res = await AuthApi.country();
      // console.log("data aya hai :", countryData);
      setCountryData(res.data?.data);
      console.log("data aya hai :", res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleCountry();
  }, []);

  const countryOptions = countryData.map((item) => {
    return {
      value: item?._id,
      label: `${item?.name}`,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="max-w-7xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden items-stretch transform transition-all duration-300">
        {/* Left: Image */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          <img
            src={gym_register}
            alt="Fitness motivation"
            className="w-full h-full object-cover transform transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 flex items-end p-8">
            <div className="transform translate-y-4 transition-transform duration-300">
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                Join Our Fitness Community
              </h2>
              <p className="text-gray-200 max-w-md text-lg">
                Start your journey to a healthier, stronger you with
                personalized training and expert guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-3/5 p-6 md:p-8 space-y-6 flex flex-col justify-center items-center">
          <div className="text-center space-y-2 animate-fadeIn">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Join FitNess
            </h2>
            <p className="text-gray-600 text-lg">
              Create your account and start your fitness journey
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 w-full max-w-4xl transition-shadow duration-300">
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                user_role: 3,
                phone_number: "",
                password: "",
                confirmPassword: "",
                age: "",
                gender: "",
                address: "",
                country: "",

                fitnessGoals: [],
                agreedToTerms: false,
              }}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, setFieldValue, values, status }) => (
                <Form className="w-full space-y-6">
                  {(errors.general || status) && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 text-red-700 animate-shake">
                      <AlertCircle className="h-5 w-5" />
                      <span>{errors.general || status}</span>
                    </div>
                  )}

                  {/* Form Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Personal Information Section */}
                    {/* <div className="lg:col-span-3">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                        Personal Information
                      </h3>
                    </div> */}

                    {/* First Name */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        First Name
                      </label>
                      <div className="relative transform transition-all duration-200">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <Field
                          type="text"
                          name="first_name"
                          as={InputField}
                          className="block w-full text-right pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-right"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <ErrorMessage name="first_name">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Last Name */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        Last Name
                      </label>
                      <div className="relative transform transition-all duration-200">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <Field
                          type="text"
                          name="last_name"
                          as={InputField}
                          className="block w-full text-right pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-right"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <ErrorMessage name="last_name">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Phone Number */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        Phone Number
                      </label>
                      <div className="relative transform transition-all duration-200">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <Field
                          type="tel"
                          name="phone_number"
                          as={InputField}
                          className="block w-full text-right pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-right"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <ErrorMessage name="phone_number">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        Email
                      </label>
                      <div className="relative transform transition-all duration-200">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <Field
                          type="email"
                          name="email"
                          as={InputField}
                          className="block w-full pl-4 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                          placeholder="Enter your email"
                        />
                      </div>
                      <ErrorMessage name="email">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Age */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        Age
                      </label>
                      <div className="relative transform transition-all duration-200">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <Field
                          type="number"
                          name="age"
                          min="1"
                          as={InputField}
                          className="block w-full pl-3  pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your age"
                        />
                      </div>
                      <ErrorMessage name="age">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Gender */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        Gender
                      </label>
                      <div className="relative transform transition-all duration-200">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <Field
                          as="select"
                          name="gender"
                          className="block w-full pl-3 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Field>
                      </div>
                      <ErrorMessage name="gender">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Password and Confirm Password */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        Password
                      </label>
                      <div className="relative transform transition-all duration-200">
                        {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400 transition-colors" />
                        </div> */}
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="block w-full pl-3 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage name="password">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        Confirm Password
                      </label>
                      <div className="relative transform transition-all duration-200">
                        {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400 transition-colors" />
                        </div> */}
                        <Field
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          className="block w-full pl-2 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <ErrorMessage name="confirmPassword">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Country */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors">
                        Country
                      </label>
                      <div className="relative transform transition-all duration-200">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <Field
                          as="select"
                          name="country"
                          className="block w-full pl-3 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                        >
                          <option value="">Select a country</option>
                          {countryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage name="country">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Address */}
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <Field
                        as="textarea"
                        name="address"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="Enter your full address"
                      />
                      <ErrorMessage name="address">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Fitness Goals */}
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fitness Goals (Select at least one)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {fitnessGoalOptions.map((goal) => (
                          <label
                            key={goal}
                            className="flex items-center space-x-2 mr-4 mb-2"
                          >
                            <input
                              type="checkbox"
                              checked={values.fitnessGoals.includes(goal)}
                              onChange={() => {
                                const currentGoals = values.fitnessGoals;
                                const newGoals = currentGoals.includes(goal)
                                  ? currentGoals.filter((g) => g !== goal)
                                  : [...currentGoals, goal];
                                setFieldValue("fitnessGoals", newGoals);
                              }}
                              className="mr-1"
                            />
                            <span className="text-gray-700">{goal}</span>
                          </label>
                        ))}
                      </div>
                      <ErrorMessage name="fitnessGoals">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>

                    {/* Terms and Submit Button */}
                    <div className="lg:col-span-3 mt-8">
                      <div className="flex items-center">
                        <Field
                          id="terms"
                          name="agreedToTerms"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="terms"
                          className="ml-2 font-sm text-gray-700"
                        >
                          I agree to the{" "}
                          <a href="#" className="text-blue-600">
                            Terms of services
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-blue-600">
                            privacy Policy
                          </a>
                        </label>
                      </div>
                      <ErrorMessage name="agreedToTerms">
                        {(msg) => (
                          <p className="mt-1 text-sm text-red-600">{msg}</p>
                        )}
                      </ErrorMessage>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 bg-custom-coral text-white py-4 px-8 rounded-lg font-medium transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-full">
                    <FcGoogle size={20} className="h-5 w-5 mr-2" />
                    <span>Google</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm bg-[#4267B2] text-sm font-medium text-white transition-all duration-200"
                >
                  <div className="flex items-center gap-3 justify-center w-full">
                    <IoLogoFacebook size={20} className="text-white" />

                    <span>Facebook</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
