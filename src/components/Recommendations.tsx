
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
    <div className="scroll-carousel__slide">
      <div className="premium-card overflow-hidden w-[260px]">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
        </Link>
        <div className="p-4 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{product.gender}</p>
          <p className="font-bold line-clamp-1">{product.name}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold">${product.price.toFixed(2)}</span>
            <button
              type="button"
              onClick={async () => {
                await addToCart({ productId: product._id, name: product.name, price: product.price, image: product.image });
                toast.success(`${product.name} added to cart!`);
              }}
              className="rounded-full border px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Recommendations: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["home", "recommendations"],
    queryFn: async () => (await getProducts({ limit: 12 })).data,
  });

  const products = (data as Product[] | undefined) ?? [];

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-gray-50/50 mt-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile Heading */}
        <h2 className="md:hidden flex flex-col items-start text-3xl font-extrabold text-gray-900 mb-8 pt-4">
          <span>Recommendations.</span>
        </h2>
        
        {/* Desktop Heading */}
        <div className="hidden md:flex flex-col items-start w-full mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            <span>Recommendations. </span>
            <span className="text-gray-400 font-medium ml-2">Best matching products for you</span>
          </h2>
        </div>
        <ScrollCarousel
          slides={products.map((product) => (
            <HomeCarouselCard key={product._id} product={product} />
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

export default Recommendations;