/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Habilitar modo estricto para React
    webpack: (config, { dev }) => {
      if (dev) {
        // Silenciar mensajes de error en el entorno de desarrollo
        config.infrastructureLogging = {
          level: 'error', // Muestra solo mensajes de error
        };
      }
      return config;
    },
    devIndicators: {
      buildActivity: false, // Desactiva indicadores visuales de compilación
    },
  };
  
  export default nextConfig;
  