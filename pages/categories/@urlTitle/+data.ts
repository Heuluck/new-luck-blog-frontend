import axios from "axios";
import type { PageContextServer } from "vike/types";
import { render } from "vike/abort";
import { Article } from "../types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    try {
        const res = await axios.get(import.meta.env.BASE_URL + "/blog/category/" + pageContext.routeParams.urlTitle);
        const articles = res.data.data as Article;
        return { ...articles };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) throw render(404, "Page not found");
            else throw render(500, "Something went wrong.");
        } else throw new Error("error");
    }
};
