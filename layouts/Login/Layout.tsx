import "../tailwind.css";
import React from "react";
import { TabLink } from "../../components/TabLink.jsx";
import { TopBar } from "@layouts/LayoutDefault";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
                {children}
            </div>
        </>
    );
}
