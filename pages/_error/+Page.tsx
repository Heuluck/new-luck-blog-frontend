import React from "react";
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
    const { is404 } = usePageContext();
    if (is404) {
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-center text-5xl font-bold">HTTP 404 找不到页面</h1>
                <h2 className="text-center text-1xl mt-1">HTTP 404 Not Found</h2>
                <div className="mt-4">
                    <p className="text-center mb-3">页面走丢啦</p>
                    <a href="https://http.cat/status/404" target="blank">
                        <img src="https://http.cat/404" />
                    </a>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-center text-5xl font-bold">HTTP 500 服务器错误</h1>
            <h2 className="text-center text-1xl mt-1">HTTP 500 Internal Sever Error</h2>
            <div className="mt-4">
                <p className="text-center mb-3">好像出了点什么问题诶</p>
                <a href="https://http.cat/status/500" target="blank">
                    <img src="https://http.cat/500" />
                </a>
            </div>
        </div>
    );
}
