"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import NavCategorias from "../navcategorias/navcategorias";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useCart } from "@/context/CartContext";

function Categoria() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart(); // Importar la función del contexto
  const categoryName = searchParams.get("name");

  const [products, setProducts] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica la sesión del usuario
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

  // Realiza la petición a la API basada en la categoría
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!categoryName) return;

      // Limpia los productos antes de cargar nuevos
      setProducts([]);
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categoryName}`
        );
        console.log("Productos obtenidos:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.log("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]); // Escucha cambios en `categoryName`

  const handleAddToCart = (product) => {
    if (!session) {
      router.push("/login");
    } else {
      console.log(`Producto agregado al carrito: ${product.name}`);
      addToCart(product); // Agregar producto al carrito
    }
  };

  return (
    <>
      <NavCategorias />
      <Container maxWidth="xl" sx={{ mb: 5 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          {/* Título dinámico */}
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            {categoryName}
          </Typography>

          {/* Mostrar productos o mensaje de carga */}
          <Box width="100%">
            {loading ? (
              <Typography>Cargando productos...</Typography>
            ) : products.length > 0 ? (
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2.4}
                    key={product.product_id}
                  >
                    <Card
                      sx={{
                        textAlign: "center",
                        border: "2px solid #00B207",
                        borderRadius: "12px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          objectFit: "contain",
                          backgroundColor: "#fff",
                          padding: "10px",
                          borderBottom: "1px solid #eee",
                        }}
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
                          sx={{ color: "#2C742F", fontWeight: "bold" }}
                        >
                          ${product.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          justifyContent: "center",
                          paddingBottom: "10px",
                        }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            background: "#00B207",
                            color: "#fff",
                            fontSize: "0.75rem",
                            padding: "8px 12px",
                            borderRadius: "20px",
                            textTransform: "none",
                          }}
                          startIcon={<LockIcon />}
                        >
                          Agregar al carrito
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No hay productos disponibles.</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Categoria;
