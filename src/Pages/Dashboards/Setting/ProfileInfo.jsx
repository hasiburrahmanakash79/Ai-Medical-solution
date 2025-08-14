import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaCamera } from "react-icons/fa";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useMe from "../../../hooks/useMe";
import { getCookie } from "../../../lib/cookie-utils";
import apiClient from "../../../lib/api-client";

const ProfileInformation = () => {
  const navigate = useNavigate();
  const { data, loading} = useMe();
  const [isEditing, setIsEditing] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  console.log(data);

  // Initialize formData with API data or fallback
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    image: "https://i.pravatar.cc/100", // Default fallback image
  });

  // Populate formData when API data is available
  useEffect(() => {
    if (data && !loading) {
      setFormData({
        fullName: data?.data?.fullName || "",
        email: data?.data?.user?.email || "",
        phone: data?.data?.user?.phone || "", // Adjust if phone is in response
        role: data?.user?.role || "",
        image: data?.user?.image || "https://i.pravatar.cc/100",
      });
    }
  }, [data, loading]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setApiError(null); // Clear error on input change
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
        imageFile: file, // Store file for API submission
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setApiError("No access token found. Please sign in again.");
      setIsLoading(false);
      navigate("/signin");
      return;
    }

    // Prepare form data for API
    const formPayload = new FormData();
    formPayload.append("fullName", formData.fullName);
    formPayload.append("phone", formData.phone);
    if (formData.imageFile) {
      formPayload.append("image", formData.imageFile);
    }

    try {
      const response = await apiClient.patch("/user/update-profile", formPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setIsEditing(false);
        // Update formData with API response if needed
        setFormData({
          fullName: response.data.data.fullName || formData.fullName,
          email: response.data.data.user?.email || formData.email,
          phone: response.data.data.user?.phone || formData.phone,
          role: response.data.data.user?.role || formData.role,
          image:
            response.data.data.user?.image || formData.image,
        });
      } else {
        setApiError(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || "An error occurred while updating profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex justify-between items-center mb-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            className="text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            <RiArrowLeftLine />
          </button>
          <h2 className="font-semibold text-2xl">Personal Information</h2>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
            disabled={isLoading}
          >
            ✎ Edit Profile
          </button>
        )}
      </div>

      {apiError && (
        <p className="text-red-500 text-sm text-center mb-4">{apiError}</p>
      )}

      <div className="flex flex-col lg:flex-row gap-6 py-5 px-4 lg:px-20">
        {/* Left (Profile Image & Role) */}
        <div className="w-full lg:w-1/4 flex flex-col items-center bg-[#B7C8FF] border border-blue-300 p-14 rounded-md relative">
          <div className="relative">
            <img
              src={formData.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            {isEditing && (
              <>
                <div
                  className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaCamera className="text-white text-2xl" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
              </>
            )}
          </div>
          <p className="mt-4 text-gray-700">Profile</p>
          <p className="text-2xl font-semibold mt-3">{formData.role}</p>
        </div>

        {/* Right (Form Fields) */}
        <div className="w-full lg:w-3/4 space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              disabled={!isEditing || isLoading}
              className="w-full bg-[#B7C8FF] rounded-lg p-5 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={!isEditing || isLoading}
              className="w-full bg-[#B7C8FF] rounded-lg p-5 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <PhoneInput
              country={"us"}
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
              disabled={!isEditing || isLoading}
              inputClass="!w-full p-7 rounded-lg"
              containerClass="!w-full"
              inputStyle={{
                backgroundColor: "#B7C8FF",
                border: 0,
              }}
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Info"}
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileInformation;