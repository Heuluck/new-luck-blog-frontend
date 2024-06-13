import { verifyJWT } from "@server/util/jwt";
import express, { Express } from "express";
function auth(app: Express) {
    app.use(async (req, _res, next) => {
        const { token } = req.cookies;
        try {
            const user = !token ? null : await verifyJWT(token);
            //@ts-ignore
            req.user = JSON.parse(user);
        } catch (e) {
            //@ts-ignore
            req.user = null;
        }
        next();
    });
}

export default auth;
