"use client";
import React, { useState, useEffect } from "react";
import "@fontsource/poppins"; // Fuente Poppins
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
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false); // Controla el modal de creación
  const [editModalOpen, setEditModalOpen] = useState(false); // Controla el modal de edición
  const [categories, setCategories] = useState([]); // Lista de categorías existentes
  const [newCategory, setNewCategory] = useState({ name: "" }); // Estado para la nueva categoría
  const [editCategory, setEditCategory] = useState(null); // Estado para la categoría en edición

  // Obtener las categorías desde la API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  // Maneja el cambio de los inputs en el formulario de creación
  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  // Maneja el cambio de los inputs en el formulario de edición
  const handleEditCategoryChange = (e) => {
    const { name, value } = e.target;
    setEditCategory({ ...editCategory, [name]: value });
  };

  // Maneja la creación de una nueva categoría
  const handleCreateCategory = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, newCategory)
      .then((response) => {
        toast.success("Categoría creada exitosamente!");
        fetchCategories();
        setModalOpen(false);
        setNewCategory({ name: "" });
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        toast.error("Error al crear la categoría.");
      });
  };

  // Maneja la eliminación de una categoría
  const handleDeleteCategory = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`)
      .then(() => {
        toast.success("Categoría eliminada exitosamente!");
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error("Error al eliminar la categoría.");
      });
  };

  // Abre el modal de edición y carga la categoría seleccionada
  const handleEditCategory = (category) => {
    setEditCategory(category);
    setEditModalOpen(true);
  };

  // Maneja la actualización de una categoría
  const handleUpdateCategory = () => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${editCategory.category_id}`,
        editCategory
      )
      .then((response) => {
        toast.success("Categoría actualizada exitosamente!");
        fetchCategories();
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        toast.error("Error al actualizar la categoría.");
      });
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
          Gestión de Categorías
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
          + Crear Categoría
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          boxShadow: 3,
          maxHeight: "700px",
          overflowY: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.category_id}>
                <TableCell>{category.category_id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEditCategory(category)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteCategory(category.category_id)}
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

      {/* Modal para crear una categoría */}
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
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontFamily: "Poppins, sans-serif" }}
          >
            Crear Categoría
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            name="name"
            value={newCategory.name}
            onChange={handleNewCategoryChange}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleCreateCategory}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal para editar una categoría */}
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
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontFamily: "Poppins, sans-serif" }}
          >
            Editar Categoría
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            name="name"
            value={editCategory?.name || ""}
            onChange={handleEditCategoryChange}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleUpdateCategory}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Categories;
