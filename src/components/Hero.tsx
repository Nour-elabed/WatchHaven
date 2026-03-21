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
    <section className="w-full h-[700px] pt-16 relative">
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

      {/* Stat cards — Desktop: flex row of 3 | Mobile: grid */}
      <div className="w-full relative z-10 -mt-10 md:-mt-8 pb-10">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center gap-8 mt-4 px-8">
          {statCards.map(({ icon: Icon, value, label }) => (
            <Link to="/shop" key={label}>
              <div className="flex items-center gap-5 bg-white/95 backdrop-blur-md rounded-2xl px-10 py-6 shadow-xl border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group">
                <div className="p-3.5 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                  <p className="text-3xl font-extrabold text-gray-900 leading-tight">{value}</p>
                  <p className="text-sm text-gray-500 font-semibold tracking-wide uppercase mt-0.5">{label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: 3-item grid */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-12 px-4">
          {statCards.map(({ icon: Icon, value, label }, idx) => (
            <Link to="/shop" key={label} className={idx === 2 ? 'col-span-2' : ''}>
              <div className="flex justify-center items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-4 shadow-lg border border-gray-100 transform transition-all active:scale-95 cursor-pointer group">
                <div className="p-2.5 bg-gray-50 rounded-full group-hover:bg-black transition-colors">
                  <Icon className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-gray-900 leading-none">{value}</p>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase mt-0.5">{label}</p>
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