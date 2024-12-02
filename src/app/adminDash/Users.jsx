"use client";
import React, { useState, useEffect } from "react";
import "@fontsource/poppins";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: [],
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
  });
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  // Fetch users from API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setNewUser((prev) => ({
        ...prev,
        role: typeof value === "string" ? value.split(",") : value,
      }));
    } else if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setNewUser((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setEditUser((prev) => ({
        ...prev,
        role: typeof value === "string" ? value.split(",") : value,
      }));
    } else if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setEditUser((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setEditUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateUser = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, newUser)
      .then((response) => {
        toast.success("Usuario creado exitosamente!");
        fetchUsers(); // Actualiza la lista de usuarios
        setUsers((prev) => [...prev, response.data]);
        setModalOpen(false);
        setNewUser({
          name: "",
          email: "",
          password: "",
          role: [],
          phone: "",
          address: {
            street: "",
            city: "",
            state: "",
            zip_code: "",
            country: "",
          },
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al crear el usuario.");
      });
  };

  const handleUpdateUser = () => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${editUser.id}`,
        editUser
      )
      .then((response) => {
        toast.success("Usuario actualizado exitosamente!");
        fetchUsers(); // Actualiza la lista de usuarios
        setUsers((prev) =>
          prev.map((user) =>
            user.id === editUser.id ? { ...user, ...response.data } : user
          )
        );
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al actualizar el usuario.");
      });
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)
      .then(() => {
        toast.success("Usuario eliminado exitosamente!");
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al eliminar el usuario.");
      });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" sx={{ color: "#718EBF" }}>
          Gestión de Usuarios
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7CC448",
            color: "white",
            textTransform: "none",
            borderRadius: "50px",
            "&:hover": {
              backgroundColor: "#6BA63D",
            },
          }}
          onClick={() => setModalOpen(true)}
        >
          + Crear Usuario
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role?.join(", ") || "N/A"}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setEditUser(user);
                        setEditModalOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para crear usuario */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: 3,
            width: "400px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Crear Usuario
          </Typography>
          <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              name="name"
              value={newUser.name}
              onChange={handleNewUserChange}
            />
            <TextField
              label="Correo Electrónico"
              fullWidth
              margin="normal"
              name="email"
              value={newUser.email}
              onChange={handleNewUserChange}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              name="password"
              value={newUser.password}
              onChange={handleNewUserChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Roles</InputLabel>
              <Select
                multiple
                name="role"
                value={newUser.role}
                onChange={handleNewUserChange}
              >
                <MenuItem value="cliente">Cliente</MenuItem>
                <MenuItem value="empleado">Empleado</MenuItem>
                <MenuItem value="gerente">Gerente</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Teléfono"
              fullWidth
              margin="normal"
              name="phone"
              value={newUser.phone}
              onChange={handleNewUserChange}
            />
            <TextField
              label="Calle"
              fullWidth
              margin="normal"
              name="address.street"
              value={newUser.address.street}
              onChange={handleNewUserChange}
            />
            <TextField
              label="Ciudad"
              fullWidth
              margin="normal"
              name="address.city"
              value={newUser.address.city}
              onChange={handleNewUserChange}
            />
            <TextField
              label="Estado"
              fullWidth
              margin="normal"
              name="address.state"
              value={newUser.address.state}
              onChange={handleNewUserChange}
            />
            <TextField
              label="Código Postal"
              fullWidth
              margin="normal"
              name="address.zip_code"
              value={newUser.address.zip_code}
              onChange={handleNewUserChange}
            />
            <TextField
              label="País"
              fullWidth
              margin="normal"
              name="address.country"
              value={newUser.address.country}
              onChange={handleNewUserChange}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={handleCreateUser}
          >
            Guardar
          </Button>
        </Box>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: 3,
            width: "400px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Editar Usuario
          </Typography>
          <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              name="name"
              value={editUser?.name || ""}
              onChange={handleEditUserChange}
            />
            <TextField
              label="Correo Electrónico"
              fullWidth
              margin="normal"
              name="email"
              value={editUser?.email || ""}
              onChange={handleEditUserChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Roles</InputLabel>
              <Select
                multiple
                name="role"
                value={editUser?.role || []}
                onChange={handleEditUserChange}
              >
                <MenuItem value="cliente">Cliente</MenuItem>
                <MenuItem value="empleado">Empleado</MenuItem>
                <MenuItem value="gerente">Gerente</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Teléfono"
              fullWidth
              margin="normal"
              name="phone"
              value={editUser?.phone || ""}
              onChange={handleEditUserChange}
            />
            <TextField
              label="Calle"
              fullWidth
              margin="normal"
              name="address.street"
              value={editUser?.address?.street || ""}
              onChange={handleEditUserChange}
            />
            <TextField
              label="Ciudad"
              fullWidth
              margin="normal"
              name="address.city"
              value={editUser?.address?.city || ""}
              onChange={handleEditUserChange}
            />
            <TextField
              label="Estado"
              fullWidth
              margin="normal"
              name="address.state"
              value={editUser?.address?.state || ""}
              onChange={handleEditUserChange}
            />
            <TextField
              label="Código Postal"
              fullWidth
              margin="normal"
              name="address.zip_code"
              value={editUser?.address?.zip_code || ""}
              onChange={handleEditUserChange}
            />
            <TextField
              label="País"
              fullWidth
              margin="normal"
              name="address.country"
              value={editUser?.address?.country || ""}
              onChange={handleEditUserChange}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
            onClick={handleUpdateUser}
          >
            Guardar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Users;