
import ProductContent from "@/components/ProductContent"
import ProductDetails from "@/components/ProductDetails"
import { useParams } from "react-router-dom"
import { paginationProducts } from "@/components/constants/PaginationProducts"

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const product = paginationProducts.find((p) => String(p.id) === id) || paginationProducts[0]

  return (
    
    <div>
      <ProductContent product={product}/>
      <ProductDetails/>
    </div>
  )
}

export default Product
