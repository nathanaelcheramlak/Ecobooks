'use client';

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "@/context/UserContext";

const Cart = () => {
    const router = useRouter();
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const { user } = useUser(); 

    const totalPrice = useMemo(
        () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [cartItems]
    );

    // {
    //   "client": { "id": 15 },
    //   "orderItems": [
    //     {
    //       "book": { "id": 1 },
    //       "quantity": 2,
    //       "price": 20.50
    //     },
    //     {
    //       "book": { "id": 7 },
    //       "quantity": 1,
    //       "price": 15.75
    //     }
    //   ],
    //   "status": "PENDING",
    //   "deliveryAddress": "123 Main St, Springfield",
    //   "deliveryDate": "2024-12-31"
    // }

    const handleCheckout = async() => {
      try {
        console.log("Order Placing...");

        const orderData = {
          client: { id: user.id },
          orderItems: cartItems.map((item) => ({
            book: { id: item.id },
            quantity: item.quantity,
            price: item.price,
          })),
          status: "PENDING",
          deliveryAddress: "123 Main St, Springfield",
          deliveryDate: "2024-12-31",
        };

        console.log("User", user);
        console.log(orderData);

        const response = await fetch('http://localhost:8080/api/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        if (response.ok) {
          toast.success("Order placed successfully.");
          setTimeout(() => {
            // router.push("/checkout");
          }, 1500);
          clearCart();
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error.message);
        toast.error("Failed to place order." + error.message);
        return;   
      }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cartItems.length > 0 ? (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded p-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQuantity(item.id, parseInt(e.target.value))
                                    }
                                    className="border border-gray-300 rounded p-2 w-16 text-center"
                                />
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center font-extralight text-xl my-48">Your cart is empty.</p>
            )}

            <div className="mt-8">
                <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            </div>
            <div className="mt-8">
                <button
                    onClick={handleCheckout}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
                >
                    Proceed to Checkout
                </button>
            </div>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </div>
    );
};

export default Cart;
