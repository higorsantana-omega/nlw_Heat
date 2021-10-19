import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router();

// router.use(function (req, res, next) {
//   console.log("Time:", Date.now());
//   next();
// });

router.post("/authenticate", new AuthenticateUserController().handle);

export { router };
