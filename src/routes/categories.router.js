import { Router } from "express";
import { getCategorias } from "../controllers/categories.controller.js";

const router = Router();

router.get("/", getCategorias);

export default router;
