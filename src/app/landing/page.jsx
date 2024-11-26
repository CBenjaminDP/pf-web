"use client"; // Indica que es un componente de cliente

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardMedia, CardContent, CardActions, Button, IconButton, Link, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavCategorias from './navcategorias/navcategorias';

// 1920 * 600
const images = [
  'https://i.pinimg.com/originals/1e/78/91/1e789149967aa9ecee20ef58911a9d17.jpg',
  'https://iselamendez.mx/farmacia/wp-content/uploads/2024/11/Copia-de-WEB-jpg.webp',
];

const products = [
  { id: 1, name: "Producto 1", price: "$10.00", image: "https://m.media-amazon.com/images/I/61uutWxTEIL.jpg" },
  { id: 2, name: "Producto 2", price: "$15.00", image: "https://www.costco.com.mx/medias/sys_master/products/h8c/hb1/79642016677918.webp" },
  { id: 3, name: "Producto 3", price: "$20.00", image: "https://images.ctfassets.net/ir0g9r0fng0m/4owIq4DqC4MnZtFUb1o6hv/a7f9a7cf0d306ae548c2dd0a14367df4/tylenol-caja-con-frasco-10-tabletas-980-x-980-px-1-es-mx" },
  { id: 4, name: "Producto 4", price: "$25.00", image: "https://hebmx.vtexassets.com/arquivos/ids/735349-800-800?v=638521788586070000&width=800&height=800&aspect=true" },
  { id: 5, name: "Producto 5", price: "$30.00", image: "https://www.fahorro.com/media/catalog/product/7/5/7502223709614.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg" },
];

function Landing() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevProduct = () => {
    document.getElementById("product-carousel").scrollBy({ left: -150, behavior: "smooth" });
  };

  const handleNextProduct = () => {
    document.getElementById("product-carousel").scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <>
          <NavCategorias />

      <Container maxWidth="md" sx={{ mb: 5 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={0}>
          
          {/* Carrusel de imágenes automático */}
          <Box mt={3} width="100%" display="flex" flexDirection="column" alignItems="center">
            <img
              src={images[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              style={{ maxWidth: '100%', borderRadius: '2px' }}
            />
          </Box>

          {/* Carrusel de Cards */}
          <Box mt={2} width="100%" position="relative" overflow="hidden">
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }} gutterBottom>
              Productos nuevos
            </Typography>

            {/* Flecha Izquierda */}
            <IconButton onClick={handlePrevProduct} sx={{ position: 'absolute', top: '50%', left: '-5px', zIndex: 10 }}>
              <ArrowBackIosIcon />
            </IconButton>

            {/* Carrusel de Productos */}
            <Box
              id="product-carousel"
              display="flex"
              overflow="hidden"
              gap={2}
              py={1}
              px={1}
              sx={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
            >
              {products.map((product) => (
                <Card key={product.id} sx={{ minWidth: 200, maxWidth: 200, textAlign: 'center', padding: 0.2, boxShadow: '0px 0px 3px 1px rgba(44,116,47,1)' }}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'contain', backgroundColor: '#ffff0', borderRadius: 1 }}
                  />

                  <CardContent sx={{ paddingBottom: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ color: '#2C742F' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="h6" component="div" >
                      {product.price}
                    </Typography>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'center', paddingTop: 0 }}>
                    <Button size="small" variant="contained" sx={{ background: '#00B207', borderRadius: 4 }}>Agregar al carrito</Button>
                  </CardActions>
                </Card>
              ))}
            </Box>

            {/* Flecha Derecha */}
            <IconButton onClick={handleNextProduct} sx={{ position: 'absolute', top: '50%', right: '-5px', zIndex: 10 }}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          
        </Box>
      </Container>
      
      {/* Footer en ancho completo */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#D9D9D9',
          color: '#170F49',
          py: 4,
          px: 1,
          width: '100%',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Primera Sección - Logo y Redes Sociales */}
            <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
              <Box mb={2}>
                <img src="https://via.placeholder.com/150x50" alt="Logo" style={{ maxWidth: '100%' }} />
              </Box>
              <Box sx={{pb: 1, color: '#6F6C90'}}>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quasi temporibus
                </Typography>
              </Box>
              <Box>
                <IconButton aria-label="Facebook" color="inherit" sx={{color:'#00B207'}}>
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="Twitter" color="inherit" sx={{color:'#00B207'}}>
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Instagram" color="inherit" sx={{color:'#00B207'}}>
                  <InstagramIcon />
                </IconButton>
                <IconButton aria-label="Youtube" color="inherit" sx={{color:'#00B207'}}>
                  <YoutubeIcon />
                </IconButton>
              </Box>
            </Grid>

            {/* Segunda Sección - Productos */}
            <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold'}} gutterBottom>
                Productos
              </Typography>
              <Grid container spacing={1} sx={{ color: '#6F6C90' }}>
                <Grid item xs={6}>
                  <Typography variant="body2">Nutrición</Typography>
                  <Typography variant="body2">Dermatología</Typography>
                  <Typography variant="body2">Diabetes</Typography>
                  <Typography variant="body2">Bebés</Typography>
                  <Typography variant="body2">Medicamentos</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Cuidado personal</Typography>
                  <Typography variant="body2">Salud sexual</Typography>
                  <Typography variant="body2">Cuidado ocular</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Tercera Sección - Contáctanos */}
            <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                Contáctanos
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6F6C90' }}>
                <EmailIcon fontSize="small" />
                contacto@miempresa.com
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6F6C90' }}>
                <PhoneIcon fontSize="small" />
                +52 55 1234 5678
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6F6C90' }}>
                <LocationOnIcon fontSize="small" />
                Calle Falsa 123, Ciudad
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Landing;