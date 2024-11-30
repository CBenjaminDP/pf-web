"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
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

const products = [
  { id: 1, name: "Producto 1", price: "$10.00", image: "https://m.media-amazon.com/images/I/61uutWxTEIL.jpg" },
  { id: 2, name: "Producto 2", price: "$15.00", image: "https://www.costco.com.mx/medias/sys_master/products/h8c/hb1/79642016677918.webp" },
  { id: 3, name: "Producto 3", price: "$20.00", image: "https://images.ctfassets.net/ir0g9r0fng0m/4owIq4DqC4MnZtFUb1o6hv/a7f9a7cf0d306ae548c2dd0a14367df4/tylenol-caja-con-frasco-10-tabletas-980-x-980-px-1-es-mx" },
  { id: 4, name: "Producto 4", price: "$25.00", image: "https://hebmx.vtexassets.com/arquivos/ids/735349-800-800?v=638521788586070000&width=800&height=800&aspect=true" },
  { id: 5, name: "Producto 5", price: "$30.00", image: "https://www.fahorro.com/media/catalog/product/7/5/7502223709614.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg" },
];

function Landing() {
  const carouselRef = useRef(null);
  const router = useRouter();
  const [session, setSession] = useState(null);

  // Cargar la sesión inicial desde localStorage
  useEffect(() => {
    const userSession = localStorage.getItem("user");
    setSession(userSession ? JSON.parse(userSession) : null);
  }, []);

  // Escuchar cambios en localStorage para detectar la eliminación de la sesión
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

  const handleAddToCart = () => {
    if (!session) {
      router.push("/login");
    } else {
      console.log("Producto agregado al carrito por:", session.name);
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
              {products.map((product) => (
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
                    image={product.image}
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
                      {product.price}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "center", paddingTop: 0 }}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ background: "#00B207", borderRadius: 4 }}
                      onClick={handleAddToCart}
                    >
                      Agregar al carrito
                    </Button>
                  </CardActions>
                </Card>
              ))}
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
