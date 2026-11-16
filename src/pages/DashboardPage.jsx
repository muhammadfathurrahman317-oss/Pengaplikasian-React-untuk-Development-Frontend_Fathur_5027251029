import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';

export default function DashboardPage() {
  const { products, formatRupiah, isOnline } = useOutletContext();

  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
  const avgPrice = totalProducts > 0 ? Math.round(totalValue / totalProducts) : 0;
  
  const sortedByPrice = [...products].sort((a, b) => b.price - a.price);
  const maxProduct = sortedByPrice[0];
  const minProduct = sortedByPrice[sortedByPrice.length - 1];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Ikhtisar
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ringkasan data inventaris dan statistik produk secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow-xs transition"
          >
            <span>Kelola Daftar Produk</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Produk */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Produk</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalProducts}</p>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Item terdaftar</span>
        </div>

        {/* Card 2: Total Nilai Inventaris */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Nilai Total</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 truncate">
            {formatRupiah(totalValue)}
          </p>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Akumulasi harga produk</span>
        </div>

        {/* Card 3: Rata-rata Harga */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Rata-rata Harga</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A2.25 2.25 0 013 18.75v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a2.25 2.25 0 01-2.25-2.25V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a2.25 2.25 0 01-2.25-2.25V4.125z" />
              </svg>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 truncate">
            {formatRupiah(avgPrice)}
          </p>
          <span className="text-[11px] text-slate-500 font-medium block mt-1">Per produk</span>
        </div>

        {/* Card 4: Status Database Engine */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Database Engine</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
            </div>
          </div>
          <p className="text-lg font-extrabold text-slate-900">
            {isOnline ? 'Prisma (SQLite)' : 'Local Cache'}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            {isOnline ? 'REST API Aktif' : 'Tersinkronisasi Otomatis'}
          </span>
        </div>
      </div>

      {/* Highlights & Recent Products Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Highlights */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Sorotan Produk</h3>
          
          {maxProduct && (
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-blue-600 tracking-wider">
                  Harga Tertinggi
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{maxProduct.name}</p>
              </div>
              <p className="text-sm font-extrabold text-blue-700">{formatRupiah(maxProduct.price)}</p>
            </div>
          )}

          {minProduct && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                  Harga Terjangkau
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{minProduct.name}</p>
              </div>
              <p className="text-sm font-extrabold text-slate-800">{formatRupiah(minProduct.price)}</p>
            </div>
          )}

          <div className="pt-2">
            <Link
              to="/products"
              className="w-full py-2.5 px-4 text-xs font-semibold text-center block text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Buka Semua {totalProducts} Produk
            </Link>
          </div>
        </div>

        {/* Right: Daftar Produk Ringkas */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Daftar Produk Terkini</h3>
            <Link to="/products" className="text-xs font-bold text-blue-600 hover:text-blue-700">
              Lihat Semua →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] uppercase text-slate-400 font-bold">
                  <th className="pb-3 font-semibold">ID</th>
                  <th className="pb-3 font-semibold">Nama Produk</th>
                  <th className="pb-3 font-semibold">Harga</th>
                  <th className="pb-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 text-xs font-semibold text-slate-400">#{product.id}</td>
                    <td className="py-3 font-bold text-slate-800">{product.name}</td>
                    <td className="py-3 font-bold text-blue-600">{formatRupiah(product.price)}</td>
                    <td className="py-3 text-right">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Detail →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
