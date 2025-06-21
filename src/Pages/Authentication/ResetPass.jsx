import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ResetPass = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    // Password reset logic here
  };

  const password = watch("password");

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-500 flex items-center justify-center p-8">
        <h2 className="text-white text-center text-4xl font-bold leading-relaxed">
          Logo
        </h2>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-xl w-full p-20 relative">
          <div className="relative z-10 border border-gray-200 backdrop-blur-sm rounded-xl shadow-lg p-8 w-full max-w-md transform -translate-x-[10%]">
            <h2 className="text-center text-xl font-semibold mb-2 text-gray-800">
              Reset Password
            </h2>
            <p className="text-center text-sm text-gray-700 mb-6">
              Your password must be 8–10 characters long.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Password */}
              <label className="block text-sm mb-1">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                  maxLength: { value: 10, message: "Maximum 10 characters" },
                })}
                className="w-full px-4 py-2 rounded border border-blue-200 outline-none"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}

              {/* Confirm Password */}
              <label className="block text-sm mb-1">confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword", {
                  required: "Please re-enter password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 rounded border border-blue-200 outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}

              {/* Submit Button */}
              <div className="flex justify-center gap-5">
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Confirm
                </button>
                <Link
                  to="/"
                  className="w-full text-blue-500 border border-blue-200 text-center rounded px-4 py-2 mt-5"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
