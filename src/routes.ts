import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdimin";
import { AuthenticateUserController } from "./controllers/AutheticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimetController"
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentsController = new CreateComplimentController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listTagsController = new ListTagsController()

router.post("/users", createUserController.handle)
router.post("/tags", ensureAuthenticate, ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticate, createComplimentsController.handle)
router.get("/users/compliments/send", ensureAuthenticate, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticate, listUserReceiveComplimentsController.handle)
router.get("/tags", ensureAuthenticate, listTagsController.handle)

export { router }