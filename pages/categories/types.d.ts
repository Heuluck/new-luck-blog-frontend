export type Article = {
    data: {
        content: string;
        id: number;
        lastUpdate: string;
        title: string;
        titleURL: string;
        username: string;
    }[];
    categoryName: string;
    categoryDescription: string;
    [property: string]: any;
};

export type Categories = {
    id: number;
    name: string;
    url_title: string;
    description: string;
};
