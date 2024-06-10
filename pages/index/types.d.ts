export type Article = {
    content: string;
    id: number;
    lastUpdate: string;
    title: string;
    titleURL: string;
    username: string;
    [property: string]: any;
};
