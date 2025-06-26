import {
  Bell,
  Camera,
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  Loader2,
  Mail,
  Phone,
  Save,
  Shield,
  Target,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    fitnessGoals: user?.fitnessGoals || [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goal) => {
    setFormData((prev) => ({
      ...prev,
      fitnessGoals: prev.fitnessGoals.includes(goal)
        ? prev.fitnessGoals.filter((g) => g !== goal)
        : [...prev.fitnessGoals, goal],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await updateProfile(formData);
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      fitnessGoals: user?.fitnessGoals || [],
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
            <User className="h-8 w-8 text-gray-500 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Profile Locked
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view your profile
          </p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="h-24 w-24 bg-gradient-to-br from-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-10 w-10 text-white" />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md group-hover:opacity-100 opacity-90 transition-opacity">
                <Camera className="h-4 w-4 text-gray-700" />
              </button>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                user.name
              )}
            </h1>
            <p className="text-gray-500 flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
            isEditing
              ? "bg-red-100 hover:bg-red-200 text-red-700"
              : "bg-blue-100 hover:bg-blue-200 text-blue-700"
          }`}
        >
          {isEditing ? (
            <X className="h-4 w-4" />
          ) : (
            <Edit2 className="h-4 w-4" />
          )}
          <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
        </button>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {user.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {user.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {user.phone || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Fitness Goals Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Fitness Goals
              </h2>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowGoalDropdown(!showGoalDropdown)}
                    className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                  >
                    <span>Select your fitness goals</span>
                    {showGoalDropdown ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {showGoalDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-2 grid grid-cols-2 gap-2">
                      {fitnessGoalOptions.map((goal) => (
                        <div key={goal} className="flex items-center">
                          <button
                            type="button"
                            onClick={() => handleGoalToggle(goal)}
                            className={`w-full text-left p-2 rounded-md text-sm flex items-center gap-2 ${
                              formData.fitnessGoals.includes(goal)
                                ? "bg-blue-50 text-blue-700"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <div
                              className={`h-4 w-4 rounded-sm border flex items-center justify-center ${
                                formData.fitnessGoals.includes(goal)
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {formData.fitnessGoals.includes(goal) && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            {goal}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 min-h-12">
                  {formData.fitnessGoals.map((goal) => (
                    <span
                      key={goal}
                      className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {goal}
                      <button
                        type="button"
                        onClick={() => handleGoalToggle(goal)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.fitnessGoals.length > 0 ? (
                  user.fitnessGoals.map((goal) => (
                    <span
                      key={goal}
                      className="inline-flex items-center bg-purple-100 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {goal}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No fitness goals selected</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        {isEditing && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>

      {/* Additional Sections */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Account Security
            </h2>
          </div>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Change Password
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Bell className="h-5 w-5 text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Notifications
            </h2>
          </div>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Manage Notification Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
