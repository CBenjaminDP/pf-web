"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@fontsource/poppins";
import "bootstrap-icons/font/bootstrap-icons.css"; // Importa Bootstrap Icons
import { AppBar, Box, Toolbar, Typography, IconButton, InputBase } from "@mui/material";
import Image from "next/image";
import CartDrawer from "../cart/Cart"; // Asegúrate de importar el componente del carrito correctamente

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para capturar el término de búsqueda
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si hay una sesión activa
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para abrir/cerrar el carrito

  // Función para verificar si hay sesión activa
  const checkSession = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Si hay un usuario en el localStorage, está logueado
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
      router.push(`/searchProduct?query=${encodeURIComponent(searchTerm)}`); // Redirige a la página de búsqueda
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
              placeholder="Busca algún producto..."
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

          {/* Iconos de carrito y perfil */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px", // Espaciado entre los iconos
            }}
          >
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
