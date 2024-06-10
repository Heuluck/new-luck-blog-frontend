import "../tailwind.css";
import React from "react";
import { Link } from "../../components/Link.js";
import { TopBar } from "@layouts/LayoutDefault";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
                <TopBar className="fixed top-0 w-full">
                    <a href="/" className="rounded-lg bg-slate-500 font-bold p-2 m-3 ml-4 mr-10 text-gray-300">
                        Heuluck的新博客
                    </a>
                    <Link href="/">首页</Link>
                    <Link href="/index2">测试</Link>
                    <Link href="/auth/login">登录</Link>
                    <Link href="/dashboard">后台</Link>
                    <a
                        href="https://heuluck.top"
                        className="p-4 px-6 hidden md:flex justify-center items-center text-sm text-gray-400 hover:bg-gray-600">
                        老博客
                    </a>
                </TopBar>
                {children}
            </div>
        </>
    );
}
