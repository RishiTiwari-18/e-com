import { CounterButton } from "@/components/counter-button";
import React from "react";
import useCart from "../hooks/useCart";
import { toast } from "sonner";

export default function CartItem({ item }) {
  const { handleUpdateCartItem, handleDeleteCartItem } = useCart();

  const handleItemUpdate = (val) => {
    if (val === item.quantity) return;
    handleUpdateCartItem(item._id || item.id, { quantity: val }).catch((error) => {
      toast.error(error.message || "Failed to update cart item");
    });
  };

  const handleDelete = async () => {
    const itemId = item._id || item.id;
    try {
      await handleDeleteCartItem(itemId);
      toast.success("Item removed from bag");
    } catch (error) {
      toast.error(error.message || "Failed to remove item");
    }
  };

  return (
    <div className="px-4 text-primary md:px-8 py-10 border-b space-y-4 border-border">
      <div className="flex xl:items-end justify-between">
        <div className="flex flex-col xl:flex-row xl:items-end gap-3 xl:gap-20">
          <h1 className=" text-xl md:text-3xl max-w-55 xl:text-5xl font-roboto-condensed ">
            {item.product.title}
          </h1>
          <p className=" md:text-3xl xl:text-5xl font-roboto-condensed ">
            Rs.{item.product.price}
          </p>
          <p className=" md:text-3xl xl:text-5xl font-roboto-condensed ">
            Size: {item.size}
          </p>
        </div>

        <div className="flex gap-20">
          <div className="h-30 w-30 md:h-60 md:w-60">
            <img
              className="h-full w-full object-cover"
              src={item.product.images[0]}
              alt={item.product.title || ""}
            />
          </div>

          <div className="hidden xl:flex flex-col justify-between items-end">
            <button
              className="text-4xl cursor-pointer hover:opacity-70 transition-opacity"
              onClick={handleDelete}
            >
              Delete
            </button>
            <CounterButton
              value={item.quantity}
              initialCount={item.quantity}
              className="w-40"
              min={1}
              max={item.product.units}
              onChange={(val) => handleItemUpdate(val)}
            />
          </div>
        </div>
      </div>

      <div className="flex xl:hidden flex-1 items-end justify-between md:gap-10">
        <CounterButton
          value={item.quantity}
          initialCount={item.quantity}
          className="w-36 md:w-40"
          min={1}
          max={item.product.units}
          onChange={(val) => handleItemUpdate(val)}
        />
        <button
          className="text-xl md:text-2xl lg:text-4xl cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
