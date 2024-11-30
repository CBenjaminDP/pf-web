"use client";

import React from "react";
import {
  Box,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation"; // Hook para manejar navegación
import MedicationIcon from "@mui/icons-material/Medication";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NutritionIcon from "@mui/icons-material/Fastfood";
import SkinIcon from "@mui/icons-material/Spa";
import BabyIcon from "@mui/icons-material/BabyChangingStation";
import DehazeIcon from "@mui/icons-material/Dehaze";

function NavCategorias() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter(); // Inicializa el router para navegación

  // Lista de categorías con datos asociados
  const categories = [
    { name: "Medicamento", icon: <MedicationIcon /> },
    { name: "Cuidado Personal", icon: <FaceIcon /> },
    { name: "Cuidado Visual", icon: <VisibilityIcon /> },
    { name: "Salud Sexual", icon: <FavoriteIcon /> },
  ];

  const additionalCategories = [
    { name: "Nutrición", icon: <NutritionIcon /> },
    { name: "Dermatología", icon: <SkinIcon /> },
    { name: "Bebés", icon: <BabyIcon /> },
    { name: "Diabetes", icon: <BabyIcon /> },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateToCategory = (category) => {
    // Redirige a la página de categoría con el nombre en la query
    router.push(`/categorias?name=${encodeURIComponent(category.name)}`);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: "#7CC448",
        borderRadius: 1,
        padding: 1,
      }}
    >
      {/* Categorías - Menú Desplegable */}
      <Button
        aria-controls="categories-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        startIcon={<DehazeIcon />}
        sx={{
          backgroundColor: "#6AB73F",
          color: "#004102",
          textTransform: "none",
          borderRadius: 1,
          flexGrow: 1,
          maxWidth: "15%",
          "&:hover": {
            backgroundColor: "#5FA839",
          },
        }}
      >
        Categorías
      </Button>
      <Menu
        id="categories-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "#7CC448",
            color: "#004102",
          },
        }}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleMenuClose();
              navigateToCategory(category);
            }}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.name} />
          </MenuItem>
        ))}
      </Menu>

      {/* Secciones Adicionales */}
      <List
        disablePadding
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginLeft: 2,
        }}
      >
        {additionalCategories.map((category, index) => (
          <ListItem key={index} disablePadding sx={{ flexGrow: 1 }}>
            <Button
              startIcon={category.icon}
              onClick={() => navigateToCategory(category)} // Navega a la categoría correspondiente
              sx={{
                color: "#004102",
                textTransform: "none",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#6AB73F",
                },
              }}
            >
              {category.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default NavCategorias;
