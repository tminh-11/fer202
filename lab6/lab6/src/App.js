// src/App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppProvider } from "./contexts/AppContext"; // vẫn giữ để quản lý login (user hiện tại)

function App() {
  return (
    <Provider store={store}>
      <AppProvider> {/* Chỉ giữ lại AppProvider để lưu user login */}
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppProvider>
    </Provider>
  );
}

export default App;