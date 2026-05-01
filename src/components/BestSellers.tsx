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

  if (products.length === 0) return null;

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile heading */}
        <div className="md:hidden mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Best Sellers.</h2>
            <p className="text-sm text-gray-400 font-medium mt-1">Top rated timepieces</p>
        </div>

        {/* Desktop heading */}
        <div className="hidden md:flex flex-col items-start w-full mb-12">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
            Best Sellers.
          </h2>
          <p className="text-lg text-gray-400 font-medium mt-3">Our most coveted watches, as chosen by our community</p>
        </div>

        <div className="relative -mx-4 md:-mx-8">
            <ScrollCarousel
                slides={products.map((product) => (
                    <div key={product._id} className="scroll-carousel__slide px-2">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden group w-[320px] md:w-[360px] lg:w-[400px]">
                            {/* Image Container */}
                            <div className="relative h-72 md:h-80 overflow-hidden bg-gray-50">
                                <Link to={`/product/${product._id}`}>
                                    <img 
                                        src={product.image || '/assets/images/placeholder.svg'} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        onError={(e) => { e.currentTarget.src = '/assets/images/placeholder.svg'; }}
                                    />
                                </Link>
                                {/* Rating Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-white/20">
                                    <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                    <span className="font-black text-xs text-gray-900">{product.rating}</span>
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-7 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">{product.brand}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.gender}</span>
                                </div>
                                
                                <Link to={`/product/${product._id}`}>
                                    <h3 className="font-extrabold text-xl text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 leading-tight">{product.name}</h3>
                                </Link>
                                
                                <div className="flex items-end justify-between pt-2">
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price</p>
                                        <span className="text-3xl font-black text-gray-900 leading-none">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <Link 
                                        to={`/product/${product._id}`}
                                        className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-black/10 active:scale-95"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
                    containScroll: "trimSnaps"
                }}
            />
        </div>
      </div>
    </section>
  );
};

export default BestSellers;