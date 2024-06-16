import React from "react";
import { List } from "@components/Dashboard/bloglist/list";
import { Data } from "./+data";
import { useData } from "vike-react/useData";

export default function Page() {
    const blogs = useData<Data>();
    return (
        <>
            <div>
                <h1 className="text-xl">文章列表</h1>
                <div className="my-4">
                    <List items={blogs} />
                </div>
            </div>
        </>
    );
}
