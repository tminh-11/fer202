//áp dụng ThemeProvider để bao bọc toàn bộ ứng dụng
import { ThemeProvider } from "./ex1/contexts/ThemeContext";
import LightSwitch from "./ex1/components/LightSwitch";
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from "./ex1/components/CounterComponent";
import { AuthProvider } from "./ex1/contexts/AuthContext";
import LoginForm from "./ex1/components/LoginForm";

function App() {
  return (
    <div>
  <ThemeProvider>
      <CounterComponent />
      <LightSwitch />
      </ThemeProvider>

    <AuthProvider>
    <div className="App">
      <LoginForm />
    </div>
    </AuthProvider>
    </div>
  
  );
}

export default App;