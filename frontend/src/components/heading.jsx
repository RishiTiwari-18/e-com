import React from "react";

export default function Heading({children}) {
  return (
    <div className="relative">
      <h1 className="text-6xl font-semibold  uppercase tracking-tight">
        {children}
      </h1>
    </div>
  );
}
