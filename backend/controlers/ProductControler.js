import Product from "../models/ProductModels.js";
import path from "path";
import fs from "fs";
export const getProducts=async(req,res)=>{
  try{
    const response=await Product.findAll();
    res.json(response);
  }catch(err){
    console.log(err);
  }
};
export const getProductById=async(req,res)=>{
  try{
    const response=await Product.findOne({
      where:{
        id:req.params.id
      }
    });
    if(!response) return res.status(402).json({msg:"data not found"});
    res.status(200).json({response});
  }catch(err){
    console.log(err);
  }
};
export const saveProduct=(req,res)=>{
  if(req.files === null) return res.status(400).json({msg:"file not uploaded"});
  const name=req.body.title;
  const file=req.files.file;
  const fileSize=file.data.length;
  const ext=path.extname(file.name);
  const fileName=file.md5 + ext;
  const url=`${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType=['.png','.jpg','.jpeg'];
  
   if(!allowedType.includes(ext.toLowerCase()))return res.status(422).json({msg:"invalid image"});
   
   if(fileSize > 5000000) return res.status(422).json({msg:"image must be less than 5mb"});
   
   file.mv(`./public/images/${fileName}`,async(err)=>{
     if(err) return res.status(500).json({msg:err.message});
     try{
       await Product.create({
         name:name,
         image:fileName,
         url:url
       });
       res.status(201).json({msg:"product created succesfully"});
     }catch(err){
       console.log(err.message);
     }
   });
};
export const updateProduct=async(req,res)=>{
    const product= await Product.findOne({
      where:{
        id:req.params.id
      }
    });
    if(!product) return res.status(404).json({msg:"no data found"});
    let fileName="";
    if(req.files === null){
      fileName=product.image;
    }else{
  const file=req.files.file;
  const fileSize=file.data.length;
  const ext=path.extname(file.name);
  fileName=file.md5 + ext;
  const allowedType=['.png','.jpg','.jpeg'];
  
   if(!allowedType.includes(ext.toLowerCase()))return res.status(422).json({msg:"invalid image"});
   
   if(fileSize > 5000000) return res.status(422).json({msg:"image must be less than 5mb"});
   
    const paths=`public/images/${product.image}`;
     fs.unlinkSync(paths);
     file.mv(`./public/images/${fileName}`,(err)=>{
     if(err) return res.status(500).json({msg:err.message});
   });
    }
   const title=req.body.title;
   const url=`${req.protocol}://${req.get("host")}/images/${fileName}`;
   try{
   await Product.update({name:title,image:fileName,url:url},{
       where:{
         id:req.params.id
       }
     });
     res.status(200).json({msg:"data updated"});
   }catch(err){
     console.log(err);
   }
};
export const deleteProduct=async(req,res)=>{
  const product=await Product.findOne({
    where:{
      id:req.params.id
    }
  });
  if(!product)return res.status(404).json({msg:"no data found"});
     
     try{
     const path=`public/images/${product.image}`;
     fs.unlinkSync(path);
      await Product.destroy({
         where:{
           id:req.params.id
         }
       });
       res.status(200).json({msg:"delete succesfuly"});
     }catch(err){
       console.log(err);
     }
};