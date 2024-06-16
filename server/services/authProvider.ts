import { verifyJWT } from "@server/util/jwt";
import { Express } from "express";
function auth(app: Express) {
    app.use(async (req, _res, next) => {
        const { token } = req.cookies;
        try {
            const user = !token ? null : await verifyJWT(token);
            //@ts-expect-error 真的包含user我不骗你
            req.user = JSON.parse(user);
        } catch (e) {
            //@ts-expect-error 真的包含user我不骗你
            req.user = null;
        }
        next();
    });
}

export default auth;
