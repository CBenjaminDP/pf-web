"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Card, Typography, Grid, Divider } from "@mui/material";
import { useRouter } from "next/navigation"; // Importar useRouter para redirección
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import AuthGuard from "@/components/AuthGuard";
import axios from "axios"; // Importamos axios

function CheckoutFormPage() {
  const router = useRouter();
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState(null);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);
  const [productos, setProductos] = useState([]);
  const [isCardPayment, setIsCardPayment] = useState(false);

  // Cargar productos desde el carrito
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProductos(savedCart);
  }, []);

  // Cargar direcciones desde el endpoint /api/users
  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          } // Incluye el token si es necesario
        );

        const user = response.data[0]; // Asegúrate de obtener el primer usuario
        if (user?.address) {
          setDirecciones([{ ...user.address, name: user.name }]); // Agrega el nombre del usuario a la dirección
        } else {
          setDirecciones([]); // No hay direcciones disponibles
        }
      } catch (error) {
        console.error("Error al cargar direcciones:", error);
        toast.error("Error al cargar las direcciones. Intenta nuevamente.");
      }
    };

    fetchDirecciones();
  }, []);

  const calcularTotal = () => {
    return productos
      .reduce(
        (total, producto) => total + producto.price * producto.quantity,
        0
      )
      .toFixed(2);
  };

  const handleCompletePurchase = () => {
    if (!selectedEntrega || !selectedDireccion || !selectedMetodoPago) {
      toast.error("Por favor, completa todos los pasos antes de proceder.");
      return;
    }

    toast.success("Compra completada exitosamente. Redirigiendo...", {
      onClose: () => router.push("/completeOrden"),
    });
  };

  return (
    <AuthGuard>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Sección izquierda */}
        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
          {/* Paso 1: Formas de entrega */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold">
              Formas de entrega
            </Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card
                  onClick={() => setSelectedEntrega("domicilio")}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    border:
                      selectedEntrega === "domicilio"
                        ? "2px solid #568D2E"
                        : "2px solid #ccc",
                    borderRadius: "8px",
                    "&:hover": { borderColor: "#568D2E" },
                  }}
                >
                  <img
                    src="/img/car-parts.png"
                    alt="Envío a domicilio"
                    width={60}
                  />
                  <Typography variant="body1" fontWeight="bold" mt={1}>
                    Envío a domicilio
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  onClick={() => setSelectedEntrega("tienda")}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    border:
                      selectedEntrega === "tienda"
                        ? "2px solid #568D2E"
                        : "2px solid #ccc",
                    borderRadius: "8px",
                    "&:hover": { borderColor: "#568D2E" },
                  }}
                >
                  <img
                    src="/img/store-front.png"
                    alt="Recoger en tienda"
                    width={60}
                  />
                  <Typography variant="body1" fontWeight="bold" mt={1}>
                    Recoger en tienda
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Paso 2: Dirección de envío */}
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold">
              Dirección de envío
            </Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Grid container spacing={2}>
              {direcciones.length > 0 ? (
                direcciones.map((direccion, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      onClick={() => setSelectedDireccion(index)}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        border:
                          selectedDireccion === index
                            ? "2px solid #568D2E"
                            : "2px solid #ccc",
                        borderRadius: "8px",
                        "&:hover": { borderColor: "#568D2E" },
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        {direccion.name}
                      </Typography>
                      <Typography>
                        {direccion.street}, {direccion.city}
                      </Typography>
                      <Typography>
                        {direccion.state}, {direccion.country},{" "}
                        {direccion.zip_code}
                      </Typography>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography>
                  No tienes direcciones guardadas. Por favor agrega una.
                </Typography>
              )}
            </Grid>
          </Box>
        </Box>

        {/* Resumen */}
        <Box sx={{ width: { xs: "100%", md: "40%" } }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Resumen de compra
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box>
              {productos.map((producto) => (
                <Box
                  key={producto.product_id}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography>
                    {producto.name} x {producto.quantity}
                  </Typography>
                  <Typography>
                    ${(producto.price * producto.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight="bold">
              Total: ${calcularTotal()}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#568D2E",
                "&:hover": { backgroundColor: "#345E1F" },
              }}
              onClick={handleCompletePurchase}
            >
              Completar compra
            </Button>
          </Card>
        </Box>
        <ToastContainer />
      </Box>
    </AuthGuard>
  );
}

export default CheckoutFormPage;
