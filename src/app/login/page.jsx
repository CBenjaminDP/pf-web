'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Importa Toastify
import "react-toastify/dist/ReactToastify.css"; // Estilos de Toastify

const LoginForm = () => {
  const router = useRouter(); // Instancia de useRouter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    setError(""); // Limpia los errores anteriores

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`, // URL de tu API
        {
          email: email,
          password: password,
        }
      );

      console.log("Inicio de sesión exitoso:", response.data);

      // Guarda la sesión en localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Muestra un mensaje de éxito y redirige
      toast.success("Inicio de sesión exitoso.");
      setTimeout(() => {
        router.push("/"); // Redirige a la página inicial
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Correo o contraseña incorrectos.");
      } else {
        toast.error("Ocurrió un error al iniciar sesión. Intenta de nuevo.");
      }
    }
  };

  return (
    <>
      <ToastContainer /> {/* Contenedor de Toastify */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          fontFamily: "Poppins, sans-serif",
          background: "radial-gradient(circle, #568D2E 10%, #18270D 100%)",
        }}
      >
        <Card
          sx={{
            width: { xs: "100%", sm: "420px" },
            padding: "30px",
            borderRadius: "35px",
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                <Image
                  src="/images/Logo.png"
                  alt="Farmacias Saludables"
                  width={50}
                  height={50}
                  style={{ marginRight: "10px" }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#4caf50",
                    fontFamily: "Poppins, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  Farmacias Saludables
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                  marginRight: "-20px",
                }}
              >
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#8D8D8D",
                    textAlign: "right",
                  }}
                >
                  ¿No tienes cuenta?{" "}
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      color: "#7CC448",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "11px",
                    }}
                  >
                    Regístrate aquí
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
                marginBottom: "20px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "35px",
              }}
            >
              Iniciar sesión
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
              onSubmit={handleSubmit}
            >
              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "#f5faff",
                }}
              />
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "#f5faff",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontSize: "12px",
                    color: "#4285F4",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Olvidé mi contraseña
                </Link>
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#779341",
                  "&:hover": {
                    backgroundColor: "#388e3c",
                  },
                  padding: "10px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  fontFamily: "Poppins, sans-serif",
                  textTransform: "none",
                }}
              >
                Iniciar sesión
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginForm;
