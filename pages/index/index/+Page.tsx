import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import ArticleItem from "../../../components/Blog/Index/article.jsx";
import { usePageContext } from "vike-react/usePageContext";
import { SlateBgBreadcrumb } from "@components/button/breadcrumb.jsx";

export default function Page() {
    const blogs = useData<Data>();
    return (
        <>
            <div className="w-full">
                <SlateBgBreadcrumb
                    list={[{ title: "首页" }]}
                />
                {blogs.map(({ id, title, content, titleURL, username, lastUpdate }) => (
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
        </>
    );
}
