"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@fontsource/poppins";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AppBar, Box, Toolbar, Typography, IconButton, InputBase } from "@mui/material";
import Image from "next/image";
import CartDrawer from "../cart/Cart";

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para capturar el término de búsqueda
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si hay una sesión activa
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para abrir/cerrar el carrito
  const [userRoles, setUserRoles] = useState([]); // Estado para almacenar los roles del usuario

  // Función para verificar si hay sesión activa y obtener los roles del usuario
  const checkSession = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Usuario:", user);
    
    if (user) {
      setIsLoggedIn(true);
      setUserRoles(user.role); // Asume que el objeto de usuario tiene una propiedad 'role' que es un array
    } else {
      setIsLoggedIn(false);
      setUserRoles([]);
    }
  };

  useEffect(() => {
    checkSession(); // Verifica la sesión al montar el componente

    // Escuchar cambios en el localStorage (especialmente útiles para múltiples pestañas)
    const handleStorageChange = () => {
      checkSession();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleNavigation = (path) => {
    router.push(path); // Navega a la ruta especificada
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      // Aquí enviamos el término de búsqueda al backend
      router.push(`/searchProduct?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      setIsCartOpen(true); // Abre el carrito si el usuario está logueado
    } else {
      router.push("/login"); // Si no está logueado, redirige a /login
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/perfil"); // Si está logueado, redirige a /perfil
    } else {
      router.push("/login"); // Si no está logueado, redirige a /login
    }
  };

  const handleAdminClick = () => {
    router.push("/adminDash"); // Redirige a /adminDash
  };

  // Verifica si el usuario tiene el rol de "empleado" o "gerente"
  const hasAdminRole = userRoles.includes("empleado") || userRoles.includes("gerente");

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#D9D9D9", // Fondo gris claro
          boxShadow: "none", // Sin sombra
          height: "80px", // Altura de la navbar
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between", // Espaciado entre los elementos
            alignItems: "center",
            padding: "0 20px", // Espaciado horizontal
            height: "100%", // Asegura que el contenido ocupe toda la altura
          }}
        >
          {/* Logo y título */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer", // Cambia el cursor a mano al pasar por encima
            }}
            onClick={() => handleNavigation("/")} // Redirige al home al hacer clic
          >
            <Image
              src="/images/Logo.png" // Ruta relativa desde la carpeta public
              alt="Farmacias Saludables"
              width={50} // Ancho de la imagen
              height={50} // Altura de la imagen
              style={{ marginRight: "10px" }} // Estilo adicional
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  color: "black", // Texto negro
                  fontSize: "18px", // Tamaño de fuente ajustado
                  lineHeight: 1, // Línea compacta
                }}
              >
                Farmacias
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  color: "black", // Texto negro
                  fontSize: "18px", // Tamaño de fuente ajustado
                  lineHeight: 1,
                }}
              >
                Saludables
              </Typography>
            </Box>
          </Box>

          {/* Barra de búsqueda */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white", // Fondo blanco
              borderRadius: "50px", // Bordes redondeados
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Sombra pronunciada
              padding: "5px 15px", // Espaciado interno
              width: "408px", // Ancho fijo
              height: "45px", // Altura fija
              position: "relative", // Posicionamiento relativo para alinear el botón
            }}
          >
            <InputBase
              placeholder="Busca por producto o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
              sx={{
                flex: 1, // Ocupa todo el espacio disponible
                fontFamily: "Poppins, sans-serif",
                color: "gray", // Texto gris
                fontSize: "14px", // Tamaño de la fuente
              }}
            />
            <IconButton
              onClick={handleSearch} // Ejecuta la búsqueda al hacer clic
              sx={{
                backgroundColor: "#779341", // Fondo verde
                color: "black", // Icono negro
                borderRadius: "50%", // Botón circular
                width: "55px",
                height: "55px",
                position: "absolute", // Posicionamiento absoluto para alinear dentro del contenedor
                right: "0px", // Separación desde el borde derecho
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Sombra pronunciada
                "&:hover": {
                  backgroundColor: "#567728", // Hover en verde más oscuro
                },
              }}
            >
              <i className="bi bi-search"></i> {/* Icono de búsqueda de Bootstrap */}
            </IconButton>
          </Box>

          {/* Iconos de carrito, perfil y admin */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px", // Espaciado entre los iconos
            }}
          >
            {hasAdminRole && (
              <IconButton onClick={handleAdminClick}>
                <Image
                  src="/img/gestion-de-proyectos.png" // Ruta de la imagen del admin
                  alt="Admin Dashboard"
                  width={30} // Ancho de la imagen
                  height={30} // Altura de la imagen
                />
              </IconButton>
            )}
            <IconButton onClick={handleCartClick}>
              <i className="bi bi-cart" style={{ fontSize: "30px", color: "black" }}></i>{" "}
              {/* Carrito de compras */}
            </IconButton>
            <IconButton onClick={handleProfileClick}>
              <i className="bi bi-person" style={{ fontSize: "30px", color: "black" }}></i>{" "}
              {/* Perfil */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Componente del carrito */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
