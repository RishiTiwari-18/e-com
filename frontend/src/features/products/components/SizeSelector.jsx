import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function SizeSelector({ value, onChange }) {
  const [size, setSize] = useState("");

  const current = value ?? size;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl max-md:hidden text-primary">Size</h2>

        <ToggleGroup
          type="single"
          value={current ? [current] : []}
          onValueChange={(values) => {
            const value = values[0] ?? "";

            if (onChange) onChange(value);
            else setSize(value);
          }}
          className=" md:gap-6"
        >
          {sizes.map((item) => (
            <ToggleGroupItem key={item} value={item} className="text-2xl">
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
