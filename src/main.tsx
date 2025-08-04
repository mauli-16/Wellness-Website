
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.tsx";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import {PopularCourses }from "./pages/Session.tsx"
import UserSession from "./pages/UserSession.tsx";


createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
        <Router>
        <Routes>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/sessions" element={<PopularCourses />} />
          <Route path="/userSession" element={<UserSession />} />
          
        
          
        </Routes>
      </Router>
  </ChakraProvider>
);
