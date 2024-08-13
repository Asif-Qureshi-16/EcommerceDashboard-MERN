import React, { useState } from "react";

const Addproduct=()=>{
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [error,setError]=useState('');

    async function addProduct(){
        if(!name || !price|| !company || !category){
            setError(true);
            return false;
        }
        // console.log(name,price,category,company);
       let userID=JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch('http://localhost:5000/add-product',{
        method:"POST",
        body:JSON.stringify({name,price,category,userID,company}),
        headers:{
        "Content-Type": "application/json",
        }
       });
       result=await result.json();
       console.log(result);
        
       setName('');
       setPrice('');
       setCategory('');
       setCompany('');
    }

    return (
        <div className="addproduct">
            <h1>Add Product</h1>
            <input className="inputbox" type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            {error  && !name && <span className="errormsg">Enter the Valid Name</span>}
            <input className="inputbox" type="text" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {error  && !price && <span className="errormsg">Enter the Valid Price</span>}
           
            <input className="inputbox" type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            {error  && !category && <span className="errormsg">Enter the Valid Category</span>}
           
            <input className="inputbox" type="text" placeholder="Enter Product Company" value={company} onChange={(e)=>setCompany(e.target.value)} />
            {error  && !company && <span className="errormsg">Enter the Valid Company</span>}
           
            <button className="appbutton" onClick={addProduct}>Add</button>
        </div>
    )
}

export default Addproduct;