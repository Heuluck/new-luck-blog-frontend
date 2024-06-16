import { IRes } from "@server/routes/types/express/misc";
import { IReq } from "@server/routes/types/types";
import { User } from "@server/routes/types/user";
import { verifyJWT } from "@server/util/jwt";

const verifyMinJWTMiddleware = async (
    req: IReq<{ username: string; title: string; content: string; titleURL: string }>,
    res: IRes,
    next: () => void
) => {
    const { authorization } = req.headers;
    if (authorization)
        try {
            const result = await verifyJWT(authorization);
            if ((JSON.parse(result) as User).type === "admin") {
                next();
            } else {
                return res.status(401).json({
                    code: 401,
                    message: "没有权限",
                });
            }
        } catch (e) {
            return res.status(401).json({
                code: 401,
                message: "token无效",
            });
        }
    else
        return res.status(401).json({
            code: 401,
            message: "token无效",
        });
};

const verifyMinJWTFromHttpOnlyMiddleware = async (
    req: IReq<unknown>,
    res: IRes,
    next: () => void
) => {
    const { token: authorization } = req.cookies;
    if (authorization)
        try {
            const result = await verifyJWT(authorization);
            if ((JSON.parse(result) as User).type === "admin") {
                next();
            } else {
                return res.status(401).json({
                    code: 401,
                    message: "没有权限",
                });
            }
        } catch (e) {
            return res.status(401).json({
                code: 401,
                message: "token无效",
            });
        }
    else
        return res.status(401).json({
            code: 401,
            message: "token无效",
        });
};

export default {
    verifyMinJWTMiddleware,
    verifyMinJWTFromHttpOnlyMiddleware
} as const;
