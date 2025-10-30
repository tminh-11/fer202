import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MovieManager from './pages/MovieManager';

// Component bảo vệ (chỉ vào được nếu đã đăng nhập)
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('loggedInUser');
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <MovieManager />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
