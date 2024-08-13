import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate=useNavigate();

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    // console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  async function updateProduct() {
    let result=await fetch(`http://localhost:5000/product/${params.id}`,
        {
            method:"PUT",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"Application/json"
            }
        }
    );
    result=await result.json()
    console.log(result);
    if(result){
        navigate("/")
    }
  }

  return (
    <div className="addproduct">
      <h1>Update Product</h1>
      <input
        className="inputbox"
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputbox"
        type="text"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="inputbox"
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="inputbox"
        type="text"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button className="appbutton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
