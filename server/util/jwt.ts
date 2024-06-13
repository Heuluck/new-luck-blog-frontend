import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs";

export const signJWT = (payload: JwtPayload, expiresIn: string): Promise<string> => {
    const privateKey = fs.readFileSync("./server/env/private.key");
    return new Promise((resolve, reject) => {
        jwt.sign(payload, privateKey, { algorithm: "ES256", expiresIn }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token!);
            }
        });
    });
};

export const verifyJWT = (token: string): Promise<string> => {
    const publicKey = fs.readFileSync("./server/env/public.pem");
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, publicKey, function (err, decoded) {
                if (err) {
                    console.log("[JWT] - ", err.message);
                    reject(err);
                } else {
                    resolve(JSON.stringify(decoded)!);
                }
            });
        } catch (err) {
            console.log("[JWT ERROR] - ", err);
            reject(err);
        }
    });
};
