import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../services/api';

export default function ProductsTable() {
  const [Products, setProducts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const getProducts = async () => {
    //const token = localStorage.getProducts('token');
    // if (!token) {
    //   navigate('/login');
    //   return;
    // }

    try {
      const response = await fetch(`${BASE_URL}/products`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      if (!response.ok) throw new Error('Failed to fetch Products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching Products:', error.message);
    }
  };

  useEffect(() => {
    getProducts();
  });

  // const Productss = [
  //   { id: 1, name: "Laptop", stock: 10, category: "Elektronik" },
  //   { id: 2, name: "Mouse", stock: 25, category: "Aksesoris" },
  //   { id: 3, name: "Meja Kantor", stock: 5, category: "Furniture" }
  // ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ background: "#e2e8f0" }}>
          <th style={th}>ID</th>
          <th style={th}>Nama Barang</th>
          <th style={th}>Stok</th>
        </tr>
      </thead>
      <tbody>
        {Products.map((Product) => (
          <tr key={Product.id} style={{ background: "white" }}>
            <td style={td}>{Product.id}</td>
            <td style={td}>{Product.product_name}</td>
            <td style={td}>{Product.qty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = {
  padding: "10px",
  border: "1px solid #cbd5e1"
};

const td = {
  padding: "10px",
  border: "1px solid #cbd5e1"
};
