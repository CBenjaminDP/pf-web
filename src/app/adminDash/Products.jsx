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
  Button,
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
import { Home, ShoppingCart, ListAlt, Logout, Menu } from "@mui/icons-material";
import Image from "next/image";

const Products = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const productos = [
    {
      nombre: "Lomecan",
      id: "12548796",
      categoria: "Cuidado fem",
      stock: 300,
      precio: "$500",
      promocion: "20%",
    },
    {
      nombre: "Postday",
      id: "12548796",
      categoria: "Cuidado sexual",
      stock: 500,
      precio: "$500",
      promocion: "30%",
    },
    {
      nombre: "Cerave",
      id: "12548796",
      categoria: "Dermatología",
      stock: 170,
      precio: "$500",
      promocion: "NA",
    },
    {
      nombre: "Omeprazol",
      id: "12548796",
      categoria: "Medicamentos",
      stock: "NA",
      precio: "$500",
      promocion: "NA",
    },
    {
      nombre: "Metformina",
      id: "12548796",
      categoria: "Medicamentos",
      stock: 231,
      precio: "$500",
      promocion: "15%",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F2F4F7" }}>
      {/* Menú lateral */}
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
            style={{ marginRight: drawerOpen ? "10px" : "0", transition: "margin 0.3s" }}
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
              <ShoppingCart sx={{ color: "#7CC448" }} />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Productos" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ListAlt sx={{ color: "#B1B1B1" }} />
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
            <Menu />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#295B05",
            }}
          >
            Productos
          </Typography>
        </Box>

        {/* Productos en venta */}
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#718EBF",
            }}
          >
            Productos en venta
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7CC448",
              color: "white",
              textTransform: "none",
              borderRadius: "50px",
              fontFamily: "Poppins, sans-serif",
              "&:hover": {
                backgroundColor: "#6BA63D",
              },
            }}
          >
            + Agregar nuevo producto
          </Button>
        </Box>

        {/* Tabla */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "1200px",
              borderRadius: "10px",
              boxShadow: 3,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Nombre</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>ID producto</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Categoría</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Stock</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Precio</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Promoción</TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos.map((producto, index) => (
                  <TableRow key={index}>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.id}</TableCell>
                    <TableCell>{producto.categoria}</TableCell>
                    <TableCell sx={{ color: producto.stock === "NA" ? "red" : "inherit" }}>
                      {producto.stock}
                    </TableCell>
                    <TableCell>{producto.precio}</TableCell>
                    <TableCell
                      sx={{ color: producto.promocion === "NA" ? "red" : "#00A676" }}
                    >
                      {producto.promocion}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            color: "#4CAF50",
                            borderRadius: "50px",
                            textTransform: "none",
                            fontSize: "12px",
                            border: "1px solid #4CAF50",
                            "&:hover": {
                              backgroundColor: "#e8f5e9",
                            },
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "red",
                            borderRadius: "50px",
                            textTransform: "none",
                            fontSize: "12px",
                            border: "1px solid red",
                            "&:hover": {
                              backgroundColor: "#ffebee",
                            },
                          }}
                        >
                          Eliminar
                        </Button>
                      </Box>
                    </TableCell>
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

export default Products;

