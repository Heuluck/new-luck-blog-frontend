import React from "react";
import { Counter } from "./Counter.jsx";
import { SlateBgBreadcrumb } from "@components/button/breadcrumb.jsx";
import { Button } from "@components/button/button.jsx";
import { Cube } from "@components/Test/3D/3d.jsx";

export default function Page() {
    return (
        <div className="flex flex-col w-full">
            <SlateBgBreadcrumb
                list={[{ url: "/", title: "首页" }, { title: "展示" }]}
                displayBack
            />
            <div className="flex p-8 bg-white flex-col rounded-lg group w-full border-dashed border border-gray-500">
              <h1 className="text-2xl">按钮</h1>
              <div className="my-3 flex flex-row flex-wrap gap-3">
                <Button color="primary">主要</Button>
                <Cube></Cube>
              </div>
            </div>
        </div>
    );
}
