
import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";
import { getProducts } from "@/services/productService";
import ScrollCarousel from "./ui/ScrollCarousel"; 
import { Link } from "react-router-dom";
import { useCart } from "@/context/useCart";
import { toast } from "sonner";

const HomeCarouselCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  return (
    <div className="scroll-carousel__slide px-2">
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
          {/* Stock Badge */}
          {product.stock === 0 && (
            <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
              Sold Out
            </span>
          )}
          {/* Quick Add Button (appears on hover) */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              disabled={product.stock === 0}
              onClick={async () => {
                await addToCart({ productId: product._id, name: product.name, price: product.price, image: product.image });
                toast.success(`${product.name} added to cart!`);
              }}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{product.gender}</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
          </div>
          
          <Link to={`/product/${product._id}`}>
            <h3 className="font-bold text-lg text-gray-900 hover:text-black transition-colors line-clamp-1">{product.name}</h3>
          </Link>
          
          {product.seller && (
            <p className="text-xs text-gray-500 font-medium">Sold by: <span className="text-gray-900">{product.seller.username}</span></p>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Recommendations: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["home", "recommendations"],
    staleTime: 0,
    queryFn: async () => (await getProducts({ limit: 12 })).data,
  });

  const products = (data as Product[] | undefined) ?? [];

  if (products.length === 0) return null;

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-white mt-4 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile Heading */}
        <div className="md:hidden mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Recommendations.</h2>
            <p className="text-sm text-gray-400 font-medium mt-1">Best matching for you</p>
        </div>
        
        {/* Desktop Heading */}
        <div className="hidden md:flex flex-col items-start w-full mb-12">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
            Recommendations.
          </h2>
          <p className="text-lg text-gray-400 font-medium mt-3">Curated timepieces based on your unique style</p>
        </div>

        <div className="relative -mx-4 md:-mx-8">
            <ScrollCarousel
                slides={products.map((product) => (
                    <HomeCarouselCard key={product._id} product={product} />
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

export default Recommendations;