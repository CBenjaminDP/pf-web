'use client'  
import React, { useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuickRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/quick-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: ["cliente"], // Rol predeterminado
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        return;
      }

      toast.success("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      toast.error("Hubo un error en el registro.");
    }
  };

  return (
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
      <ToastContainer />
      <Card
        sx={{
          width: { xs: "100%", sm: "500px" },
          padding: "30px",
          borderRadius: "35px",
          boxShadow: 3,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
                sx={{ fontWeight: "bold", color: "#4caf50" }}
              >
                Farmacias Saludables
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Link href="/login" underline="none" sx={{ fontSize: "11px", color: "#7CC448" }}>
                ¿Ya tienes cuenta? Inicia sesión aquí
              </Link>
            </Box>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
            Regístrate
          </Typography>
          <Box component="form" onSubmit={handleQuickRegister} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField
              label="Nombre"
              name="name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Número de teléfono"
              name="phone"
              variant="outlined"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              label="Correo electrónico"
              name="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#779341",
                color: "#FFF",
                "&:hover": { backgroundColor: "#388e3c" },
                padding: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                marginTop: "10px",
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
