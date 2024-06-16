import { IRes } from "@server/routes/types/express/misc";
import { IReq } from "@server/routes/types/types";
import { User } from "@server/routes/types/user";
import { verifyJWT } from "@server/util/jwt";

const verifyMinJWTMiddleware = async (req: IReq, res: IRes, next: () => void) => {
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
                message: "token 无效",
            });
        }
};

export default {
    verifyMinJWTMiddleware,
} as const;
