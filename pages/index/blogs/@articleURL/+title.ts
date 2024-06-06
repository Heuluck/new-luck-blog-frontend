import type { PageContext } from "vike/types";
import type { Data } from "./+data.js";

export function title(pageContext: PageContext<Data>) {
  const blog = pageContext.data;
  return blog.title;
}
