import React from "react";

export default function Heading({children}) {
  return (
    <div className="relative">
      <h1 className="text-5xl font-newsreader font-light tracking-tight">
        {children}
      </h1>
      <div className="absolute bg-secondary h-0.5 w-20 -bottom-3" />
    </div>
  );
}
