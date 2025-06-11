// pages/ResetPassword.jsx
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const formik = useFormik({
    initialValues: {
      email,
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum 8 characters, at least one letter and one number"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        );
        toast.success("Password reset successfully");
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error resetting password");
      }
    },
  });

  return (
    // <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-900 lg:mb-12 mb-28">
    //   <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700 dark:text-indigo-400">
    //     Reset Password
    //   </h2>

    //   <form onSubmit={formik.handleSubmit} className="space-y-4">
    //     <input
    //       type="password"
    //       name="newPassword"
    //       placeholder="Enter new password"
    //       onChange={formik.handleChange}
    //       value={formik.values.newPassword}
    //       className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
    //     />

    //     <button
    //       type="submit"
    //       className="w-full py-2 px-4 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors"
    //     >
    //       Reset Password
    //     </button>
    //   </form>
    // </div>
    <div className="flex flex-col dark:bg-gray-900">
  {/* Reset Password Section */}
  <main className="flex-grow h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-6">
        Reset Password
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          className="w-full px-4 py-3 text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full py-3 px-4 text-sm sm:text-base font-medium rounded-md bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  </main>
</div>


  );
};

export default ResetPassword;
