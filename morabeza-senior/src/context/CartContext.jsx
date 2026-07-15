import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('morabeza_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('morabeza_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (produto, quantidade = 1) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === produto.id);
      if (existe) {
        return prev.map((i) =>
          i.id === produto.id
            ? { ...i, quantidade: Math.min(i.quantidade + quantidade, produto.stock) }
            : i
        );
      }
      return [...prev, { id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, stock: produto.stock, quantidade }];
    });
  };

  const updateQuantidade = (id, quantidade) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade: Math.max(1, Math.min(quantidade, i.stock)) } : i))
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.preco * i.quantidade, 0), [items]);
  const totalItens = useMemo(() => items.reduce((sum, i) => sum + i.quantidade, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantidade, removeItem, clearCart, total, totalItens }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
