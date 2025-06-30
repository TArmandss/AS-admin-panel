import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/contexts/ModeContext.tsx";
import { OrderProvider } from "./components/contexts/OrderContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
