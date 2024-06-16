import { PageContext } from "vike/types";
import { Data } from "./+data";

export function title(pageContext: PageContext<Data>) {
    const blog = pageContext.data;
    return `修改文章：` + blog?.title;
}
