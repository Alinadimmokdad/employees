import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { PaginationProvider } from "./context/PaginationContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider>
      <PaginationProvider>
        <App />
      </PaginationProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
