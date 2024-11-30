"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSearchParams, useRouter } from "next/navigation";

const SearchProduct = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query"); // Obtén el término de búsqueda desde la URL
  const router = useRouter(); // Inicializa el router para manejar la navegación

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 100, max: 2500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  // Simula la carga de productos basada en el término de búsqueda
  useEffect(() => {
    if (query) {
      // Simulación de productos relacionados con la búsqueda
      const searchResults = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `${query} Producto ${index + 1}`,
        price: `$${(index + 1) * 10}.00`,
        image: "https://via.placeholder.com/150",
      }));
      setProducts(searchResults);
    }
  }, [query]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange({ ...priceRange, [name]: value });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = () => {
    // Redirige al login si intentan agregar un producto al carrito
    router.push("/login");
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box display="flex">
        {/* Barra lateral de filtros */}
        <Box
          sx={{
            width: "250px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            padding: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Filtros
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Categorías:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Categorías</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="Nutrición">Nutrición</MenuItem>
                <MenuItem value="Dermatología">Dermatología</MenuItem>
                <MenuItem value="Diabetes">Diabetes</MenuItem>
                <MenuItem value="Bebés">Bebés</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Precio:
            </Typography>
            <Box display="flex" gap={2}>
              <TextField
                label="Min"
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                size="small"
              />
              <TextField
                label="Max"
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                size="small"
              />
            </Box>
          </Box>
        </Box>

        {/* Resultados de la búsqueda */}
        <Box flex={1} ml={3}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3 }}
          >{`Resultados de la búsqueda: "${query}"`}</Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    border: "1px solid #7CC448",
                    borderRadius: "8px",
                    textAlign: "center",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: "contain", padding: "10px" }}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#2C742F" }}
                    >
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      startIcon={<LockIcon />}
                      onClick={handleAddToCart} // Redirige al login al hacer clic
                      sx={{
                        backgroundColor: "#7CC448",
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Agregar al carrito
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Paginación */}
          <Box display="flex" justifyContent="center" mt={3}>
            <IconButton
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <NavigateBeforeIcon />
            </IconButton>
            {[1, 2, 3, 4].map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                variant={currentPage === page ? "contained" : "text"}
                sx={{
                  mx: 1,
                  backgroundColor:
                    currentPage === page ? "#7CC448" : "transparent",
                  color: currentPage === page ? "#fff" : "#7CC448",
                  fontWeight: "bold",
                }}
              >
                {page}
              </Button>
            ))}
            <IconButton
              disabled={currentPage === 4}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SearchProduct;
