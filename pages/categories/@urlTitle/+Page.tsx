import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import ArticleItem from "../../../components/Blog/Index/article.jsx";
import { SlateBgBreadcrumb } from "@components/button/breadcrumb.jsx";

export default function Page() {
    const category = useData<Data>();
    return (
        <div className="flex flex-col w-full">
            <SlateBgBreadcrumb
                    list={[
                        { url: "/", title: "首页" },
                        { url: "/categories", title: "标签" },
                        { title: category.categoryName },
                    ]}
                    displayBack
                />
            <h1 className="block w-full text-center text-3xl font-bold">分类文章：{category.categoryName}</h1>
            <p className="block w-full text-center text-lg my-3">{category.categoryDescription}</p>
            <div className="w-full">
                {category.data.map(({ id, title, content, titleURL, username, lastUpdate }) => (
                    <ArticleItem
                        key={id}
                        id={id}
                        title={title}
                        username={username}
                        titleURL={titleURL}
                        lastUpdate={lastUpdate}
                        content={content}
                    />
                ))}
            </div>
        </div>
    );
}
