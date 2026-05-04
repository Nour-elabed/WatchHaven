import ScrollCarousel from "./ui/ScrollCarousel";
import SlidePost from "./shared/SlidePost";
import { slidesData } from "./constants/data";

export const Collections = () => {
  return (
    <section className="w-full py-12 px-4 md:px-8 mt-4 sm:mt-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile Heading */}
        <h2 className="md:hidden flex flex-col items-start text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 pt-4">
          <span>Start exploring.</span>
        </h2>

        {/* Desktop Heading */}
        <div className="hidden md:flex flex-col items-start w-full mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            <span>Start exploring. </span>
            <span className="text-gray-400 dark:text-gray-500 font-medium ml-2">
              Good things are waiting for you
            </span>
          </h2>
        </div>

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
