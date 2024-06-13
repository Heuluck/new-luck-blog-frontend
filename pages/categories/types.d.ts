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
