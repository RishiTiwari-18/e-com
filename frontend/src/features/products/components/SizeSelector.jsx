import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

const sizes = ["S", "M", "L", "XL", "2XL"];

export default function SizeSelector() {
  const [size, setSize] = useState("");

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl max-md:hidden text-primary">
          Size
        </h2>

        <ToggleGroup
          type="single"
          value={size}
          onValueChange={(value) => value && setSize(value)}
          className=" md:gap-6"
        >
          {sizes.map((item) => (
            <ToggleGroupItem
              key={item}
              value={item}
              className="text-2xl"
            >
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}