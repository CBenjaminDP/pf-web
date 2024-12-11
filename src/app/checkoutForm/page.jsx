"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Card, Typography, Grid, Divider, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import AuthGuard from "@/components/AuthGuard";
import axios from "axios";

function CheckoutFormPage() {
  const router = useRouter();
  const [selectedEntrega, setSelectedEntrega] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState(null);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);
  const [productos, setProductos] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({ email: "", password: "", cardInfo: {} });
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setProductos(savedCart);
  }, []);

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const user = response.data[0];
        if (user?.address) {
          setDirecciones([{ ...user.address, name: user.name }]);
        } else {
          setDirecciones([]);
        }
      } catch (error) {
        console.error("Error al cargar direcciones:", error);
        toast.error("Error al cargar las direcciones. Intenta nuevamente.");
      }
    };

    fetchDirecciones();
  }, []);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("user"));
    console.log("Usuario:", session);
    if (session) {
      setUserSession(session);
    }
  }, []);

  const calcularTotal = () => {
    return productos
      .reduce(
        (total, producto) => total + producto.price * producto.quantity,
        0
      )
      .toFixed(2);
  };

  const formasPago = () => {
    if (selectedEntrega === "domicilio") {
      return [
        { id: "tarjeta", label: "Tarjeta de débito o crédito", img: "/img/tarjeta-de-credito.png" },
        { id: "mercado", label: "Mercado Pago", img: "/img/MercadoPago_Logotipo.jpg" },
        { id: "paypal", label: "PayPal", img: "/img/paypal.png" },
      ];
    }
    if (selectedEntrega === "tienda") {
      return [
        { id: "tarjeta", label: "Tarjeta de débito o crédito", img: "/img/tarjeta-de-credito.png" },
        { id: "mercado", label: "Mercado Pago", img: "/img/MercadoPago_Logotipo.jpg" },
        { id: "paypal", label: "PayPal", img: "/img/paypal.png" },
        { id: "tienda", label: "Pagar en tienda", img: "/img/store-front.png" },
      ];
    }
    return [];
  };

  const handleInputChange = (field, value) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompletePurchase = () => {
    console.log("Selected Entrega:", selectedEntrega);
    console.log("Selected Direccion:", selectedDireccion);
    console.log("Selected Metodo Pago:", selectedMetodoPago);
    console.log("Payment Info:", paymentInfo);
    
    console.log("User Session:", userSession);
    
    if (!selectedEntrega || !selectedMetodoPago || (selectedEntrega === "domicilio" && !selectedDireccion)) {
      toast.error("Por favor, completa todos los pasos antes de proceder.");
      return;
    }
  
    // Transformar los productos para incluir product_id, quantity y price
    const productsToSend = productos.map(({ product_id, quantity, price }) => ({
      product_id,
      quantity,
      price,
    }));
    console.log("Productos:", productsToSend);
    console.log("user id:", userSession?.id);
    
    // Mandar a llamar el método para hacer la compra
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/salesProduct`, {
        products: productsToSend,
        paymentMethod: selectedMetodoPago,
        deliveryMethod: selectedEntrega,
        deliveryAddress: selectedDireccion,
        user_id: userSession?.id,
      })
      .then((response) => {
        console.log(response);
        toast.success("Compra completada exitosamente. Redirigiendo...", {
          onClose: () => router.push("/completeOrden"),
        });
      })
      .catch((error) => {
        console.error("Error al completar la compra:", error);
        toast.error("Error al completar la compra. Intenta nuevamente.");
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
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "#568D2E",
                  color: "white",
                  fontWeight: "bold",
                  mr: 1,
                }}
              >
                1
              </Box>
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
          {selectedEntrega === "domicilio" && (
            <Box mb={4}>
              <Typography variant="h6" fontWeight="bold">
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: "#568D2E",
                    color: "white",
                    fontWeight: "bold",
                    mr: 1,
                  }}
                >
                  2
                </Box>
                Dirección de envío
              </Typography>
              <Divider sx={{ mt: 2, mb: 3 }} />
              <Grid container spacing={2}>
                {direcciones.length > 0 ? (
                  direcciones.map((direccion, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card
                        onClick={() => setSelectedDireccion(direccion)}
                        sx={{
                          p: 2,
                          cursor: "pointer",
                          border:
                            selectedDireccion === direccion
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
          )}

          {/* Paso 3: Formas de pago */}
          {selectedEntrega && (
            <Box mb={4}>
              <Typography variant="h6" fontWeight="bold">
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: "#568D2E",
                    color: "white",
                    fontWeight: "bold",
                    mr: 1,
                  }}
                >
                  3
                </Box>
                Forma de pago
              </Typography>
              <Divider sx={{ mt: 2, mb: 3 }} />
              <Grid container spacing={2}>
                {formasPago().map((metodo) => (
                  <Grid item xs={12} sm={6} key={metodo.id}>
                    <Card
                      onClick={() => setSelectedMetodoPago(metodo.id)}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        border:
                          selectedMetodoPago === metodo.id
                            ? "2px solid #568D2E"
                            : "2px solid #ccc",
                        borderRadius: "8px",
                        "&:hover": { borderColor: "#568D2E" },
                      }}
                    >
                      <img src={metodo.img} alt={metodo.label} width={60} />
                      <Typography variant="body1" fontWeight="bold">
                        {metodo.label}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Paso 4: Información de pago */}
          {selectedMetodoPago && (
            <Box>
              <Typography variant="h6" fontWeight="bold">
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: "#568D2E",
                    color: "white",
                    fontWeight: "bold",
                    mr: 1,
                  }}
                >
                  4
                </Box>
                Información de pago
              </Typography>
              <Divider sx={{ mt: 2, mb: 3 }} />
              {selectedMetodoPago === "tarjeta" && (
                <Box>
                  <TextField
                    label="Número de tarjeta"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleInputChange("cardInfo", { ...paymentInfo.cardInfo, number: e.target.value })}
                  />
                  <TextField
                    label="Fecha de expiración (MM/AA)"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleInputChange("cardInfo", { ...paymentInfo.cardInfo, expiry: e.target.value })}
                  />
                  <TextField
                    label="Código de seguridad (CVV)"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleInputChange("cardInfo", { ...paymentInfo.cardInfo, cvv: e.target.value })}
                  />
                </Box>
              )}
              {(selectedMetodoPago === "mercado" || selectedMetodoPago === "paypal") && (
                <Box>
                  <TextField
                    label="Correo electrónico"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </Box>
              )}
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