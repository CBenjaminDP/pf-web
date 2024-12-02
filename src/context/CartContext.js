"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Cargar el carrito desde el localStorage al inicializar
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  // Guardar el carrito en el localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar un producto al carrito
  const addToCart = (product) => {
    console.log("Producto agregado al carrito:", product);
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => String(item.product_id) === String(product.product_id)
      );

      if (existingItem) {
        toast.info("Cantidad del producto actualizada");
        return prevCart.map((item) =>
          String(item.product_id) === String(product.product_id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success("Producto agregado al carrito");
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Eliminar un producto del carrito
  const removeFromCart = (product_id) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => String(item.product_id) !== String(product_id)
      );
      if (updatedCart.length < prevCart.length) {
        toast.warn("Producto eliminado del carrito");
      }
      return updatedCart;
    });
  };

  // Actualizar la cantidad de un producto
  const updateQuantity = (product_id, delta) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          String(item.product_id) === String(product_id)
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0) // Elimina los productos con cantidad <= 0
    );
    toast.info("Cantidad del producto actualizada");
  };

  // Calcular el total
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Redirigir al checkout
  const redirectToCheckout = async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      if (cartItems.length === 0) {
        toast.error("Tu carrito está vacío. Agrega productos antes de continuar.");
        return;
      }

      toast.success("Redirigiendo al checkout...");
      window.location.href = "/checkoutForm";
    } catch (error) {
      console.error("Error al redirigir al checkout:", error);
      toast.error("Ocurrió un error al redirigir al checkout.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        redirectToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
