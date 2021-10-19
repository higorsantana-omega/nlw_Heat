import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/GetLast3MessagesController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

// router.use(function (req, res, next) {
//   console.log("Time:", Date.now());
//   next();
// });

router.post("/authenticate", new AuthenticateUserController().handle);
router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);
router.get("/messages/last3", new Get3LastMessagesController().handle);

export { router };
