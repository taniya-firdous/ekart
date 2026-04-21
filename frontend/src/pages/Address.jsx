import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Address.css";
import BASE_URL from "../api/config";

function Address() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
  if (!form.name || !form.phone || !form.address) {
    alert("Please fill all required fields");
    return;
  }

  localStorage.setItem("address", JSON.stringify(form));

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  if (!userId) {
    alert("User not found. Please login again.");
    navigate("/login");
    return;
  }

  // ✅ ALWAYS use same utility logic
  const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

  console.log("Cart at order time:", cart); // 🔥 DEBUG

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const orderData = {
    userId: userId,
    address: form.address,
    items: cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))
  };

  try {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (res.ok) {
    alert("✅ Order placed successfully!");

    localStorage.removeItem(`cart_${userId}`);
    navigate("/home");
  } else {
    console.error("Order error:", data);
    alert("❌ Order failed");
  }
} catch (err) {
  console.error(err);
  alert("Server error");
}
};

  return (
    <div>
      <Navbar />

      <div className="address-container">
        <h2>Delivery Address</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} />
        <textarea name="address" placeholder="Full Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} />

        <button className="save-btn" onClick={handleSubmit}>
          Save & Place Order
        </button>
      </div>
    </div>
  );
}

export default Address;