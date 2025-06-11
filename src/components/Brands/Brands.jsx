// import axios from "axios";
// import { useQuery } from "react-query";
// import { CircleLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";

// const Brands = () => {
//   const navigate = useNavigate();

//   // fetch all brands
//   async function getAllBrands() {
//   const response = await axios.get("https://beige-alligator-527710.hostingersite.com/public/api/brands");
// return response.data.data;

//   }

//   const { isLoading, data } = useQuery("brands", getAllBrands);

//   if (isLoading) {
//     return (
//       <div className="h-screen flex justify-center items-center bg-white dark:bg-gray-900">
//         <CircleLoader color="#0ea5e9" size={50} speedMultiplier={1.5} />
//       </div>
//     );
//   }

//   return (

// <div className="md:w-[78%] mx-auto min-h-screen bg-white dark:bg-gray-900 py-12 px-6">
//   <div className="flex flex-wrap justify-center gap-8">
//     {data?.map((brand) => (

//       <div
//         key={brand.id}
//         // onClick={() => navigate(`/ProductByBrand/${brand.id}`)}
//         onClick={() => navigate(`/ProductByBrand/${brand.slug}`)}

//         className="w-full xs:w-[90%] sm:w-[48%] md:w-[32%] lg:w-[22%] max-w-[280px] cursor-pointer"
//       >
//         <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-xl flex flex-col h-[300px] overflow-hidden border border-gray-200 dark:border-gray-700
//                         transform hover:scale-105 hover:z-10 transition-transform duration-300 ease-in-out">
//           <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-t-3xl">
//             <img
//               src={brand.logo_url || brand.image}
//               alt={brand.name}
//               className="max-h-full max-w-full object-contain"
//             />
//           </div>
//           <div className="p-5 text-center">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
//               {brand.name}
//             </h2>
//           </div>
//         </div>
//       </div>    
//     ))}
//   </div>
// </div>


//   );
// };

// export default Brands;

import axios from "axios";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Brands = () => {
  const navigate = useNavigate();

  const getAllBrands = async () => {
    const res = await axios.get(
      "https://beige-alligator-527710.hostingersite.com/public/api/brands"
    );
    console.log("Brands API response:", res.data); // 👈 Check this
    return res.data.data;
  };

  const { isLoading, data, isError } = useQuery("brands", getAllBrands);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#0ea5e9" size={50} speedMultiplier={1.5} />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500 mt-20">Failed to load brands.</div>;
  }

  const brands = Array.isArray(data) ? data : [];

  return (

    <div className="md:w-[78%] mx-auto min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6">
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(`/ProductByBrand/${brand.slug}`)}
            className="w-full xs:w-[90%] sm:w-[48%] md:w-[32%] lg:w-[22%] max-w-[280px] cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 h-[300px] flex flex-col overflow-hidden transition-all duration-300">
              {/* Logo Section */}
              <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-t-3xl">
                <img
                  src={brand.logo_url || brand.image}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Brand Name */}
              <div className="p-4 text-center bg-white dark:bg-gray-800">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                  {brand.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Brands;
