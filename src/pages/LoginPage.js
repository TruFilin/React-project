import React from 'react';
import './LoginPage.css'; // Стили для страницы авторизации
import Footer from '../components/Footer'; // Импортируй футер
import LoginForm from '../components/LoginForm'; // Импортируй форму
import charImage from '../assets/char.png'; // Импортируй изображение
import grpImage from '../assets/grp.png'; // Импортируй маленькое изображение
import HeaderBlock from '../components/HeaderBlock';
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate

function LoginPage() {
  const navigate = useNavigate(); // Инициализируем хук useNavigate

  const handleLoginSuccess = (token) => {
    localStorage.setItem('accessToken', token); // Устанавливаем токен в localStorage
    navigate('/'); // Перенаправляем на главную страницу
  };

  return (
    <div className="login-container">
      <Footer />
      <div className="login-page">
        <img src={charImage} alt="Персонаж" className="left-image" /> {/* Импортируем изображение */}

        <LoginForm onLoginSuccess={handleLoginSuccess} /> {/* Передаем обработчик в форму */}

        <img src={grpImage} alt="Иконка" className="small-image" /> {/* Добавляем маленькое изображение */}
      </div>
      <div className="subscription-info" style={{ top: '162px', left: '60px' }}>
        Для оформления подписки на тариф, необходимо авторизоваться.
      </div>
      <HeaderBlock customClass="login-header" /> {/* Добавляем класс для изменения стилей */}
    </div>
  );
}

export default LoginPage;
