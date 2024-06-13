import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import ArticleItem from "../../../components/Blog/Index/article.jsx";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
    const blogs = useData<Data>();
    const pageContext = usePageContext();
    return (
        <>
            <div>
                <button onClick={()=>console.log(pageContext.user)}>123</button>
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
