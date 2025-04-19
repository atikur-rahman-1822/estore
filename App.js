import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <a href="#">Home</a> | <a href="#">Electronics</a> | <a href="#">Clothing</a> | <a href="#">Support</a>
      </nav>

      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>

      <footer style={{ padding: "10px", background: "#ddd", marginTop: "20px" }}>
        <a href="#">Support</a>
      </footer>
    </div>
  );
};

export default App;