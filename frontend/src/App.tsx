// import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import ChartAndFormPage from "./pages/ChartAndFormPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ScenarioProvider } from "./context/ScenarioContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ScenarioProvider>
          <ChartAndFormPage />
        </ScenarioProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
