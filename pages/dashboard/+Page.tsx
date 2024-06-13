import { deleteCookie } from "@utils/client/cookie";
import { logout } from "@utils/client/requests/main";

export default function Page() {
    return (
        <>
            <div>
                早上好
                <button
                    onClick={() => {
                        logout("/")
                    }}>
                    退出登录
                </button>
            </div>
        </>
    );
}
