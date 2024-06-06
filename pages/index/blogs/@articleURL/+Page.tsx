import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import Markdown from "react-markdown";
import dayjs from "dayjs";

export default function Page() {
    const article = useData<Data>();
    return (
        <>
            <div className="flex p-8 bg-slate-200 flex-col rounded-lg group md:w-9/12 w-full">
                <h1 className="font-serif font-bold md:text-2xl text-base text-blue-500 ">{article.title}</h1>
                <div className="group-hover:w-full group-hover:bg-blue-500 h-0.5 mt-1 bg-gray-700 w-1/2 transition-all duration-200" />
                <div className="flex flex-row mt-3">
                    <div className="text-xs text-gray-500">
                        {
                            <Markdown
                                className="inline-block"
                                components={{
                                    a: ({ children, href }) => (
                                        <a href={href} target="blank" className="text-blue-500 hover:underline">
                                            {children}
                                        </a>
                                    ),
                                }}>
                                {article.username}
                            </Markdown>
                        }
                    </div>
                    <div className="ml-3 text-xs text-gray-500">
                        {dayjs(article.lastUpdate).format("YYYY年MM月DD日 HH:MM")}
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
                                <a target="blank" href={href} className="text-blue-500 hover:underline">
                                    {children}
                                </a>
                            ),
                        }}>
                        {article.content}
                    </Markdown>
                </div>
            </div>
        </>
    );
}
