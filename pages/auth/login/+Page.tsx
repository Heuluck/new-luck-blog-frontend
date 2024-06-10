import { useState } from "react";
import AuthForm from "../../../components/Form/authForm";
import xiaoXuQiu from "/xiaoXuQiu.jpg";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import CryptoJS from "crypto-js";
import "./animation.css";
import { AuthResponse } from "types/request";
import dayjs from "dayjs";

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

    const submitHandler = async () => {
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
                        const data = res.data as AuthResponse;
                        messageApi.open({
                            type: "success",
                            content: "登录成功",
                        });
                        window.localStorage.setItem("token", data.token);
                    } else {
                        messageApi.open({
                            type: "warning",
                            content: "用户名或密码错误",
                        });
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 401)
                            messageApi.open({
                                type: "warning",
                                content: "用户名或密码错误",
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
                        const data = res.data as AuthResponse;
                        window.localStorage.setItem("token", data.token);
                        messageApi.open({
                            type: "success",
                            content: "注册成功",
                        });
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

    return (
        <>
            {contextHolder}
            <div
                className={`mb-32 md:mb-0 rounded-2xl w-10/12 md:w-6/12 shadow-2xl overflow-hidden normal-1
            flex flex-col ${toNextAnimeMiddle ? "md:flex-row-reverse" : "md:flex-row"} m-0 ${toNext !== 0 && (toNext === 2 ? "rotate-next" : "rotate-prev")}`}>
                <img src={xiaoXuQiu} className="w-full h-56 md:h-auto object-cover object-bottom md:w-1/2" />
                <div className="bg-gray-200 w-full p-8 px-0">
                    <h1 className="font-serif text-2xl text-center">{toNextAnimeMiddle ? "Sign Up" : "Sign In"}</h1>
                    <form
                        className="m-8 items-center flex flex-col"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitHandler();
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
                        <div className="my-4 flex flex-row">
                            <input
                                type="button"
                                value={toNextAnimeMiddle ? "登录" : "注册"}
                                onClick={toAnother}
                                className={`mx-1 bg-zinc-100 hover:bg-gray-50 active:bg-gray-200 transition-all
                                cursor-pointer text-black p-2 px-5 w-full rounded-lg border-gray-300 border-solid border active:ani-wave-blue`}
                            />
                            <input
                                type="submit"
                                value={toNextAnimeMiddle ? "注册" : "登录"}
                                className={`mx-1 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 transition-all
                                cursor-pointer text-white p-2 px-5 w-full rounded-lg active:ani-wave-blue`}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
