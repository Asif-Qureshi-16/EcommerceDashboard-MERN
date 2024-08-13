import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: JSON.parse(localStorage.getItem("token"))
      }
      });
    result = await result.json();
    setProduct(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();

    if (result) {
      getProducts();
      alert("Record is Deleted");
    }
  };
  const searchHandle=async (e)=>{
    // console.log();
    let key=e.target.value;
    if(!key){
      getProducts()
    }
    else{
      let result=await fetch(`http://localhost:5000/search/${key}`);
      result=await result.json()
      if(result){
        setProduct(result)
      }
  
    }
    
  }
  return (
    <div className="product-List">
      <h3>Product List</h3>
      <input className="searchbox" type="search"  placeholder="Search Product" onChange={searchHandle} />
      <ul>
        <li>Sr.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>

      {products.length>0 ? products.map((item, index) => (
        <ul key={item.id || index}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </button>
          </li>
        </ul>
      ))
    : <h1>NO RESULT FOUND</h1>
    }
    </div>
  );
};

export default ProductList;
