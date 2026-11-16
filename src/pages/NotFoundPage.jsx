import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-3xl mx-auto mb-4 border border-blue-100">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Rute yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition"
          >
            ← Kembali ke Dashboard
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            Daftar Produk
          </Link>
        </div>
      </div>
    </div>
  );
}
