import "./style.css";

import "./tailwind.css";
import React from "react";
import { TabLink } from "../components/TabLink";
import { getCookie } from "@utils/client/cookie";
import { usePageContext } from "vike-react/usePageContext";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
    const pageContext = usePageContext();
    const cookieIsExists = pageContext.headers?.cookie;
    return (
        <div className="min-h-screen bg-slate-300">
            <TopBar>
                <a
                    href="/"
                    className="rounded-lg bg-slate-500 font-bold p-2 m-3 ml-4 mr-10 text-gray-300 transition-all hover:scale-105 active:scale-95">
                    Heuluck的新博客
                </a>
                <TabLink href="/">首页</TabLink>
                <TabLink href="/index2">测试</TabLink>
                <a
                    href="https://heuluck.top"
                    className="p-4 px-6 hidden md:flex justify-center items-center text-sm text-gray-400 hover:bg-gray-600 active:bg-gray-950">
                    老博客
                </a>
                {cookieIsExists && (
                    <a
                        className="hidden md:flex justify-center items-center ml-auto text-sm text-gray-400"
                        href="/dashboard"
                        target="_blank">
                        <span className="p-2 rounded-lg transition-all hover:bg-slate-600">控制台</span>
                    </a>
                )}
            </TopBar>
            <Content>{children}</Content>
        </div>
    );
}

export function TopBar({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={className}>
            <div className="h-2 bg-sky-500" />
            <div id="sidebar" className="sticky flex flex-row h-16 md:px-20 bg-slate-800">
                {children}
            </div>
        </div>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div
            id="page-container"
            className="bg-slate-300 w-full flex justify-center items-center page-transition-finish">
            <div id="page-content" className="p-5 pb-12 w-full md:w-9/12 flex justify-center items-center">
                {children}
            </div>
        </div>
    );
}
