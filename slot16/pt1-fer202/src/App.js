import React from "react";
import { AppProvider } from "./contexts/AppContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <PaymentProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PaymentProvider>
    </AppProvider>
  );
}

export default App;

