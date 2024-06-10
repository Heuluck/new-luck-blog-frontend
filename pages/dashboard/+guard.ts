import { render } from "vike/abort";
import type { GuardAsync } from "vike/types";
import { find_Verify } from "@utils/server/jwt";
import { JWSInvalid } from "jose/errors";
const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
    if (pageContext.headers?.cookie == undefined || pageContext.headers?.cookie.trim() === "") {
        throw render(401, "请先登录");
    } else {
        try {
            const result = await find_Verify(pageContext.headers!.cookie);
            if (result.type === "admin") {
                return;
            } else {
                throw render(401, "无权限访问");
            }
        } catch (e) {
            if (e instanceof JWSInvalid)
                throw render(418 as any, "你这 token 有问题啊");
            else throw render(401, "无权限访问");
        }
    }
    // return;
};
export { guard };
