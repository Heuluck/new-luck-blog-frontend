import type { PageContext } from "vike/types";
import type { Data } from "./+data.js";

export function title(pageContext: PageContext<Data>) {
  const blogs = pageContext.data;
  return `喇克的新博客——现在有${blogs.length}篇`;
}
