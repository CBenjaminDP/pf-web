'use client'
'use client'
import React, { useState } from "react";
import "@fontsource/poppins"; // Fuente Poppins
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { Home, ShoppingCart, ListAlt, Logout, Menu as MenuIcon } from "@mui/icons-material";
import Image from "next/image";

const Orders = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const orders = [
    { id: 1, producto: "Lomecan", cantidad: 1, precio: "$500", total: "$500" },
    { id: 2, producto: "Cerave", cantidad: 2, precio: "$500", total: "$500" },
    { id: 3, producto: "Postday", cantidad: 5, precio: "$500", total: "$500" },
    { id: 4, producto: "Ozempic", cantidad: 6, precio: "$500", total: "$500" },
    { id: 5, producto: "Aspirina", cantidad: 4, precio: "$500", total: "$500" },
    { id: 6, producto: "Cerave", cantidad: 5, precio: "$500", total: "$500" },
    { id: 7, producto: "Omeprazol", cantidad: 7, precio: "$500", total: "$500" },
    { id: 8, producto: "Metformina", cantidad: 9, precio: "$500", total: "$500" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F2F4F7" }}>
      {/* Navbar lateral */}
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 70,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerOpen ? 240 : 70,
            boxSizing: "border-box",
            backgroundColor: "#FFFFFF",
            transition: "width 0.3s",
          },
        }}
      >
        <Box sx={{ textAlign: "center", padding: "20px", display: "flex", alignItems: "center" }}>
          <Image
            src="/images/Logo.png"
            alt="Farmacias Saludables"
            width={40}
            height={40}
            style={{
              marginRight: drawerOpen ? "10px" : "0",
              transition: "margin 0.3s",
            }}
          />
          {drawerOpen && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                color: "#2F2E41",
              }}
            >
              Farmacias Saludables
            </Typography>
          )}
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Home sx={{ color: "#B1B1B1" }} />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Ventas" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCart sx={{ color: "#B1B1B1" }} />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Productos" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ListAlt sx={{ color: "#7CC448" }} />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Órdenes" />}
          </ListItem>
        </List>
        <Box sx={{ marginTop: "auto", marginBottom: "20px", textAlign: "center" }}>
          <ListItem button>
            <ListItemIcon>
              <Logout sx={{ color: "#B1B1B1" }} />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Cerrar sesión" />}
          </ListItem>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Encabezado */}
        <Box
          sx={{
            backgroundColor: "#A0D468",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{
              color: "#295B05",
              marginRight: "10px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#295B05",
            }}
          >
            Órdenes
          </Typography>
        </Box>

        {/* Tabla */}
        <Box sx={{ padding: "20px" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#718EBF",
              marginBottom: "10px",
            }}
          >
            Órdenes colocadas
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "1200px",
              margin: "0 auto",
              borderRadius: "10px",
              boxShadow: 3,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>No.</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Producto</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Cantidad</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Precio</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{`0${order.id}`}</TableCell>
                    <TableCell>{order.producto}</TableCell>
                    <TableCell>{order.cantidad}</TableCell>
                    <TableCell>{order.precio}</TableCell>
                    <TableCell>{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Paginación */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination count={5} shape="rounded" />
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;

