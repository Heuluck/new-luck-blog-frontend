import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      className="inline-block border border-black rounded bg-gray-200 px-2 py-1 text-xs font-medium uppercase leading-normal transition-all hover:bg-gray-50 hover:scale-105 active:scale-95"
      onClick={() => setCount((count) => count + 1)}
    >
      点我{count}
    </button>
  );
}
