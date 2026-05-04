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
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-6 pb-16">
        {/* Back to Home — compact, above the layout */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-5 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          
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

          {/* MAIN CONTENT — starts at exact same level as sidebar */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">The Collection</h1>
                <p className="text-muted-foreground text-sm mt-1">Discover our curated selection of premium timepieces</p>
              </div>
              {searchQuery && (
                <div className="bg-secondary px-4 py-2 rounded-full text-sm font-medium shrink-0">
                  Searching: <span className="text-primary">"{searchQuery}"</span>
                </div>
              )}
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
