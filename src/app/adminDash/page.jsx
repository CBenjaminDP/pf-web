"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import {
  Home,
  ShoppingCart,
  ListAlt,
  Campaign,
  Menu as MenuIcon,
  People as PeopleIcon,
  Category as CategoryIcon, // Importa el icono de categorías
} from "@mui/icons-material";
import Image from "next/image";
import Orders from "./Orders";
import Products from "./Products";
import Sells from "./Sells";
import Promotions from "./Promotions";
import Users from "./Users";
import Categoria from "./Categories"; // Importa el componente de categorías
import AuthGuard from "@/components/AuthGuard";

const AdminDash = () => {
  const [drawerOpen, setDrawerOpen] = useState(true); // Controla el menú lateral
  const [selectedScreen, setSelectedScreen] = useState("products"); // Controla la pantalla actual
  const [userRoles, setUserRoles] = useState([]); // Almacena los roles del usuario

  // Carga los roles del usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRoles(user.role); // Almacena los roles del usuario
    }
  }, []);

  const handleScreenChange = (screen) => {
    setSelectedScreen(screen);
  };

  const handleNavigateHome = () => {
    window.location.href = "/"; // Navegar a la página de inicio
  };

  return (
    <AuthGuard requiredRoles={["gerente", "empleado"]}>
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
          <Box
            sx={{
              textAlign: "center",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer", // Añadir cursor pointer para indicar que es clicable
            }}
            onClick={handleNavigateHome} // Añadir el evento onClick
          >
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
            {/* Mostrar solo opciones permitidas según los roles */}
            {userRoles.includes("gerente") && (
              <ListItem button onClick={() => handleScreenChange("sales")}>
                <ListItemIcon>
                  <Home
                    sx={{
                      color: selectedScreen === "sales" ? "#7CC448" : "#B1B1B1",
                    }}
                  />
                </ListItemIcon>
                {drawerOpen && <ListItemText primary="Ventas" />}
              </ListItem>
            )}
            {userRoles.includes("empleado") && (
              <ListItem button onClick={() => handleScreenChange("products")}>
                <ListItemIcon>
                  <ShoppingCart
                    sx={{
                      color: selectedScreen === "products" ? "#7CC448" : "#B1B1B1",
                    }}
                  />
                </ListItemIcon>
                {drawerOpen && <ListItemText primary="Productos" />}
              </ListItem>
            )}
            {userRoles.includes("gerente") && (
              <ListItem button onClick={() => handleScreenChange("orders")}>
                <ListItemIcon>
                  <ListAlt
                    sx={{
                      color: selectedScreen === "orders" ? "#7CC448" : "#B1B1B1",
                    }}
                  />
                </ListItemIcon>
                {drawerOpen && <ListItemText primary="Órdenes" />}
              </ListItem>
            )}
            {userRoles.includes("gerente") && (
              <ListItem button onClick={() => handleScreenChange("promotions")}>
                <ListItemIcon>
                  <Campaign
                    sx={{
                      color: selectedScreen === "promotions" ? "#7CC448" : "#B1B1B1",
                    }}
                  />
                </ListItemIcon>
                {drawerOpen && <ListItemText primary="Promociones" />}
              </ListItem>
            )}
            {/* Nueva opción para Categorías */}
            {userRoles.includes("gerente") && (
              <ListItem button onClick={() => handleScreenChange("categories")}>
                <ListItemIcon>
                  <CategoryIcon
                    sx={{
                      color: selectedScreen === "categories" ? "#7CC448" : "#B1B1B1",
                    }}
                  />
                </ListItemIcon>
                {drawerOpen && <ListItemText primary="Categorías" />}
              </ListItem>
            )}
            {/* Nueva opción para Usuarios */}
            {userRoles.includes("empleado") && (
              <ListItem button onClick={() => handleScreenChange("users")}>
                <ListItemIcon>
                  <PeopleIcon
                    sx={{
                      color: selectedScreen === "users" ? "#7CC448" : "#B1B1B1",
                    }}
                  />
                </ListItemIcon>
                {drawerOpen && <ListItemText primary="Usuarios" />}
              </ListItem>
            )}
          </List>
        </Drawer>

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1 }}>
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
              sx={{ color: "#295B05", marginRight: "10px" }}
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
              {selectedScreen === "sales"
                ? "Ventas"
                : selectedScreen === "products"
                ? "Productos"
                : selectedScreen === "orders"
                ? "Órdenes"
                : selectedScreen === "promotions"
                ? "Promociones"
                : selectedScreen === "categories"
                ? "Categorías"
                : "Usuarios"}
            </Typography>
          </Box>
          <Container sx={{ padding: "20px" }}>
            {selectedScreen === "sales" && userRoles.includes("gerente") && <Sells />}
            {selectedScreen === "products" && userRoles.includes("empleado") && <Products />}
            {selectedScreen === "orders" && userRoles.includes("gerente") && <Orders />}
            {selectedScreen === "promotions" && userRoles.includes("gerente") && <Promotions />}
            {selectedScreen === "categories" && userRoles.includes("gerente") && <Categoria />}
            {selectedScreen === "users" && userRoles.includes("empleado") && <Users />}
          </Container>
        </Box>
      </Box>
    </AuthGuard>
  );
};

export default AdminDash;