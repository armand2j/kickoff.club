import express from "express";
const app = express();
const port = 2008;

class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
}

const productList = [
  new Product(0, "Barca Shirt", 2600, 10),
  new Product(1, "Madrid Shirt", 2600, 0),
  new Product(2, "Inter Shirt", 2600, 2),
  new Product(3, "Arsenal Shirt", 2600, 20),
];
const productIdMap = new Map(productList.map((item) => [item.id, item]));

const cart = [];

function addToCart(product, quantity) {
  cart.push(new CartItem(product, quantity));
}

function getProduct(id) {
  return productIdMap.get(id);
}

app.get("/", (req, res) => {
  res.send("kickoff");
});

app.get("/products", (req, res) => {
  res.json(productList);
});

app.get(`/products/:id`, (req, res) => {
  const id = Number(req.params.id);
  if (productIdMap.has(id)) {
    res.json(getProduct(id));
    return;
  }
  res.status(404).json({ error: "Invalid product request" });
});

app.listen(port, () => {
  console.log("app listening on port " + port);
});
