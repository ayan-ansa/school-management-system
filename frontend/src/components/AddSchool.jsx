import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./ShowSchools";
import toast from "react-hot-toast";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      await axios.post(`${BASE_URL}/api/schools/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("School added successfully");
      reset();
    } catch (err) {
      toast.error("Error adding school");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 font-(family-name:--font-roboto)">
          Add New School
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              School Name
            </label>
            <input
              {...register("name", { required: "School name is required" })}
              placeholder="Enter the school name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              Address
            </label>
            <textarea
              {...register("address", { required: "Address is required" })}
              rows="3"
              placeholder="Enter full address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
            />
            {errors.address && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                City
              </label>
              <input
                {...register("city", { required: "City is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
              />
              {errors.city && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                State
              </label>
              <input
                {...register("state", { required: "State is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
              />
              {errors.state && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                Contact Number
              </label>
              <input
                {...register("contact", {
                  required: "Contact is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit number",
                  },
                })}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
              />
              {errors.contact && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="school@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
              />
              {errors.email_id && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email_id.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
              School Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="w-full text-xs sm:text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer  "
            />
            {errors.image && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 mt-6 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                Processing...
              </span>
            ) : (
              "Add School"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
