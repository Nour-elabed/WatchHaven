import Sidebar from "@/components/Sidebar"
import ShopContent from "@/components/ShopContent"
import { PaginationDemo } from "@/components/ui/PaginationDemo"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const Shop = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortOrder, setSortOrder] = useState("option-one")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("q") || ""

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category])
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category))
    }
  }

  return (
    <>
      {/* MAIN PAGE LAYOUT */}
      <div className="flex flex-col md:flex-row gap-12 px-4 md:px-8 py-8">
        
        {/* SIDEBAR DESKTOP */}
        <div className="hidden md:block w-80">
          <div className="h-full bg-white p-6 rounded-lg">
            <Sidebar 
              priceRange={priceRange} 
              setPriceRange={setPriceRange}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>


        <div className="block md:hidden">
          <Sidebar
              priceRange={priceRange} 
              setPriceRange={setPriceRange}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
           />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="h-full bg-white md:mt-4 md:p-12 rounded-lg">
            <ShopContent 
              priceRange={priceRange}
              sortOrder={sortOrder}
              selectedCategories={selectedCategories}
              searchQuery={searchQuery}
            />
          </div>

          <div className="flex justify-center md:justify-end mt-6 px-4">
            <PaginationDemo />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Shop
