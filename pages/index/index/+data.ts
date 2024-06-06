import type { Article } from "../types";
import axios from "axios";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  try {
    const res = await axios.get(import.meta.env.BASE_URL + "/blog/list");
    const articles = res.data.data as Article[];
    return articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};
