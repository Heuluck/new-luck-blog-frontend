import AuthForm from "../../../components/Form/authForm";
import xiaoXuQiu from "/xiaoXuQiu.jpg";

export default function Login() {
    return (
        <div className="mb-32 md:mb-0 rounded-2xl w-10/12 md:w-6/12 shadow-2xl overflow-hidden flex flex-col md:flex-row m-0">
            <img src={xiaoXuQiu} className="w-full h-56 md:h-auto object-cover object-bottom md:w-1/2" />
            <div className="bg-gray-200 w-full p-8 px-0">
                <h1 className="font-serif text-2xl text-center">Sign in</h1>
                <form className="mt-8 items-center flex flex-col">
                    <AuthForm.Item description="请输入用户名"></AuthForm.Item>
                    <AuthForm.Item description="请输入密码"></AuthForm.Item>
                    <div className="my-4 flex flex-row">
                        <input
                            type="button"
                            value="注册"
                            className={`mx-1 bg-zinc-100 hover:bg-gray-50 active:bg-gray-200 transition-all
                                cursor-pointer text-black p-2 px-5 w-full rounded-lg border-gray-300 border-solid border active:ani-wave-blue`}
                        />
                        <input
                            type="submit"
                            value="登录"
                            className={`mx-1 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 transition-all
                                cursor-pointer text-white p-2 px-5 w-full rounded-lg active:ani-wave-blue`}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
