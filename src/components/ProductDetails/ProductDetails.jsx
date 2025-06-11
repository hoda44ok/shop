import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import { useContext, useState } from "react";
import { cartContext } from "./../CartContext/CartContext";
import toast from "react-hot-toast";
import { wishlistContext } from './../WishListContext/WishListContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  const { addToWishlist } = useContext(wishlistContext);
  const [isLoad, setIsLoad] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const navigate = useNavigate();


  // async function addToCart(id) {
  async function addToCart(id, quantity) {

    setIsLoad(true);

    // const result = await addProductToCart(id);
    const result = await addProductToCart(id, quantity);


    console.log("Add to Cart Result:", result); // Log the result for inspection

    if (result.success) {
      toast.success(result.message, {
        style: {
          background: "#0A1172", color: "white", width: "500px",
          height: "60px"
        },
      });
    } else {
      toast.error(result.message, {
        style: {
          background: "#FF0000", color: "white", width: "500px",
          height: "full"
        },
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
        toast.success(" add to wishlist already.", {
          style: { background: "#0A1172", color: "white" },
        });
      }
    } catch (error) {
      toast.error("Error adding to wishlist.");

    }
    setIsLoad(false);
  }
  // Fetch product details function, only runs if id exists

  const getProductDetails = async () => {
    // if (!id) return null;
    const response = await axios.get(
      `https://beige-alligator-527710.hostingersite.com/public/api/products`
    );
    const allProducts = response.data?.data || [];
    const foundProduct = allProducts.find((p) => p.id.toString() === id.toString());
    return foundProduct;

  };

  // Use React Query to fetch product data
  const { data: product, isLoading, isError, error } = useQuery(
    ["productDetails", id],
    getProductDetails,
    {
      enabled: !!id, // only run query if id is truthy
      retry: false,
    }
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0A1172] dark:bg-gray-900 text-white p-4">
        <p className="mb-4">Error loading product: {error.message}</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-white text-[#0A1172] rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  // If no product found
  if (!product) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#0A1172] dark:bg-gray-900 text-white p-4">
        <p className="mb-4">Product not found.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-white text-[#0A1172] rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  const increaseQuantity = () => {
    if (quantity < (product.quantity || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 min-h-screen lg:mb-12 mb-28">
      <button
        onClick={() => navigate(-1)}
        className="mb-10 flex items-center  text-[#0A1172] dark:text-white hover:text-blue-600"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="h-96 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="ml-1 text-gray-700 dark:text-gray-300">
                {product.ratingsAverage || "0"}
              </span>
            </div>
            <span
              className={`text-sm font-medium ${product.quantity > 0 ? "text-green-600" : "text-red-600"
                }`}
            >
              {product.quantity > 0
                ? `In Stock (${product.quantity} available)`
                : "Out of Stock"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-2xl font-bold text-[#0A1172] dark:text-blue-300">
              {product.total_price || product.price}EGP
            </p>
            {product.discount_in_percentage && (
              <>
                <p className="text-lg text-gray-500 line-through">{product.price}EGP</p>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                  {product.discount_in_percentage}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            {product.description || "No description available."}
          </p>

          {product.brand && (
            <div className="pt-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Brand</h4>
              <div className="flex items-center mt-1">
                {product.brand.logo_url && (
                  <img
                    src={product.brand.logo_url}
                    alt={product.brand.name}
                    className="h-8 w-auto mr-2"
                  />
                )}
                <span className="text-gray-700 dark:text-gray-300">{product.brand.name}</span>
              </div>
            </div>
          )}

          <div className="pt-2">
            <h4 className="font-medium text-gray-900 dark:text-white">Quantity</h4>
            <div className="flex items-center mt-2">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="px-3 py-1 border rounded-l disabled:opacity-50"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b text-center">{quantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={quantity >= (product.quantity || 10)}
                className="px-3 py-1 border rounded-r disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">

            <button
              onClick={() => addToCart(product.id, quantity)}
              disabled={product.quantity <= 0 || isLoad}
              className={`flex-1 py-3 px-6 rounded-md font-medium ${product.quantity <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0A1172] hover:bg-blue-800 text-white"
                }`}
            >
              {isLoad ? (
                <i className="fas fa-spinner fa-spin mx-auto"></i>
              ) : product.quantity <= 0 ? (
                "Out of Stock"
              ) : (
                "Add to Cart"
              )}
            </button>

            <button
              onClick={() => addToWishList(product.id)}
              className="p-3 border rounded-md text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <i className={`fa-heart ${wishlistItems.has(product.id)
                ? "fa-solid text-red-500"
                : "fa-regular text-gray-400"
                } hover:text-red-500 transition-all duration-300`}></i>
            </button>
          </div>


          <div className="border dark:border-gray-700 rounded-lg p-4 mt-6">
            <div className="flex items-start space-x-4 mb-4">
              <i className="fas fa-truck text-[#0A1172] mt-1"></i>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Free Delivery</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Free shipping on all orders over 50 EGP
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <i className="fas fa-undo-alt text-[#0A1172] mt-1"></i>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Easy Returns</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  30-day hassle-free returns policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );

};

export default ProductDetails;
