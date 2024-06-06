import "./style.css";

import "./tailwind.css";
import React from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link.js";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-300">
            <TopBar>
                <a href="/" className="rounded-lg bg-slate-500 font-bold p-2 m-3 ml-4 mr-10 text-gray-300">Heuluck的新博客</a>
                <Link href="/">首页</Link>
                <Link href="/index2">测试</Link>
                <a
                    href="https://heuluck.top"
                    className="p-4 px-6 hidden md:flex justify-center items-center text-sm text-gray-400">
                    老博客
                </a>
            </TopBar>
            <Content>{children}</Content>
        </div>
    );
}

function TopBar({ children }: { children: React.ReactNode }) {
    return (
        <div>
        <div className="h-2 bg-sky-500" />
            <div id="sidebar" className="sticky flex flex-row h-16 md:px-20 bg-slate-800">
                {children}
            </div>
        </div>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div id="page-container" className="bg-slate-300 w-full flex justify-center items-center">
            <div id="page-content" className="p-5 pb-12 w-full md:w-9/12 flex justify-center items-center">
                {children}
            </div>
        </div>
    );
}
