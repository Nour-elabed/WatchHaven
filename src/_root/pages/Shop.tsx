import Sidebar from "@/components/Sidebar"
import ShopContent from "@/components/ShopContent"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

const Shop = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sortOrder, setSortOrder] = useState("option-one")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string>("ALL")
  
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("q") || ""
  const queryClient = useQueryClient()

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category])
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category))
    }
  }

  const handleRefreshProducts = () => {
    // Invalidate the products query to trigger a refetch with new random combinations
    queryClient.invalidateQueries({ queryKey: ["products"] })
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
              <div className="flex items-center gap-3">
                {selectedCategories.length > 0 && (
                  <button
                    onClick={handleRefreshProducts}
                    className="flex items-center gap-2 bg-white text-black border border-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/>
                    </svg>
                    Shuffle Products
                  </button>
                )}
                {searchQuery && (
                  <div className="bg-secondary px-4 py-2 rounded-full text-sm font-medium">
                    Search results for: <span className="text-primary">"{searchQuery}"</span>
                  </div>
                )}
              </div>
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
