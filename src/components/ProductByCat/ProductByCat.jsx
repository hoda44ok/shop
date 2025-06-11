import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
const ProductByCat = () => {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    console.log("brand_slug:", slug);

    async function getAllCatProducts() {
        const response = await axios.get(
            `https://beige-alligator-527710.hostingersite.com/public/api/products/category/${slug}`
        );
        console.log(response)
        return response.data.data;

    }

    const { data, isLoading } = useQuery(["brandProducts", slug], getAllCatProducts);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center bg-white dark:bg-gray-900">
                <CircleLoader color="#0ea5e9" size={50} />
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-white dark:bg-gray-900 px-4 sm:px-6 py-10 max-w-7xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="mb-10 flex items-center text-[#0A1172] dark:text-white hover:text-blue-600 transition"
            >
                <i className="fas fa-arrow-left mr-2"></i> Back
            </button>

            <h1 className="text-2xl sm:text-3xl font-semibold mb-10 text-center text-gray-900 dark:text-white tracking-tight">
                <span className="block md:inline">Products by Category:</span>
                <span className="block md:inline text-indigo-600 dark:text-indigo-400 break-words md:ml-2 mt-1 md:mt-0">
                    {slug}
                </span>
            </h1>

            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {data.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                        >
                            <div className="h-48 sm:h-56 md:h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden rounded-t-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-contain h-full max-w-full"
                                />
                            </div>

                            <div className="p-4 sm:p-5">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
                                    {product.name}
                                </h2>
                                <button
                                    // onClick={() => setSelectedProduct(product)}
                                    onClick={() => navigate(`/ProductDetails/${product.id}`)}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                        No products found for this category.
                    </p>
                </div>
            )}

            {/* Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div
                        className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full mx-auto relative max-h-[90vh] overflow-y-auto shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-3xl font-bold"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">{selectedProduct.name}</h2>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {selectedProduct.description || "No description available."}
                        </p>
                    </div>
                </div>
            )}
        </div>

    );
};
export default ProductByCat
