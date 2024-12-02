"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NavCategorias from "../navcategorias/NavCategorias";

const images = [
  "https://i.pinimg.com/originals/1e/78/91/1e789149967aa9ecee20ef58911a9d17.jpg",
  "https://iselamendez.mx/farmacia/wp-content/uploads/2024/11/Copia-de-WEB-jpg.webp",
];

function Landing() {
  const carouselRef = useRef(null);
  const router = useRouter();
  const { addToCart } = useCart();
  const [session, setSession] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        console.log("Productos cargados:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!session) {
      router.push("/login");
    } else {
      console.log("Producto agregado al carrito por:", session.name);
      addToCart(product);
    }
  };

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

  const handleWheelScroll = (event) => {
    event.preventDefault();
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: event.deltaY < 0 ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handlePrevProduct = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleNextProduct = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const cardWidth = 200;
  const visibleCards = 5;
  const carouselWidth = visibleCards * cardWidth;

  return (
    <>
      <NavCategorias />

      <Container maxWidth="xl" sx={{ mb: 5 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={0}>
          <Box
            mt={3}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <img
              src={images[0]}
              alt={`Imagen 1`}
              style={{ maxWidth: "100%", borderRadius: "2px" }}
            />
          </Box>

          <Box
            mt={2}
            width={carouselWidth}
            position="relative"
            overflow="hidden"
            onWheel={handleWheelScroll}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              Productos nuevos
            </Typography>

            <IconButton
              onClick={handlePrevProduct}
              sx={{
                position: "absolute",
                top: "50%",
                left: "-5px",
                zIndex: 10,
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <Box
              ref={carouselRef}
              display="flex"
              gap={2}
              overflow="auto"
              py={1}
              px={1}
              sx={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {loading ? (
                <Typography>Cargando productos...</Typography>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <Card
                    key={product.id}
                    sx={{
                      minWidth: cardWidth,
                      maxWidth: cardWidth,
                      textAlign: "center",
                      padding: 0.2,
                      boxShadow: "0px 0px 3px 1px rgba(44,116,47,1)",
                      scrollSnapAlign: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="120"
                      image={
                        typeof product.image === "string" && product.image.startsWith("data:image/")
                          ? product.image
                          : `data:image/jpeg;base64,${product.image}`
                      }
                      alt={product.name}
                      sx={{
                        objectFit: "contain",
                        backgroundColor: "#ffff0",
                        borderRadius: 1,
                      }}
                    />

                    <CardContent sx={{ paddingBottom: 0.5 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ color: "#2C742F" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="h6" component="div">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ background: "#00B207", borderRadius: 4 }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Agregar al carrito
                      </Button>
                    </CardActions>
                  </Card>
                ))
              ) : (
                <Typography>No hay productos disponibles.</Typography>
              )}
            </Box>

            <IconButton
              onClick={handleNextProduct}
              sx={{
                position: "absolute",
                top: "50%",
                right: "-5px",
                zIndex: 10,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Landing;
