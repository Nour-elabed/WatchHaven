import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";
import { getProducts } from "@/services/productService";
import ScrollCarousel from "./ui/ScrollCarousel"; // Your existing untouched carousel
import { Link } from "react-router-dom";

const BestSellers: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["home", "best-sellers"],
    staleTime: 0,
    queryFn: async () => (await getProducts({ sort: "rating", limit: 12 })).data,
  });

  const products = (data as Product[] | undefined) ?? [];

  return (
    <section className="w-full py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile heading */}
        <h2 className="md:hidden flex flex-col items-start text-3xl font-extrabold text-gray-900 mb-8 pt-4">
          <span>Best Sellers.</span>
        </h2>

        {/* Desktop heading */}
        <div className="hidden md:flex flex-col items-start w-full mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            <span>Best Sellers. </span>
            <span className="text-gray-400 font-medium ml-2">Top rated timepieces</span>
          </h2>
        </div>
        <ScrollCarousel
          slides={products.map((product) => (
            <div key={product._id} className="scroll-carousel__slide px-2">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group w-[320px] md:w-[360px] lg:w-[400px]">
                {/* Image Container */}
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <Link to={`/product/${product._id}`}>
                    <img 
                      src={product.image || '/assets/images/placeholder.svg'} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.src = '/assets/images/placeholder.svg'; }}
                    />
                  </Link>
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1.5 rounded-full flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <span className="font-bold text-sm">{product.rating}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{product.gender}</span>
                    <span className="text-xs text-gray-400">{product.numReviews} reviews</span>
                  </div>
                  
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-bold text-lg text-gray-900 hover:text-black transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  
                  {product.seller && (
                    <p className="text-xs text-gray-500 font-medium">Sold by: <span className="text-gray-900">{product.seller.username}</span></p>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <Link 
                      to={`/product/${product._id}`}
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          options={{ 
            loop: products.length > 3, 
            align: "start",
            dragFree: true,
            slidesToScroll: 1,
            containScroll: false
          }}
        />
      </div>
    </section>
  );
};

export default BestSellers;