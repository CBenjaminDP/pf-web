import React from "react";
import "@fontsource/poppins"; // Fuente Poppins
import { Box, Typography, IconButton, Grid } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material"; // Iconos de contacto
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#E0E0E0", // Fondo gris claro
        padding: "40px 20px", // Espaciado interno
        fontFamily: "Poppins, sans-serif", // Fuente Poppins
        color: "#4F4F4F", // Color de texto
      }}
    >
      <Grid container spacing={5} justifyContent="center">
        {/* Columna: Logo y descripción */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <Image
              src="/images/Logo.png" // Ruta relativa desde la carpeta public
              alt="Farmacias Saludables"
              width={50} // Ancho de la imagen
              height={50} // Altura de la imagen
              style={{ marginRight: "10px" }} // Estilo adicional
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  color: "#2F2E41",
                  lineHeight: "1",
                }}
              >
                Farmacias
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  color: "#2F2E41",
                  lineHeight: "1",
                }}
              >
                Saludables
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              color: "#8E8E8E",
              marginBottom: "20px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam.
          </Typography>
          <Box sx={{ display: "flex", gap: "15px" }}>
            <IconButton>
              <i className="bi bi-facebook" style={{ color: "#4CAF50", fontSize: "20px" }}></i>
            </IconButton>
            <IconButton>
              <i className="bi bi-twitter" style={{ color: "#4CAF50", fontSize: "20px" }}></i>
            </IconButton>
            <IconButton>
              <i className="bi bi-instagram" style={{ color: "#4CAF50", fontSize: "20px" }}></i>
            </IconButton>
            <IconButton>
              <i className="bi bi-youtube" style={{ color: "#4CAF50", fontSize: "20px" }}></i>
            </IconButton>
          </Box>
        </Grid>

        {/* Columna: Productos */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#2F2E41",
              marginBottom: "20px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Productos
          </Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif" }}>Cuidado personal</Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif" }}>Nutrición</Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif" }}>Salud sexual</Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif" }}>Dermatología</Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif" }}>Cuidados oculares</Typography>
        </Grid>

        {/* Columna: Contacto */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#2F2E41",
              marginBottom: "20px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Contáctanos
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <Email sx={{ color: "#8E8E8E", marginRight: "10px" }} />
            <Typography sx={{ color: "#8E8E8E", fontFamily: "Poppins, sans-serif" }}>
              contact@company.com
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <Phone sx={{ color: "#8E8E8E", marginRight: "10px" }} />
            <Typography sx={{ color: "#8E8E8E", fontFamily: "Poppins, sans-serif" }}>
              (414) 687 - 5892
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOn sx={{ color: "#8E8E8E", marginRight: "10px" }} />
            <Typography sx={{ color: "#8E8E8E", fontFamily: "Poppins, sans-serif" }}>
              794 Mcallister St <br />
              San Francisco, 94102
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
