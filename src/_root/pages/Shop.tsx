import Sidebar from "@/components/Sidebar"
import ShopContent from "@/components/ShopContent"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const Shop = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sortOrder, setSortOrder] = useState("option-one")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string>("ALL")
  
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
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* SIDEBAR */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <Sidebar 
                priceRange={priceRange} 
                setPriceRange={setPriceRange}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
              />
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <div className="mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">The Collection</h1>
                <p className="text-muted-foreground">Discover our curated selection of premium timepieces</p>
              </div>
              {searchQuery && (
                <div className="bg-secondary px-4 py-2 rounded-full text-sm font-medium">
                  Search results for: <span className="text-primary">"{searchQuery}"</span>
                </div>
              )}
            </div>

            <ShopContent 
              priceRange={priceRange}
              sortOrder={sortOrder}
              selectedCategories={selectedCategories}
              selectedGender={selectedGender}
              searchQuery={searchQuery}
            />
          </main>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Shop
