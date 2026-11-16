import React from 'react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-semibold max-w-sm ${
          isError
            ? 'bg-red-50 text-red-800 border-red-200'
            : 'bg-white text-slate-800 border-slate-200/90 shadow-slate-200/50'
        }`}
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
            isError ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
          }`}
        >
          {isError ? '✕' : '✓'}
        </div>
        <p className="flex-1 text-xs sm:text-sm">{toast.message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-xs p-1 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
