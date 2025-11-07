import React from "react";
import { AppProvider } from "./contexts/AppContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
function App() {
  return (
    <AppProvider>
      <PaymentProvider>
        <UserProvider>
          <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
        </UserProvider>
      </PaymentProvider>
    </AppProvider>

  );
}

export default App;

