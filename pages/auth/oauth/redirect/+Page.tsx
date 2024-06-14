import axios from "axios";
import autoAnimate from "@formkit/auto-animate";
import { User } from "@server/routes/types/user";
import { Alert, Progress, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
export default function Page() {
    const context = usePageContext();
    const { code } = context.urlParsed.search;
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<number>(0);
    const [message, setMessage] = useState<string | null>(null);
    const parent = useRef(null);
    const listParent = useRef(null);
    //防抖
    const debounce = useRef<boolean>(false);
    const getData = (code: string) => {
        axios.post("/api/auth/oauth/github", { code: code }).then(
            (res) => {
                if (res.status === 200) {
                    setStep(2);
                    const user: User = res.data.data;
                    setMessage(
                        `${res.data.message}，欢迎 ${user.name}！\n即将跳转到${user.type === "admin" ? "仪表盘" : "首页"}`
                    );
                    setTimeout(() => {
                        user.type === "admin" ? (window.location.href = "/dashboard") : (window.location.href = "/");
                    }, 2000);
                } else setError("未知错误");
            },
            (err) => {
                if (axios.isAxiosError(err)) setError(err.response?.data.message ?? "未知错误");
                else setError("未知错误");
            }
        );
    };

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    useEffect(() => {
        listParent.current && autoAnimate(listParent.current);
    }, [listParent]);
    useEffect(() => {
        if (!debounce.current) {
            debounce.current = true;
            if (!code || code.trim() == "") {
                setError("授权码错误");
                return;
            }
            setStep(1);
            getData(code);
        }
    }, []);
    return (
        <>
            <div
                className="mb-32 md:mb-0 rounded-2xl w-11/12 md:w-6/12 shadow-2xl overflow-hidden normal-1
            flex items-center flex-col m-0 bg-white p-8">
                <div className="flex flex-col justify-center items-center m-5">
                    <div className="flex flex-row justify-center items-center">
                        <img src="/github-mark.svg" className="h-10" />
                        <img src="/GitHub_Logo.png" className="h-16" />
                    </div>
                    <p>OAuth 第三方登录</p>
                </div>
                <Progress
                    percent={step == 0 ? 20 : step == 1 ? 60 : 100}
                    status={error ? "exception" : message ? "success" : "active"}
                />
                <div className="flex flex-col items-center justify-center m-4" ref={parent}>
                    {(error || message) && (
                        <Alert message={error ?? message} type={error ? "error" : "success"} showIcon />
                    )}
                    <ul className="p-2 rounded-lg m-1 text-lg text-gray-700" ref={listParent}>
                        <li>
                            获取授权码 <Spin className="ml-1" size="small" percent={code && code != "" ? 100 : 1} />
                        </li>
                        {step > 0 && (
                            <li>
                                请求访问令牌与数据{" "}
                                <Spin className="ml-1" size="small" percent={step > 1 ? 100 : error ? 1 : 0} />
                            </li>
                        )}
                        {step > 1 && <li>登录成功</li>}
                    </ul>
                </div>
            </div>
        </>
    );
}
