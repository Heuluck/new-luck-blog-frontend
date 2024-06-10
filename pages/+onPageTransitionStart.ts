import type { OnPageTransitionStartAsync } from "vike/types";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
  document.querySelector("#page-container")?.classList.remove("page-transition-finish");
};
