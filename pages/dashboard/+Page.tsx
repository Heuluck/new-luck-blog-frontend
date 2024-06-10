import { deleteCookie } from "@utils/client/cookie";

export default function Page() {
    return (
        <>
            <div>
                早上好
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
