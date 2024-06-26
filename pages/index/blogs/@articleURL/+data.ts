import axios from "axios";
import type { PageContextServer } from "vike/types";
import type { Article, ArticleCategories } from "../../types";
import { render } from "vike/abort";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
    try {
        const res = await axios.get(import.meta.env.BASE_URL + "/blog/article/" + pageContext.routeParams.articleURL);
        const articles = res.data.data as Article;
        const categoriesRes = await axios.get(
            import.meta.env.BASE_URL + "/blog/article/categories/" + pageContext.routeParams.articleURL
        );
        const categories = categoriesRes.data.data as ArticleCategories[];
        return { ...articles, categories };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) throw render(404, "Page not found");
            else throw render(500, "Something went wrong.");
        } else throw new Error("error");
    }
};
