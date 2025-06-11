import axios from "axios";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";
import HomeSlider from "./../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import AllBrands from "./../AllBrands/AllBrands";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartContext";
import { wishlistContext } from "../WishListContext/WishListContext";
import { AuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { addProductToCart } = useContext(cartContext);
  const { addToWishlist } = useContext(wishlistContext);
  const { token } = useContext(AuthContext);

  const [isLoad, setIsLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistItems, setWishlistItems] = useState(new Set());

  async function addToCart(id) {
    setIsLoad(true);
    const result = await addProductToCart(id);
    if (result.success) {
      toast.success(result.message, {
        style: { background: "#0A1172", color: "white", width: "500px", height: "60px" },
      });
    } else {
      toast.error(result.message, {
        style: { background: "#FF0000", color: "white", width: "500px", height: "60px" },
      });
    }
    setIsLoad(false);
  }

  async function addToWishList(id) {
    setIsLoad(true);
    try {
      const data = await addToWishlist(id);
      if (data?.message === "Product added to wishlist successfully.") {
        setWishlistItems((prev) => new Set([...prev, id]));
        toast.success("Added to Wishlist!", {
          style: { background: "#0A1172", color: "white" },
        });
      } else {
        toast.success("Added to wishlist already");
      }
    } catch {
      toast.error("Error adding to wishlist.");
    }
    setIsLoad(false);
  }

  async function getAllProduct() {
    const response = await axios.get("https://beige-alligator-527710.hostingersite.com/public/api/products");
    return response.data;
  }

  async function fetchSearchResults(searchTerm) {
    const response = await axios.get(
      `https://beige-alligator-527710.hostingersite.com/public/api/search?search=${encodeURIComponent(searchTerm)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }


  async function fetchRecommendations() {
    const response = await axios.get(
      "https://beige-alligator-527710.hostingersite.com/public/api/all-recommendations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response)
    return response.data;
  }

  const { isLoading, data, isError, error } = useQuery("products", getAllProduct);

  const {
    data: searchData,
    isLoading: isSearching,
  } = useQuery(["search", searchTerm], () => fetchSearchResults(searchTerm), {
    enabled: token && searchTerm.length >= 3,
  });

  const {
    data: recommendationsData,
    isLoading: isRecommending,
  } = useQuery("recommendations", fetchRecommendations, {
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500 bg-gray-100">
        Error loading products: {error.message}
      </div>
    );
  }

  const products = searchTerm ? searchData?.data || [] : data?.data || [];

  return (

    // <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 dark:bg-gray-900 dark:text-white">
    //   <HomeSlider />
    //   <hr className="my-6 border-gray-300 dark:border-gray-700" />
    //   <CategorySlider />
    //   <hr className="my-6 border-gray-300 dark:border-gray-700" />
    //   <AllBrands />

    //   {/* Search Input */}
    //   <div className="w-full flex justify-center mt-12 mb-10">
    //     <input
    //       type="search"
    //       className="bg-slate-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 text-base placeholder-gray-500 rounded-lg w-full max-w-2xl p-3"
    //       placeholder="Search for products..."
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     />
    //   </div>

    //   {/* Recommended Section */}
    //   {!searchTerm && recommendationsData?.data?.length > 0 && (
    //     <section className="mt-12">
    //       <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 dark:text-yellow-400 mb-8">
    //         Recommended For You
    //       </h2>
    //       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //         {recommendationsData.data.map((product) => (
    //           <div
    //             key={product.id}
    //             className="bg-white relative dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4 group"
    //           >
    //             <Link to={`/ProductDetails/${product.id}`}>
    //               <img
    //                 src={product.image}
    //                 alt={product.name}
    //                 className="w-full h-48 object-cover rounded-lg mb-4"
    //               />
    //               <h4 className="text-sm text-blue-500">{product.category?.name}</h4>
    //               <h3 className="font-semibold text-lg dark:text-white truncate">{product.name}</h3>
    //               <div className="mt-2 text-gray-800 dark:text-gray-200 font-medium">
    //                 {product.price} {product.currency} EGP
    //               </div>
    //             </Link>
    //             <button
    //               onClick={() => addToWishList(product.id)}
    //               className="absolute top-4 right-4 text-xl"
    //             >
    //               <i
    //                 className={`fa-heart ${wishlistItems.has(product.id)
    //                   ? "fa-solid text-red-500"
    //                   : "fa-regular text-gray-400"
    //                   } hover:text-red-500 transition-all duration-300`}
    //               ></i>
    //             </button>
    //             <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4">
    //               <button
    //                 onClick={() => addToCart(product.id)}
    //                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
    //                 disabled={isLoad}
    //               >
    //                 {isLoad ? (
    //                   <i className="fa-solid fa-spin fa-spinner text-white"></i>
    //                 ) : (
    //                   "+ Add"
    //                 )}
    //               </button>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //   )}

    //   {/* All/Search Products Section */}
    //   <section className="mt-20 mb-10">
    //     <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
    //       {searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
    //     </h2>

    //     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //       {products.map((product) => (
    //         <div
    //           key={product.id}
    //           className="p-4 relative mt-4 hover:shadow-lg hover:shadow-blue-800 transition-all duration-700 rounded-lg group dark:bg-gray-800"
    //         >
    //           <Link to={`/ProductDetails/${product.id}`}>
    //             <img
    //               src={product.image}
    //               alt={product.name}
    //               className="w-full h-48 object-cover rounded-lg mb-4"
    //             />
    //             <h4 className="text-sm text-blue-500">{product.category?.name}</h4>
    //             <h3 className="font-semibold text-lg dark:text-white truncate">{product.name}</h3>
    //             <div className="mt-2 text-gray-800 dark:text-gray-200 font-medium flex justify-between items-center">
    //               {product.price} {product.currency} EGP
    //               <i className="fa-solid fa-star text-yellow-500 text-sm"></i>
    //             </div>
    //           </Link>

    //           <button
    //             onClick={() => addToWishList(product.id)}
    //             className="absolute top-4 right-4 text-xl"
    //           >
    //             <i
    //               className={`fa-heart ${wishlistItems.has(product.id)
    //                 ? "fa-solid text-red-500"
    //                 : "fa-regular text-gray-400"
    //                 } hover:text-red-500 transition-all duration-300`}
    //             ></i>
    //           </button>

    //           <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4">
    //             <button
    //               onClick={() => addToCart(product.id)}
    //               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
    //               disabled={isLoad}
    //             >
    //               {isLoad ? (
    //                 <i className="fa-solid fa-spin fa-spinner text-white"></i>
    //               ) : (
    //                 "+ Add"
    //               )}
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </section>
    // </div>
<div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 dark:bg-gray-900 dark:text-white">
  <HomeSlider />
  <hr className="my-6 border-gray-300 dark:border-gray-700" />
  <CategorySlider />
  <hr className="my-6 border-gray-300 dark:border-gray-700" />
  <AllBrands />

  {/* Search Input */}
  <div className="w-full flex justify-center mt-12 mb-10">
    <input
      type="search"
      className="bg-slate-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 text-base placeholder-gray-500 rounded-lg w-full max-w-2xl p-3"
      placeholder="Search for products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* Recommended Section */}
  {!searchTerm && recommendationsData?.data?.length > 0 && (
    <section className="mt-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 dark:text-yellow-400 mb-8">
        Recommended For You
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {recommendationsData.data.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-3 sm:p-4 group"
          >
            <Link to={`/ProductDetails/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 sm:h-48 object-cover rounded-lg mb-3"
              />
              <h4 className="text-sm text-blue-500">{product.category?.name}</h4>
              <h3 className="font-semibold text-base sm:text-lg dark:text-white truncate">
                {product.name}
              </h3>
              <div className="mt-2 text-gray-800 dark:text-gray-200 font-medium">
                {product.price} {product.currency} EGP
              </div>
            </Link>
            <button
              onClick={() => addToWishList(product.id)}
              className="absolute top-4 right-4 text-xl"
            >
              <i
                className={`fa-heart ${wishlistItems.has(product.id)
                  ? "fa-solid text-red-500"
                  : "fa-regular text-gray-400"
                  } hover:text-red-500 transition-all duration-300`}
              ></i>
            </button>
            <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4 w-full">
              <button
                onClick={() => addToCart(product.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                disabled={isLoad}
              >
                {isLoad ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "+ Add"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )}

  {/* All/Search Products Section */}
  <section className="mt-20 mb-10">
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
      {searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-3 sm:p-4 relative hover:shadow-lg hover:shadow-blue-800 transition-all duration-700 rounded-lg group dark:bg-gray-800"
        >
          <Link to={`/ProductDetails/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-44 sm:h-48 object-cover rounded-lg mb-3"
            />
            <h4 className="text-sm text-blue-500">{product.category?.name}</h4>
            <h3 className="font-semibold text-base sm:text-lg dark:text-white truncate">
              {product.name}
            </h3>
            <div className="mt-2 text-gray-800 dark:text-gray-200 font-medium flex justify-between items-center">
              {product.price} {product.currency} EGP
              <i className="fa-solid fa-star text-yellow-500 text-sm"></i>
            </div>
          </Link>

          <button
            onClick={() => addToWishList(product.id)}
            className="absolute top-4 right-4 text-xl"
          >
            <i
              className={`fa-heart ${wishlistItems.has(product.id)
                ? "fa-solid text-red-500"
                : "fa-regular text-gray-400"
                } hover:text-red-500 transition-all duration-300`}
            ></i>
          </button>

          <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4 w-full">
            <button
              onClick={() => addToCart(product.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
              disabled={isLoad}
            >
              {isLoad ? (
                <i className="fa-solid fa-spin fa-spinner text-white"></i>
              ) : (
                "+ Add"
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>


  );
};

export default Home;
