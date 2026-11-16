import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModals from '../components/ProductModals';
import { api } from '../services/api';

export default function ProductsPage() {
  const { products, setProducts, formatRupiah, showToast } = useOutletContext();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const [formData, setFormData] = useState({ name: '', price: '' });
  const [formError, setFormError] = useState('');

  // Sinkronisasi dengan URL parameters jika diakses langsung untuk keperluan demo
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const viewParam = searchParams.get('view');
    const idParam = parseInt(searchParams.get('id') || '2', 10);

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (viewParam === 'add') {
      setFormData({ name: '', price: '' });
      setFormError('');
      setIsAddOpen(true);
    } else if (viewParam === 'edit') {
      const target = products.find((p) => p.id === idParam) || products[1];
      if (target) {
        setEditProduct(target);
        setFormData({ name: target.name, price: String(target.price) });
      }
    } else if (viewParam === 'delete') {
      const target = products.find((p) => p.id === idParam) || products[2];
      if (target) {
        setDeleteProduct(target);
      }
    }
  }, [searchParams, products]);

  // Filter produk berdasarkan query nama
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Buka Modal Tambah
  const handleOpenAdd = () => {
    setFormData({ name: '', price: '' });
    setFormError('');
    setIsAddOpen(true);
  };

  // Simpan Tambah Produk via API Service
  const handleSaveAdd = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Nama produk tidak boleh kosong.');
      return;
    }
    const numPrice = Number(formData.price);
    if (!numPrice || numPrice <= 0) {
      setFormError('Harga harus lebih dari 0.');
      return;
    }

    try {
      const { data } = await api.createProduct({
        name: formData.name.trim(),
        price: numPrice,
      });
      setProducts([...products, data]);
      setIsAddOpen(false);
      showToast(`Produk "${data.name}" berhasil ditambahkan!`);
    } catch (err) {
      setFormError(err.message || 'Gagal menambahkan produk');
    }
  };

  // Buka Modal Edit
  const handleOpenEdit = (product) => {
    setEditProduct(product);
    setFormData({ name: product.name, price: String(product.price) });
    setFormError('');
  };

  // Simpan Edit Produk via API Service
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Nama produk tidak boleh kosong.');
      return;
    }
    const numPrice = Number(formData.price);
    if (!numPrice || numPrice <= 0) {
      setFormError('Harga harus lebih dari 0.');
      return;
    }

    try {
      const { data } = await api.updateProduct(editProduct.id, {
        name: formData.name.trim(),
        price: numPrice,
      });
      setProducts(products.map((p) => (p.id === editProduct.id ? data : p)));
      setEditProduct(null);
      showToast(`Perubahan produk "${data.name}" berhasil disimpan!`);
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan perubahan');
    }
  };

  // Buka Modal Hapus
  const handleOpenDelete = (product) => {
    setDeleteProduct(product);
  };

  // Konfirmasi Hapus Produk via API Service
  const handleConfirmDelete = async () => {
    try {
      const deletedName = deleteProduct.name;
      await api.deleteProduct(deleteProduct.id);
      setProducts(products.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
      showToast(`Produk "${deletedName}" berhasil dihapus!`);
    } catch (err) {
      alert(err.message || 'Gagal menghapus produk');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Produk
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>+ Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Counter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs sm:max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama produk..."
            className="w-full pl-10 pr-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 placeholder-slate-400 shadow-2xs"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold tracking-wide">
          {filteredProducts.length} produk
        </span>
      </div>

      {/* Grid Produk */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              formatRupiah={formatRupiah}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center my-6">
          <p className="text-sm font-semibold text-slate-600">
            Tidak ada produk yang sesuai dengan "{searchQuery}"
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Coba kata kunci lain atau tambahkan produk baru.
          </p>
        </div>
      )}

      {/* Footer Info */}
      <footer className="pt-2">
        <p className="text-xs text-slate-500 font-medium">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </p>
      </footer>

      {/* Modals Component */}
      <ProductModals
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        deleteProduct={deleteProduct}
        setDeleteProduct={setDeleteProduct}
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        handleSaveAdd={handleSaveAdd}
        handleSaveEdit={handleSaveEdit}
        handleConfirmDelete={handleConfirmDelete}
        formatRupiah={formatRupiah}
      />
    </div>
  );
}
