export interface User {
    id: number;
    name: string;
    password: string;//响应没有
    type: string;
    email: string;
    avatar: string;
    github_id?: string;
};
