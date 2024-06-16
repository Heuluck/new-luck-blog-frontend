import { Router } from "express";
import Paths from "../../common/Paths";
import UserRoutes from "./BlogRoutes";
import { body } from "express-validator";

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
        .matches(/[^a-zA-Z0-9]/, "i")
        .withMessage("不能包含特殊符号"),
    UserRoutes.newArticle
);

blogRouter.get(Paths.Blog.GetCategories, UserRoutes.getCategories);

blogRouter.get(Paths.Blog.GetCategoryByTitleURL, UserRoutes.getCategoryByTitleURL);

blogRouter.get(Paths.Blog.GetCategoryByCategoryTitleURL, UserRoutes.getCategoryByCategoryTitleURL);

export default blogRouter;
