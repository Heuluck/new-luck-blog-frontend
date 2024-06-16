import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import Markdown from "react-markdown";
import dayjs from "dayjs";
import { CategoryButton } from "@components/button/category.jsx";
import { SlateBgBreadcrumb } from "./../../../../components/button/breadcrumb";

export default function Page() {
    const articleData = useData<Data>();
    return (
        <div className="flex flex-col w-full">
            <SlateBgBreadcrumb
                list={[{ url: "/", title: "首页" }, { title: "文章" }, { title: articleData.title }]}
                displayBack
            />
            <div className="flex p-8 bg-white flex-col rounded-lg group w-full border-dashed border border-gray-500">
                <h1 className="font-bold md:text-3xl text-base text-main-500">{articleData.title}</h1>
                <div className="group-hover:w-full group-hover:bg-main-500 h-0.5 mt-1 bg-gray-400 w-1/2 transition-all duration-200" />
                <div className="flex flex-row mt-3">
                    <div className="text-xs text-gray-500">
                        {
                            <Markdown
                                className="inline-block"
                                components={{
                                    a: ({ children, href }) => (
                                        <a
                                            href={href}
                                            target="blank"
                                            className="p-1 rounded-lg text-main-500 transition-all hover:bg-slate-200">
                                            {children}
                                        </a>
                                    ),
                                }}>
                                {articleData.username}
                            </Markdown>
                        }
                    </div>
                    <div className="ml-3 text-xs text-gray-500">
                        {dayjs(articleData.lastUpdate).format("YYYY年MM月DD日 HH:MM")}
                    </div>
                </div>
                <div className="font-sans">
                    <Markdown
                        components={{
                            h1: ({ children }) => <h1 className="text-3xl font-bold my-9">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-2xl font-bold my-9">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xl font-bold my-9">{children}</h3>,
                            h4: ({ children }) => <h4 className="text-lg font-bold my-9">{children}</h4>,
                            h5: ({ children }) => <h5 className="text-base font-bold my-9">{children}</h5>,
                            p: ({ children }) => <p className="my-7 indent-8">{children}</p>,
                            a: ({ children, href }) => (
                                <a target="blank" href={href} className="text-main-500 hover:underline">
                                    {children}
                                </a>
                            ),
                            code: ({ children }) => <code className="bg-gray-200 px-4 py-6 rounded-md inline-block">{children}</code>,
                        }}>
                        {articleData.content}
                    </Markdown>
                </div>
                <div className="w-full h-px bg-slate-300 transition-all duration-200 mt-6 self-center" />
                <div>
                    <h2 className="text-2xl font-bold my-4">分类</h2>
                    {articleData.categories ? (
                        articleData.categories.map(({ name, url_title }) => (
                            <CategoryButton key={url_title} name={name} url_title={url_title} />
                        ))
                    ) : (
                        <span>暂无分类</span>
                    )}
                </div>
            </div>
        </div>
    );
}
