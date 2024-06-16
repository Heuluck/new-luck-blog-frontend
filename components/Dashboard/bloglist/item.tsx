import { Button } from "@components/button/button";
import Markdown from "react-markdown";
import { Article } from "@pages/index/types";
import React, { FC } from "react";
import { reload } from "vike/client/router";
import dayjs from "dayjs";
import { message, Popconfirm } from "antd";
import axios from "axios";

export const Item: FC<props> = ({ items }) => {
    const confirmDelete = async () => {
        try {
            const res = await axios.delete(import.meta.env.PUBLIC_ENV__BASE_URL + "/blog/", {
                params: {
                    id: items.id,
                    titleURL: items.titleURL,
                },
            });
            if (res.status === 200) {
                message.success(res.data.message);
                setTimeout(() => {
                    reload();
                }, 200);
            }
        } catch (e) {
            if (axios.isAxiosError(e)) message.error(e.response?.data.message ?? e.message);
            else message.error("未知错误");
        }
    };
    return (
        <tr>
            <td className="text-center text-xs">{items.id}</td>
            <td className="text-center text-xs">{items.title}</td>
            <td className="text-center text-xs">
                <Markdown
                    components={{
                        a: ({ children }) => <span>{children}</span>,
                    }}>
                    {items.username}
                </Markdown>
            </td>
            <td className="text-center text-xs">
                <Markdown
                    components={{
                        a: ({ children }) => <span>{children}</span>,
                    }}>
                    {items.content.slice(0, 20)}
                </Markdown>
            </td>
            <td className="text-center text-xs">{dayjs(items.lastUpdate).format("YYYY/MM/DD HH:MM")}</td>
            <td className="text-center text-xs">{items.titleURL}</td>
            <td className="text-center">
                <Popconfirm
                    title="确认删除"
                    onConfirm={confirmDelete}
                    okText="确认"
                    cancelText="取消"
                    okButtonProps={{ danger: true }}>
                    <Button color="danger">删除</Button>
                </Popconfirm>
            </td>
        </tr>
    );
};

interface props {
    items: Article;
}
