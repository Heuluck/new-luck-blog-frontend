import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import ArticleItem from "../../../components/Blog/Index/article.jsx";

export default function Page() {
    const blogs = useData<Data>();
    return (
        <>
            <div>
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
