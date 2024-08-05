import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Switcher } from "./lib/lang";
import Page from "./page/index";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switcher />
        <Page />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
