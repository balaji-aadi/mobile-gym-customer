import { useFormik } from "formik";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import gola from "../../public/gola.jpg";
import { AuthApi } from "../Api/Auth.api.js";
import InputField from "../components/InputField.jsx";
import { loginUser } from "../store/authThunks.js";
import { useDispatch, useSelector } from "react-redux";
// import { CiFacebook } from "react-icons/ci";
import { IoLogoFacebook } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Validation schema
  const loginSchema = Yup.object({
    emailOrPhone: Yup.string()
      .test(
        "email-or-phone",
        "Enter a valid email or phone number",
        (value) => {
          if (!value) return false;
          // Check if it's a valid email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          // Check if it's a valid phone number (basic, 10-15 digits)
          const phoneRegex = /^\d{10,15}$/;
          return emailRegex.test(value) || phoneRegex.test(value);
        }
      )
      .required("Email or phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const res = await dispatch(loginUser(values)).unwrap();
        navigate("/");
        localStorage.setItem("token", res?.token);
        localStorage.setItem("userId", res?.user?._id);
        console.log("getting id ", res?.user?._id);
        console.log("res", res);
        toast.success("Logged in successfully!");
      } catch (error) {
        console.log(error);
        toast.error(error || "Something went wrong!");
      } finally {
        // hideLoading();
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-0 bg-white rounded-xl shadow-2xl p-0">
        {/* Left Side Image */}
        <div className="hidden md:flex md:w-1/2 rounded-l-xl overflow-hidden relative">
          <img
            src={gola}
            alt="Fitness motivation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end p-8">
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-3">
                YOUR EXCUSES JUST GOT{" "}
                <span className="text-red-400">BENCH PRESSED</span>.
              </h2>
              <p className="text-gray-200 text-lg max-w-md">
                Time to lift more than just your spirits.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Sign in to your FitHub account</p>
          </div>

          {formik.status && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span>{formik.status}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5" />
                </div>
                <InputField
                  type="text"
                  name="emailOrPhone"
                  value={formik.values.emailOrPhone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  leftIcon={<Mail className="h-5 w-5" />}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    formik.touched.emailOrPhone && formik.errors.emailOrPhone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email or phone"
                />
              </div>
              {formik.touched.emailOrPhone && formik.errors.emailOrPhone && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.emailOrPhone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <InputField
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  value={formik.values.rememberMe}
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  className="h-4 w-4  mt-2 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block  text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forget-password"
                className="text-sm text-blue-600 hover:text-primary-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-custom-coral hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {formik.isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Social Login Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4 mt-4">
              {/* Google Login Button */}
              <button
                type="button"
                className="flex-1 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center space-x-2 shadow-sm"
              >
                <FcGoogle size={20} />
                <span>Google</span>
              </button>
              {/* Facebook Login Button */}
              <button
                type="button"
                className="flex-1 bg-[#4267B2]  text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center justify-center space-x-2 shadow-sm"
              >
                <IoLogoFacebook size={20} className="text-white" />

                <span>Facebook</span>
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-primary-500 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
