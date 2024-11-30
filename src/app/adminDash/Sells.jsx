'use client'
import React, { useState } from "react";
import "@fontsource/poppins"; // Fuente Poppins
import {
  Box,
  Drawer,
  Pagination,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Home,
  ShoppingCart,
  ListAlt,
  Logout,
  Today,
  BarChart,
  Equalizer,
  Menu,
} from "@mui/icons-material"; // Iconos de MUI
import Image from "next/image";

const Sells = () => {
  const [open, setOpen] = useState(true); // Estado para abrir/cerrar el menú
  const toggleDrawer = () => setOpen(!open);

  const ventasRecientes = [
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
      {/* Menú lateral */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? 240 : 60,
            transition: "width 0.3s",
            boxSizing: "border-box",
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              justifyContent: open ? "flex-start" : "center",
            }}
          >
            <Image
              src="/images/Logo.png"
              alt="Farmacias Saludables"
              width={50}
              height={50}
              style={{ marginRight: open ? "10px" : "0px" }}
            />
            {open && (
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
                <Home sx={{ color: "#7CC448" }} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Ventas"
                  primaryTypographyProps={{
                    sx: { color: "#7CC448", fontWeight: "bold" },
                  }}
                />
              )}
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              {open && <ListItemText primary="Productos" />}
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {open && <ListItemText primary="Órdenes" />}
            </ListItem>
          </List>
        </Box>
        <Box>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              {open && <ListItemText primary="Cerrar sesión" />}
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Encabezado */}
        <Box
          sx={{
            backgroundColor: "#A0D468",
            color: "#295B05",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "absolute",
              left: "20px",
              color: "#295B05",
            }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#295B05",
              fontWeight: "bold",
            }}
          >
            Ventas
          </Typography>
        </Box>

        {/* Tarjetas de estadísticas */}
        <Grid container spacing={2} padding="20px">
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: "white", borderRadius: "10px", boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Box
                    sx={{
                      backgroundColor: "#F0F8FF",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Today sx={{ color: "#1976D2", fontSize: "30px" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: "Poppins, sans-serif", color: "#5F6368" }}>
                      Ventas de hoy
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      $5,000
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: "white", borderRadius: "10px", boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Box
                    sx={{
                      backgroundColor: "#FFE4E1",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BarChart sx={{ color: "#FF4081", fontSize: "30px" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: "Poppins, sans-serif", color: "#5F6368" }}>
                      Ventas Mensuales
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      $45,450
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: "white", borderRadius: "10px", boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Box
                    sx={{
                      backgroundColor: "#E0F7FA",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Equalizer sx={{ color: "#4CAF50", fontSize: "30px" }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: "Poppins, sans-serif", color: "#5F6368" }}>
                      Ventas totales
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      $150,730
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabla de ventas recientes */}
        <Box padding="20px">
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins, sans-serif",
              marginBottom: "10px",
              color: "#718EBF",
            }}
          >
            Ventas recientes
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden" }}>
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
                {ventasRecientes.map((venta) => (
                  <TableRow key={venta.id}>
                    <TableCell>{venta.id < 10 ? `0${venta.id}` : venta.id}</TableCell>
                    <TableCell>{venta.producto}</TableCell>
                    <TableCell>{venta.cantidad}</TableCell>
                    <TableCell>{venta.precio}</TableCell>
                    <TableCell>{venta.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px", paddingBottom: "20px" }}>
          <Pagination count={5} variant="outlined" shape="rounded" />
        </Box>
      </Box>
    </Box>
  );
};

export default Sells;
