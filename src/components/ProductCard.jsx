import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, formatRupiah, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-400 block">
            ID: {product.id}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="text-[11px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
          >
            Lihat Detail →
          </Link>
        </div>

        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>

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
