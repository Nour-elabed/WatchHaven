"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "./Label"

export function CheckboxDemo({
  selectedCategories,
  onCategoryChange
}: {
  selectedCategories: string[]
  onCategoryChange: (label: string, checked: boolean) => void
}) {
  const labels = [
    "New Arrivals",
    "T-Shirts",
    "Shoes",
    "Accessories",
    "Hoodies",
    "Jeans",
    "Jackets",
  ]
  return (
    
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-semibold text-2xl mb-3">Categories</h1>

      </div>
      
      {labels.map((label) => (
        <div key={label} className="flex items-center space-x-4 text-gray-600">
          <Checkbox
            id={label}
            checked={selectedCategories.includes(label)}
            onCheckedChange={(checked) => onCategoryChange(label, checked === true)}
          />
          <Label htmlFor={label}>{label}</Label>
        </div>
      ))}
    </div>
  )
}

export default CheckboxDemo
