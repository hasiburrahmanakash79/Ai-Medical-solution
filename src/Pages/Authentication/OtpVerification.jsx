import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { FaLeftLong } from "react-icons/fa6";
import logo from "../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../lib/cookie-utils";
import apiClient from "../../lib/api-client";

const OtpVerification = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  // Submit handler for OTP verification
  const onSubmit = async (data) => {
    const values = Object.values(data);
    const isComplete = values.every((v) => v && v.length === 1);
    if (!isComplete) return;

    const otp = values.join("");
    setIsLoading(true);
    setApiError(null);

    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        setApiError("No access token found. Please sign in again.");
        setIsLoading(false);
        return;
      }

      await apiClient.post(
        "/auth/verify-user",
        { otp },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // On successful verification, navigate to the home page
      navigate("/");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Failed to verify OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (resendEnabled) {
      setIsLoading(true);
      setApiError(null);

      try {
        const accessToken = getCookie("accessToken");
        if (!accessToken) {
          setApiError("No access token found. Please sign in again.");
          setIsLoading(false);
          return;
        }

        await apiClient.post(
          "/auth/resend-code",
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        setTimer(60);
        setResendEnabled(false);
      } catch (err) {
        setApiError(
          err.response?.data?.message || "Failed to resend OTP. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  // Auto move to next input and clear errors
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) && value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    clearErrors();
    setApiError(null); // Clear API errors on input change
  };

  // Backspace to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 px-4">
      <div className="flex items-center justify-center px-8 py-12 w-full max-w-md bg-[#DEE5FF] rounded-lg shadow-md">
        <div className="w-full">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="w-32 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Verify Email
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Please enter the OTP sent to your email.
            </p>
          </div>

          {/* API Error Message */}
          {apiError && (
            <p className="text-red-500 text-sm text-center mb-4">{apiError}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Fields */}
            <div className="flex justify-center gap-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  {...register(`otp${index}`, { required: true })}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-12 text-center border border-blue-400 rounded-full text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Form Error Message */}
            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm text-center mt-2">
                Please fill all OTP fields
              </p>
            )}

            {/* Resend Button / Timer */}
            <p className="text-center text-sm mt-4">
              {resendEnabled ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:underline"
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-500">Resend OTP in {timer}s</span>
              )}
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {/* Back Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => window.history.back()}
              className="text-blue-500 flex items-center hover:underline"
              disabled={isLoading}
            >
              <FaLeftLong className="mr-2" /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;