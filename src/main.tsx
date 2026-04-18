import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fontsource/noto-sans-myanmar/400.css";
import { PwaSplashScreen } from "@/components/pwa-splash-screen";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/features/auth/auth-provider";
import "./index.css";
import { router } from "./router";

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js");
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <PwaSplashScreen />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
