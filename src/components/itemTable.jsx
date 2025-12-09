import React from "react";

export default function ItemTable() {
  const items = [
    { id: 1, name: "Laptop", stock: 10, category: "Elektronik" },
    { id: 2, name: "Mouse", stock: 25, category: "Aksesoris" },
    { id: 3, name: "Meja Kantor", stock: 5, category: "Furniture" }
  ];

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ background: "#e2e8f0" }}>
          <th style={th}>ID</th>
          <th style={th}>Nama Barang</th>
          <th style={th}>Stok</th>
          <th style={th}>Kategori</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} style={{ background: "white" }}>
            <td style={td}>{item.id}</td>
            <td style={td}>{item.name}</td>
            <td style={td}>{item.stock}</td>
            <td style={td}>{item.category}</td>
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
