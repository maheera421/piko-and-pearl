import { Router } from "express";
import { createCheckoutSession, handleCheckoutSuccess } from "../controllers/paymentController";

const router = Router();

router.post("/create-checkout-session", createCheckoutSession);
router.get("/success", handleCheckoutSuccess);

export default router;
