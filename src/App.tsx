import React, { useReducer } from "react";

// ------------------ Types ------------------
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type AppState = {
  products: Product[];
  cart: Product[];
};

type Action =
  | { type: "INCREASE"; id: number }
  | { type: "DECREASE"; id: number }
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "CLEAR_ALL" };

// ------------------ Initial Data ------------------
const initialProducts: Product[] = [
  { id: 1, name: "کفش ورزشی", price: 250000, quantity: 1 },
  { id: 2, name: "هدفون بی‌سیم", price: 480000, quantity: 1 },
  { id: 3, name: "کیبورد مکانیکی", price: 720000, quantity: 1 },
  { id: 4, name: "ماوس گیمینگ", price: 350000, quantity: 1 },
  { id: 5, name: "مانیتور 24 اینچ", price: 2400000, quantity: 1 },
  { id: 6, name: "فلش 64 گیگ", price: 150000, quantity: 1 },
  { id: 7, name: "کابل شارژ تایپ C", price: 90000, quantity: 1 },
  { id: 8, name: "پاوربانک 10000", price: 600000, quantity: 1 },
  { id: 9, name: "قاب موبایل", price: 80000, quantity: 1 },
  { id: 10, name: "اسپیکر بلوتوث", price: 530000, quantity: 1 },
];

const initialState: AppState = {
  products: initialProducts,
  cart: [],
};

// ------------------ Reducer ------------------
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
        ),
      };

    case "DECREASE":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.id && p.quantity > 1
            ? { ...p, quantity: p.quantity - 1 } : p
        ),
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.product],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.id),
      };

    case "CLEAR_ALL":
      return { ...state, cart: [] };

    default:
      return state;
  }
}

// ------------------ Component ------------------
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex flex-col lg:flex-row gap-6">
      {/* Products Section */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-screen">
        {state.products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow flex flex-col justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">{product.name}</h2>
              <p className="text-sm text-gray-600">قیمت: {product.price.toLocaleString()} تومان</p>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => dispatch({ type: "INCREASE", id: product.id })} className="px-3 py-1 bg-green-500 text-white rounded-xl">+</button>
              <span className="font-bold text-lg">{product.quantity}</span>
              <button onClick={() => dispatch({ type: "DECREASE", id: product.id })} className="px-3 py-1 bg-red-500 text-white rounded-xl">-</button>
            </div>

            <button onClick={() => dispatch({ type: "ADD_TO_CART", product })} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl">افزودن به سبد</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="lg:w-80 bg-white p-6 rounded-2xl shadow mt-6 lg:mt-0 sticky top-4">
        <h2 className="text-2xl font-bold mb-4 text-center">سبد خرید</h2>
        {state.cart.length === 0 ? (
          <p className="text-gray-500 text-center">سبد خالی است</p>
        ) : (
          <div className="flex flex-col gap-3">
            {state.cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-xl">
                <span>{item.name} — {item.quantity} عدد</span>
                <button onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })} className="px-3 py-1 bg-red-500 text-white rounded-xl">حذف</button>
              </div>
            ))}
            <button onClick={() => dispatch({ type: "CLEAR_ALL" })} className="mt-4 w-full bg-black text-white py-2 rounded-xl">حذف همه</button>
          </div>
        )}
      </div>
    </div>
  );
}
