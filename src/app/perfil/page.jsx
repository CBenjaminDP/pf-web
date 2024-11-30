"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { GlobalStyles } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify"; // Importa Toastify
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos
import AuthGuard from "@/components/AuthGuard";

function PerfilPage() {
  const [direcciones, setDirecciones] = useState([]);
  const [pedido, setPedido] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDirecciones = async () => {
      const mockDirecciones = [
        {
          idUser: 1,
          name: "Josua Quevedo",
          calle: "Benito Juarez",
          colonia: "Emiliano Zapata",
          cp: "62767",
          estado: "Morelos",
          pais: "México",
          telefono: "7777777777",
          referencia: "62 Emiliano Zapata Ampliación Amatitlán ",
        },
        {
          idUser: 2,
          name: "Aldair Vargas",
          calle: "Benito Juarez",
          colonia: "Emiliano Zapata",
          cp: "62767",
          estado: "Morelos",
          pais: "México",
          telefono: "7777777777",
          referencia: "62 Emilano Zapata Ampliación Amatitlán ",
        },
      ];
      setDirecciones(mockDirecciones);
    };

    const fetchPedido = async () => {
      const Pedido = [
        {
          id: 1,
          orden: "Orden No. 1312141",
          fecha: "23/10/2024",
          estado: "En camino",
          total: "$500.00",
          img: "https://www.fahorro.com/media/catalog/product/3/3/3337875847292_1.jpg",
        },
      ];
      setPedido(Pedido);
    };

    fetchPedido();
    fetchDirecciones();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Elimina la sesión del localStorag
    toast.success("Sesión cerrada exitosamente."); // Muestra la alerta de éxito
    setTimeout(() => {
      window.location.href = "/"; // Redirige al home y fuerza una recarga completa
    }, 1500); // Espera 1.5 segundos antes de redirigir
  };

  return (
    <>
      <AuthGuard>
        <ToastContainer /> {/* Contenedor de Toastify */}
        <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
        <Box sx={{ padding: 2, display: "flex", width: "100%" }}>
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <Grid
              container
              spacing={4}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid item xs={12} md={10}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                  Mi cuenta
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Datos personales
                </Typography>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <TextField
                      sx={{ width: "250px" }}
                      label="Nombre"
                      defaultValue="Joshua"
                      variant="outlined"
                      margin="normal"
                    />
                    <TextField
                      sx={{ width: "250px" }}
                      label="Apellidos"
                      defaultValue="Quevedo Sánchez"
                      variant="outlined"
                      margin="normal"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <TextField
                      sx={{ width: "250px" }}
                      label="Correo"
                      defaultValue="joshq22@gmail.com"
                      variant="outlined"
                      margin="normal"
                    />
                    <TextField
                      sx={{ width: "250px" }}
                      label="Número telefónico"
                      defaultValue="777-175-9880"
                      variant="outlined"
                      margin="normal"
                    />
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#568D2E",
                      color: "white",
                      width: "350px",
                    }}
                  >
                    Editar
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={10}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Direcciones de envío
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  {direcciones.map((direccion) => (
                    <Card
                      key={direccion.idUser}
                      sx={{
                        border: "1px solid #000",
                        borderRadius: 2,
                        marginBottom: 2,
                        padding: 2,
                        width: "250px !important",
                        height: "200px",
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1" fontWeight="bold">
                          {direccion.name}
                        </Typography>
                        <Typography>{direccion.calle}</Typography>
                        <Typography>
                          {direccion.colonia}, {direccion.estado} {direccion.cp}{" "}
                          {direccion.pais}
                        </Typography>
                        <Typography sx={{ color: "#568D2E" }}>
                          {direccion.telefono}
                        </Typography>
                        <Typography>{direccion.referencia}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#568D2E",
                      color: "white",
                      fontWeight: "bold",
                      width: "350px",
                    }}
                  >
                    + Nueva dirección
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "40%", sm: "40%" } }}>
            <Grid>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Mis pedidos
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Card sx={{ width: "100%", backgroundColor: "#F4F4F4" }}>
                {pedido.map((pedido) => (
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                    key={pedido.id}
                  >
                    <Box sx={{ width: "120px" }}>
                      <img src={pedido.img} alt="" width={100} />
                    </Box>
                    <Box sx={{ width: "300px" }}>
                      <Typography variant="body1" fontWeight="bold">
                        {pedido.orden}
                      </Typography>
                      <Typography>Pedido el: {pedido.fecha}</Typography>
                      <Typography>
                        Estado: <b color="#568D2E">{pedido.estado}</b>
                      </Typography>
                      <Typography>Total: {pedido.total}</Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#568D2E",
                        color: "black",
                        fontWeight: "bold",
                        width: "100px",
                        borderRadius: "50%",
                        transform: "scale(0.5)",
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ transform: "scale(1.5)" }} />
                    </Button>
                  </CardContent>
                ))}
              </Card>
            </Grid>
          </Box>
        </Box>
        {/* Botón de cerrar sesión */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d32f2f",
              color: "white",
              fontWeight: "bold",
              width: "200px",
            }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Box>
      </AuthGuard>
    </>
  );
}

export default PerfilPage;
