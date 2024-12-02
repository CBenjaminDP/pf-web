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
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const SearchProduct = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();
  const { addToCart } = useCart(); // Importamos el contexto del carrito

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [session, setSession] = useState(null);

  // Verificar la sesión del usuario
  useEffect(() => {
    const userSession = localStorage.getItem("user");
    setSession(userSession ? JSON.parse(userSession) : null);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const userSession = localStorage.getItem("user");
      setSession(userSession ? JSON.parse(userSession) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Realiza la búsqueda de productos al cargar el componente o cuando cambie el query
  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/search`,
          { query }
        );

        setProducts(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("No se encontraron productos");
        } else {
          setError("Ocurrió un error al buscar los productos.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Lógica adicional si la paginación está implementada en el backend
  };

  const handleAddToCart = (product) => {
    if (!session) {
      router.push("/login");
    } else {
      console.log(`Producto agregado al carrito: ${product.name}`);
      addToCart(product); // Agregar producto al carrito
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          {`Resultados de la búsqueda: "${query || "Todos"}"`}
        </Typography>

        {/* Mostrar estado de carga, error o productos */}
        {loading ? (
          <Typography>Cargando productos...</Typography>
        ) : error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
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
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      startIcon={<LockIcon />}
                      onClick={() => handleAddToCart(product)}
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
        )}

        {/* Paginación */}
        {!loading && !error && (
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
        )}
      </Box>
    </Container>
  );
};

export default SearchProduct;
