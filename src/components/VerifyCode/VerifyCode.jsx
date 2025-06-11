// pages/VerifyCode.jsx
import axios from "axios";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const formik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        if (data.status === "Success") {
          toast.success("Code verified successfully");
          navigate("/ResetPassword", { state: { email } });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid code");
      }
    },
  });

  return (

    <div className="flex flex-col dark:bg-gray-900">
      {/* Verify Code Section */}
      <main className="flex-grow h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
            Verify Code
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <input
              type="text"
              name="resetCode"
              placeholder="Enter the code from your email"
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              className="w-full px-4 py-3 text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
            />

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm sm:text-base font-medium rounded-md bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white transition"
            >
              Verify Code
            </button>
          </form>
        </div>
      </main>
    </div>

  );
};

export default VerifyCode;
