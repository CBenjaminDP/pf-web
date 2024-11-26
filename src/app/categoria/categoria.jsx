"use client"; // Indica que es un componente de cliente

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardMedia, CardContent, CardActions, Button, Grid } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import NavCategorias from './navcategorias/navcategorias';

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

function Categoria() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavCategorias />
      <Container maxWidth="md" sx={{ mb: 5 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={0}>

          {/* Carrusel de imágenes automático */}
          <Box mt={3} width="100%" display="flex" flexDirection="column" >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold'}} alignItems="left" gutterBottom>
              Dermatología
            </Typography>
            <img
              src={images[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              style={{ maxWidth: '100%', borderRadius: '2px' }}
            />
          </Box>

          {/* Cards de Productos */}
          <Box mt={2} width="100%">
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product.id}>
                  <Card sx={{ textAlign: 'center', padding: 0.2, boxShadow: '0px 0px 3px 1px rgba(44,116,47,1)' }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: 'contain', backgroundColor: '#ffff0', borderRadius: 1 }}
                    />
                    <CardActions sx={{ justifyContent: 'center', paddingTop: 0 }}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ background: '#00B207', borderRadius: 4, fontSize: '0.6rem' }} // Tamaño de letra ajustado
                        endIcon={<ShoppingBagIcon />}
                      >
                        Agregar al carrito
                      </Button>
                    </CardActions>
                    <CardContent sx={{ paddingBottom: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ color: '#2C742F' }}>
                        {product.name}
                      </Typography>
                      <Typography variant="h6" component="div">
                        {product.price}
                      </Typography>
                    </CardContent>
                    
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
