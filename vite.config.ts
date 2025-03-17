import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000, // یا هر پورتی که استفاده می‌کنی
    strictPort: true,
    allowedHosts: ['a855-104-131-169-232.ngrok-free.app',"*"], // اینجا دامنه مورد نظر رو اضافه کن
  }
  
});
