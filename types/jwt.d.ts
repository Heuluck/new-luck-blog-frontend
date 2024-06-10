export type BEJwtPayload = {
    id: string;
    name: string;
    email: string;
    type: string;
    exp: number;
    iat: number;
}