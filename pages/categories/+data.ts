import axios from "axios";
import type { PageContextServer } from "vike/types";
import { render } from "vike/abort";
import { Categories } from "./types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (_: PageContextServer) => {
    try {
        const res = await axios.get(import.meta.env.BASE_URL + "/blog/category/categories/");
        const categories = res.data.data as Categories[] ;
        return categories;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) throw render(404, "Page not found");
            else throw render(500, "Something went wrong.");
        } else throw new Error("error");
    }
};
