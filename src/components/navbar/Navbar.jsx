import React from "react";
import "@fontsource/poppins";
import "bootstrap-icons/font/bootstrap-icons.css"; // Importa Bootstrap Icons
import { AppBar, Box, Toolbar, Typography, IconButton, InputBase } from "@mui/material";
import Image from "next/image";

const Navbar = () => {
  return (
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
          }}
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
            sx={{
              flex: 1, // Ocupa todo el espacio disponible
              fontFamily: "Poppins, sans-serif",
              color: "gray", // Texto gris
              fontSize: "14px", // Tamaño de la fuente
            }}
          />
          <IconButton
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
          <IconButton>
            <i className="bi bi-cart" style={{ fontSize: "30px", color: "black" }}></i>{" "}
            {/* Carrito de compras */}
          </IconButton>
          <IconButton>
            <i className="bi bi-person" style={{ fontSize: "30px", color: "black" }}></i>{" "}
            {/* Perfil */}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
