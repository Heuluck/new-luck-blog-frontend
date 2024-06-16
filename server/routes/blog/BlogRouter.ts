import { Router } from "express";
import Paths from "../../common/Paths";
import UserRoutes from "./BlogRoutes";
import { body, query } from "express-validator";
import Verify from "@server/middlewares/Verify";

const blogRouter = Router();

// blog/list
blogRouter.get(Paths.Blog.Get, UserRoutes.getAll);

// blog/:id
blogRouter.get(Paths.Blog.GetById, UserRoutes.getById);

// blog/article/:titleURL
blogRouter.get(Paths.Blog.GetByTitleURL, UserRoutes.getByTitleURL);

blogRouter.post(
    Paths.Blog.RESTful,
    body("username").trim().isString().notEmpty(),
    body("title").trim().isString().notEmpty(),
    body("content").trim().isString().notEmpty(),
    body("titleURL")
        .trim()
        .isString()
        .isLength({ max: 20 })
        .notEmpty()
        .not()
        .matches(/[^a-zA-Z0-9-_]/, "i")
        .withMessage("不能包含特殊符号"),
    Verify.verifyMinJWTFromHttpOnlyMiddleware,
    UserRoutes.newArticle
);

blogRouter.put(
    Paths.Blog.RESTful,
    body("id").isInt().notEmpty(),
    body("username").trim().isString().notEmpty(),
    body("title").trim().isString().notEmpty(),
    body("content").trim().isString().notEmpty(),
    body("titleURL")
        .trim()
        .isString()
        .isLength({ max: 20 })
        .notEmpty()
        .not()
        .matches(/[^a-zA-Z0-9-_]/, "i")
        .withMessage("不能包含特殊符号"),
    // Verify.verifyMinJWTFromHttpOnlyMiddleware,
    UserRoutes.putArticle
);

blogRouter.delete(
    Paths.Blog.RESTful,
    query("id").trim().notEmpty(),
    query("titleURL")
        .trim()
        .isLength({ max: 20 })
        .notEmpty()
        .not()
        .matches(/[^a-zA-Z0-9-_]/, "i")
        .withMessage("不能包含特殊符号"),
    Verify.verifyMinJWTFromHttpOnlyMiddleware,
    UserRoutes.deleteArticle
);

blogRouter.get(Paths.Blog.GetCategories, UserRoutes.getCategories);

blogRouter.get(Paths.Blog.GetCategoryByTitleURL, UserRoutes.getCategoryByTitleURL);

blogRouter.get(Paths.Blog.GetCategoryByCategoryTitleURL, UserRoutes.getCategoryByCategoryTitleURL);

export default blogRouter;
