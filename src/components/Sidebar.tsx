"use client"

import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export type SidebarProps = {
  priceRange: [number, number]
  setPriceRange: (val: [number, number]) => void
  sortOrder: string
  setSortOrder: (val: string) => void
  selectedCategories: string[]
  onCategoryChange: (category: string, checked: boolean) => void
  selectedGender: string
  setSelectedGender: (val: string) => void
}

const Sidebar = ({ 
  priceRange, 
  setPriceRange, 
  sortOrder, 
  setSortOrder, 
  selectedCategories, 
  onCategoryChange,
  selectedGender,
  setSelectedGender
}: SidebarProps) => {

  const categories = ["Luxury", "Sport", "Classic", "Smart", "Minimalist"]
  const genders = [
    { label: "All", value: "ALL" },
    { label: "Men", value: "MEN" },
    { label: "Women", value: "WOMEN" },
    { label: "Unisex", value: "UNISEX" },
  ]

  return (
    <div className="space-y-10">
      {/* Gender Filter */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg tracking-tight">Gender</h3>
        <RadioGroup value={selectedGender} onValueChange={setSelectedGender} className="space-y-2.5">
          {genders.map((gender) => (
            <div key={gender.value} className="flex items-center space-x-3 transition-all hover:translate-x-1">
              <RadioGroupItem value={gender.value} id={`gender-${gender.value}`} />
              <Label htmlFor={`gender-${gender.value}`} className="text-sm font-medium cursor-pointer">
                {gender.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg tracking-tight">Style</h3>
        <div className="space-y-2.5">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-3 transition-all hover:translate-x-1">
              <Checkbox 
                id={`cat-${category}`} 
                checked={selectedCategories.includes(category)} 
                onCheckedChange={(checked) => onCategoryChange(category, !!checked)}
              />
              <Label htmlFor={`cat-${category}`} className="text-sm font-medium cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg tracking-tight">Price Range</h3>
          <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[0, 10000]}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={10000}
          step={50}
          className="py-4"
        />
        <div className="flex gap-4">
          <div className="flex-1 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Min</span>
            <div className="bg-secondary rounded-lg px-3 py-2 text-sm font-medium">$ {priceRange[0]}</div>
          </div>
          <div className="flex-1 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Max</span>
            <div className="bg-secondary rounded-lg px-3 py-2 text-sm font-medium">$ {priceRange[1]}</div>
          </div>
        </div>
      </div>

      {/* Sort Order */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="font-bold text-lg tracking-tight">Sort By</h3>
        <RadioGroup value={sortOrder} onValueChange={setSortOrder} className="space-y-2.5">
          <div className="flex items-center space-x-3 transition-all hover:translate-x-1">
            <RadioGroupItem value="option-one" id="sort-popular" />
            <Label htmlFor="sort-popular" className="text-sm font-medium cursor-pointer">Newest Arrivals</Label>
          </div>
          <div className="flex items-center space-x-3 transition-all hover:translate-x-1">
            <RadioGroupItem value="option-four" id="sort-price-low" />
            <Label htmlFor="sort-price-low" className="text-sm font-medium cursor-pointer">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-3 transition-all hover:translate-x-1">
            <RadioGroupItem value="option-five" id="sort-price-high" />
            <Label htmlFor="sort-price-high" className="text-sm font-medium cursor-pointer">Price: High to Low</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default Sidebar