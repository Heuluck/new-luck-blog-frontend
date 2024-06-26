import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePageContext } from "vike-react/usePageContext";
import { message } from "antd";
import { Editor } from "@components/Dashboard/Editor";
import { Data } from "./+data";
import { PageContext } from "vike/types";

export default function Page(pageContext: PageContext<Data>) {
    const blog = pageContext.data;
    const PageContext = usePageContext();
    const [title, setTitle] = useState(blog?.title ?? "");
    const [content, setContent] = useState(blog?.content ?? "");
    const [titleURL, setTitleURL] = useState(blog?.titleURL ?? crypto.randomUUID().slice(0, 8));
    const [writer, setWriter] = useState(blog?.username ?? PageContext.user?.name ?? "");
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        window.onbeforeunload = () => {
            if (title.trim().length >= 1 || content.trim().length >= 1) return "你确定要离开吗？";
        };
    }, [title, content]);

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
                        window.onbeforeunload = null;
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
            <Editor
                pageTitle="新建文章"
                title={title}
                content={content}
                writer={writer}
                titleURL={titleURL}
                setTitle={setTitle}
                setContent={setContent}
                setWriter={setWriter}
                setTitleURL={setTitleURL}
                onSave={() => messageApi.info("还没实现")}
                onPublish={submit}
            />
        </>
    );
}
