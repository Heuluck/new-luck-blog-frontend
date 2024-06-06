import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
    const blogs = useData<Data>();
    return (
        <>
            <h1>blogs</h1>
            <ol>
                {blogs.map(({ id, title, titleURL, lastUpdate }) => (
                    <li key={id}>
                        <a href={`/star-wars/${titleURL}`}>{title}</a> ({lastUpdate})
                    </li>
                ))}
            </ol>
        </>
    );
}
