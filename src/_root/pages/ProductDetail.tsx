import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useCart } from "@/context/useCart"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { getProductById } from "@/services/productService"
import type { Product } from "@/types"
import { Spinner } from "@/components/ui/spinner"

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  })

  const isOwn = product?.seller && user ? product.seller._id === user.id : false

  const handleAddToCart = async () => {
    if (!product) return
    if (isOwn) {
      toast.error("You can't buy your own product")
      return
    }
    await addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success(`${product.name} added to cart!`)
  }

  const handleBuyNow = () => {
    if (!product || isOwn) return
    handleAddToCart()
    navigate("/cart")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-6 group"
        >
          <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-black dark:group-hover:border-gray-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span className="font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white dark:bg-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.src = "/assets/images/placeholder.svg";
                  img.onerror = null;
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <button onClick={() => navigate("/shop")} className="hover:text-black dark:hover:text-white">Shop</button>
              <span>/</span>
              <button
                onClick={() => navigate(`/shop?gender=${product.gender.toLowerCase()}`)}
                className="hover:text-black dark:hover:text-white capitalize"
              >
                {product.gender.toLowerCase()}
              </button>
              <span>/</span>
              <span className="text-black dark:text-white">{product.name}</span>
            </nav>

            {/* Product Title */}
            <div className="space-y-2">
              {/* Seller info */}
              {product.seller && (
                <div className="flex items-center gap-3 py-4 border-y border-gray-100 dark:border-gray-800 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold uppercase ${isOwn ? 'bg-blue-100 text-blue-600' : 'bg-secondary'}`}>
                    {isOwn ? 'Y' : product.seller.username.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{isOwn ? 'Your Listing' : 'Authorized Seller'}</p>
                    <p className="text-sm font-bold">{isOwn ? 'You' : product.seller.username}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-full">
                  {product.brand}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium uppercase tracking-wider rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium uppercase tracking-wider rounded-full">
                  {product.gender}
                </span>
                {product.seller && (
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${isOwn ? 'bg-blue-100 text-blue-600' : 'bg-accent/10 text-accent'}`}>
                    {isOwn ? 'Your Listing' : `Sold by: ${product.seller.username}`}
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">({product.numReviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              {product.stock > 0 ? (
                <p className="text-sm text-green-600 font-medium">In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-sm text-red-600 font-medium">Out of Stock</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {isOwn ? (
                <div className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-4 px-6 rounded-lg font-semibold text-center border border-blue-200 dark:border-blue-800">
                  This is your listing — you can manage it from your Seller Dashboard
                </div>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="flex-1 bg-white dark:bg-transparent text-black dark:text-white border-2 border-black dark:border-white py-3 px-6 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:bg-gray-100 dark:disabled:bg-transparent disabled:border-gray-300 dark:disabled:border-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Product Details</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Brand</dt>
                  <dd className="font-medium text-foreground">{product.brand}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Category</dt>
                  <dd className="font-medium text-foreground">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Gender</dt>
                  <dd className="font-medium text-foreground">{product.gender}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Stock</dt>
                  <dd className="font-medium text-foreground">{product.stock} units</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
