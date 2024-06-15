import React from "react";
import { Counter } from "./Counter.jsx";
import { SlateBgBreadcrumb } from "@components/button/breadcrumb.jsx";
import { Button } from "@components/button/button.jsx";

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
                <Button color="primary" size="small">小号主要</Button>
                <Button color="secondary" size="small">小号次要</Button>
                <Button color="common" size="small">小号普通</Button>
                <Button color="danger" size="small">小号危险</Button>
                <Button color="primary">主要</Button>
                <Button color="secondary">次要</Button>
                <Button color="common">普通</Button>
                <Button color="danger">危险</Button>
                <Button color="primary" size="large">大号主要</Button>
                <Button color="secondary" size="large">大号次要</Button>
                <Button color="common" size="large">大号普通</Button>
                <Button color="danger" size="large">大号危险</Button>
                <Button color="primary" size="xLarge">超大号主要</Button>
                <Button color="secondary" size="xLarge">超大号次要</Button>
                <Button color="common" size="xLarge">超大号普通</Button>
                <Button color="danger" size="xLarge">超大号危险</Button>
                
                <Button color="primary" size="small" block>小号主要块级</Button>
                <Button color="secondary" size="small" block>小号次要块级</Button>
                <Button color="common" size="small" block>小号普通块级</Button>
                <Button color="danger" size="small" block>小号危险块级</Button>
                
                <Button color="primary" size="medium" block>中号主要块级</Button>
                <Button color="secondary" size="medium" block>中号次要块级</Button>
                <Button color="common" size="medium" block>中号普通块级</Button>
                <Button color="danger" size="medium" block>中号危险块级</Button>
                
                <Button color="primary" size="large" block>大号主要块级</Button>
                <Button color="secondary" size="large" block>大号次要块级</Button>
                <Button color="common" size="large" block>大号普通块级</Button>
                <Button color="danger" size="large" block>大号危险块级</Button>
                
                <Button color="primary" size="xLarge" block>超大号主要块级</Button>
                <Button color="secondary" size="xLarge" block>超大号次要块级</Button>
                <Button color="common" size="xLarge" block>超大号普通块级</Button>
                <Button color="danger" size="xLarge" block>超大号危险块级</Button>
              </div>
            </div>
        </div>
    );
}
