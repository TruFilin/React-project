import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import QueryPage from './pages/QueryPage';
import ResultPage from './pages/ResultPage'; // Импортируйте ResultPage

function App() {
  return (
    <Router>
      <Routes> {/* Замените Switch на Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/query" element={<QueryPage />} />
        <Route path="/result" element={<ResultPage />} /> {/* Добавьте маршрут для ResultPage */}
      </Routes>
    </Router>
  );
}

export default App;
