import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // needed for the Docker Container port mapping to work
    /* hmr stands for "hot module reload". The clientPort must be set to the port your Docker container exposes.*/
    hmr: {
      clientPort: Number(process.env.FRONTEND_PORT),
    },
    watch: {
      usePolling: true,
    },
    port: Number(process.env.FRONTEND_PORT), // you can replace this port with any port
  },
});
