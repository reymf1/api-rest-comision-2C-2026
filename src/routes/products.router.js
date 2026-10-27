import { Router } from "express";
import {
  getProductos,
  createProducto,
  getProductoById,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProductos);

router.post("/", createProducto);

router.get("/:id", getProductoById);

export default router;
