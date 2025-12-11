import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"; // 1. Import Outlet
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Items from "./pages/items.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 

// 2. Buat komponen Layout khusus yang ada Navbarnya
const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Outlet /> {/* Ini tempat halaman anak (Dashboard/Items) akan muncul */}
      </div>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- HALAMAN TANPA NAVBAR --- */}
        <Route path="/login" element={<Login />} />

        {/* --- HALAMAN DENGAN NAVBAR (Terproteksi) --- */}
        <Route element={<ProtectedRoute />}>
            {/* Bungkus rute ini dengan LayoutWithNavbar */}
            <Route element={<LayoutWithNavbar />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/items" element={<Items />} />
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}