"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const CartDrawer = ({ isOpen, onClose }) => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cerave Crema Hidratante Diaria de Rostro y Cuerpo para Piel Seca 454 gr",
      price: 348.75,
      image: "https://images.ctfassets.net/ir0g9r0fng0m/1leDbU1rGn4EXAfhCsEVOo/c903dba5adfa16dcd8cf874735e4cd5f/CeraVe.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "La Roche Posay Anthelios UV MUNE 400 Oil Control Fluido FPS 50+ 50 ml",
      price: 348.75,
      image: "https://www.laroche-posay.us/dw/image/v2/AAJM_PRD/on/demandware.static/-/Sites-lrp-us-Library/default/dw321fc925/images/skincare/sunscreen/anthelios-light-fluid-sunscreen-50.png",
      quantity: 1,
    },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    router.push("/checkoutForm"); // Redirige a la página de checkout
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Tu carrito de compras
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Cart Items */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: 2,
          }}
        >
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    variant="square"
                    sx={{ width: 70, height: 70 }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          maxWidth: "200px", // Limita el ancho del texto
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        ${item.price.toFixed(2)}
                      </Typography>
                    }
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </Button>
                  <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        {/* Footer */}
        <Box sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
          <Typography variant="h6" fontWeight="bold" textAlign="right">
            Total: ${calculateTotal()}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              backgroundColor: "#779341",
              "&:hover": { backgroundColor: "#567728" },
            }}
            onClick={handleCheckout} // Llama a la función que redirige
          >
            Proceder al pago
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
