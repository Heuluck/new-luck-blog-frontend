import dayjs from "dayjs";
import Markdown from "react-markdown";

interface prop {
    id?: number;
    title?: string;
    content?: string;
    username?: string;
    lastUpdate?: string;
    titleURL?: string;
}

function ArticleItem(props: prop) {
    const { id, title, content, username, lastUpdate, titleURL } = props;
    return (
        <>
            <div className="flex p-8 bg-slate-200 flex-col rounded-lg m-5 group">
                <a href={`/blogs/${titleURL}`} className="block w-fit p-1 rounded-lg font-sans font-semibold md:text-2xl text-base text-blue-500 transition-all hover:bg-slate-300">{title}</a>
                <div className="group-hover:w-full group-hover:bg-blue-500 h-0.5 mt-1 bg-gray-700 w-1/2 transition-all duration-200" />
                <div className="flex flex-row mt-3">
                    <div className="text-xs text-gray-500">{<Markdown>{username}</Markdown>}</div>
                    <div className="ml-3 text-xs text-gray-500">{dayjs(lastUpdate).format("YYYY年MM月DD日 HH:MM")}</div>
                </div>
                <div className="font-sans line-clamp-1 mt-3 text-sm overflow-hidden  text-ellipsis">
                    <Markdown>{content}</Markdown>
                </div>
                <a href={`/blogs/${titleURL}`} className="group/more mt-4 ml-auto text-blue-500">
                    查看更多<span className="select-none ml-0.5 group-hover/more:translate-x-2 inline-block transition-all duration-200">→</span>
                </a>
            </div>
        </>
    );
}

export default ArticleItem;
