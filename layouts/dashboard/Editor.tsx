import "../tailwind.css";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-200 flex flex-row">
            <Content>{children}</Content>
        </div>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div id="page-container" className=" w-full flex justify-center items-center page-transition-finish">
            <div id="page-content" className="p-5 h-screen w-full flex justify-center items-center">
                <div className="w-full h-full m-5 bg-gray-100 rounded-xl overflow-y-auto p-8 relative">{children}</div>
            </div>
        </div>
    );
}
