import { render } from "vike/abort";
import type { GuardAsync, PageContext } from "vike/types";
const guard: GuardAsync = async (pageContext: PageContext): ReturnType<GuardAsync> => {
    if (pageContext.user?.type !== "admin") {
        throw render(401, "您似乎没有控制台权限");
    }
};
export { guard };
