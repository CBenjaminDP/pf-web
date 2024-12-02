"use client";
import React, { useState, useEffect } from "react";
import "@fontsource/poppins"; // Fuente Poppins
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]); // Estado para las órdenes
  const [currentPage, setCurrentPage] = useState(1); // Paginación
  const itemsPerPage = 5; // Órdenes por página

  // Obtener órdenes desde la API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/sales`)
      .then((response) => {
        // Filtrar solo las órdenes con status "order"
        const ordersFiltradas = response.data.filter((order) => order.status === "Pedido");
        setOrders(ordersFiltradas);
      })
      .catch((error) => console.error("Error al obtener órdenes:", error));
  }, []);

  // Filtrar las órdenes para la página actual
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Manejar cambio de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Poppins, sans-serif",
          color: "#718EBF",
          marginBottom: "10px",
        }}
      >
        Órdenes colocadas
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>No.</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Número de Orden</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Monto Total</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                <TableCell>{order.sale_number}</TableCell>
                <TableCell>{`$${order.total_amount}`}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          count={Math.ceil(orders.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default Orders;
