const express = require("express");
const cors = require("cors");
require("./DB/config");
const User = require("./DB/User");
const Product = require("./DB/product");
const JWT = require("jsonwebtoken");

const jwtKey = "e-comm";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  JWT.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ error: "Something went wrong try again" });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      JWT.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ error: "Something went wrong try again" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.status(404).json({ msg: "No User Found" });
    }
  } else {
    res.status(404).json({ msg: "No Email and Password Is Compulsory" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let product = await Product.find();
  // console.log(product);
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send({ result: "No product found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  let id = req.params.id;
  const result = await Product.deleteOne({ _id: id });
  res.status(200).json({ msg: "Product is Deleted" });
});

app.get("/product/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Product.findOne({ _id: id });
  if (result) {
    res.send(result);
  } else {
    res.status(404).json({ msg: "No Record Found" });
  }
});

app.put("/product/:id", async (req, res) => {
  // let id=req.params.id;
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key",verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });

  res.send(result);
});

function verifyToken(req,res,next){

  let token = req.headers['authorization']
  if(token){
    token=token.split(' ')[1];
    JWT.verify(token,jwtKey,(err,valid)=>{
      if(err){
        res.send({msg:"Please provide valid token"})
      }else{
        next();
      }
    })
  }
  else{
    res.send({result:"Please enter token with Header"})
  }
}
app.listen(5000);
