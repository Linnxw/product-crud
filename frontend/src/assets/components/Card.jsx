export default function Card(props){
  const {data,edit,dellete}=props;
  return (
     <div className="w-40 h-52 rounded overflow-hidden border border-slate-300 text-slate-700">
       <div className="h-[60%] w-[100%]">
         <img src={data.url} alt={data.name} className="w-[100%] h-[100%] object-cover"/>
       </div>
       <div className="h-[20%] w-[100%] pt-2 pl-2">
         <p className="text-[1.1em] mx-auto fomt-bold">{data.name}</p>
       </div>
       <div className="h-[20%] w-[100%] flex items-end justify-between">
         <div className="w-[50%] h-[70%] flex items-center justify-center bg-slate-300 border-r border-slate-400" onClick={edit}>edit</div>
         <div className="w-[50%] h-[70%] flex items-center justify-center bg-slate-300 border-l border-slate-400" onClick={dellete}>delete</div>
       </div>
       
     </div>
    );
}