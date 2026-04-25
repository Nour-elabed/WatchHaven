import '../index.css'
import './ui/Embla.css'
import { EmblaCarousel } from "./ui/EmblaCarousel"
import { Button } from "@/components/ui/button"
import { LucideSearch, Users, Package, Star } from "lucide-react"
import { Link } from 'react-router-dom'

const statCards = [
  { icon: Users, value: '10K+', label: 'Customers' },
  { icon: Package, value: '500+', label: 'Products' },
  { icon: Star, value: '4.9★', label: 'Rating' },
]

const Hero = () => {
  const slides: string[] = [
    "/assets/images/hero-bg.svg",
    "/assets/images/V_Magazine_139_Cover_Shoot_02_Gigi_Hadid_Look_03_1848-2-2_Digital-copy.jpg",
    "/assets/images/bella-hadid-6p2iop9d6y9c0i78.jpg"
  ]

  return (
    <section className="w-full relative bg-gray-50/20 pb-8">
      <div className="w-full h-[550px] md:h-[700px]">
        <EmblaCarousel>
        {slides.map((img: string, index: number) => (
          <div className="embla__slide" key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="embla__slide__img"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-6 md:px-8 ml-0 sm:ml-0 md:ml-12 text-black">
              <span className="text-lg sm:text-base md:text-lg mb-2 font-medium text-black opacity-60">
                Starting from: $49.99
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-12 leading-tight">
                Exclusive collection<br />
                for everyone
              </h1>

              <div>
                <Button
                  asChild
                  variant="outline"
                  className="bg-black text-gray-100 font-medium shadow-lg rounded-full flex items-center gap-2 px-6 py-3 transform transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  <Link to="/shop">
                    <span>Explore Now</span>
                    <LucideSearch className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </EmblaCarousel>
      </div>

      {/* Stat cards — Desktop: flex row of 3 | Mobile: column */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20 mb-16 relative z-20">
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-8 w-full">
          {statCards.map(({ icon: Icon, value, label }) => (
            <Link to="/shop" key={label} className="w-full group">
              <div className="flex items-center justify-center gap-6 bg-white rounded-[2rem] px-8 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] cursor-pointer h-full">
                <div className="p-5 bg-gray-50/80 rounded-2xl group-hover:bg-black transition-all duration-500 shadow-sm group-hover:shadow-md">
                  <Icon className="w-8 h-8 text-gray-700 group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-none tracking-tight">{value}</p>
                  <p className="text-sm lg:text-base text-gray-500 font-bold tracking-widest uppercase mt-3">{label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Stacked Vertical Cards for wider display */}
        <div className="md:hidden flex flex-col gap-4 w-full">
          {statCards.map(({ icon: Icon, value, label }) => (
            <Link to="/shop" key={label} className="w-full group">
              <div className="flex items-center gap-5 bg-white rounded-2xl px-6 py-6 shadow-sm border border-gray-100 transform transition-all active:scale-[0.98] cursor-pointer w-full">
                <div className="p-4 bg-gray-50 rounded-xl group-active:bg-black transition-colors">
                  <Icon className="w-6 h-6 text-gray-700 group-active:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-extrabold text-gray-900 leading-none">{value}</p>
                  <p className="text-[12px] font-bold text-gray-500 tracking-wider uppercase mt-1.5">{label}</p>
                </div>
                {/* Arrow indicator for clear clickability */}
                <div className="text-gray-300 group-active:text-gray-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Hero