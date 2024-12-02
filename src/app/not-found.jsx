// src/app/not-found.js

import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Oops... La página que buscas no existe.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/"
        sx={{
          mt: 3,
          backgroundColor: "#568D2E",
          "&:hover": { backgroundColor: "#345E1F" },
        }}
      >
        Volver al Inicio
      </Button>
    </Box>
  );
}
