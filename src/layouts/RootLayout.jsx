import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { api } from '../services/api';
import { formatRupiah, initialProducts } from '../data/initialProducts';

export default function RootLayout() {
  const [products, setProducts] = useState(initialProducts);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const { data, isLive } = await api.getAllProducts();
      setProducts(data);
      setIsOnline(isLive);
    } catch (e) {
      console.error('Error fetching products:', e);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      {/* Sidebar Navigasi Bersama */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Konten Kanan (Header + Outlet Halaman) */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <Header isOnline={isOnline} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-8 md:p-10 max-w-7xl w-full mx-auto">
          <Outlet
            context={{
              products,
              setProducts,
              isOnline,
              isLoading,
              refreshProducts: loadProducts,
              showToast,
              formatRupiah,
            }}
          />
        </main>
      </div>

      {/* Global Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
