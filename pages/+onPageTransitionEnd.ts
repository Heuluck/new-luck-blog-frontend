import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
    console.log("Page transition end");
    // setTimeout(() => {
        document.querySelector("#page-container")?.classList.add("page-transition-finish");
    // }, 300);
};
