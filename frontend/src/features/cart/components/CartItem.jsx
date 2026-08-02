import { CounterButton } from "@/components/counter-button";
import React from "react";

export default function CartItem({ item }) {
  return (
    <div className="px-4 text-primary md:px-8 py-10 border-b space-y-4 border-border">
      <div className="flex xl:items-end justify-between">
        <div className="flex flex-col xl:flex-row xl:items-end gap-3 xl:gap-20">
          <h1 className=" text-xl md:text-3xl xl:text-5xl font-roboto-condensed ">
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
              alt=""
            />
          </div>

          <div className="hidden xl:flex flex-col justify-between items-end">
            <button className="text-4xl cursor-pointer">Delete</button>
            <CounterButton initialCount={item.quantity} className="w-40" />
          </div>
        </div>
      </div>

      <div className="flex xl:hidden flex-1 items-end justify-between md:gap-10">
        <CounterButton
          initialCount={item.quantity}
          className="w-36   md:w-40"
        />
        <button className="text-xl md:text-2xl lg:text-4xl cursor-pointer">Delete</button>
      </div>
    </div>
  );
}
