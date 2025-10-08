import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS của Bootstrap
import FooterPage from "./pages/FooterPage";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <HomePage />
      <FooterPage />
    </div>
  );
}

export default App;
