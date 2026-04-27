import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types";
import { getProducts } from "@/services/productService";
import ScrollCarousel from "./ui/ScrollCarousel"; // Your existing untouched carousel
import { Link } from "react-router-dom";

const BestSellers: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["home", "best-sellers"],
    queryFn: async () => (await getProducts({ sort: "rating", limit: 12 })).data,
  });

  const products = (data as Product[] | undefined) ?? [];

  return (
    <section className="w-full py-16 px-4 md:px-8 mt-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile heading */}
        <h2 className="md:hidden flex flex-col items-start text-3xl font-extrabold text-gray-900 mb-8 pt-4">
          <span>Best Sellers.</span>
        </h2>

        {/* Desktop heading */}
        <div className="hidden md:flex flex-col items-start w-full mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            <span>Best Sellers. </span>
            <span className="text-gray-400 font-medium ml-2">Best selling of the month</span>
          </h2>
        </div>
        <ScrollCarousel
          slides={products.map((product) => (
            <div key={product._id} className="scroll-carousel__slide">
              <div className="premium-card overflow-hidden w-[260px]">
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
                </Link>
                <div className="p-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{product.gender}</p>
                  <p className="font-bold line-clamp-1">{product.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}★</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          options={{ 
            loop: true, 
            align: "start",
            dragFree: true ,
            slidesToScroll: 1,
             containScroll: "trimSnaps"
          }}
        />
      </div>
    </section>
  );
};

export default BestSellers;