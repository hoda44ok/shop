import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { SwiperNavButton } from "./../SwiperNavButton/SwiperNavButton";

export default function CategorySlider() {
  const { data, isLoading } = useQuery("Categories", getAllCategory);

  async function getAllCategory() {
    const response = await axios.get(
      "https://beige-alligator-527710.hostingersite.com/public/api/categories/get-categories"
    );
    return response.data;
  }

  if (isLoading) return <div>Loading categories...</div>;

  return (

    <div className="py-6 px-2">
      <h2 className="text-gray-700 dark:text-white text-lg font-bold mb-4 tracking-wide">
        Our Categories
      </h2>

      <Swiper
        modules={[Navigation, Keyboard]}
        breakpoints={{
          300: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 24 },
        }}
        loop={true}
        keyboard={{ enabled: true }}
        navigation={false}
        className="pb-6"
      >
        <SwiperNavButton />

        {data?.data?.map((category) => (
          <SwiperSlide key={category._id}>
            <Link to={`/ProductByCat/${category.slug}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group overflow-hidden border border-gray-200 dark:border-gray-700">

                {/* Responsive Image Container */}
                <div className="aspect-[4/3] md:aspect-[1/1] overflow-hidden w-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <div className="p-4 bg-gradient-to-b from-white dark:from-gray-800 via-white dark:via-gray-800 to-gray-100 dark:to-gray-900">
                  <h3 className="text-center font-semibold text-base md:text-lg text-gray-800 dark:text-white truncate">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
}
