import "@server/pre-start";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import BaseRouter from "@server/routes";
import { vikeHandler } from "./server/vike-handler";
import { createMiddleware } from "@universal-middleware/express";
import express from "express";
import Paths from "@server/common/Paths";
import cookieParser from "cookie-parser";
import auth from "./server/services/authProvider";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const root = __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hmrPort = process.env.HMR_PORT ? parseInt(process.env.HMR_PORT, 10) : 24678;

interface Middleware<Context extends Record<string | number | symbol, unknown>> {
    (
        request: Request,
        context: Context,
        rawRequest: Record<string, unknown>
    ): Response | void | Promise<Response> | Promise<void>;
}

export function handlerAdapter<Context extends Record<string | number | symbol, unknown>>(
    handler: Middleware<Context>
) {
    return createMiddleware(
        async (context) => {
            const rawRequest = context.platform.request as unknown as Record<string, unknown>;
            rawRequest.context ??= {};
            const response = await handler(context.request, rawRequest.context as Context, rawRequest);
            if (!response) {
                context.passThrough();
                return new Response("", {
                    status: 404,
                });
            }
            return response;
        },
        {
            alwaysCallNext: false,
        }
    );
}

// console.log(process.env.MYSQL_HOST);

async function startServer() {
    const app = express();

    if (isProduction) {
        app.use(express.static(`${root}/dist/client`));
    } else {
        // Instantiate Vite's development server and integrate its middleware to our server.
        // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
        // and would unnecessarily bloat our server in production.)
        const vite = await import("vite");
        const viteDevMiddleware = (
            await vite.createServer({
                root,
                server: { middlewareMode: true, hmr: { port: hmrPort } },
            })
        ).middlewares;
        app.use(viteDevMiddleware);
    }
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    auth(app);
    app.use(Paths.Base, BaseRouter);
    /**
     * Vike route
     *
     * @link {@see https://vike.dev}
     **/
    app.get("*", handlerAdapter(vikeHandler));
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
}

startServer();
