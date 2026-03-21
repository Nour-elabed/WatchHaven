"use client"

import { useCart } from "@/context/useCart"
import { paginationProducts } from "./constants/PaginationProducts"
import { toast } from "sonner"
import { Link } from "react-router-dom"

interface ProductProps {
  id: number
  image: string
  cartIcon: string
  description: string
  price: string
  bottomText: string
  bottomImage: string
  starIcon: string
  rating: string
}

interface ShopContentProps {
  priceRange: [number, number]
  sortOrder: string
  selectedCategories: string[]
  searchQuery?: string
}

const ShopContent = ({ priceRange, sortOrder, selectedCategories, searchQuery }: ShopContentProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = async (product: ProductProps) => {
    // Strip "$" and parse to number  e.g. "$169.99" → 169.99
    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""))

    await addToCart({
      productId: String(product.id),
      name: product.description,
      price: numericPrice,
      image: product.image,
    })

    toast.success(`${product.description} added to cart!`)
  }

  const filteredProducts = paginationProducts.filter(product => {
    if (searchQuery && !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    const price = parseFloat(product.price.replace(/[^0-9.]/g, ""))
    if (price < priceRange[0] || price > priceRange[1]) return false
    
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(product.bottomText)) return false
    }
    return true
  }).sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""))
    const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""))
    if (sortOrder === "option-four") return priceA - priceB
    if (sortOrder === "option-five") return priceB - priceA
    return 0
  })

  return (
    <section className="w-full flex justify-center">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center w-full max-w-[1200px] px-2">
        {filteredProducts.map((product: ProductProps) => (
          <div
            key={product.id}
            className="product-card rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-300 w-full max-w-[380px] md:max-w-[300px]"
          >
            <div className="relative">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity" alt={product.description} />
              </Link>
              {/* Cart icon overlay button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label={`Add ${product.description} to cart`}
              >
                <img src={product.cartIcon} className="w-5 h-5" alt="Add to cart" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-sm">{product.description}</h3>
                <span className="text-primary font-bold">{product.price}</span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{product.bottomText}</span>
                <img src={product.bottomImage} className="w-12 h-4" alt="price badge" />
              </div>

              <div className="flex items-center gap-1">
                <img src={product.starIcon} className="w-4 h-4" alt="Star" />
                <span className="text-sm">{product.rating}</span>
              </div>

              {/* Full-width Add to Cart button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full mt-2 bg-black text-white text-sm font-semibold py-2 rounded-full hover:bg-gray-800 active:scale-95 transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ShopContent