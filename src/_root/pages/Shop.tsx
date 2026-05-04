import Sidebar from "@/components/Sidebar"
import ShopContent from "@/components/ShopContent"
import Footer from "@/components/Footer"
import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

const Shop = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [sortOrder, setSortOrder] = useState("option-one")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string>("ALL")
  
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get("q") || ""

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category])
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category))
    }
  }

  const handleClearFilters = () => {
    setPriceRange([0, 10000])
    setSortOrder("option-one")
    setSelectedCategories([])
    setSelectedGender("ALL")
    if (searchQuery) setSearchParams({})
  }

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16">
        {/* Back to Home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-4 group"
        >
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* SIDEBAR */}
          <aside className="w-full lg:w-72 flex-shrink-0">
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
          <main className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-1">The Collection</h1>
                <p className="text-muted-foreground text-lg">Discover our curated selection of premium timepieces</p>
              </div>
              <div className="flex items-center gap-3">
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
              onClearFilters={handleClearFilters}
            />
          </main>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Shop
