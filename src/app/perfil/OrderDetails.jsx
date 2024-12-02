import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation"; // Importar useRouter

function OrderDetails({ order }) {
  const router = useRouter(); // Inicializar useRouter

  if (!order) {
    return <Typography>Cargando...</Typography>;
  }

  // Determinar los estilos de los pasos según el estado de la orden
  const isDelivered = order.estado === "comprado";
  const inTransit = order.estado === "pedido";

  return (
    <AuthGuard>
      <Box sx={{ padding: 4 }}>
        {/* Botón para regresar */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => window.location.href = "/perfil"} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Regresar
          </Typography>
        </Box>

        {/* Título */}
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Detalles de la orden No. {order.orden}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 2, borderBottom: "2px solid #000", pb: 1 }}
        >
          Pedido el {order.fecha}
        </Typography>

        {/* Contenedor de dirección, resumen y método de pago */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Dirección de envío
                </Typography>
                <Typography>{order.direccion.name}</Typography>
                <Typography>{order.direccion.street}</Typography>
                <Typography>
                  {order.direccion.city}, {order.direccion.state},{" "}
                  {order.direccion.zip_code}
                </Typography>
                <Typography>{order.direccion.country}</Typography>
                <Typography sx={{ color: "green", mt: 1 }}>
                  {order.direccion.phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Resumen del pedido
                </Typography>
                <Typography>Productos: {order.total}</Typography>
                <Typography>Envío: $0.00</Typography>
                <Typography>Subtotal: {order.total}</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                  Total: {order.total}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Método de pago: {order.metodoPago}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Entrega estimada */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mt: 4,
            mb: 2,
            borderBottom: "2px solid #000",
            pb: 1,
          }}
        >
          Entrega estimada: 24-25 de Octubre
        </Typography>

        {/* Lista de productos */}
        <Grid container spacing={2}>
          {order.productos.map((product, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/img/paquete.png"
                      alt={product.name}
                      style={{
                        marginBottom: "10px",
                        width: "50px",
                        height: "50px",
                      }} // Ajusta el tamaño aquí
                    />
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      {product.name}
                    </Typography>
                    <Typography>Cantidad: {product.quantity || 1}</Typography>
                    <Typography>Precio: ${product.price}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Seguimiento de la orden */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mt: 4,
            mb: 2,
            borderBottom: "2px solid #000",
            pb: 1,
          }}
        >
          Seguimiento de la orden No. {order.orden}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          {/* Estado: Pedido */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography>Pedido</Typography>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: "#568D2E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              ✓
            </Box>
          </Box>
          <Box
            sx={{
              height: "100px",
              width: "3px",
              backgroundColor: inTransit || isDelivered ? "#568D2E" : "#CCC",
            }}
          ></Box>

          {/* Estado: En camino */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography>En camino</Typography>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: inTransit || isDelivered ? "#568D2E" : "#CCC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              ✓
            </Box>
          </Box>
          <Box
            sx={{
              height: "100px",
              width: "3px",
              backgroundColor: isDelivered ? "#568D2E" : "#CCC",
            }}
          ></Box>

          {/* Estado: Entregado */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography>Entregado</Typography>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: isDelivered ? "#568D2E" : "#CCC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isDelivered ? "white" : "black",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              {isDelivered ? "✓" : "⬤"}
            </Box>
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
}

export default OrderDetails;
