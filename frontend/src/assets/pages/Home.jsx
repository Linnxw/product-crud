import Card from "../components/Card";
import axios from "axios";
import React,{useState,useEffect} from "react";
import Swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";
export default function Home(){
  
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    getProduct();
  },[]);
  
  const getProduct=async()=>{
    try{
      const api="http://localhost:3000/products";
      const {data}=await axios.get(api);
      setProducts(data);
    }catch(er){
      throw err;
    }
  };
  
  const handleDelete=async(id)=>{
  try{
   await axios.delete(`http://localhost:3000/products/${id}`);
   getProduct();
  }catch(err){
    console.log(err);
  }
};
  const handleEdit=(id)=>{
    navigate(`/edit/${id}`);
  };
  return (
    <>
    <div className="w-28 h-9 rounded bg-green-500 mt-5 ml-3 flex items-center justify-center text-[.9em] text-white" onClick={()=>navigate("/add")}>Add Product</div>
     <div className="grid place-items-center gap-4 grid-cols-2 py-5">
        {
          products?.map(m=>{
            return <Card key={m.id} data={m} dellete={()=>handleDelete(m.id)} edit={()=>handleEdit(m.id)}/>
          })
        }
     </div>
     </>
    );
}