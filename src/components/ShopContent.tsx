import { useQuery } from "@tanstack/react-query"
import { useCart } from "@/context/useCart"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { getProducts } from "@/services/productService"
import type { Product, ApiResponse } from "@/types"
import { Spinner } from "./ui/spinner"

interface ShopContentProps {
  priceRange: [number, number]
  sortOrder: string
  selectedCategories: string[]
  selectedGender: string
  searchQuery?: string
}

const ShopContent = ({ priceRange, sortOrder, selectedCategories, selectedGender, searchQuery }: ShopContentProps) => {
  const { addToCart } = useCart()

  const { data: response, isLoading, isError } = useQuery<ApiResponse<Product[]>>({
    queryKey: ["products", priceRange, sortOrder, selectedCategories, selectedGender, searchQuery],
    queryFn: async () => {
      return await getProducts({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort: sortOrder === "option-four" ? "price-asc" : sortOrder === "option-five" ? "price-desc" : undefined,
        category: selectedCategories.length > 0 ? selectedCategories.join(",") : undefined,
        gender: selectedGender !== "ALL" ? selectedGender : undefined,
        search: searchQuery || undefined,
      })
    },
  })

  const handleAddToCart = async (product: Product) => {
    await addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success(`${product.name} added to cart!`)
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <Spinner className="w-10 h-10" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center py-20 text-destructive font-medium">
        Failed to load products. Please try again.
      </div>
    )
  }

  const products = response?.data || []

  if (products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 text-gray-900">
        {products.map((product) => (
          <div
            key={product._id}
            className="premium-card group overflow-hidden"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Link to={`/product/${product._id}`}>
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={product.name} 
                />
              </Link>
              <div className="absolute top-3 left-3">
                 <span className="glass px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black">
                   {product.brand}
                 </span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white"
                aria-label={`Add ${product.name} to cart`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-1">{product.gender}</p>
                  <h3 className="font-bold text-gray-900 group-hover:text-accent transition-colors">{product.name}</h3>
                </div>
                <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span className="text-sm font-semibold">{product.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{product.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ShopContent