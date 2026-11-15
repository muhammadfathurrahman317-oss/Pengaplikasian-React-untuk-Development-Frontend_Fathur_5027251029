import React from 'react';

export default function ProductCard({ product, formatRupiah, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 block mb-1">
          ID: {product.id}
        </span>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-blue-600 mb-4 mt-0.5">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="flex-1 py-1.5 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition active:scale-95 cursor-pointer"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(product)}
          className="flex-1 py-1.5 px-3 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition active:scale-95 cursor-pointer"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
