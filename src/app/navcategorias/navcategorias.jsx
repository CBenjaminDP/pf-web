"use client"; // Indica que es un componente de cliente

import React from "react";
import { Box, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, Button, useTheme, useMediaQuery,} from "@mui/material";

import MedicationIcon from "@mui/icons-material/Medication";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NutritionIcon from "@mui/icons-material/Fastfood";
import SkinIcon from "@mui/icons-material/Spa";
import BabyIcon from "@mui/icons-material/BabyChangingStation";

function NavCategorias() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? "column" : "row"}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "#7CC448",
        p: 2,
        width: "100%",
        borderRadius: 1,
      }}
    >
      {/* Categorías - Menú Desplegable */}
      <Box>
        <Button
          aria-controls="categories-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          startIcon={<MedicationIcon />}
          sx={{
            backgroundColor: "#7CC448",
            color: "#004102",
            textTransform: "none",
            borderRadius: 1,
            "&:hover": {
              backgroundColor: "#6AB73F",
            },
          }}
        >
          Categoría
        </Button>
        <Menu
          id="categories-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "categories-menu",
          }}
          sx={{
            "& .MuiMenu-paper": {
              backgroundColor: "#7CC448",
              color: "#004102",
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <MedicationIcon />
            </ListItemIcon>
            <ListItemText primary="Medicamento" />
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Cuidado Personal" />
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Cuidado Visual" />
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Salud Sexual" />
          </MenuItem>
        </Menu>
      </Box>

      {/* Secciones Adicionales */}
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems="center"
        gap={2}
        sx={{
          mt: isSmallScreen ? 2 : 0,
          flexGrow: 1,
          justifyContent: isSmallScreen ? "center" : "flex-start",
        }}
      >
        <List disablePadding sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <ListItem disablePadding>
            <Button
              startIcon={<NutritionIcon />}
              sx={{
                color: "#004102",
                textTransform: "none",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#6AB73F",
                },
              }}
            >
              Nutrición
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button
              startIcon={<SkinIcon />}
              sx={{
                color: "#004102",
                textTransform: "none",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#6AB73F",
                },
              }}
            >
              Dermatología
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button
              startIcon={<BabyIcon />}
              sx={{
                color: "#004102",
                textTransform: "none",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#6AB73F",
                },
              }}
            >
              Bebés
            </Button>
          </ListItem>
          <ListItem disablePadding>
            <Button
              startIcon={<BabyIcon />}
              sx={{
                color: "#004102",
                textTransform: "none",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#6AB73F",
                },
              }}
            >
              Diabetes
            </Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default NavCategorias;
