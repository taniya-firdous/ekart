import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useRef, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    "Beauty & Personal Care",
    "Books",
    "Boys' Fashion",
    "Computers",
    "Deals",
    "Digital Music",
    "Electronics",
    "Girls' Fashion",
    "Health & Household",
    "Home & Kitchen",
    "Industrial & Scientific",
    "Kindle Store",
    "Luggage",
    "Men's Fashion",
    "Pet Supplies",
    "Software",
    "Sports & Outdoors"
  ];

  // ✅ close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">

      {/* LEFT SECTION */}
      <div className="nav-left">
        <div className="logo" onClick={() => navigate("/home")}>
          eKart
        </div>
      </div>

      {/* SEARCH + DROPDOWN */}
      <div className="search-container">

        {/* Dropdown */}
        <div
          className="dept-dropdown"
          ref={dropdownRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          All ▼

          {showMenu && (
            <div className="dropdown-menu">
              {categories.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for products, brands and more"
          className="search-bar"
        />

        {/* Search Button */}
        <button className="search-btn">🔍</button>

      </div>

      {/* RIGHT SECTION */}
      <div className="nav-actions">
        {token ? (
          <div className="nav-item">My Account</div>
        ) : (
          <div
            className="nav-item"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        )}

        <div
            className="nav-item"
            onClick={() => navigate("/cart")}
            >Cart 🛒 
        </div>
      </div>

    </div>
  );
}

export default Navbar;