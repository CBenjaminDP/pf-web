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
  Grid,
} from "@mui/material"; 
import Image from "next/image";

const RegisterForm = () => {
  return (
    <Box
      // Contenedor principal que ocupa toda la pantalla y tiene un fondo con degradado radial
      sx={{
        display: "flex", // Flexbox para alinear elementos
        justifyContent: "center", // Centra horizontalmente
        alignItems: "center", // Centra verticalmente
        minHeight: "100vh", // Altura mínima: toda la pantalla
        padding: "20px", // Espaciado interno
        fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
        background: "radial-gradient(circle, #568D2E 10%, #18270D 100%)", // Fondo con degradado radial
      }}
    >
      <Card
        // Tarjeta que contiene el formulario
        sx={{
          width: { xs: "100%", sm: "500px" }, // Ancho responsivo (500px en pantallas grandes)
          padding: "30px", // Espaciado interno
          borderRadius: "35px", // Bordes redondeados
          boxShadow: 3, // Sombra para destacar la tarjeta
          backgroundColor: "rgba(255, 255, 255, 0.75)", // Fondo blanco con 75% de transparencia
          fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
        }}
      >
        <CardContent>
          {/* Encabezado con logo y texto de registro */}
          <Box
            sx={{
              display: "flex", // Flexbox para organizar el contenido
              justifyContent: "space-between", // Separa los elementos hacia los extremos
              alignItems: "center", // Alinea verticalmente
              marginBottom: "20px", // Espaciado inferior
            }}
          >
            {/* Logo y texto de "Farmacias Saludables" */}
            <Box
              sx={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
            >
              <Image
              src="/images/Logo.png" // Ruta relativa desde la carpeta public
              alt="Farmacias Saludables"
              width={50} // Ancho de la imagen
              height={50} // Altura de la imagen
              style={{ marginRight: "10px" }} // Estilo adicional
            />
              <Typography
                variant="h6" // Estilo de texto h6
                component="div"
                sx={{
                  fontWeight: "bold", // Negrita
                  color: "#4caf50", // Color verde
                  fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                  whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
                }}
              >
                Farmacias Saludables
              </Typography>
            </Box>
            {/* Texto de "¿Ya tienes cuenta?" dividido en dos líneas */}
            <Box
              sx={{
                display: "flex", // Flexbox para organizar
                justifyContent: "flex-end", // Alineado a la derecha
                flexDirection: "column", // Coloca el texto en dos líneas
                alignItems: "flex-end", // Alinea el texto hacia la derecha
                flexGrow: 1, // Ocupa el espacio disponible
                marginRight: "-20px", // Ajuste para empujar el texto más a la derecha
              }}
            >
              <Link
                href="#" // Enlace (URL puede cambiarse)
                underline="none" // Sin subrayado
                sx={{
                  fontSize: "11px", // Tamaño de fuente pequeño
                  color: "#8D8D8D", // Color gris
                  textAlign: "right", // Alineado a la derecha
                  marginBottom: "4px", // Espaciado entre líneas
                }}
              >
                ¿Ya tienes cuenta?
              </Link>
              <Link
                href="#" // Enlace (URL puede cambiarse)
                underline="none" // Sin subrayado
                sx={{
                  fontSize: "11px", // Tamaño de fuente pequeño
                  fontWeight: "bold", // Texto en negrita
                  color: "#7CC448", // Color verde
                  textAlign: "right", // Alineado a la derecha
                }}
              >
                Inicia sesión aquí
              </Link>
            </Box>
          </Box>

          {/* Título principal */}
          <Typography
            variant="h5" // Estilo de título h5
            component="h1"
            sx={{
              fontWeight: "bold", // Texto en negrita
              textAlign: "left", // Alineado a la izquierda
              marginBottom: "20px", // Espaciado inferior
              fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
              fontSize: "35px", // Tamaño del texto
            }}
          >
            Regístrate
          </Typography>

          {/* Formulario */}
          <Box
            component="form" // Componente de formulario
            noValidate // Desactiva la validación automática del navegador
            autoComplete="off" // Desactiva el autocompletado
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }} // Estilo del formulario
          >
            <Grid container spacing={2}>
              {/* Campo Nombre */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre" // Etiqueta del campo
                  variant="outlined" // Estilo de Material-UI
                  fullWidth // Ocupa el ancho completo
                  InputLabelProps={{
                    shrink: true, // Mantiene la etiqueta arriba
                  }}
                  sx={{
                    fontFamily: "Poppins, sans-serif", // Aplica la fuente Poppins
                    backgroundColor: "#f5faff", // Fondo claro del campo
                    borderRadius: "10px", // Bordes redondeados
                  }}
                />
              </Grid>
              {/* Campo Apellidos */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "#f5faff",
                    borderRadius: "10px", // Bordes redondeados
                  }}
                />
              </Grid>
            </Grid>

            {/* Campo Número de Teléfono */}
            <TextField
              label="Número de teléfono"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "#f5faff",
                borderRadius: "10px", // Bordes redondeados
              }}
            />

            {/* Campo Correo Electrónico */}
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "#f5faff",
                borderRadius: "10px", // Bordes redondeados
              }}
            />

            <Grid container spacing={2}>
              {/* Campo Contraseña */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  type="password" // Campo de tipo contraseña
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "#f5faff",
                    borderRadius: "10px", // Bordes redondeados
                  }}
                />
              </Grid>
              {/* Campo Confirmar Contraseña */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirmar contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "#f5faff",
                    borderRadius: "10px", // Bordes redondeados
                  }}
                />
              </Grid>
            </Grid>

            {/* Botón de Registrarse */}
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
              Registrarse
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterForm; 
