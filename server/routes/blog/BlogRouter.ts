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

export default blogRouter;
