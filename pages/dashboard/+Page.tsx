import { deleteCookie } from "@utils/client/cookie";

export default function Page() {
    return (
        <>
            <div className="flex p-8 bg-slate-200 flex-col rounded-lg group md:w-9/12 w-full">
                Protected
                <button
                    onClick={() => {
                        deleteCookie("token");
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 500);
                    }}>
                    退出登录
                </button>
            </div>
        </>
    );
}
