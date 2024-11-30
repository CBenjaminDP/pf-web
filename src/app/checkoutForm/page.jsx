"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation"; // Importar useRouter para redirección
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import AuthGuard from "@/components/AuthGuard";



function CheckoutFormPage() {
  const router = useRouter(); // Inicializar el hook de navegación
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState(null);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);
  const [productos, setProductos] = useState([]);
  const [isCardPayment, setIsCardPayment] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);

  useEffect(() => {
    const mockDirecciones = [
      {
        idUser: 1,
        name: "Joshua Quevedo",
        calle: "Benito Juarez",
        colonia: "Emiliano Zapata",
        cp: "62767",
        estado: "Morelos",
        pais: "México",
        telefono: "7771759880",
        referencia: "62 Emiliano Zapata Ampliación Amatitlán",
      },
    ];
    const mockProductos = [
      {
        idProduct: 1,
        name: "Cerave Crema Hidratante",
        cantidad: 1,
        precio: 348.75,
        img: "https://via.placeholder.com/50",
      },
      {
        idProduct: 2,
        name: "La Roche Posay Anthelios",
        cantidad: 1,
        precio: 348.75,
        img: "https://via.placeholder.com/50",
      },
      {
        idProduct: 3,
        name: "Eucerin Antipigment Dual Serum Facial",
        cantidad: 1,
        precio: 348.75,
        img: "https://via.placeholder.com/50",
      },
    ];
    setDirecciones(mockDirecciones);
    setProductos(mockProductos);
  }, []);

  const calcularTotal = () => {
    return productos
      .reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
      .toFixed(2);
  };

  const handleMetodoPagoSelect = (metodo) => {
    setSelectedMetodoPago(metodo);
    setIsCardPayment(metodo === "tarjeta");
    setIsOnlinePayment(metodo === "paypal" || metodo === "mercado_pago");
  };

  const handleCompletePurchase = () => {
    // Verificar si se completaron todos los pasos necesarios
    if (!selectedEntrega || !selectedDireccion || !selectedMetodoPago) {
      toast.error("Por favor, completa todos los pasos antes de proceder.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
  
    // Mostrar un toast de éxito antes de redirigir
    toast.success("Compra completada exitosamente. Redirigiendo...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => router.push("/completeOrden"), // Redirigir después de cerrar el toast
    });
  };
  
  return (
    <AuthGuard>
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
      {/* Sección izquierda */}
      <Box sx={{ width: { xs: "100%", md: "60%" } }}>
        {/* Paso 1: Formas de entrega */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight="bold">
            <span
              style={{
                backgroundColor: "#568D2E",
                color: "white",
                borderRadius: "50%",
                padding: "10px 15px",
                marginRight: "10px",
              }}
            >
              1
            </span>
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
                  border: selectedEntrega === "domicilio" ? "2px solid #568D2E" : "2px solid #ccc",
                  borderRadius: "8px",
                  "&:hover": { borderColor: "#568D2E" },
                }}
              >
                <img src="/img/car-parts.png" alt="Envío a domicilio" width={60} />
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
                  border: selectedEntrega === "tienda" ? "2px solid #568D2E" : "2px solid #ccc",
                  borderRadius: "8px",
                  "&:hover": { borderColor: "#568D2E" },
                }}
              >
                <img src="/img/store-front.png" alt="Recoger en tienda" width={60} />
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
            <span
              style={{
                backgroundColor: "#568D2E",
                color: "white",
                borderRadius: "50%",
                padding: "10px 15px",
                marginRight: "10px",
              }}
            >
              2
            </span>
            Dirección de envío
          </Typography>
          <Divider sx={{ mt: 2, mb: 3 }} />
          <Grid container spacing={2}>
            {direcciones.map((direccion) => (
              <Grid item xs={12} sm={6} key={direccion.idUser}>
                <Card
                  onClick={() => setSelectedDireccion(direccion.idUser)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    border: selectedDireccion === direccion.idUser ? "2px solid #568D2E" : "2px solid #ccc",
                    borderRadius: "8px",
                    "&:hover": { borderColor: "#568D2E" },
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {direccion.name}
                  </Typography>
                  <Typography>{direccion.calle}</Typography>
                  <Typography>
                    {direccion.colonia}, {direccion.estado}, {direccion.cp}, {direccion.pais}
                  </Typography>
                  <Typography sx={{ color: "#568D2E" }}>{direccion.telefono}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Paso 3: Forma de pago */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight="bold">
            <span
              style={{
                backgroundColor: "#568D2E",
                color: "white",
                borderRadius: "50%",
                padding: "10px 15px",
                marginRight: "10px",
              }}
            >
              3
            </span>
            Forma de pago
          </Typography>
          <Divider sx={{ mt: 2, mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card
                onClick={() => handleMetodoPagoSelect("tarjeta")}
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  border: selectedMetodoPago === "tarjeta" ? "2px solid #568D2E" : "2px solid #ccc",
                  borderRadius: "8px",
                  "&:hover": { borderColor: "#568D2E" },
                }}
              >
                <img src="/img/tarjeta-de-credito.png" alt="Tarjeta" width={60} />
                <Typography variant="body1" fontWeight="bold" mt={1}>
                  Tarjeta de débito o crédito
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                onClick={() => handleMetodoPagoSelect("paypal")}
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  border: selectedMetodoPago === "paypal" ? "2px solid #568D2E" : "2px solid #ccc",
                  borderRadius: "8px",
                  "&:hover": { borderColor: "#568D2E" },
                }}
              >
                <img src="/img/paypal.png" alt="PayPal" width={60} />
                <Typography variant="body1" fontWeight="bold" mt={1}>
                  PayPal
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                onClick={() => handleMetodoPagoSelect("mercado_pago")}
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  border: selectedMetodoPago === "mercado_pago" ? "2px solid #568D2E" : "2px solid #ccc",
                  borderRadius: "8px",
                  "&:hover": { borderColor: "#568D2E" },
                }}
              >
                <img src="/img/MercadoPago_Logotipo.jpg" alt="Mercado Pago" width={60} />
                <Typography variant="body1" fontWeight="bold" mt={1}>
                  Mercado Pago
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Paso 4: Información de pago */}
        {isCardPayment && (
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold">
              <span
                style={{
                  backgroundColor: "#568D2E",
                  color: "white",
                  borderRadius: "50%",
                  padding: "10px 15px",
                  marginRight: "10px",
                }}
              >
                4
              </span>
              Información de pago
            </Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <TextField label="Número de tarjeta" fullWidth required sx={{ mb: 2 }} />
            <TextField label="Fecha de expiración (MM/AA)" fullWidth required sx={{ mb: 2 }} />
            <TextField label="Código de seguridad (CVC)" fullWidth required sx={{ mb: 2 }} />
          </Box>
        )}

        {/* Paso 4: Información de usuario para pagos en línea */}
        {isOnlinePayment && (
          <Box mb={4}>
            <Typography variant="h6" fontWeight="bold">
              <span
                style={{
                  backgroundColor: "#568D2E",
                  color: "white",
                  borderRadius: "50%",
                  padding: "10px 15px",
                  marginRight: "10px",
                }}
              >
                4
              </span>
              Información de usuario
            </Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <TextField label="Usuario" fullWidth required sx={{ mb: 2 }} />
            <TextField label="Contraseña" type="password" fullWidth required sx={{ mb: 2 }} />
          </Box>
        )}
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
                key={producto.idProduct}
                display="flex"
                justifyContent="space-between"
                mb={1}
              >
                <Typography>
                  {producto.name} x {producto.cantidad}
                </Typography>
                <Typography>
                  ${(producto.precio * producto.cantidad).toFixed(2)}
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
