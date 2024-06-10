import React from "react";
import { Counter } from "./Counter.js";

export default function Page() {
  return (
    <div>
      <h1 className="font-bold text-3xl m-3">看</h1>
      <p className="m-3">这个按钮点一下会+1</p>
      <div className="m-3"><Counter /></div>
    </div>
  );
}
