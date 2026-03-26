import { Button } from "./ui/button"
import { Link } from "react-router-dom"

const Banner = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 mt-8">
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
        <img
          src="/assets/images/bg-image.svg"
          alt="Banner"
          className="w-full h-[450px] md:h-[550px] lg:h-[640px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 z-20">
          <span className="text-xs sm:text-sm md:text-base font-bold tracking-widest text-black/70 uppercase mb-3 drop-shadow-sm">
            100% original products
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-4 leading-[1.15] max-w-lg drop-shadow-sm">
            The All New Fashion<br />
            Collection Items
          </h1>
          
          <span className="text-sm sm:text-base md:text-xl font-medium text-black/80 mb-8 drop-shadow-sm">
            Starting from: <span className="font-bold text-black">$59.99</span>
          </span>
          
          <Link to="/shop">
            <Button
              className="bg-black text-white font-bold rounded-full 
                         flex items-center gap-2 px-8 py-6 text-sm md:text-base
                         transform transition-all duration-300 shadow-xl
                         hover:-translate-y-1 hover:shadow-2xl active:scale-95 cursor-pointer border-2 border-black hover:bg-white hover:text-black"
            >
              Shop Now
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>

    
  )
}

export default Banner