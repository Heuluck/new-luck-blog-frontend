import type { Config } from "tailwindcss";

export default {
    content: ["./{pages,layouts,components,src}/**/*.{html,js,jsx,ts,tsx,vue}"],
    theme: {
        colors: ({ colors }) => ({
            inherit: colors.inherit,
            current: colors.current,
            transparent: colors.transparent,
            black: colors.black,
            white: colors.white,
            slate: colors.slate,
            gray: colors.gray,
            zinc: colors.zinc,
            neutral: colors.neutral,
            stone: colors.stone,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            sky: colors.sky,
            blue: colors.blue,
            indigo: colors.indigo,
            violet: colors.violet,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,
            /**
             * 自定义主题色（亮）
             */
            main: colors.orange,
            /**
             * 自定义二号色（亮）
             */
            secondary: colors.emerald,
        }),
        extend: {
            animation: {
                "wave-main": "wave-main-color .7s",
                "wave-secondary": "wave-secondary-color .7s",
                "wave-red":"wave-red-color .7s"
            },
            keyframes: ({ theme }) => ({
                "wave-main-color": {
                    "0%": {
                        boxShadow: `0 0 0 0 ${theme("colors.main.400")}80`,
                    },
                    "100%": {
                        boxShadow: "0 0 0 10px rgba(255,255,255,0)",
                    },
                },
                "wave-secondary-color": {
                    "0%": {
                        boxShadow: `0 0 0 0 ${theme("colors.secondary.400")}80`,
                    },
                    "100%": {
                        boxShadow: "0 0 0 10px rgba(255,255,255,0)",
                    },
                },
                "wave-red-color": {
                    "0%": {
                        boxShadow: `0 0 0 0 ${theme("colors.red.400")}80`,
                    },
                    "100%": {
                        boxShadow: "0 0 0 10px rgba(255,255,255,0)",
                    },
                },
            }),
        },
    },
    plugins: [],
} satisfies Config;
