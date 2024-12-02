import React from "react";
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
import { useCart } from "@/context/CartContext";


const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal, redirectToCheckout } =
    useCart();

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100%", sm: "470px" },
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
                key={item.product_id} // Usa un key único
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
                          maxWidth: "200px",
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
                        ${item.price ? Number(item.price).toFixed(2) : "0.00"}
                      </Typography>
                    }
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ minWidth: "30px", padding: "2px", fontSize: "12px" }}
                    onClick={() => updateQuantity(item.product_id, -1)}
                  >
                    -
                  </Button>
                  <Typography sx={{ fontSize: "14px", margin: "0 5px" }}>
                    {item.quantity}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ minWidth: "30px", padding: "2px", fontSize: "12px" }}
                    onClick={() => updateQuantity(item.product_id, 1)}
                  >
                    +
                  </Button>

                  <IconButton
                    onClick={() => removeFromCart(item.product_id)}
                    color="error"
                  >
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
            onClick={() => redirectToCheckout()}
          >
            Proceder al pago
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
