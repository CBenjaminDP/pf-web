import React from "react"; 
import "@fontsource/poppins"; 
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material"; 
import Image from "next/image";

const LoginForm = () => {
  return (
    <Box
      sx={{
        // Contenedor principal que ocupa toda la pantalla y tiene un degradado de fondo
        display: "flex", // Flexbox para centrar elementos
        justifyContent: "center", // Centra horizontalmente
        alignItems: "center", // Centra verticalmente
        minHeight: "100vh", // Altura mínima: toda la pantalla
        padding: "20px", // Espaciado interno
        fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
        background: "radial-gradient(circle, #568D2E 10%, #18270D 100%)", // Fondo con degradado radial
      }}
    >
      <Card
        sx={{
          // Tarjeta principal que contiene el formulario
          width: { xs: "100%", sm: "420px" }, // Ancho responsivo (420px en pantallas grandes)
          padding: "30px", // Espaciado interno de la tarjeta
          borderRadius: "35px", // Bordes redondeados
          boxShadow: 3, // Sombra para destacar la tarjeta
          backgroundColor: "rgba(255, 255, 255, 0.75)", // Fondo blanco con transparencia
          fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
        }}
      >
        <CardContent>
          {/* Encabezado con el logo y la sección de registro */}
          <Box
            sx={{
              display: "flex", // Flexbox para alinear el logo y el texto
              justifyContent: "space-between", // Separa los elementos a los extremos
              alignItems: "center", // Alinea verticalmente
              marginBottom: "20px", // Espaciado inferior
            }}
          >
            {/* Contenedor del logo y título */}
            <Box sx={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
            <Image
              src="/images/Logo.png" // Ruta relativa desde la carpeta public
              alt="Farmacias Saludables"
              width={50} // Ancho de la imagen
              height={50} // Altura de la imagen
              style={{ marginRight: "10px" }} // Estilo adicional
            />
              <Typography
                variant="h6" // Tamaño y estilo del texto
                component="div"
                sx={{
                  fontWeight: "bold", // Texto en negrita
                  color: "#4caf50", // Color verde
                  fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                  whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
                }}
              >
                Farmacias Saludables
              </Typography>
            </Box>

            {/* Enlace de registro */}
            <Box
              sx={{
                display: "flex", // Flexbox para alinear el texto
                justifyContent: "flex-end", // Alinea a la derecha
                flexGrow: 1, // Empuja el enlace hacia el borde derecho
                marginRight: "-20px", // Ajusta la posición para acercarlo más a la derecha
              }}
            >
              <Link
                href="#" // Enlace (URL puede ser reemplazada)
                underline="none" // Sin subrayado por defecto
                sx={{
                  fontSize: "11px", // Tamaño del texto
                  color: "#8D8D8D", // Color gris
                  textAlign: "right", // Alineación del texto
                }}
              >
                ¿No tienes cuenta?{" "}
                <Typography
                  component="span" // Texto en línea
                  sx={{
                    fontWeight: "bold", // Texto en negrita
                    color: "#7CC448", // Color verde
                    fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                    fontSize: "11px", // Tamaño del texto
                  }}
                >
                  Regístrate aquí
                </Typography>
              </Link>
            </Box>
          </Box>

          {/* Título principal */}
          <Typography
            variant="h5" // Tamaño del título
            component="h1"
            sx={{
              fontWeight: "bold", // Texto en negrita
              textAlign: "left", // Alineado a la izquierda
              marginBottom: "20px", // Espaciado inferior
              fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
              fontSize: "35px", // Tamaño del texto
            }}
          >
            Iniciar sesión
          </Typography>

          {/* Formulario */}
          <Box
            component="form" // Componente de formulario
            noValidate // Evita validación del navegador
            autoComplete="off" // Desactiva autocompletado del navegador
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }} // Estilo del formulario
          >
            {/* Campo de correo */}
            <TextField
              label="Correo electrónico" // Etiqueta del input
              variant="outlined" // Estilo del campo
              fullWidth // Ocupa el ancho completo
              InputLabelProps={{
                shrink: true, // Mantiene la etiqueta siempre arriba
              }}
              sx={{
                fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                backgroundColor: "#f5faff", // Fondo claro del input
              }}
            />

            {/* Campo de contraseña */}
            <TextField
              label="Contraseña" // Etiqueta del input
              type="password" // Campo de tipo contraseña
              variant="outlined" // Estilo del campo
              fullWidth // Ocupa el ancho completo
              InputLabelProps={{
                shrink: true, // Mantiene la etiqueta siempre arriba
              }}
              sx={{
                fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                backgroundColor: "#f5faff", // Fondo claro del input
              }}
            />

            {/* Enlace de "Olvidé mi contraseña" */}
            <Box
              sx={{
                display: "flex", // Flexbox para alinear el enlace
                justifyContent: "flex-end", // Alinea el enlace a la derecha
              }}
            >
              <Link
                href="#" // Enlace (URL puede ser reemplazada)
                underline="hover" // Subrayado al pasar el cursor
                sx={{
                  fontSize: "12px", // Tamaño del texto
                  color: "#4285F4", // Color azul
                  fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                }}
              >
                Olvidé mi contraseña
              </Link>
            </Box>

            {/* Botón de iniciar sesión */}
            <Button
              variant="contained" // Estilo del botón (elevado y con fondo)
              fullWidth // Ocupa el ancho completo
              sx={{
                backgroundColor: "#779341", // Color del fondo
                "&:hover": {
                  backgroundColor: "#388e3c", // Color al pasar el cursor
                },
                padding: "10px", // Espaciado interno
                fontWeight: "bold", // Texto en negrita
                fontSize: "16px", // Tamaño del texto
                fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                textTransform: "none", // Evita transformar el texto (mantiene las minúsculas)
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;