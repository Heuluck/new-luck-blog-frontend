import HttpStatusCodes from "@server/common/HttpStatusCodes";

import { IReq, IRes } from "../types/express/misc";
import dbQuery, { dQuery, InsertResult } from "@server/database/connection";
import { SQLError } from "@server/common/Errors";
import { validationResult } from "express-validator";

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
        const { results } = await dQuery(`SELECT * FROM blog_categories;`, []);
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
            : res.status(HttpStatusCodes.NOT_FOUND).json({ code: 404, message: "查询成功，但没有该分类", data: null });
    } catch (e) {
        console.log(e);
        if (e instanceof SQLError)
            return res
                .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
        else return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ code: 500, message: "[UNKNOWN ERROR]" });
    }
}

async function newArticle(
    req: IReq<{ username: string; title: string; content: string; titleURL: string }>,
    res: IRes
) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ code: 400, message: "参数错误", data: result.array() });
    } else
        try {
            const { username, title, content, titleURL } = req.body;
            const { results } = await dQuery(
                `INSERT INTO articles (username, lastUpdate, title, content, titleURL) SELECT ?, ?, ?, ?, ? 
            WHERE NOT EXISTS(SELECT titleURL FROM articles WHERE titleURL = ?);`,
                [username, new Date(), title, content, titleURL, titleURL]
            );
            const insertResult: InsertResult = results as InsertResult;
            if (insertResult.affectedRows === 1)
                return res.status(HttpStatusCodes.CREATED).json({ code: 201, message: "发布成功" });
            else return res.status(HttpStatusCodes.CONFLICT).json({ code: 409, message: "发布失败，URL重复" });
        } catch (e) {
            console.log(e);
            if (e instanceof SQLError)
                return res
                    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
            else
                return res
                    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ code: 500, message: "[UNKNOWN ERROR]" });
        }
}

async function putArticle(
    req: IReq<{ id: number; username: string; title: string; content: string; titleURL: string }>,
    res: IRes
) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ code: 400, message: "参数错误", data: result.array() });
    } else
        try {
            const { id, username, title, content, titleURL } = req.body;
            const { results } = await dQuery(
                `UPDATE articles SET username = ?, lastUpdate = ?, title = ?, content = ?, titleURL = ?
                WHERE id = ? AND NOT EXISTS(SELECT T.titleURL FROM( SELECT titleURL FROM articles WHERE titleURL = ? AND id != ?)T);`,
                [username, new Date(), title, content, titleURL, id, titleURL, id]
            );
            const insertResult: InsertResult = results as InsertResult;
            if (insertResult.affectedRows === 1)
                return res.status(HttpStatusCodes.CREATED).json({ code: 201, message: "更新成功" });
            else return res.status(HttpStatusCodes.CONFLICT).json({ code: 409, message: "更新失败，URL重复" });
        } catch (e) {
            console.log(e);
            if (e instanceof SQLError)
                return res
                    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
            else
                return res
                    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ code: 500, message: "[UNKNOWN ERROR]" });
        }
}

async function deleteArticle(req: IReq<{ id: number; titleURL: string }>, res: IRes) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ code: 400, message: "参数错误", data: result.array() });
    } else
        try {
            const { id, titleURL } = req.query;
            const { results } = await dQuery(`DELETE FROM articles WHERE id = ? AND titleURL = ?`, [id, titleURL]);
            const insertResult = results as InsertResult;
            if (insertResult.affectedRows > 0)
                return res
                    .status(HttpStatusCodes.OK)
                    .json({ code: 201, message: `成功删除${insertResult.affectedRows}个文章` });
            else return res.status(HttpStatusCodes.BAD_REQUEST).json({ code: 400, message: "删除失败，文章不存在" });
        } catch (e) {
            console.log(e);
            if (e instanceof SQLError)
                return res
                    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ code: 500, message: "[DATABASE ERROR] - Please check the logs" });
            else
                return res
                    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ code: 500, message: "[UNKNOWN ERROR]" });
        }
}

export default {
    getAll,
    getById,
    getByTitleURL,
    getCategories,
    getCategoryByTitleURL,
    getCategoryByCategoryTitleURL,
    newArticle,
    putArticle,
    deleteArticle,
} as const;
