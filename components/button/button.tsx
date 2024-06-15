import { FC, useEffect, useRef, useState } from "react";

export const Button: FC<Props> = ({
    size = "medium",
    color = "common",
    block,
    onClick,
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

    const basicStyle = "inline-block flex-grow-0 flex-shrink-0 transition-all cursor-pointer rounded-lg";
    const sizeStyle = {
        small: "text-sm p-0.5 px-2",
        medium: "text-base p-1 px-[15px]",
        large: "text-base p-2 px-5",
        xLarge: "text-lg p-4 px-7",
    };
    const colorStyle = {
        primary: "bg-main-400 hover:bg-main-300 active:bg-main-500 text-white",
        secondary: "bg-secondary-500 hover:bg-secondary-400 active:bg-secondary-600 text-white",
        common: "bg-white hover:bg-gray-200 hover:border-main-400 active:bg-gray-300 text-black border-gray-300 border-solid border",
        danger: "bg-red-500 hover:bg-red-400 active:bg-red-600 text-white",
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
                className={`${basicStyle} ${sizeStyle[size]} ${colorStyle[color]} ${blockStyle} ${className} ${isActive && activeColorStyle[color]}`}>
                {children}
            </a>
        </div>
    ) : (
        <div className={blockStyle}>
            <button
                type="button"
                onClick={() => {
                    setIsActive(true);
                    onClick && onClick();
                }}
                className={`${basicStyle} ${sizeStyle[size]} ${colorStyle[color]} ${blockStyle} ${className} ${isActive && activeColorStyle[color]}`}>
                {children}
            </button>
        </div>
    );
};

interface Props {
    /**
     * 按钮大小
     */
    size?: "small" | "medium" | "large" | "xLarge";
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
    onClick?: () => void;
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
