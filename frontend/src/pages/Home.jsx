import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard"; // ✅ important
import "./Home.css";

function Home() {

  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: 79999,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      name: "Laptop",
      price: 55999,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      name: "Headphones",
      price: 2999,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 4,
      name: "Shoes",
      price: 1999,
      image: "https://via.placeholder.com/200"
    }
  ];

  return (
    <div>
      <Navbar />

      {/* MENU BAR */}
      <div className="menu-bar">
        <span>All</span>
        <span>Electronics</span>
        <span>Fashion</span>
        <span>Home</span>
        <span>Appliances</span>
      </div>

      {/* BANNER */}
      <div className="banner">
        <h2>Welcome to eKart</h2>
        <p>Best deals available here</p>
      </div>

      {/* PRODUCT GRID */}
      <div className="home">
        <h2 className="home-title">Top Deals</h2>

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;