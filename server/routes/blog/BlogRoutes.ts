import HttpStatusCodes from "@server/common/HttpStatusCodes";

import { IReq, IRes } from "../types/express/misc";
import dbQuery, { dQuery } from "@server/database/connection";
import { SQLError } from "@server/common/Errors";

async function getAll(_: IReq, res: IRes) {
    dbQuery(
        //只选择content的前80个字符
        "SELECT id, username, lastUpdate, title, LEFT(content, 80) AS content,titleURL FROM articles;",
        [],
        (results) => {
            return res.status(HttpStatusCodes.OK).json({ code: 200, message: "查询成功", data: results });
        },
        () => {
            return res
                .status(HttpStatusCodes.OK)
                .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
        }
    );
}

async function getById(req: IReq, res: IRes) {
    const id = +req.params.id;
    dbQuery(
        //只选择content的前80个字符
        "SELECT * FROM articles WHERE id = ?",
        [id],
        (results) => {
            return res.status(HttpStatusCodes.OK).json({ code: 200, message: "查询成功", data: results });
        },
        () => {
            return res
                .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
        }
    );
}

async function getByTitleURL(req: IReq, res: IRes) {
    const titleURL = req.params.titleURL;
    dbQuery(
        //只选择content的前80个字符
        "SELECT * FROM articles WHERE titleURL = ? LIMIT 1",
        [titleURL],
        (results) => {
            return results.constructor === Array && results.length > 0
                ? res.status(HttpStatusCodes.OK).json({ code: 200, message: "查询成功", data: results[0] })
                : res.status(HttpStatusCodes.NOT_FOUND).json({ code: 404, message: "找不到文章" });
        },
        () => {
            return res
                .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
        }
    );
}

async function getCategories(_: IReq, res: IRes) {
    try {
        const { results } = await dQuery(
            `
SELECT * FROM blog_categories;`,
            []
        );
        return results.constructor === Array && results.length >= 0
            ? res.status(HttpStatusCodes.OK).json({ code: 200, message: "查询成功", data: results })
            : res.status(HttpStatusCodes.NOT_FOUND).json({ code: 500, message: "查询失败" });
    } catch (e) {
        console.log(e);
        if (e instanceof SQLError)
            return res
                .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
        else return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ code: 500, message: "[UNKNOWN ERROR]" });
    }
}

async function getCategoryByTitleURL(req: IReq, res: IRes) {
    const titleURL = req.params.titleURL;
    try {
        const { results } = await dQuery(
            `
SELECT bc.name, bc.url_title
FROM articles art
INNER JOIN article_blog_categories art_bc
ON art_bc.article_id = art.id
INNER JOIN blog_categories bc
ON bc.id = art_bc.blog_category_id
WHERE art.titleURL = ?;`,
            [titleURL]
        );
        return results.constructor === Array && results.length > 0
            ? res.status(HttpStatusCodes.OK).json({ code: 200, message: "查询成功", data: results })
            : res.status(HttpStatusCodes.OK).json({ code: 200, message: "查询成功，但没有分类", data: null });
    } catch (e) {
        console.log(e);
        if (e instanceof SQLError)
            return res
                .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
        else return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ code: 500, message: "[UNKNOWN ERROR]" });
    }
}

async function getCategoryByCategoryTitleURL(req: IReq, res: IRes) {
    const titleURL = req.params.titleURL;
    try {
        const { results } = await dQuery(
            `
SELECT art.id, username, lastUpdate, title, content, titleURL
FROM articles art
INNER JOIN article_blog_categories art_bc
ON art_bc.article_id = art.id
INNER JOIN blog_categories bc
ON bc.id = art_bc.blog_category_id
WHERE bc.url_title = ?
ORDER BY art.lastUpdate DESC;`,
            [titleURL]
        );
        const name = await dQuery(`SELECT name,description FROM blog_categories WHERE url_title = ?;`, [titleURL]);
        return results.constructor === Array &&
            results.length >= 0 &&
            name.results.constructor === Array &&
            name.results.length == 1
            ? res.status(HttpStatusCodes.OK).json({
                  code: 200,
                  message: "查询成功",
                  data: {
                      data: results,
                      categoryName: (name.results[0] as { name: string }).name,
                      categoryDescription: (name.results[0] as { description: string }).description,
                  },
              })
            : res.status(HttpStatusCodes.OK).json({ code: 404, message: "查询成功，但没有该分类", data: null });
    } catch (e) {
        console.log(e);
        if (e instanceof SQLError)
            return res
                .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
        else return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ code: 500, message: "[UNKNOWN ERROR]" });
    }
}

export default {
    getAll,
    getById,
    getByTitleURL,
    getCategories,
    getCategoryByTitleURL,
    getCategoryByCategoryTitleURL,
} as const;
