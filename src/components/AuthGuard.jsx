"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children, requiredRoles = [] }) => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Si no hay sesión, redirigir a la página de inicio de sesión
      router.push("/login");
    } else {
      const userData = JSON.parse(user);
      // Verificar si el usuario tiene el rol necesario
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.some((role) => userData.role.includes(role))
      ) {
        // Si no tiene permisos, redirigir al inicio
        router.push("/");
      }
    }
  }, [router, requiredRoles]);

  return <>{children}</>;
};

export default AuthGuard;
