import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );
        if (data.statusMsg === "success") {
          toast.success("Code sent to your email.");
          navigate("/VerifyCode", { state: { email: values.email } });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="flex flex-col  dark:bg-gray-900">
      {/* Forgot Password Section */}
      <main className="flex-grow h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
            Forgot Password
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm sm:text-base font-medium rounded-md bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition"
            >
              Send Code
            </button>
          </form>
        </div>
      </main>


    </div>

  );
};

export default ForgetPassword;
