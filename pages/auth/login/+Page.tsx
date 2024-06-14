import { useState } from "react";
import AuthForm from "../../../components/Form/authForm";
import xiaoXuQiu from "/xiaoXuQiu.jpg";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import CryptoJS from "crypto-js";
import "./animation.css";
import { MessageInstance } from "antd/es/message/interface";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const [toNext, setToNext] = useState(0);
    const [toNextAnimeMiddle, setToNextAnimeMiddle] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const toAnother = () => {
        if (toNext !== 2) {
            setToNext(2);
            setTimeout(() => {
                setToNextAnimeMiddle(true);
            }, 700);
        } else {
            setToNext(1);
            setTimeout(() => {
                setToNextAnimeMiddle(false);
            }, 700);
        }
    };

    return (
        <div className="overflow-hidden w-screen h-screen flex items-center justify-center">
            {contextHolder}
            <div
                className={`mb-32 md:mb-0 rounded-2xl w-10/12 md:w-8/12 shadow-2xl overflow-hidden normal-1
            flex flex-col ${toNextAnimeMiddle ? "md:flex-row-reverse" : "md:flex-row"} m-0 ${toNext !== 0 && (toNext === 2 ? "rotate-next" : "rotate-prev")}`}>
                <img src={xiaoXuQiu} className="w-full h-56 md:h-auto object-cover object-bottom md:w-1/2" />
                <div className="bg-white w-full p-8 px-0 max-h-[90vh] overflow-y-auto">
                    <h1 className="font-serif text-2xl text-center">{toNextAnimeMiddle ? "Sign Up" : "Sign In"}</h1>
                    <form
                        className="m-8 items-center flex flex-col"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitHandler(toNextAnimeMiddle, username, password, confirmPassword, email, messageApi);
                        }}>
                        <AuthForm.Item
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            description="请输入用户名"></AuthForm.Item>
                        <AuthForm.Item
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            description="请输入密码"></AuthForm.Item>
                        {toNextAnimeMiddle && (
                            <>
                                <AuthForm.Item
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    description="请输入确认密码"></AuthForm.Item>
                                <AuthForm.Item
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    description="请输入邮箱"></AuthForm.Item>
                            </>
                        )}
                        <div className="my-4 flex flex-col w-9/12">
                            <input
                                type="submit"
                                value={toNextAnimeMiddle ? "注册" : "登录"}
                                className="my-2 bg-orange-400 hover:bg-orange-300 active:bg-orange-500 transition-all
                                cursor-pointer text-white p-2 px-5 w-full rounded-lg active:ani-wave-blue"
                            />
                            <input
                                type="button"
                                value={toNextAnimeMiddle ? "登录" : "注册"}
                                onClick={toAnother}
                                className={`my-2 bg-white hover:bg-gray-200 active:bg-gray-300  transition-all
                                cursor-pointer text-black p-2 px-5 w-full rounded-lg border-gray-300 border-solid border active:ani-wave-blue`}
                            />
                            <a
                                href={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.PUBLIC_ENV__CLIENT_ID}&scope=user:email`}
                                className="flex items-center justify-center overflow-visible select-none my-2 bg-white hover:bg-gray-200 active:bg-gray-300 transition-all 
                                cursor-pointer text-black p-2 px-5 w-full rounded-lg border-gray-300 border-solid border active:ani-wave-blue">
                                <span>使用 Github 登录</span>
                                <img src="/github-mark.svg" className="mx-2 object-contain aspect-square h-5" />
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const submitHandler = async (
    toNextAnimeMiddle: boolean,
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    messageApi: MessageInstance
) => {
    if (!toNextAnimeMiddle) {
        //登录
        if (username.trim().length < 4 || password.trim().length < 8) {
            messageApi.open({
                type: "warning",
                content: "请输入正确的用户名和密码",
            });
        } else
            try {
                const res = await axios.post(import.meta.env.PUBLIC_ENV__BASE_URL + "/auth", {
                    name: username,
                    password: CryptoJS.SHA256(password).toString(),
                });
                if (res.data.code === 200) {
                    const { type } = res.data.data;
                    messageApi.open({
                        type: "success",
                        content: res.data.message,
                    });
                    setTimeout(() => {
                        type === "admin" ? (window.location.href = "/dashboard") : (window.location.href = "/");
                    }, 700);
                } else {
                    messageApi.open({
                        type: "warning",
                        content: res.data.message,
                    });
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401)
                        messageApi.open({
                            type: "warning",
                            content: error.response?.data.message,
                        });
                    else {
                        messageApi.open({
                            type: "error",
                            content: "服务器错误",
                        });
                        console.error(error);
                        throw new AxiosError();
                    }
                }
            }
    } else {
        //注册
        if (
            username.trim().length < 4 ||
            password.trim().length < 8 ||
            confirmPassword.trim().length < 8 ||
            confirmPassword !== password
        ) {
            messageApi.open({
                type: "warning",
                content: "请输入正确的用户名和密码",
            });
        } else
            try {
                const res = await axios.post(import.meta.env.PUBLIC_ENV__BASE_URL + "/auth/reg", {
                    name: username,
                    email: email,
                    password: CryptoJS.SHA256(password).toString(),
                });
                console.log(res.data);
                if (res.data.code === 200) {
                    messageApi.open({
                        type: "success",
                        content: "注册成功",
                    });
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 700);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 400)
                        messageApi.open({
                            type: "warning",
                            content: "用户名已存在",
                        });
                    else {
                        messageApi.open({
                            type: "error",
                            content: "服务器错误",
                        });
                        console.error(error);
                        throw new AxiosError();
                    }
                }
            }
    }
};
