import fs from "fs";
import { parseCookieString } from "./cookie";
import { BEJwtPayload } from "@typesSelf/jwt";
import * as jose from "jose";
export async function find_Verify(cookie: string): Promise<BEJwtPayload> {
    return new Promise((resolve, reject) => {
        const token = parseCookieString(cookie, "token");
        if (token) {
            const spki = import.meta.env.PUBLIC_ENV__PUBLIC_PEM
            jose.importSPKI(spki, "ES256").then(
                (res) => {
                    jose.jwtVerify(token, res).then(
                        (res) => {
                            resolve(res.payload as BEJwtPayload);
                        },
                        (err) => {
                            reject(err);
                        }
                    );
                },
                (err) => {
                    reject(err);
                }
            );
        }
    });
}
