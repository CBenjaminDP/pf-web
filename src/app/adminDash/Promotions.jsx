'use client';
import React, { useState, useEffect } from "react";
import "@fontsource/poppins";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]); // Lista de promociones
  const [modalOpen, setModalOpen] = useState(false); // Modal para creación
  const [editModalOpen, setEditModalOpen] = useState(false); // Modal para edición
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    discount: "",
    start_date: "",
    end_date: "",
  }); // Estado para nueva promoción
  const [editPromotion, setEditPromotion] = useState(null); // Estado para promoción en edición
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de promociones por página

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions`);
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      toast.error("Error al obtener promociones.");
    }
  };

  const handleNewPromotionChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion({ ...newPromotion, [name]: value });
  };

  const handleEditPromotionChange = (e) => {
    const { name, value } = e.target;
    setEditPromotion({ ...editPromotion, [name]: value });
  };

  const handleCreatePromotion = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promotions`,
        newPromotion
      );
      toast.success("Promoción creada exitosamente.");
      fetchPromotions();
      setModalOpen(false);
      setNewPromotion({ name: "", discount: "", start_date: "", end_date: "" });
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast.error("Error al crear la promoción.");
    }
  };

  const handleEditPromotion = (promotion) => {
    setEditPromotion(promotion);
    setEditModalOpen(true);
  };

  const handleUpdatePromotion = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${editPromotion.promotion_id}`,
        editPromotion
      );
      toast.success("Promoción actualizada exitosamente.");
      fetchPromotions();
      setEditModalOpen(false);
      setEditPromotion(null);
    } catch (error) {
      console.error("Error updating promotion:", error);
      toast.error("Error al actualizar la promoción.");
    }
  };

  const handleDeletePromotion = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${id}`);
      toast.success("Promoción eliminada exitosamente.");
      fetchPromotions();
    } catch (error) {
      console.error("Error deleting promotion:", error);
      toast.error("Error al eliminar la promoción.");
    }
  };

  const paginatedPromotions = promotions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: "#718EBF",
          }}
        >
          Promociones activas
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7CC448",
            color: "white",
            textTransform: "none",
            borderRadius: "50px",
            fontFamily: "Poppins, sans-serif",
            "&:hover": {
              backgroundColor: "#6BA63D",
            },
          }}
          onClick={() => setModalOpen(true)}
        >
          + Crear Promoción
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Descuento (%)</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Fecha de inicio</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Fecha de fin</TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPromotions.map((promo) => (
              <TableRow key={promo.promotion_id}>
                <TableCell>{promo.name}</TableCell>
                <TableCell>{promo.discount}</TableCell>
                <TableCell>{promo.start_date.split("T")[0]}</TableCell>
                <TableCell>{promo.end_date.split("T")[0]}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEditPromotion(promo)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeletePromotion(promo.promotion_id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
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
          count={Math.ceil(promotions.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>

      {/* Modal para crear una promoción */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: 3,
            width: "400px",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px", fontFamily: "Poppins, sans-serif" }}>
            Crear Promoción
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            name="name"
            value={newPromotion.name}
            onChange={handleNewPromotionChange}
          />
          <TextField
            label="Descuento (%)"
            fullWidth
            margin="normal"
            name="discount"
            value={newPromotion.discount}
            onChange={handleNewPromotionChange}
          />
          <TextField
            label="Fecha de inicio"
            fullWidth
            margin="normal"
            type="date"
            name="start_date"
            value={newPromotion.start_date}
            onChange={handleNewPromotionChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fecha de fin"
            fullWidth
            margin="normal"
            type="date"
            name="end_date"
            value={newPromotion.end_date}
            onChange={handleNewPromotionChange}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleCreatePromotion}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal para actualizar una promoción */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: 3,
            width: "400px",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px", fontFamily: "Poppins, sans-serif" }}>
            Actualizar Promoción
          </Typography>
          {editPromotion && (
            <>
              <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                name="name"
                value={editPromotion.name}
                onChange={handleEditPromotionChange}
              />
              <TextField
                label="Descuento (%)"
                fullWidth
                margin="normal"
                name="discount"
                value={editPromotion.discount}
                onChange={handleEditPromotionChange}
              />
              <TextField
                label="Fecha de inicio"
                fullWidth
                margin="normal"
                type="date"
                name="start_date"
                value={editPromotion.start_date.split("T")[0]}
                onChange={handleEditPromotionChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Fecha de fin"
                fullWidth
                margin="normal"
                type="date"
                name="end_date"
                value={editPromotion.end_date.split("T")[0]}
                onChange={handleEditPromotionChange}
                InputLabelProps={{ shrink: true }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Button variant="contained" color="primary" onClick={handleUpdatePromotion}>
                  Actualizar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Promotions;
