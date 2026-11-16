import { initialProducts } from '../data/initialProducts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const STORAGE_KEY = 'pweb_products_cache';

// Helper local storage untuk fallback offline jika server backend belum dinyalakan
const getCachedProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading localStorage', e);
  }
  return initialProducts;
};

const setCachedProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed saving to localStorage', e);
  }
};

export const api = {
  // GET /products
  async getAllProducts() {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        signal: AbortSignal.timeout(2500),
      });
      if (res.ok) {
        const data = await res.json();
        setCachedProducts(data);
        return { data, isLive: true };
      }
    } catch (err) {
      console.warn('Backend API tidak merespons, beralih ke cache lokal:', err.message);
    }
    return { data: getCachedProducts(), isLive: false };
  },

  // GET /products/:id
  async getProductById(id) {
    const numId = parseInt(id, 10);
    try {
      const res = await fetch(`${API_BASE_URL}/products/${numId}`, {
        signal: AbortSignal.timeout(2500),
      });
      if (res.ok) {
        const data = await res.json();
        return { data, isLive: true };
      }
    } catch (err) {
      console.warn('Backend API getById error:', err.message);
    }
    const cached = getCachedProducts();
    const found = cached.find((p) => p.id === numId);
    return { data: found || null, isLive: false };
  },

  // POST /products
  async createProduct({ name, price }) {
    const payload = { name: String(name).trim(), price: Math.round(Number(price)) };
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const created = await res.json();
        const cached = getCachedProducts();
        setCachedProducts([...cached, created]);
        return { data: created, isLive: true };
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Gagal menambahkan produk');
    } catch (err) {
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }
      // Fallback lokal
      const cached = getCachedProducts();
      const nextId = cached.length > 0 ? Math.max(...cached.map((p) => p.id)) + 1 : 1;
      const newProduct = { id: nextId, ...payload, createdAt: new Date().toISOString() };
      setCachedProducts([...cached, newProduct]);
      return { data: newProduct, isLive: false };
    }
  },

  // PUT /products/:id
  async updateProduct(id, { name, price }) {
    const numId = parseInt(id, 10);
    const payload = { name: String(name).trim(), price: Math.round(Number(price)) };
    try {
      const res = await fetch(`${API_BASE_URL}/products/${numId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const updated = await res.json();
        const cached = getCachedProducts();
        setCachedProducts(cached.map((p) => (p.id === numId ? updated : p)));
        return { data: updated, isLive: true };
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Gagal memperbarui produk');
    } catch (err) {
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }
      const cached = getCachedProducts();
      const updated = { id: numId, ...payload, updatedAt: new Date().toISOString() };
      setCachedProducts(cached.map((p) => (p.id === numId ? { ...p, ...updated } : p)));
      return { data: updated, isLive: false };
    }
  },

  // DELETE /products/:id
  async deleteProduct(id) {
    const numId = parseInt(id, 10);
    try {
      const res = await fetch(`${API_BASE_URL}/products/${numId}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const cached = getCachedProducts();
        setCachedProducts(cached.filter((p) => p.id !== numId));
        return { success: true, isLive: true };
      }
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Gagal menghapus produk');
    } catch (err) {
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }
      const cached = getCachedProducts();
      setCachedProducts(cached.filter((p) => p.id !== numId));
      return { success: true, isLive: false };
    }
  },
};
