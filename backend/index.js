import express from "express";
import FileUpload from "express-fileupload";
import ProductRoute from "./routes/ProductRoute.js";
import cors from "cors";
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(FileUpload());
app.use(ProductRoute);
app.listen(3000,()=>{
  console.log("server running in port 3000");
});