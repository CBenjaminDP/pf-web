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
import { useSearchParams, useRouter } from "next/navigation"; // Importa useRouter

function Categoria() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Inicializa el router
  const categoryName = searchParams.get("name"); // Obtiene el nombre de la categoría desde la URL

  const [products, setProducts] = useState([]);

  // Carga dinámica de productos basados en la categoría
  useEffect(() => {
    if (categoryName) {
      const categoryProducts = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `${categoryName} Producto ${index + 1}`,
        price: `$${(index + 1) * 10}.00`,
        image: "https://via.placeholder.com/150",
      }));

      setProducts(categoryProducts);
    }
  }, [categoryName]);

  const handleAddToCart = () => {
    // Redirige a la página de inicio de sesión
    router.push("/login");
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

          {/* Cards de Productos */}
          <Box width="100%">
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2.4}
                  key={product.id}
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
                        {product.price}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: "center", paddingBottom: "10px" }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        onClick={handleAddToCart} // Llama a la función de redirección
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
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Categoria;
