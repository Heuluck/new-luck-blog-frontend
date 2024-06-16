import { Router } from "express";
import Paths from "../../common/Paths";
import AuthRoutes from "./AuthRoutes";
import { body } from "express-validator";

const authRouter = Router();

authRouter.post(
    Paths.Auth.Login,
    body("name").trim().isString().isLength({min:4}).notEmpty(),
    body("password").trim().isString().isLength({min:8}).notEmpty(),
    AuthRoutes.Login
);

authRouter.post(
    Paths.Auth.Register,
    body("name").trim().isString().isLength({min:4}).notEmpty(),
    body("password").trim().isString().isLength({min:8}).notEmpty(),
    body("email").trim().isEmail().notEmpty(),
    AuthRoutes.Register
);

authRouter.get(Paths.Auth.Logout, AuthRoutes.Logout);

authRouter.post(Paths.Auth.OAuth.Github, body("code").trim().isString().notEmpty(), AuthRoutes.OAuthGithub);

export default authRouter;
