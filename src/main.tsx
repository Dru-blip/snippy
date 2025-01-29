import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./routes";
import { BrowserRouter } from "react-router";
import "./App.css"
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster richColors/>      
    </ThemeProvider>
  </React.StrictMode>
);
