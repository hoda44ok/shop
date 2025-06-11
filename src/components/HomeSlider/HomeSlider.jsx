import Slider from "react-slick";
import img1 from "./../../assets/images/trinh-minh-th-MQOA0n3chA8-unsplash.jpg"
import img2 from "./../../assets/images/michal-kubalczyk-WecngmAT-KY-unsplash.jpg"
import img3 from "./../../assets/images/anton-3MSFrGsL6dk-unsplash.jpg"
import img4 from "./../../assets/images/markus-winkler-PQmXUxmfR44-unsplash.jpg"
import img5 from "./../../assets/images/shamblen-studios-xwM61TPMlYk-unsplash.jpg"


export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2600,
  };
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-1 items-start">

        {/* Slider Section */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
            <Slider {...settings}>
              {[img1, img2, img3].map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[440px] object-center transition-all duration-300"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Promo Images */}
        <div className="flex flex-col gap-1">
          {[img4, img5].map((img, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <img
                src={img}
                alt={`Promotion ${index + 1}`}
                className="w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>


  );
}

