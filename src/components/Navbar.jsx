import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate

export default function Navbar() {
  const navigate = useNavigate(); // 2. Inisialisasi hook navigasi

  const handleLogout = () => {
    // 3. Hapus data sesi dari penyimpanan browser
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // 4. Paksa arahkan ke halaman login
    navigate("/login");
  };

  return (
    <nav
      style={{
        width: "100%",
        background: "#1e293b",
        padding: "15px 25px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        boxSizing: "border-box" // Pastikan ini ada agar tidak overflow
      }}
    >
      <h2 style={{ margin: 0 }}>Inventory Management</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/items" style={{ color: "white", textDecoration: "none" }}>Items</Link>
        
        {/* 5. Tombol Logout */}
        <button 
          onClick={handleLogout}
          style={{
            background: "#ef4444", // Warna merah (danger)
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}