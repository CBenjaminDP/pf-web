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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from "@/components/AuthGuard";
import OrderDetails from "./OrderDetails"; // Importamos el componente OrderDetails

function PerfilPage() {
  const [user, setUser] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPedido, setSelectedPedido] = useState(null); // Nuevo estado para manejar el pedido seleccionado

  useEffect(() => {
    // Obtener usuario del localStorage
    const session = JSON.parse(localStorage.getItem("user"));
    setUser(session);
    console.log("Usuario:", session);
  }, []);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user) return; // Esperar a que el usuario esté cargado
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/salesProduct/${user.id}`
        );
        if (!response.ok) throw new Error("Error al obtener los pedidos");

        const data = await response.json();
        console.log("Pedidos obtenidos:", data);

        // Adaptar la estructura de los pedidos
        const pedidosAdaptados = data.sales.map((sale) => ({
          id: sale.sale_id,
          orden: `Orden No. ${sale.sale_number}`,
          fecha: new Date(sale.created_at).toLocaleDateString("es-ES"),
          estado: sale.status,
          total: `$${sale.total_amount}`,
          productos: sale.products,
          direccion: sale.deliveryAddress,
          metodoPago: sale.paymentMethod,
        }));

        setPedidos(pedidosAdaptados);
      } catch (error) {
        setError("Error al cargar los pedidos.");
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchPedidos();
  }, [user]);

  const handleOrderDetails = (pedido) => {
    setSelectedPedido(pedido); // Actualizamos el estado con el pedido seleccionado
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Sesión cerrada exitosamente.");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <AuthGuard>
      <ToastContainer />
      {!selectedPedido ? (
        <Box sx={{ padding: 2, display: "flex", width: "100%" }}>
          {/* Sección izquierda: Datos personales */}
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <Grid container spacing={4} sx={{ flexDirection: "column" }}>
              <Grid item xs={12} md={10}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                  Mi cuenta
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Datos personales
                </Typography>
                <Box component="form" sx={{ flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "100%",
                    }}
                  >
                    <TextField
                      sx={{ width: "520px" }}
                      label="Nombre completo"
                      value={user?.name || ""} // Cambiado de defaultValue a value
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{ shrink: true }} // Asegura que el label se mantenga arriba
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
                      value={user?.email || ""} // Cambiado de defaultValue a value
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{ shrink: true }} // Asegura que el label se mantenga arriba
                    />
                    <TextField
                      sx={{ width: "250px" }}
                      label="Número telefónico"
                      value={user?.phone || ""} // Cambiado de defaultValue a value
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{ shrink: true }} // Asegura que el label se mantenga arriba
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={10}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Dirección de envío
                </Typography>
                <Divider sx={{ my: 2 }} />
                {user?.address && (
                  <Card
                    sx={{
                      border: "1px solid #000",
                      borderRadius: 2,
                      marginBottom: 2,
                      padding: 2,
                      width: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1" fontWeight="bold">
                        Dirección:
                      </Typography>
                      <Typography>{user.address.street}</Typography>
                      <Typography>
                        {user.address.city}, {user.address.state},{" "}
                        {user.address.zip_code}
                      </Typography>
                      <Typography>{user.address.country}</Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </Box>

          {/* Sección derecha: Pedidos */}
          <Box sx={{ width: { xs: "100%", md: "40%" } }}>
            <Grid>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Mis pedidos
              </Typography>
              <Divider sx={{ my: 2 }} />
              {error && <Typography color="error">{error}</Typography>}
              {pedidos.map((pedido) => (
                <Card key={pedido.id} sx={{ marginBottom: 2, p: 2 }}>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Box sx={{ width: "120px" }}>
                      <img
                        src="/img/logistica.png" // Ruta de la imagen estática
                        alt="Imagen del producto"
                        width={100}
                      />
                    </Box>
                    <Box sx={{ width: "300px" }}>
                      <Typography variant="body1" fontWeight="bold">
                        {pedido.orden}
                      </Typography>
                      <Typography>Fecha: {pedido.fecha}</Typography>
                      <Typography>
                        Estado:{" "}
                        <span style={{ color: "#568D2E" }}>
                          {pedido.estado}
                        </span>
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
                      onClick={() => handleOrderDetails(pedido)} // Mostramos el detalle
                    >
                      <ArrowForwardIosIcon sx={{ transform: "scale(1.5)" }} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Box>
        </Box>
      ) : (
        <OrderDetails order={selectedPedido} /> // Renderizamos el componente de detalles
      )}

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
  );
}

export default PerfilPage;
