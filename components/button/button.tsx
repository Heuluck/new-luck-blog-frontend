import { FC } from "react";

interface Props {
    /**
     * The size of the button
     */
    size?: "small" | "medium" | "large" | "xLarge";
    /**
     * The color of the button
     */
    color?: "primary" | "secondary" | "danger" | "common";
    block?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const Button: FC<Props> = ({ size = "medium", color = "common", block, onClick, children }: Props) => {
    const basicStyle = "my-2 transition-all cursor-pointer rounded-lg";
    const sizeStyle = {
        small: "text-sm p-0.5 px-2",
        medium: "text-base p-1 px-[15px]",
        large: "text-base p-2 px-5",
        xLarge: "text-lg p-4 px-7",
    };
    const colorStyle = {
        primary: "bg-orange-400 hover:bg-orange-300 active:bg-orange-500 text-white",
        secondary: "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-white",
        common: "bg-white hover:bg-gray-200 active:bg-gray-300 text-black border-gray-300 border-solid border",
        danger: "bg-red-500 hover:bg-red-400 active:bg-red-600 text-white",
    };
    const blockStyle = block ? "w-full" : "";

    return (
        <button type="button" onClick={onClick} className={`${basicStyle} ${sizeStyle[size]} ${colorStyle[color]} ${blockStyle}`}>
            {children}
        </button>
    );
};
