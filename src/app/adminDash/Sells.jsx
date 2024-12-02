"use client";
import React, { useState, useEffect } from "react";
import "@fontsource/poppins"; // Fuente Poppins
import {
  Box,
  Pagination,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const Sells = () => {
  const [ventas, setVentas] = useState([]); // Estado para las ventas
  const [currentPage, setCurrentPage] = useState(1); // Paginación
  const itemsPerPage = 5; // Ventas por página

  // Obtener ventas desde la API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/sales`)
      .then((response) => {
        // Filtrar solo las ventas con status "sold"
        const ventasFiltradas = response.data.filter((venta) => venta.status === "Comprado");
        setVentas(ventasFiltradas);
      })
      .catch((error) => console.error("Error al obtener ventas:", error));
  }, []);

  // Filtrar las ventas para la página actual
  const paginatedVentas = ventas.slice(
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
        Ventas recientes
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>No.</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Número de Venta</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Monto Total</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVentas.map((venta, index) => (
              <TableRow key={venta.id}>
                <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                <TableCell>{venta.sale_number}</TableCell>
                <TableCell>{`$${venta.total_amount}`}</TableCell>
                <TableCell>{venta.status}</TableCell>
                <TableCell>{new Date(venta.created_at).toLocaleDateString()}</TableCell>
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
          count={Math.ceil(ventas.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default Sells;
