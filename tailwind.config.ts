import type { Config } from "tailwindcss";

export default {
    content: ["./{pages,layouts,components,src}/**/*.{html,js,jsx,ts,tsx,vue}"],
    theme: {
        extend: {
            animation: {
                "ani-wave-white": "button-wave-border-white 1.5s infinite",
                "ani-wave-blue": "button-wave-border-blue 1.5s infinite",
            },
            keyframes: {
                "button-wave-border-white": {
                    "0%": {
                        boxShadow: "0 0 0 0 rgba(255,255,255,0.4)",
                    },
                    "100%": {
                        boxShadow: "0 0 0 20px rgba(255,255,255,0)",
                    },
                },
                "button-wave-border-blue": {
                    "0%": {
                        boxShadow: "0 0 0 0 rgba(59, 130, 246,0.4)",
                    },
                    "100%": {
                        boxShadow: "0 0 0 20px rgba(255,255,255,0)",
                    },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
