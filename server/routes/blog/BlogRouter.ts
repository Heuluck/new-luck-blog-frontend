import { Router } from "express";
import jetValidator from "jet-validator";
import Paths from "../../common/Paths";
import User from "@server/models/User";
import UserRoutes from "./BlogRoutes";

// **** Variables **** //

// const validate = jetValidator();

const blogRouter = Router();

// blog/list
blogRouter.get(Paths.Blog.Get, UserRoutes.getAll);

// blog/:id
blogRouter.get(Paths.Blog.GetById, UserRoutes.getById);

// blog/article/:titleURL
blogRouter.get(Paths.Blog.GetByTitleURL, UserRoutes.getByTitleURL);

blogRouter.get(Paths.Blog.GetCategories, UserRoutes.getCategories);

blogRouter.get(Paths.Blog.GetCategoryByTitleURL, UserRoutes.getCategoryByTitleURL);

blogRouter.get(Paths.Blog.GetCategoryByCategoryTitleURL, UserRoutes.getCategoryByCategoryTitleURL);

export default blogRouter;
