import type { Product } from "@/types"
import Footer from "./Footer"
import Recommendations from "./Recommendations"

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col gap-8 p-4 lg:px-16 w-full max-w-full overflow-visible text-gray-900">
      <section className="w-full">
        <h2 className="text-2xl font-bold mb-2">About this product</h2>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Category</p>
          <p className="font-semibold">{product.gender}</p>
        </div>
        <div className="rounded-xl border p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Style</p>
          <p className="font-semibold">{product.category}</p>
        </div>
        <div className="rounded-xl border p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Stock</p>
          <p className="font-semibold">{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p>
        </div>
      </section>

      <div className="w-full overflow-visible">
        <Recommendations />
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetails
