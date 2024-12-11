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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const initialProductState = {
    nombre: "",
    id: "",
    categoria: "",
    stock: "",
    precio: "",
    promocion: "",
    description: "",
    image: "",
  };
  const [modalOpen, setModalOpen] = useState(false); // Controla el modal de creación
  const [editModalOpen, setEditModalOpen] = useState(false); // Controla el modal de edición
  const [newProduct, setNewProduct] = useState(initialProductState); // Estado para el nuevo produc  to
  const [editProduct, setEditProduct] = useState(null); // Estado para el producto en edición
  const [productos, setProductos] = useState([]); // Lista de productos existentes
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [promociones, setPromociones] = useState([]); // Estado para las promociones
  const [errors, setErrors] = useState({});

  const validateProduct = (product) => {
    const newErrors = {};

    if (!product.nombre.trim()) {
      newErrors.nombre = "El nombre del producto es obligatorio.";
    } else if (product.nombre.length > 50) {
      newErrors.nombre = "El nombre no puede tener más de 50 caracteres.";
    }

    if (!product.categoria) {
      newErrors.categoria = "Selecciona una categoría.";
    }

    if (!product.stock) {
      newErrors.stock = "El stock es obligatorio.";
    } else if (isNaN(product.stock) || product.stock <= 0) {
      newErrors.stock = "El stock debe ser un número mayor a 0.";
    }

    if (!product.precio) {
      newErrors.precio = "El precio es obligatorio.";
    } else if (isNaN(product.precio) || product.precio <= 0) {
      newErrors.precio = "El precio debe ser un número mayor a 0.";
    }

    // Validar imagen solo si es un nuevo archivo (instancia de File)
    if (product.image instanceof File) {
      if (product.image.size > 600000) {
        newErrors.image = "La imagen debe ser menor a 600KB.";
      } else if (
        !["image/jpeg", "image/png", "image/jpg"].includes(product.image.type)
      ) {
        newErrors.image =
          "El archivo debe ser una imagen válida (jpg, jpeg, png).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Maneja el cambio de los inputs en el formulario de creación
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Maneja el cambio de los inputs en el formulario de edición
  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  // Maneja la selección de la imagen y la convierte a base64
  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 600000) {
      toast.error("La imagen debe ser menor a 600KB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (isEdit) {
      setEditProduct({ ...editProduct, image: file, preview: previewUrl });
    } else {
      setNewProduct({ ...newProduct, image: file, preview: previewUrl });
    }
  };

  // Maneja la creación de un nuevo producto
  const handleCreateProduct = async () => {
    if (!validateProduct(newProduct)) {
      toast.error("Por favor, corrige los errores antes de enviar.");
      return;
    }

    const formData = new FormData();

    // Agregar los datos al FormData
    formData.append("name", newProduct.nombre);
    formData.append("description", newProduct.description);
    formData.append("stock", parseInt(newProduct.stock));
    formData.append("price", parseFloat(newProduct.precio.replace("$", "")));
    formData.append("category_id", newProduct.categoria);
    if (newProduct.promocion)
      formData.append("promotion_id", newProduct.promocion);

    // Agregar la imagen solo si existe
    if (newProduct.image) {
      formData.append("image", newProduct.image); // Archivo de imagen
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Importante para enviar archivos
          },
        }
      );

      if (response.status === 201) {
        toast.success("Producto creado exitosamente!");
        const productsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        setProductos(productsResponse.data);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      toast.error("Error al crear el producto.");
    }

    setModalOpen(false);
    setNewProduct(initialProductState);
  };

  // Maneja la eliminación de un producto
  const handleDeleteProduct = (id) => {
    const updatedProducts = productos.filter((producto) => producto.id !== id);
    // Elimina el producto de la base de datos
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          //actualiza la data de productos
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
            .then((response) => {
              console.log(response.data);
              setProductos(response.data); // Asegúrate de que los datos vienen en el formato esperado
            })
            .catch((error) => console.error(error));
          toast.success("Producto eliminado exitosamente!");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al eliminar el producto.");
      });
    setProductos(updatedProducts);
  };

  // Abre el modal de edición y carga el producto seleccionado
  const handleEditProduct = (producto) => {
    setEditProduct({
      nombre: producto.name,
      categoria: producto.category?.category_id || "",
      promocion: producto.promotions?.[0]?.promotion_id || "",
      stock: producto.stock || "",
      precio: producto.price || "",
      description: producto.description || "",
      image: producto.image || "",
      id: producto.product_id, // Asegúrate de que el ID sea consistente
    });
    setEditModalOpen(true);
  };

  // Maneja la actualización de un producto
  const handleUpdateProduct = async () => {
    if (!validateProduct(editProduct)) {
      toast.error("Por favor, corrige los errores antes de guardar.");
      return;
    }

    const formData = new FormData();

    // Convertir precio y stock al formato correcto
    const formattedPrice =
      typeof editProduct.precio === "string"
        ? parseFloat(editProduct.precio.replace("$", ""))
        : editProduct.precio;

    formData.append("name", editProduct.nombre);
    formData.append("description", editProduct.description);
    formData.append("stock", parseInt(editProduct.stock));
    formData.append("price", formattedPrice);
    formData.append("category_id", editProduct.categoria);
    if (editProduct.promocion) {
      formData.append("promotion_id", editProduct.promocion);
    }

    // Solo agrega la imagen si es un nuevo archivo
    if (editProduct.image instanceof File) {
      formData.append("image", editProduct.image);
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${editProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Producto actualizado exitosamente!");
        const productsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        setProductos(productsResponse.data);
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      toast.error("Error al actualizar el producto.");
    }

    setEditModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditProduct(null); // Restablece el estado del producto en edición
    setEditModalOpen(false); // Cierra el modal
  };

  // Cierra el modal de creación y limpia el estado
  const handleCloseModal = () => {
    setNewProduct(initialProductState); // Restablece los campos del formulario
    setErrors({}); // Limpia los errores
    setModalOpen(false); // Cierra el modal
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  // Obtiene las categorías de la API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((response) => setCategorias(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Obtiene las promociones de la API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions`)
      .then((response) => setPromociones(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Obtiene los productos de la API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((response) => {
        console.log(response.data);

        setProductos(response.data); // Asegúrate de que los datos vienen en el formato esperado
      })
      .catch((error) => console.error(error));
  }, []);

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
          Productos en venta
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
          + Crear Producto
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          boxShadow: 3,
          maxHeight: "700px", // Altura máxima para el contenedor de la tabla
          overflowY: "auto", // Habilita el desplazamiento vertical
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                ID Producto
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Categoría
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Stock
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Precio
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Promoción
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Descripción
              </TableCell>
              <TableCell sx={{ color: "#718EBF", fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.product_id}>
                <TableCell>{producto.name}</TableCell>
                <TableCell>{producto.product_id}</TableCell>
                <TableCell>
                  {producto.category?.name || "Sin categoría"}
                </TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>{`$${producto.price || "0.00"}`}</TableCell>
                <TableCell>
                  {producto.promotions && producto.promotions.length > 0
                    ? producto.promotions.map((promo) => promo.name).join(", ")
                    : "Sin promociones"}
                </TableCell>

                <TableCell>
                  {truncateDescription(producto.description, 100)}
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEditProduct(producto)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteProduct(producto.product_id)}
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
      ></Box>

      {/* Modal para crear un producto */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal} // Usa la nueva función para limpiar el estado
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
            Crear Producto
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            name="nombre"
            value={newProduct.nombre}
            error={!!errors.nombre}
            helperText={errors.nombre}
            onChange={handleNewProductChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select
              label="categoria"
              name="categoria"
              value={newProduct.categoria}
              onChange={handleNewProductChange}
            >
              {categorias.map((categoria) => (
                <MenuItem
                  key={categoria.category_id}
                  value={categoria.category_id}
                >
                  {categoria.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoria && (
              <Typography variant="caption" color="error">
                {errors.categoria}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Promoción</InputLabel>
            <Select
              name="promocion"
              label="promocion"
              value={newProduct.promocion}
              onChange={handleNewProductChange}
            >
              {promociones.map((promocion) => (
                <MenuItem
                  key={promocion.promotion_id}
                  value={promocion.promotion_id}
                >
                  {promocion.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Stock"
            fullWidth
            margin="normal"
            name="stock"
            value={newProduct.stock}
            error={!!errors.stock}
            helperText={errors.stock}
            onChange={handleNewProductChange}
          />
          <TextField
            label="Precio"
            fullWidth
            margin="normal"
            name="precio"
            value={newProduct.precio}
            error={!!errors.precio}
            helperText={errors.precio}
            onChange={handleNewProductChange}
          />
          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            name="description"
            value={newProduct.description}
            onChange={handleNewProductChange}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: "10px" }}
          >
            Subir Imagen
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          {/* Vista previa de la imagen actual */}
          {newProduct.preview && (
            <Box sx={{ marginTop: "10px", textAlign: "center" }}>
              <Typography variant="body2">Vista previa:</Typography>
              <img
                src={newProduct.preview}
                alt="Vista previa"
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
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
              onClick={handleCreateProduct}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal para actualizar un producto */}
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
            Actualizar Producto
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            name="nombre"
            value={editProduct?.nombre || ""}
            onChange={handleEditProductChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoria"
              value={editProduct?.categoria || ""}
              onChange={handleEditProductChange}
            >
              {categorias.map((categoria) => (
                <MenuItem
                  key={categoria.category_id}
                  value={categoria.category_id}
                >
                  {categoria.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Promoción</InputLabel>
            <Select
              name="promocion"
              value={editProduct?.promocion || ""}
              onChange={handleEditProductChange}
            >
              {promociones.map((promocion) => (
                <MenuItem
                  key={promocion.promotion_id}
                  value={promocion.promotion_id}
                >
                  {promocion.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Stock"
            fullWidth
            margin="normal"
            name="stock"
            value={editProduct?.stock || ""}
            onChange={handleEditProductChange}
          />
          <TextField
            label="Precio"
            fullWidth
            margin="normal"
            name="precio"
            value={editProduct?.precio || ""}
            onChange={handleEditProductChange}
          />
          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            name="description"
            value={editProduct?.description || ""}
            onChange={handleEditProductChange}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: "10px" }}
          >
            Subir Imagen
            <input
              type="file"
              hidden
              onChange={(e) => handleImageChange(e, true)} // Para edición
            />
          </Button>

          {/* Vista previa de la imagen actual */}
          {editProduct?.image && (
            <Box
              sx={{
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              <Typography variant="body2">Imagen actual:</Typography>
              <img
                src={
                  typeof editProduct.image === "string"
                    ? editProduct.image
                    : URL.createObjectURL(editProduct.image)
                }
                alt="Imagen actual"
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
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
              onClick={handleUpdateProduct}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Products;
