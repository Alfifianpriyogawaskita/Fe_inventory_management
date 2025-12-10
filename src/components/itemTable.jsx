import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ItemTable = () => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(''); 

  // State untuk Modal & Form
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // UPDATE 1: Tambahkan field description dan location di state form
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    qty: '', 
    description: '', 
    location: '' 
  });

  useEffect(() => {
    fetchProducts();
    const savedRole = localStorage.getItem('role'); 
    setUserRole(savedRole); 
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const isManager = userRole === 'manager'; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setIsEditing(false);
    // Reset form termasuk field baru
    setFormData({ name: '', price: '', qty: '', description: '', location: '' });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentId(product.id);
    // Isi form dengan data yang ada (termasuk deskripsi & lokasi)
    setFormData({ 
      name: product.name, 
      price: product.price, 
      qty: product.qty,
      description: product.description || '', // Pakai string kosong jika null
      location: product.location || '' 
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.patch(`/products/${currentId}`, formData);
        alert('Data berhasil diupdate!');
      } else {
        await api.post('/products', formData);
        alert('Data berhasil ditambahkan!');
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert('Gagal menyimpan data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Gagal menghapus:", error);
      }
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Daftar Inventaris</h2>
        {isManager && (
          <button className="btn" onClick={handleAdd}>+ Tambah Barang</button>
        )}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              {/* UPDATE 2: Tambah Header Kolom Baru */}
              <th>Deskripsi</th>
              <th>Lokasi</th>
              <th>Harga</th>
              <th>Stok</th>
              {isManager && <th>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id || index}>
                <td>{index + 1}</td>
                <td style={{fontWeight:'bold', color:'white'}}>{product.name}</td>
                
                {/* UPDATE 3: Tampilkan Data Baru */}
                <td style={{ fontSize: '0.9rem', color: '#ccc' }}>{product.description || '-'}</td>
                <td>{product.location || '-'}</td>
                
                <td>Rp {parseInt(product.price).toLocaleString('id-ID')}</td>
                <td>
                   <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      backgroundColor: product.qty > 5 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: product.qty > 5 ? '#34d399' : '#ef4444'
                    }}>
                      {product.qty}
                    </span>
                </td>
                
                {isManager && (
                  <td>
                    <button className="btn" style={{ fontSize: '0.8rem', marginRight:'5px' }} onClick={() => handleEdit(product)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" style={{ fontSize: '0.8rem' }} onClick={() => handleDelete(product.id || product.uuid)}>
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? 'Edit Barang' : 'Tambah Barang'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama Produk</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
              </div>

              {/* UPDATE 4: Input untuk Deskripsi */}
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea 
                  name="description" 
                  className="form-control" 
                  rows="2"
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Contoh: Barang elektronik, warna hitam..."
                />
              </div>

              {/* UPDATE 5: Input untuk Lokasi */}
              <div className="form-group">
                <label>Lokasi Penyimpanan</label>
                <input 
                  type="text" 
                  name="location" 
                  className="form-control" 
                  value={formData.location} 
                  onChange={handleChange} 
                  placeholder="Contoh: Rak A1, Gudang Utama"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Harga (Rp)</label>
                <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Stok</label>
                <input type="number" name="qty" className="form-control" value={formData.qty} onChange={handleChange} required />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn" style={{background:'#555'}} onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="btn">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTable;