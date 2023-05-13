import axios from "axios";
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {AiOutlineCloudUpload} from "react-icons/ai";
export default function AddProduct(){
  const [title,setTitle]=useState("");
  const [file,setFile]=useState(null);
  const [preview,setPreview]=useState(null);
  const navigate=useNavigate();
  const loadImage=({target})=>{
    setFile(target.files[0]);
    setPreview(URL.createObjectURL(target.files[0]));
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("title",title);
    formdata.append("file",file);
    console.log("ok");
    try{
      await axios.post("http://localhost:3000/products",formdata,{
        headers:{
          "Content-type" : "multipart/form-data"
        }
      });
      navigate("/");
    }catch(err){
      throw err;
    }
    
  };
  return (
     <div>
       <form onSubmit={handleSubmit} className="flex flex-col items-center h-80 w-screen mt-10">
        <input type="teks" placeholder="product name" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-[90%] h-9 rounded ring-1 ring-slate-500 px-3"/>
        <div className="w-[70%] h-52 border-2 border-slate-500 border-dashed mt-8 -translate-x-9 rounded flex items-center justify-center relative overflow-hidden">
        {
          file ? <img src={preview} alt="preview" className="h-[100%] w-[100%] object-cover"/> : <div className="text-5xl"><AiOutlineCloudUpload/></div>
        }
         <input type="file" onChange={loadImage} className="bg-red-500 w-[100%] h-[100%] absolute opacity-0"/>
        </div>
        <div className="w-screen h-14 flex justify-start pl-5 pt-3 items-start">
        <button type="submit" className="px-4 py-1 bg-green-500 rounded text-white">add</button>
        </div>
       </form>
     </div>
    );
}