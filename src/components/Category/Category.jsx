import { useState, useEffect, useContext } from "react";
import { cartContext } from "../CartContext/CartContext";
import { CircleLoader } from "react-spinners";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const { isLoad } = useContext(cartContext);

  useEffect(() => {
    fetch("https://beige-alligator-527710.hostingersite.com/public/api/categories/get-categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.data || []);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  if (isLoad) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  // const handleCategoryClick = (categoryId) => {
  //   if (selectedCategory === categoryId) {
  //     setSelectedCategory(null);
  //   } else {
  //     setSelectedCategory(categoryId);
  //   }
  // };

  return (

    <div className="flex flex-wrap justify-center gap-4 px-4 mt-10 bg-white dark:bg-gray-900 transition-colors duration-300 lg:mb-12 mb-28">
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-[1400px] mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className="w-full xs:w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex justify-center"
          >
            <div className="w-full max-w-xs">
              <button
                onClick={() => navigate(`/ProductByCat/${category.slug}`)}
                className="w-full h-[350px] flex flex-col bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow dark:hover:shadow-lg dark:transition-shadow dark:hover:shadow-gray-800 dark:duration-300 duration-300"
              >
                {/* Image */}
                <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                </div>

                {/* Title */}
                <h2 className="text-md sm:text-lg text-blue-700 dark:text-blue-400 font-semibold text-center p-3 truncate">
                  {category.name}
                </h2>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Category;
