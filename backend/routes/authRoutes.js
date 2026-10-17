import { Router } from "express";
import { signupSchema ,loginSchema} from "../utils/authSchema.js";
import { loginController, signupController } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";

const router= Router();

router.post('/signup',validate(signupSchema),signupController);

router.post('/login',validate(loginSchema),loginController);

export const authRouter=router;