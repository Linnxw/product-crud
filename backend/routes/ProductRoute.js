import express from "express";
import {getProducts,
       getProductById,
       saveProduct,
       updateProduct,
       deleteProduct
} from "../controlers/ProductControler.js";
const router=express.Router();

router.get("/products",getProducts);
router.get("/products/:id",getProductById);
router.post("/products",saveProduct);
router.patch("/products/:id",updateProduct);
router.delete("/products/:id",deleteProduct);

export default router;