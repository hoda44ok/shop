import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from "yup";
import { AuthContext } from './../../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';



const Footer = () => {



  const Home = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    email: "",
  };

  const validYup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),

  });

  async function Signin(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("tkn", data.token);
      setToken(data.token);
      toast.success(data.message);
      Home("/");

      setIsLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || "Error occurred");
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    validationSchema: validYup,
    onSubmit: Signin,
  });


  return (

    <div className="min-h-screen flex flex-col dark:bg-gray-900  text-white dark:text-gray-300">
      <main className="flex-grow">
        {/* Your page content goes here */}
      </main>

      <footer className="w-full bg-[#004182] dark:bg-gray-900 shadow-md dark:shadow-xl dark:shadow-gray-200">
        <div className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Subscribe */}
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-gray-100 mb-4">Intellishop</h2>
            <p className="text-sm mb-2">Subscribe and get 10% off your first order</p>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 mt-4">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="bg-transparent border-b border-gray-400 dark:border-gray-600 text-sm py-2 px-2 placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:border-white dark:focus:border-blue-400 transition"
              />
              <button
                type="submit"
                className="bg-white text-[#004182] hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 text-sm font-medium px-4 py-2 rounded-md transition"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <span><i className="fa-solid fa-paper-plane me-2" /></span>
                )}
              </button>

              {formik.touched.email && formik.errors.email && (
                <div className="text-sm bg-red-100 dark:bg-red-800 text-red-600 dark:text-white p-2 rounded border border-red-300 dark:border-red-600">
                  {formik.errors.email}
                </div>
              )}
            </form>
          </div>

          {/* Column 2: Support */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <ul className="text-sm space-y-2">
              <li>111 Bijoy Sarani, Dhaka, Bangladesh</li>
              <li>Intellishop@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Column 3: Account Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <ul className="text-sm space-y-2">
              {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="text-sm space-y-2">
              {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Column 5: App & Social */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Download App</h2>
            <p className="text-sm mb-4">Save $3 with the App – New Users Only</p>
            <div className="flex gap-4 text-xl">
              {["facebook-f", "twitter", "instagram", "linkedin-in"].map((icon) => (
                <i key={icon} className={`fa-brands fa-${icon} hover:text-gray-200 cursor-pointer transition`} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2058A7] dark:border-gray-700 py-5 text-center text-sm text-gray-200 dark:text-gray-400">
          <i className="fa-regular fa-copyright" />
          <span className="ml-2">© 2025 Intellishop. All rights reserved.</span>
        </div>
      </footer>
    </div>


  )
}

export default Footer
