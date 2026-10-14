import { Router } from "express";
import { schema } from "../utils/authSchema.js";
import { signupController } from "../controllers/signupContoller.js";
import { validate } from "../middleware/validate.js";

const router= Router();

router.post('/signup',validate(schema),signupController);

export const authRouter=router;