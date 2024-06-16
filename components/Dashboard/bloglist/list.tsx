import { Article } from "@pages/index/types";
import React, { FC } from "react";
import { Item } from "./item";

export const List: FC<props> = ({ items }) => {
    return (
        <div className="rounded-xl border border-gray-300 overflow-auto">
            <table className="w-full" cellPadding={15}>
                <thead className="bg-gray-200 rounded-t-xl">
                    <tr>
                        <th>id</th>
                        <th>标题</th>
                        <th>作者</th>
                        <th>内容概要</th>
                        <th>最后修改</th>
                        <th>URL标题</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <Item key={item.id} items={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface props {
    items: Article[];
}
