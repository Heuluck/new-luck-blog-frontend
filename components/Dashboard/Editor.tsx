import { CloseOutlined } from "@ant-design/icons";
import { Button } from "@components/button/button";
import { Input } from "@components/Form/Input";
import React, { useRef } from "react";

interface props {
    pageTitle: string;
    title: string;
    content: string;
    writer: string;
    titleURL: string;
    setTitle: (value: string) => void;
    setContent: (value: string) => void;
    setWriter: (value: string) => void;
    setTitleURL: (value: string) => void;
    onSave: () => void;
    onPublish: () => void;
}

export const Editor: React.FC<props> = ({
    pageTitle,
    title,
    content,
    writer,
    titleURL,
    setTitle,
    setContent,
    setWriter,
    setTitleURL,
    onSave,
    onPublish,
}) => {
    const contentRef = useRef<HTMLTextAreaElement>(null);
    function adjustHeight(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }
    return (
        <div
            className="absolute top-0 left-0 w-full h-full bg-white rounded-xl border border-solid border-gray-400 overflow-hidden flex
            flex-col">
            <div className="bg-zinc-100 p-3 text-gray-500 border-b border-gray-300 rounded-t-xl flex flex-row items-center">
                <p className="ml-3">{pageTitle}</p>
                <span
                    className="ml-auto mr-3 hover:bg-gray-300/60 p-1 rounded-md flex items-center justify-center cursor-pointer"
                    onClick={() => {
                        title.trim().length >= 1 || content.trim().length >= 1
                            ? window.confirm("你做的更改可能未保存。") && window.history.go(-1)
                            : window.history.go(-1);
                    }}>
                    <CloseOutlined className="text-xl" />
                </span>
            </div>
            <div className="overflow-y-auto h-full">
                <div id="title" className="m-2 mb-0">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                contentRef.current?.focus();
                            }
                        }}
                        placeholder="请输入标题"
                        className="p-4 w-full text-3xl focus-visible:outline-none font-bold"
                    />
                </div>
                <div id="body" className="m-2 mt-0">
                    <textarea
                        ref={contentRef}
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
                <Input value={writer} onChange={(e) => setWriter(e.target.value)} color="primary" placeholder="作者" />
                <Input
                    value={titleURL}
                    onChange={(e) => setTitleURL(e.target.value)}
                    color="primary"
                    placeholder="自定义URL"
                />
                <div className="ml-auto flex gap-4">
                    <Button color="secondary" size="large" onClick={onSave}>
                        暂存
                    </Button>
                    <Button color="primary" size="large" onClick={onPublish}>
                        发布
                    </Button>
                </div>
            </div>
        </div>
    );
};
