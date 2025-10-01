import logo from './logo.svg';
import './App.css';
import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Breadcrumb from "./components/Breadcrumb";
import Students from "./components/Students";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Banner />
      <Breadcrumb />
      <Students />
      <Footer />
    </div>
  );
}

export default App;

