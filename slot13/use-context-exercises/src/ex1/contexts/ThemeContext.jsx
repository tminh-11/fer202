// ex1/contexts/ThemeContext.jsx
import React, { createContext } from "react";

// 1. Khởi tạo context với giá trị mặc định
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// 2. Tạo provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState("light");

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 3. Tạo giá trị context
  const contextValue = { theme, toggleTheme };

  // 4. Cung cấp giá trị cho các component con
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 5. Custom hook để dùng context dễ hơn
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
