"use client";
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
  const [errors, setErrors] = useState({});
  const [selectedPromotion, setSelectedPromotion] = useState(null); // Promoción seleccionada
  const [products, setProducts] = useState([]); // Productos de la promoción seleccionada

  const validatePromotion = (promotion) => {
    const newErrors = {};

    if (!promotion.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    } else if (promotion.name.length > 50) {
      newErrors.name = "El nombre no puede tener más de 50 caracteres.";
    }

    if (!promotion.discount.trim()) {
      newErrors.discount = "El descuento es obligatorio.";
    } else if (
      isNaN(promotion.discount) ||
      promotion.discount <= 0 ||
      promotion.discount > 100
    ) {
      newErrors.discount = "El descuento debe ser un número entre 1 y 100.";
    }

    if (!promotion.start_date) {
      newErrors.start_date = "La fecha de inicio es obligatoria.";
    }

    if (!promotion.end_date) {
      newErrors.end_date = "La fecha de fin es obligatoria.";
    } else if (new Date(promotion.end_date) < new Date(promotion.start_date)) {
      newErrors.end_date =
        "La fecha de fin debe ser posterior a la fecha de inicio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promotions`
      );
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      toast.error("Error al obtener promociones.");
    }
  };

  const fetchProducts = async (promotionId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${promotionId}`
      );
      console.log("Promotion data:", response.data);
      

      const promotion = response.data;
      const discount = promotion.discount;

      // Asegúrate de que response.data.products sea un array
      const productsData = Array.isArray(promotion.products)
        ? promotion.products.map((product) => ({
            ...product,
            discountedPrice: product.price
              ? (product.price * (100 - discount)) / 100
              : null, // Calcula el precio con descuento
          }))
        : [];

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error al obtener productos.");
      setProducts([]); // Establece un array vacío como fallback
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
    if (!validatePromotion(newPromotion)) {
      toast.error("Por favor, corrige los errores antes de guardar.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promotions`,
        newPromotion
      );
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
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
    if (!validatePromotion(editPromotion)) {
      toast.error("Por favor, corrige los errores antes de guardar.");
      return;
    }
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${editPromotion.promotion_id}`,
        editPromotion
      );
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
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
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${id}`
      );
      toast.success("Promoción eliminada exitosamente.");
      fetchPromotions();
    } catch (error) {
      console.error("Error deleting promotion:", error);
      toast.error("Error al eliminar la promoción.");
    }
  };

  const handleViewProducts = (promotion) => {
    setSelectedPromotion(promotion);
    fetchProducts(promotion.promotion_id);
  };

  const paginatedPromotions = promotions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewPromotion({ name: "", discount: "", start_date: "", end_date: "" });
    setErrors({});
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditPromotion(null);
    setErrors({});
  };

  const handleSendNotification = async (product) => {
    console.log("Enviando notificación para el producto:", product);
    console.log("Promoción seleccionada:", selectedPromotion.promotion_id);
    console.log("Producto seleccionado:", product.product_id);
    
    
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/promotions/send`,
        {
          product_id: product.product_id,
          promotion_id: selectedPromotion.promotion_id,
        }
      );
  
      if (response.status === 200) {
        toast.success("Notificación enviada con éxito.");
      }
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
      toast.error("Error al enviar la notificación.");
    }
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
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "10px", boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Descuento (%)
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Fecha de inicio
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Fecha de fin
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Acciones
              </TableCell>
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
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => handleViewProducts(promo)}
                    >
                      Ver Productos
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

      {selectedPromotion && (
        <Box sx={{ marginTop: "40px" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#718EBF",
              marginBottom: "20px",
            }}
          >
            Productos de la promoción: {selectedPromotion.name}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ borderRadius: "10px", boxShadow: 3 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                    Nombre del Producto
                  </TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                    Precio Original
                  </TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                    Precio con Descuento
                  </TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                    Cantidad
                  </TableCell>
                  <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {product.price ? `$${product.price.toFixed(2)}` : "N/A"}
                    </TableCell>
                    <TableCell>
                      {product.discountedPrice
                        ? `$${product.discountedPrice.toFixed(2)}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleSendNotification(product)}
                        >
                          Enviar Notificación
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Modal para crear una promoción */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
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
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontFamily: "Poppins, sans-serif" }}
          >
            Crear Promoción
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            name="name"
            value={newPromotion.name}
            onChange={handleNewPromotionChange}
            error={errors.name ? true : false}
            helperText={errors.name}
          />
          <TextField
            label="Descuento (%)"
            fullWidth
            margin="normal"
            name="discount"
            value={newPromotion.discount}
            onChange={handleNewPromotionChange}
            error={errors.discount ? true : false}
            helperText={errors.discount}
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
            error={errors.start_date ? true : false}
            helperText={errors.start_date}
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
            error={errors.end_date ? true : false}
            helperText={errors.end_date}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePromotion}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal para actualizar una promoción */}
      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
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
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontFamily: "Poppins, sans-serif" }}
          >
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
                error={errors.name ? true : false}
                helperText={errors.name}
              />
              <TextField
                label="Descuento (%)"
                fullWidth
                margin="normal"
                name="discount"
                value={editPromotion.discount}
                onChange={handleEditPromotionChange}
                error={errors.discount ? true : false}
                helperText={errors.discount}
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
                error={errors.start_date ? true : false}
                helperText={errors.start_date}
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
                error={errors.end_date ? true : false}
                helperText={errors.end_date}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdatePromotion}
                >
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
