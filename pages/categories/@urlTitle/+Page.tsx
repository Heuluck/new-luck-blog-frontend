import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import ArticleItem from "../../../components/Blog/Index/article.jsx";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
    const blogs = useData<Data>();
    return (
        <div className="flex flex-col w-full">
            <h1 className="block w-full text-center text-3xl font-bold">分类文章：{blogs.categoryName}</h1>
            <p className="block w-full text-center text-lg my-3">{blogs.categoryDescription}</p>
            <div className="w-full">
                {blogs.data.map(({ id, title, content, titleURL, username, lastUpdate }) => (
                    <ArticleItem
                        key={id}
                        id={id}
                        title={title}
                        username={username}
                        titleURL={titleURL}
                        lastUpdate={lastUpdate}
                        content={content}
                    />
                ))}
            </div>
        </div>
    );
}
