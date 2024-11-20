// import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import ChartAndFormPage from "./pages/ChartAndFormPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ChartAndFormPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
