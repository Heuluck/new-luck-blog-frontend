import React, { FC, useEffect, useState } from "react";

export const Button: FC<Props> = ({
    disabled = false,
    size = "medium",
    color = "common",
    block,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    href,
    className,
    children,
}: Props) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            setTimeout(() => {
                setIsActive(false);
            }, 700);
        }
    }, [isActive]);

    const basicStyle = "inline-block flex-grow-0 flex-shrink-0 transition-all cursor-pointer rounded-lg text-nowrap";
    const sizeStyle = {
        xSmall: "text-sm p-0.5 px-2",
        small: "text-sm p-1 px-2.5",
        medium: "text-base p-1 px-[15px]",
        large: "text-base p-2 px-5",
        xLarge: "text-lg p-4 px-7",
    };
    const colorStyle = {
        primary: "bg-main-400 hover:bg-main-300 active:bg-main-500 text-white disabled:bg-main-200",
        secondary: "bg-secondary-400 hover:bg-secondary-300 active:bg-secondary-500 text-white disabled:bg-secondary-200",
        common: "bg-white hover:bg-gray-200 active:bg-gray-300 hover:border-main-400 text-black border-gray-300 border-solid border disabled:bg-gray-300 disabled:text-gray-400",
        danger: "bg-red-500 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-red-200",
    };
    const activeColorStyle = {
        primary: "animate-wave-main",
        secondary: "animate-wave-secondary",
        common: "animate-wave-main",
        danger: "animate-wave-red",
    };
    const blockStyle = block ? "w-full" : "";

    return href ? (
        <div className={blockStyle}>
            <a
                href={href}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onFocus={onFocus}
                onClick={(e) => {
                    setIsActive(true);
                    onClick && onClick(e);
                }}
                className={`${basicStyle} ${sizeStyle[size]} ${colorStyle[color]} ${blockStyle} ${className} ${isActive && activeColorStyle[color]}`}>
                {children}
            </a>
        </div>
    ) : (
        <div className={blockStyle}>
            <button
                disabled={disabled}
                type="button"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onFocus={onFocus}
                onClick={(e) => {
                    setIsActive(true);
                    onClick && onClick(e);
                }}
                className={`disabled:cursor-not-allowed ${basicStyle} ${sizeStyle[size]} ${colorStyle[color]} ${blockStyle} ${className} ${isActive && activeColorStyle[color]}`}>
                {children}
            </button>
        </div>
    );
};

interface Props {
    /**
     * 按钮是否禁用（对<a>标签无效）
     */
    disabled?: boolean;
    /**
     * 按钮大小
     */
    size?: "xSmall" | "small" | "medium" | "large" | "xLarge";
    /**
     * 按钮颜色
     */
    color?: "primary" | "secondary" | "danger" | "common";
    /**
     * 按钮是否块级元素
     */
    block?: boolean;
    /**
     * 点击事件
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
    /**
     * 鼠标移入事件
     */
    onMouseEnter?: () => void;
    /**
     * 鼠标移出事件
     */
    onMouseLeave?: () => void;
    /**
     * 聚焦事件
     */
    onFocus?: () => void;
    /**
     * 自定义样式
     */
    className?: string;
    /**
     * 按钮内容
     */
    children?: React.ReactNode;
    /**
     * 链接。当有链接时，按钮将渲染为a标签
     */
    href?: string;
}
