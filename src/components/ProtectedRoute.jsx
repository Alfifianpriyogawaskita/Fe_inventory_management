import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // 1. Cek apakah token ada di penyimpanan browser
  const token = localStorage.getItem("token");

  // 2. Jika tidak ada token, paksa pindah ke halaman Login
  // 'replace' digunakan agar user tidak bisa kembali (back button) ke halaman ini
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Jika ada, render halaman anak (Outlet) yang diminta (Dashboard/Items)
  return <Outlet />;
};

export default ProtectedRoute;