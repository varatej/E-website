import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="text-blue-600" />
        <h2 className="text-xl font-bold">Shopping Cart</h2>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                  className="border rounded p-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">
              Total: ${total.toFixed(2)}
            </p>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}