import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CardSkeleton() {
  return (
    <div
      className=" flex h-full cursor-pointer flex-col overflow-hidden"
>
      <div className="relative rounded-xl overflow-hidden w-full aspect-4/5">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col py-4">
        <Skeleton className="h-4 w-52" />
        <div className="mt-1">
            <Skeleton className="h-4 w-26" />
        </div>
      </div>
    </div>
  );
}
