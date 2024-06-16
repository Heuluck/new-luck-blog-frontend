import axios from "axios";

import { Button } from "@components/button/button";
import { Input } from "@components/Form/Input";
import React, { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { message } from "antd";

export default function Page() {
    const PageContext = usePageContext();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleURL, setTitleURL] = useState(crypto.randomUUID().slice(0, 8));
    const [writer, setWriter] = useState(PageContext.user?.name ?? "");
    const [messageApi, contextHolder] = message.useMessage();

    function adjustHeight(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const submit = async () => {
        if (
            title.trim().length >= 1 &&
            content.trim().length >= 1 &&
            writer?.trim().length >= 1 &&
            titleURL.trim().length >= 1
        )
            try {
                const res = await axios.post(import.meta.env.PUBLIC_ENV__BASE_URL + "/blog/", {
                    title,
                    content,
                    titleURL,
                    username: writer,
                });
                if (res.status === 201) {
                    messageApi.success(res.data.message);
                    setTimeout(() => {
                        window.location.href = "/dashboard/Articles";
                    }, 700);
                }
            } catch (e) {
                if (axios.isAxiosError(e)) messageApi.error(e.response?.data.message ?? e.message);
                else messageApi.error("未知错误");
            }
        else {
            messageApi.warning("请正确输入");
        }
    };
    return (
        <>
            {contextHolder}
            <div
                className="absolute top-0 left-0 w-full h-full bg-white rounded-xl border border-solid border-gray-400 overflow-hidden flex
            flex-col">
                <div className="bg-zinc-100 p-4 text-gray-500 border-b border-gray-300 rounded-t-xl">
                    <p>新建文章</p>
                </div>
                <div className="overflow-y-auto h-full">
                    <div id="title" className="m-2 mb-0">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="请输入标题"
                            className="p-4 w-full text-3xl focus-visible:outline-none font-bold"
                        />
                    </div>
                    <div id="body" className="m-2 mt-0">
                        <textarea
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                adjustHeight(e);
                            }}
                            className="break-words p-4 w-full h-full text-lg focus-visible:outline-none resize-none"
                            placeholder="请输入内容"></textarea>
                    </div>
                </div>
                <div
                    id="foot"
                    className="bg-zinc-100 p-4 h-20 text-gray-500 border-t border-gray-300 rounded-b-xl relative bottom-0 w-full
                    flex gap-4">
                    {/* <Input></Input> */}
                    <Input
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                        color="primary"
                        placeholder="作者"
                    />
                    <Input
                        value={titleURL}
                        onChange={(e) => setTitleURL(e.target.value)}
                        color="primary"
                        placeholder="自定义URL"
                    />
                    <div className="ml-auto flex gap-4">
                        <Button color="secondary" size="large" onClick={() => messageApi.info("还没实现")}>
                            暂存
                        </Button>
                        <Button color="primary" size="large" onClick={submit}>
                            发布
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
