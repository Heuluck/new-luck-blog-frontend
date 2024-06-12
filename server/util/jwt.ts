import jwt, { JwtPayload } from "jsonwebtoken";

export const signJWT = (payload: JwtPayload, expiresIn: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, import.meta.env.PUBLIC_ENV__PUBLIC_PEM, { algorithm: "ES256", expiresIn }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token!);
            }
        });
    });
};

export const verifyJWT = (token: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, import.meta.env.PRIVATE_KEY, function (err, decoded) {
                if (err) {
                    console.log("Error: ", err);
                    reject(err);
                } else {
                    resolve(JSON.stringify(decoded)!);
                }
            });
        } catch (err) {
            console.log("Error: ", err);
            reject(err);
        }
    });
};
