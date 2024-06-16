import React from "react";
import { List } from "@components/Dashboard/bloglist/list";
import { Data } from "./+data";
import { useData } from "vike-react/useData";
import { Button } from "@components/button/button";

export default function Page() {
    const blogs = useData<Data>();
    return (
        <>
            <div>
                <span className="flex flex-row gap-4">
                    <h1 className="text-xl">文章列表</h1>
                    <Button onClick={()=>window.location.href = '/dashboard/Articles/new'} color="secondary">新建</Button>
                </span>
                <div className="my-4">
                    <List items={blogs} />
                </div>
            </div>
        </>
    );
}
