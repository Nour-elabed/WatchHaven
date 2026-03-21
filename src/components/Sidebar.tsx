"use client"

import { CheckboxDemo } from "./ui/CheckboxCard"
import { Slider } from "@/components/ui/slider"
import { Input } from "./ui/input"
import { Label } from "@radix-ui/react-label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export type SidebarProps = {
  priceRange: [number, number]
  setPriceRange: (val: [number, number]) => void
  sortOrder: string
  setSortOrder: (val: string) => void
  selectedCategories: string[]
  onCategoryChange: (category: string, checked: boolean) => void
}

const Sidebar = ({ priceRange, setPriceRange, sortOrder, setSortOrder, selectedCategories, onCategoryChange }: SidebarProps) => {

  return (
    <div className="mt-6">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 p-18 rounded-lg">
        <CheckboxDemo selectedCategories={selectedCategories} onCategoryChange={onCategoryChange} />
        <div className="border w-60 mt-10"></div>
      </div>

      {/* Mobile Filters */}
      <div className="block md:hidden">
        <div className="flex gap-4 justify-center items-center mt-4 py-12 px-2 ">
          <button className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full border border-gray-300 text-sm hover:bg-gray-50 cursor-pointer flex-1 justify-center max-w-[200px]">
            <img src="/assets/icons/filter.svg" alt="filter" className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <button className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full border border-gray-300 text-sm hover:bg-gray-50 cursor-pointer flex-1 justify-center max-w-[200px]">
            <span>row per page</span>
            <img src="/assets/icons/ArrowDown.svg" alt="rows" className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden md:block">
        <div className="flex flex-col -mt-14 space-y-2 cursor-pointer">
          <div className="ml-14 px-6 py-4 cursor-pointer">
            <p className="font-semibold cursor-pointer">Price range</p>
          </div>

          <div className="w-65 ml-16 px-4 cursor-pointer">
            <Slider
              defaultValue={priceRange}
              onValueChange={(value) => {setPriceRange(value as [number, number])
              }}
              min={0}
              max={1000}
              step={1}
            />
          </div>
        </div>

        <div className="px-14 py-6">
          <div className="grid grid-cols-2 w-68 gap-4 mt-4 px-4">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm mb-1">Min price</span>
              <div className="relative">
                <Input
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  placeholder="0.00"
                  className="w-full rounded-full py-1"
                />
                <img
                  src="/assets/icons/dollar.svg"
                  alt="dollar"
                  className="absolute w-4 h-4 translate-x-22 -translate-y-6"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm mb-1">Max price</span>
              <div className="relative">
                <Input
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  placeholder="500"
                  className="w-full rounded-full py-1"
                />
                <img
                  src="/assets/icons/dollar.svg"
                  alt="dollar"
                  className="absolute w-4 h-4 translate-x-22 -translate-y-6"
                />
              </div>
            </div>

            <div className="border w-60 mt-6"></div>
          </div>
        </div>
      </div>

      {/* Desktop Sort Order */}
      <div className="hidden md:block px-18 mt-2 cursor-pointer">
        <p className="font-semibold mb-4 cursor-pointer">Sort order</p>

        <RadioGroup value={sortOrder} onValueChange={setSortOrder} className="space-y-2 cursor-pointer">
          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <RadioGroupItem value="option-one" id="option-one" className="cursor-pointer" />
            <Label className="text-sm cursor-pointer" htmlFor="option-one">Most Popular</Label>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <RadioGroupItem value="option-two" id="option-two" className="cursor-pointer" />
            <Label className="text-sm cursor-pointer" htmlFor="option-two">Best Rating</Label>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <RadioGroupItem value="option-three" id="option-three" className="cursor-pointer" />
            <Label className="text-sm cursor-pointer" htmlFor="option-three">Newest</Label>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <RadioGroupItem value="option-four" id="option-four" className="cursor-pointer" />
            <Label className="text-sm cursor-pointer" htmlFor="option-four">Price Low → High</Label>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <RadioGroupItem value="option-five" id="option-five" className="cursor-pointer" />
            <Label className="text-sm cursor-pointer" htmlFor="option-five">Price High → Low</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default Sidebar