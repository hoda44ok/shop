import axios from "axios";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { SwiperNavButton } from "./../SwiperNavButton/SwiperNavButton";

export default function Brand() {
  const { data, isLoading } = useQuery("brands", getBrand);

  async function getBrand() {
    const response = await axios.get("https://beige-alligator-527710.hostingersite.com/public/api/brands");
    return response.data;
  }

  if (isLoading) return <div>Loading...</div>;

  return (

    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-gray-800 dark:text-white text-lg sm:text-xl font-bold mb-4 tracking-wide">
        Our Brands
      </h2>

      <Swiper
        breakpoints={{
          300: { slidesPerView: 3, spaceBetween: 4 },
          640: { slidesPerView: 4, spaceBetween: 8 },
          768: { slidesPerView: 6, spaceBetween: 12 },
          1024: { slidesPerView: 8, spaceBetween: 16 },
        }}
        loop={true}
        keyboard={{ enabled: true }}
        className="pb-4"
      >
        <SwiperNavButton />

        {data?.data?.map((brand) => (
          <SwiperSlide key={brand.id}>
            <Link to={`/ProductByBrand/${brand.slug}`}>
              <div className="flex flex-col items-center justify-center group transition-transform duration-300 hover:scale-105">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.logo_url}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 mt-2 font-medium text-center truncate max-w-[5rem] sm:max-w-[6rem]">
                  {brand.name}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
}
