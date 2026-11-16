import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { api } from '../services/api';
import ProductModals from '../components/ProductModals';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setProducts, formatRupiah, showToast } = useOutletContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal states for direct edit / delete on detail page
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      setLoading(true);
      // Cek context terlebih dahulu
      const localFound = products.find((p) => p.id === parseInt(id, 10));
      if (localFound) {
        setProduct(localFound);
        setLoading(false);
        return;
      }

      // Jika belum ada di state lokal, panggil API
      const { data } = await api.getProductById(id);
      if (isMounted) {
        setProduct(data);
        setLoading(false);
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [id, products]);

  const handleOpenEdit = () => {
    if (!product) return;
    setEditProduct(product);
    setFormData({ name: product.name, price: String(product.price) });
    setFormError('');
  };

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
      const { data } = await api.updateProduct(product.id, {
        name: formData.name,
        price: numPrice,
      });
      setProducts(products.map((p) => (p.id === product.id ? data : p)));
      setProduct(data);
      setEditProduct(null);
      showToast('Perubahan produk berhasil disimpan!');
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan perubahan');
    }
  };

  const handleOpenDelete = () => {
    if (!product) return;
    setDeleteProduct(product);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.deleteProduct(product.id);
      setProducts(products.filter((p) => p.id !== product.id));
      setDeleteProduct(null);
      showToast('Produk berhasil dihapus!');
      navigate('/products');
    } catch (err) {
      alert(err.message || 'Gagal menghapus produk');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto mt-10">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 mb-6">
          Produk dengan ID #{id} tidak terdaftar di dalam sistem inventaris.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition"
        >
          ← Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Tombol Navigasi Kembali */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Kembali ke Daftar Produk</span>
        </Link>
      </div>

      {/* Main Detail Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200/60">
                ID: {product.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Tersedia
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
              Harga Satuan
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
              {formatRupiah(product.price)}
            </p>
          </div>
        </div>

        {/* Informasi Atribut & Deskripsi */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Informasi & Spesifikasi Produk</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                Nama Barang
              </span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{product.name}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                Nomor Indeks (ID)
              </span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">PROD-{String(product.id).padStart(4, '0')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                Kategori Produk
              </span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">Alat Tulis & Kantor</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                Status Integrasi
              </span>
              <p className="text-sm font-bold text-emerald-600 mt-0.5">Tersinkronisasi Database</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleOpenEdit}
            className="w-full sm:flex-1 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition active:scale-95 cursor-pointer"
          >
            Edit Informasi Produk
          </button>
          <button
            type="button"
            onClick={handleOpenDelete}
            className="w-full sm:flex-1 py-2.5 px-4 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition active:scale-95 cursor-pointer"
          >
            Hapus Produk
          </button>
        </div>
      </div>

      {/* Modal Edit & Hapus */}
      <ProductModals
        isAddOpen={false}
        setIsAddOpen={() => {}}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        deleteProduct={deleteProduct}
        setDeleteProduct={setDeleteProduct}
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        handleSaveAdd={() => {}}
        handleSaveEdit={handleSaveEdit}
        handleConfirmDelete={handleConfirmDelete}
        formatRupiah={formatRupiah}
      />
    </div>
  );
}
