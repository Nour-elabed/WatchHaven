import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import ProductContent from "@/components/ProductContent"
import ProductDetails from "@/components/ProductDetails"
import { getProductById } from "@/services/productService"
import { Spinner } from "@/components/ui/spinner"

const Product = () => {
  const { id } = useParams<{ id: string }>()

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing product id")
      return await getProductById(id)
    },
    enabled: Boolean(id),
  })

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-destructive font-medium">Failed to load product.</p>
      </div>
    )
  }

  return (
    <div>
      <ProductContent product={product} />
      <ProductDetails product={product} />
    </div>
  )
}

export default Product
