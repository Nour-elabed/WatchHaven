import ScrollCarousel from "./ui/ScrollCarousel";
import SlidePost from "./shared/SlidePost";
import { slidesData } from "./constants/data";

export const Collections = () => {
  return (
    <section className="w-full py-16 px-4 sm:mt-32 md:mt-40 md:px-8">
  <h2 className="flex flex-col items-start md:hidden text-2xl font-bold text-gray-900 mb-8 px-2 ml-8 mt-20">
    <span>Start exploring.</span>
  </h2>

  <div className="hidden md:flex  flex-col items-center mb-12 md:mr-[65vh] lg:mr-[65vh]">
    <h2 className="text-3xl font-bold text-gray-900">
      <span>Start exploring. </span>
      <span className="text-gray-400">
        Good things are waiting for you
      </span>
    </h2>
  </div>

      <div className="max-w-7xl mx-auto ">
        <ScrollCarousel
          options={{ 
            loop: true,
            align: "start",
            dragFree: false 
          }}
          slides={slidesData.map((slide, index) => (
            <div key={index} className="px-3 md:px-4 flex">
              <SlidePost
                text={slide.text}
                paragraph={slide.paragraph}
                link={slide.link || "/shop"}
                linkText={slide.linkText} 
              />
            </div>
          ))}
        />
      </div>
    </section>
  );
};

export default Collections;