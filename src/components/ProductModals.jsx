import React from 'react';

export default function ProductModals({
  isAddOpen,
  setIsAddOpen,
  editProduct,
  setEditProduct,
  deleteProduct,
  setDeleteProduct,
  formData,
  setFormData,
  formError,
  handleSaveAdd,
  handleSaveEdit,
  handleConfirmDelete,
  formatRupiah,
}) {
  return (
    <>
      {/* 1. MODAL TAMBAH PRODUK */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative border border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition text-sm p-1 rounded-md hover:bg-slate-100 cursor-pointer"
              aria-label="Tutup modal"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold text-slate-900">Tambah Produk</h2>
            <p className="text-xs text-slate-500 mb-4">Masukkan informasi produk baru.</p>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Produk
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pulpen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 placeholder-slate-400"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 5000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800 placeholder-slate-400"
                  min="1"
                />
                <p className="text-[11px] text-slate-400 mt-1">Harga harus lebih dari 0.</p>
              </div>

              {formError && (
                <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                  {formError}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition active:scale-95 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition active:scale-95 cursor-pointer"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL EDIT PRODUK */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative border border-slate-100">
            <button
              type="button"
              onClick={() => setEditProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition text-sm p-1 rounded-md hover:bg-slate-100 cursor-pointer"
              aria-label="Tutup modal"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold text-slate-900">Edit Produk</h2>
            <p className="text-xs text-slate-500">Perbarui informasi produk yang dipilih.</p>
            <span className="text-xs font-semibold text-slate-400 block mt-2 mb-3">
              ID: {editProduct.id}
            </span>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-800"
                  min="1"
                />
                <p className="text-[11px] text-slate-400 mt-1">Harga harus lebih dari 0.</p>
              </div>

              {formError && (
                <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                  {formError}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition active:scale-95 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition active:scale-95 cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MODAL HAPUS PRODUK */}
      {deleteProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative border border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setDeleteProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition text-sm p-1 rounded-md hover:bg-slate-100 cursor-pointer"
              aria-label="Tutup modal"
            >
              ✕
            </button>

            {/* Trash icon with red container */}
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-red-50 text-red-500 mb-3 border border-red-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-slate-900">Hapus Produk?</h2>
            <p className="text-xs text-slate-500 mb-4">Produk yang dihapus tidak dapat dikembalikan.</p>

            <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-3.5 mb-5 text-left">
              <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                ID: {deleteProduct.id}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{deleteProduct.name}</h4>
              <p className="text-sm font-bold text-blue-600 mt-0.5">
                {formatRupiah(deleteProduct.price)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDeleteProduct(null)}
                className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition active:scale-95 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2 px-3 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition active:scale-95 cursor-pointer"
              >
                Hapus Produk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
