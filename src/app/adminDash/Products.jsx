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
  const [modalOpen, setModalOpen] = useState(false); // Controla el modal de creación
  const [editModalOpen, setEditModalOpen] = useState(false); // Controla el modal de edición
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    id: "",
    categoria: "",
    stock: "",
    precio: "",
    promocion: "",
    description: "",
    image: "", // Añadir campo de imagen
  }); // Estado para el nuevo producto
  const [editProduct, setEditProduct] = useState(null); // Estado para el producto en edición
  const [productos, setProductos] = useState([]); // Lista de productos existentes
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [promociones, setPromociones] = useState([]); // Estado para las promociones

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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Maneja la creación de un nuevo producto
  const handleCreateProduct = () => {
    setProductos([...productos, newProduct]);
    const object = {
      name: newProduct.nombre,
      description: newProduct.description,
      stock: parseInt(newProduct.stock),
      image: newProduct.image,
      category_id: newProduct.categoria,
      price: parseFloat(newProduct.precio.replace("$", "")),
      promotion_id: newProduct.promocion,
    };

    console.log(object);

    // Creación de un nuevo producto
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, object)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("Producto creado exitosamente!");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al crear el producto.");
      });

    // actualiza la data de productos
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((response) => {
        console.log(response.data);

        setProductos(response.data); // Asegúrate de que los datos vienen en el formato esperado
      })
      .catch((error) => console.error(error));

    setNewProduct({
      nombre: "",
      id: "",
      categoria: "",
      stock: "",
      precio: "",
      promocion: "",
      description: "",
      image: "",
    });
    setModalOpen(false); // Cierra el modal
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
  const handleUpdateProduct = () => {
    const updatedProducts = productos.map((producto) =>
      producto.id === editProduct.id ? editProduct : producto
    );
    const Objecto = {
      name: editProduct.nombre,
      description: editProduct.description,
      stock: parseInt(editProduct.stock),
      image: editProduct.image,
      category_id: editProduct.categoria,
      price: parseFloat(String(editProduct.precio).replace("$", "")),
      promotion_id: editProduct.promocion,
    };
    // actualiza la data de productos
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${editProduct.id}`, Objecto)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success("Producto actualizado exitosamente!");
          axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
          .then((response) => {
            console.log(response.data);
            setProductos(response.data); // Asegúrate de que los datos vienen en el formato esperado
          })
          .catch((error) => console.error(error));
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al actualizar el producto.");
      });

    setProductos(updatedProducts);
    setEditModalOpen(false); // Cierra el modal
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

                <TableCell>{producto.description}</TableCell>
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
            Crear Producto
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            name="nombre"
            value={newProduct.nombre}
            onChange={handleNewProductChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select
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
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Promoción</InputLabel>
            <Select
              name="promocion"
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
            onChange={handleNewProductChange}
          />
          <TextField
            label="Precio"
            fullWidth
            margin="normal"
            name="precio"
            value={newProduct.precio}
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
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
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
