import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("Products:", data); // debug
        setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      {/* Menu Bar */}
      <div className="menu-bar">
        <span>All</span>
        <span>Electronics</span>
        <span>Fashion</span>
        <span>Home</span>
        <span>Appliances</span>
      </div>

      {/* Banner */}
      <div className="banner">
        <h2>Welcome to eKart</h2>
        <p>Best deals available here</p>
      </div>

      {/* Products Grid */}
      <div className="products-container">
        {products.length === 0 ? (
          <p style={{ padding: "20px" }}>No products available</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="product-card" onClick={() => navigate(`/product/${p.id}`)}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <button className="btn-primary">Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;