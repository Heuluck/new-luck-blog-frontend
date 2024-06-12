import { render } from "vike/abort";
import type { GuardAsync } from "vike/types";
import { find_Verify } from "@utils/server/jwt";
import { JWSInvalid } from "jose/errors";
import { getCookie } from "@utils/client/cookie";
const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
    
    const cookie = pageContext.headers?.cookie ?? (typeof document != 'undefined' ? document.cookie : null);
    if (cookie == undefined || cookie.trim() === "") {
        console.log(cookie);
        throw render(401, "请先登录");
    } else {
        try {
            const result = await find_Verify(cookie);
            if (result.type === "admin") {
                return;
            } else {
                throw render(401, "您没有控制台权限");
            }
        } catch (e) {
            if (e instanceof JWSInvalid) throw render(418 as any, "你这 token 有问题啊");
            else throw render(401, "您没有控制台权限");
        }
    }
    // return;
};
export { guard };
