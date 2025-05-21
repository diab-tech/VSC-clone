import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), svgr()],
  define: {
    "process.env": {}, // تعريف process.env ككائن فاضي
    "process": {}, // تعريف process ككائن فاضي (اختياري لو المكتبة بتستخدم process مباشرة)
  },
  resolve: {
    alias: {
      // استبدال وحدات Node.js إذا لزم
      "path": "path-browserify",
      "fs": "empty", // تعطيل fs في المتصفح
    },
  },
});