import React from "react";
import "@fontsource/poppins";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import Image from "next/image";

const RecoverPassword2 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
        background: "radial-gradient(circle, #568D2E 10%, #18270D 100%)", // Fondo con degradado radial
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "500px" }, // Ancho de la tarjeta responsivo
          padding: "30px",
          borderRadius: "35px", // Bordes redondeados
          boxShadow: 3, // Sombra para destacar la tarjeta
          backgroundColor: "rgba(255, 255, 255, 0.75)", // Fondo blanco con 75% de transparencia
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <CardContent>
          {/* Encabezado con logo */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <Image
              src="/images/Logo.png" // Ruta relativa desde la carpeta public
              alt="Farmacias Saludables"
              width={50} // Ancho de la imagen
              height={50} // Altura de la imagen
              style={{ marginRight: "10px" }} // Estilo adicional
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#4caf50", // Color verde
                fontFamily: "Poppins, sans-serif",
                whiteSpace: "nowrap", // Evita que el texto se divida
              }}
            >
              Farmacias Saludables
            </Typography>
          </Box>

          {/* Título principal */}
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "left",
              marginBottom: "10px",
              fontFamily: "Poppins, sans-serif",
              fontSize: "35px",
            }}
          >
            Recuperar contraseña
          </Typography>

          {/* Formulario */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Campo Nueva Contraseña */}
            <TextField
              label="Nueva contraseña"
              placeholder="Nueva contraseña" // Placeholder para guiar al usuario
              type="password" // Campo de tipo contraseña
              variant="outlined" // Estilo de Material-UI
              fullWidth // Ocupa el ancho completo
              InputLabelProps={{
                shrink: true, // Mantiene el label arriba
              }}
              sx={{
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "#f5faff", // Fondo claro del input
                borderRadius: "10px", // Bordes redondeados
              }}
            />

            {/* Campo Confirmar Contraseña */}
            <TextField
              label="Confirmar contraseña"
              placeholder="Confirmar contraseña" // Placeholder para guiar al usuario
              type="password" // Campo de tipo contraseña
              variant="outlined" // Estilo de Material-UI
              fullWidth // Ocupa el ancho completo
              InputLabelProps={{
                shrink: true, // Mantiene el label arriba
              }}
              sx={{
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "#f5faff", // Fondo claro del input
                borderRadius: "10px", // Bordes redondeados
              }}
            />

            {/* Botón de Cambiar Contraseña */}
            <Button
              variant="contained" // Botón elevado con fondo
              fullWidth // Ocupa el ancho completo
              sx={{
                backgroundColor: "#779341", // Color del botón
                "&:hover": {
                  backgroundColor: "#388e3c", // Color al pasar el cursor
                },
                padding: "10px", // Espaciado interno
                fontWeight: "bold", // Texto en negrita
                fontSize: "16px", // Tamaño del texto
                fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                textTransform: "none", // Mantiene las minúsculas
              }}
            >
              Cambiar contraseña
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecoverPassword2;
