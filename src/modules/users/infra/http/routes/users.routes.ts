import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { container } from "tsyringe";
import UsersController from "../controllers/UsersController";
import UsersAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UsersAvatarController();

usersRouter.post("/", usersController.create);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
