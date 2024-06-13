export type Article = {
    content: string;
    id: number;
    lastUpdate: string;
    title: string;
    titleURL: string;
    username: string;
    [property: string]: any;
};

export type ArticleCategories = {
    name: string;
    url_title: string;
    [property: string]: any;
};