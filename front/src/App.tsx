import React from "react";
import ProductCreate from "./container/product-create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./container/alert";
import ProductList from "./container/product-list";
import ProductUpdate from "./container/product-update";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import HomePage from './container/home';
import Switcher from "./component/language-switcher";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Switcher/>
          <Routes>
            <Route index element={<HomePage/>} />
            <Route path="/product-create" element={<ProductCreate />} />
            <Route path="/alert" element={<Alert />} />
            <Route path="/product-list" element={<ProductList/>} />
            <Route path="/product-update/:id" element={<ProductUpdate />} />
            </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
