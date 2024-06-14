import "./style.css";

import "./tailwind.css";
import React from "react";
import { TabLink } from "../components/TabLink";
import { getCookie } from "@utils/client/cookie";
import { usePageContext } from "vike-react/usePageContext";
import { logout } from "@utils/client/requests/main";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
    const pageContext = usePageContext();
    return (
        <div className="min-h-screen bg-gray-100">
            <TopBar>
                {pageContext.urlPathname === "/" ? (
                    <div className="cursor-pointer select-none rounded-lg p-1 m-2 ml-4 px-3
                        mr-10 transition-all scale-105 hover:scale-110 active:scale-100 hover:bg-gray-100 flex flex-col">
                        <span className="text-orange-600 font-bold text-xl">Heuluck的新博客</span>
                        <span className="text-xs mt-0.5 block">—— 随便写的</span>
                    </div>
                ) : (
                    <a
                        href="/"
                        className="cursor-pointer select-none rounded-lg p-1 m-2 ml-4 px-3
                        mr-10 transition-all scale-105 hover:scale-110 active:scale-100 hover:bg-gray-100 flex flex-col">
                        <span className="text-orange-600 font-bold text-xl">Heuluck的新博客</span>
                        <span className="text-xs mt-0.5 block">—— 随便写的</span>
                    </a>
                )}
                <TabLink href="/">首页</TabLink>
                <TabLink href="/categories">标签</TabLink>
                <TabLink href="/index2">测试</TabLink>
                <a
                    href="https://heuluck.top"
                    className="select-none hidden p-4 px-6 md:flex justify-center items-center text-base transition-all
                    hover:text-gray-950 text-gray-600 hover:bg-orange-100 active:bg-orange-500 active:text-gray-100 font-bold">
                    老博客
                </a>
                <div className="ml-auto flex">
                    {pageContext.user?.type === "admin" && (
                        <a
                            className="hidden md:flex justify-center items-center mx-1 text-sm text-gray-500 hover:text-gray-950"
                            href="/dashboard">
                            <span className="p-2 rounded-lg transition-all hover:bg-gray-200">仪表盘</span>
                        </a>
                    )}
                    {pageContext.user ? (
                        <button
                            className="hidden md:flex justify-center items-center mx-1 text-sm text-gray-500 hover:text-gray-950"
                            onClick={() => {
                                logout();
                            }}>
                            <span className="p-2 rounded-lg transition-all hover:bg-gray-200">退出登录</span>
                        </button>
                    ) : (
                        <a
                            className="hidden md:flex justify-center items-center mx-1 text-sm text-gray-500 hover:text-gray-950"
                            href="/auth/login">
                            <span className="p-2 rounded-lg transition-all hover:bg-gray-200">登录</span>
                        </a>
                    )}
                </div>
            </TopBar>
            <Content>{children}</Content>
        </div>
    );
}

export function TopBar({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`${className} sticky top-0 z-40 w-full backdrop-blur-sm border-b border-solid border-gray-300`}>
            <div className="h-2 bg-orange-500/75 drop-shadow-2xl" />
            <div id="sidebar" className="sticky flex flex-row h-fit md:px-20 bg-white/60">
                {children}
            </div>
        </div>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div
            id="page-container"
            className="bg-gray-100 w-full flex justify-center items-center page-transition-finish">
            <div id="page-content" className="p-5 pb-12 w-full md:w-9/12 flex justify-center items-center">
                {children}
            </div>
        </div>
    );
}
