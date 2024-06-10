import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { HTTP_STATUS } from "@common/HTTP_STATUS";

export default function Page() {
    const { is404, abortStatusCode, abortReason } = usePageContext();
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
    if (abortStatusCode && abortReason)
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <div className="p-3 bg-slate-200 rounded-xl">
                    <h1 className="text-center text-5xl font-bold m-4">
                        HTTP {abortStatusCode} {HTTP_STATUS[abortStatusCode].zh ?? "未知错误"}
                    </h1>
                    <h2 className="text-center text-1xl m-2">
                        HTTP {abortStatusCode} {HTTP_STATUS[abortStatusCode].en}
                    </h2>
                </div>
                <div className="mt-4">
                    <p className="text-center mb-3">—— {String(abortReason)}</p>
                    <a href={`https://http.cat/status/${abortStatusCode}`} target="blank">
                        <img src={`https://http.cat/${abortStatusCode}`} />
                    </a>
                </div>
            </div>
        );
    else
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <div className="p-3 bg-slate-200 rounded-xl">
                    <h1 className="text-center text-5xl font-bold m-4">HTTP 500 服务器错误</h1>
                    <h2 className="text-center text-1xl m-2">HTTP 500 Internal Sever Error</h2>
                </div>
                <div className="mt-4">
                    <p className="text-center mb-3">好像出了点什么问题诶</p>
                    <a href="https://http.cat/status/500" target="blank">
                        <img src="https://http.cat/500" />
                    </a>
                </div>
            </div>
        );
}
