import "../tailwind.css";
import React from "react";
import { TabLink } from "../../components/DashboardTabLink";
import { logout } from "@utils/client/requests/main";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-200 flex flex-row">
            <LeftBar>
                <a
                    href="/"
                    className="rounded-lg bg-slate-500 font-bold text-center p-2 m-6 text-gray-300 transition-all hover:scale-105 active:scale-95">
                    Heuluck的新博客
                </a>
                <TabLink href="/dashboard">首页</TabLink>
                <TabLink href="/dashboard/Articles">文章管理</TabLink>
                <TabLink onClick={()=>logout("/")}>退出登录 </TabLink>
            </LeftBar>
            <Content>{children}</Content>
        </div>
    );
}

export function LeftBar({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col w-60 bg-slate-800">{children}</div>;
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div id="page-container" className=" w-full flex justify-center items-center page-transition-finish">
            <div id="page-content" className="p-5 h-screen pb-12 w-full flex justify-center items-center">
                <div className="w-full h-full m-5 bg-gray-100 rounded-xl overflow-y-auto p-8 relative">{children}</div>
            </div>
        </div>
    );
}
