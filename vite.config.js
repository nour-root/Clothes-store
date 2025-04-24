import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        shop: "/shop.html",
        details: "./details.html",
        cart: "./cart.html",
        wishlist: "./wishlist.html",
        checkout: "./checkout.html",
        account: "./account.html",
        login: "./login.html",
      },
    },
  },
});
