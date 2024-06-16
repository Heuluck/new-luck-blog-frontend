import React, { FC } from "react";

export const Input: FC<props> = ({ className, value, placeholder, color = "common", onChange }) => {
    const colors = {
        primary:
            "bg-gray-50 border-gray-300 text-gray-500 focus:text-gray-900 focus:ring-main-500 focus:border-main-500",
        secondary:
            "bg-gray-50 border-gray-300 text-gray-500 focus:text-gray-900 focus:ring-secondary-500 focus:border-secondary-500",
        common: "bg-gray-50 border-gray-300 text-gray-500 focus:text-gray-900 focus:ring-main-500 focus:border-main-500",
        error: "bg-gray-50 border-gray-300 text-gray-500 focus:text-gray-900 focus:ring-red-500 focus:border-red-500",
    };
    return (
        <input
            type="text"
            id="first_name"
            className={`text-sm rounded-lg p-2.5 ${colors[color]} focus-visible:outline-none border ${className} transition-all focus-visible:outline-0`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

interface props {
    className?: string;
    value?: string;
    placeholder?: string;
    color?: "primary" | "secondary" | "common" | "error";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
