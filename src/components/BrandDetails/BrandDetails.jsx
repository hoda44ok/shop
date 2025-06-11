import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";

export default function BrandDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getBrandDetails = async () => {
    const { data } = await axios.get(`https://beige-alligator-527710.hostingersite.com/public/api/brands`);
    return data;
  };

  const { data, isLoading } = useQuery(['brandDetails', id], getBrandDetails);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  // Access the brand data from the data.data object

  const brand = data?.data?.find(b => b.id === Number(id));


  if (!brand) {
    return <div>Brand not found</div>;
  }

  return (
    <div className="flex items-center justify-center px-4 py-12 min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute top-4 left-4 sm:left-8 text-gray-800 dark:text-white hover:text-red-600 rounded-full p-3 text-xl transition duration-300 ease-in-out active:scale-95 z-10"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Brand Info Card */}
      <div className="bg-[#fefafa] dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full mt-12 sm:mt-20 text-center transition-all">
        {/* Logo */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6">
          <img
            src={brand.logo_url || brand.image}
            alt={brand.name}
            className="w-full h-full object-cover rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-lg"
          />
        </div>

        {/* Brand Name */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-white mb-2">
          {brand.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {brand.description ||
            "This is one of our premium brands in the store. Check back soon for more info!"}
        </p>
      </div>
    </div>

  );
}

