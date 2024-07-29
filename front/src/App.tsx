import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Switcher } from "./lib/lang";
import UseProductCreate from "./epic/product-create";
import UseAlert from "./epic/alert";
import UseProductList from "./epic/product-list";
import UseProductItem from "./epic/product-update";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switcher />
        <Routes>
          <Route path="/product-create" element={<UseProductCreate />} />
          <Route path="/alert" element={<UseAlert />} />
          <Route path="/product-list" element={<UseProductList />} />
          <Route path="/product-update/:id" element={<UseProductItem />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
