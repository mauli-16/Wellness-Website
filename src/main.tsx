
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.tsx";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.tsx";
import Register from "./pages/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
        <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
        
          
        </Routes>
      </Router>
  </ChakraProvider>
);
