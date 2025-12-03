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
      await axios.post(
        `${BASE_URL}/api/schools/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("School added successfully");
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Error adding school");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-2 sm:py-4 max-w-lg">
      <h1 className="text-2xl sm:text-[1.7rem] font-bold mb-4 text-center font-(family-name:--font-roboto)">Add School</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <div>
          <label className="block mb-1 sm:text-lg">School Name</label>
          <input
            {...register("name", { required: "School name is required" })}
            className="w-full p-1 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-[12px]">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 sm:text-lg">Address</label>
          <textarea
            {...register("address", { required: "Address is required" })}
            className="w-full p-1 border rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-[12px]">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 sm:text-lg">City</label>
            <input
              {...register("city", { required: "City is required" })}
              className="w-full p-1 border rounded"
            />
            {errors.city && (
              <p className="text-red-500 text-[12px]">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 sm:text-lg">State</label>
            <input
              {...register("state", { required: "State is required" })}
              className="w-full p-1 border rounded"
            />
            {errors.state && (
              <p className="text-red-500 text-[12px]">{errors.state.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 sm:text-lg">Contact Number</label>
          <input
            {...register("contact", {
              required: "Contact is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit number",
              },
            })}
            className="w-full p-1 border rounded"
          />
          {errors.contact && (
            <p className="text-red-500 text-[12px]">{errors.contact.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 sm:text-lg">Email</label>
          <input
            type="email"
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full p-1 border rounded"
          />
          {errors.email_id && (
            <p className="text-red-500 text-[12px]">
              {errors.email_id.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 sm:text-lg">School Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="w-full p-1 border rounded"
          />
          {errors.image && (
            <p className="text-red-500 text-[12px]">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 cursor-pointer mt-4 text-white py-[6px] px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Add School"}
        </button>
      </form>
    </div>
  );
}
