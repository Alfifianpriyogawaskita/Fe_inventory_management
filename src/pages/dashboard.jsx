import React, { useEffect, useState } from 'react';
import api from '../services/api'; 

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  // Hitung statistik sederhana
  const totalItems = products.length;
  const lowStock = products.filter(item => item.qty < 5).length; // Contoh logika stok menipis
  const totalValue = products.reduce((acc, item) => acc + (item.harga * item.qty), 0);

  return (
    <div className="container">
      <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Dashboard Overview</h2>
      <p style={{ color: '#a0a0a0' }}>Selamat datang di panel kontrol inventaris.</p>

      <div className="stats-grid">
        {/* Card 1: Total Barang */}
        <div className="card">
          <h3>Total Produk</h3>
          <p>{totalItems}</p>
        </div>

        {/* Card 2: Stok Menipis */}
        <div className="card">
          <h3>Stok Menipis</h3>
          <p style={{ color: lowStock > 0 ? '#ef4444' : '#10b981' }}>
            {lowStock}
          </p>
        </div>

        {/* Card 3: Total Nilai Aset */}
        <div className="card">
          <h3>Total Nilai Aset</h3>
          <p style={{ fontSize: '1.8rem' }}>
            Rp {totalValue.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;