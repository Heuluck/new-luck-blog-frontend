import { Article } from "@pages/index/types";
import axios from "axios";
import { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    try {
        const res = await axios.get(import.meta.env.BASE_URL + "/blog/article/" + pageContext.routeParams.articleURL);
        const articles: Article = res.data.data as Article;
        return articles;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error);
        }
        return;
    }
};
