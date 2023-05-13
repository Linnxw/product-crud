import {Routes,Route} from 'react-router-dom';
import Home from "./assets/pages/Home";
import AddProduct from "./assets/pages/AddProduct";
import EditProduct from "./assets/pages/EditProduct";
function App() {
  return (
   <>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/add" element={<AddProduct/>}/>
       <Route path="/edit/:id" element={<EditProduct/>}/>
     </Routes>
   </>
    )
}
export default App
