import React, { useState, useEffect } from 'react';
import './Footer.css';
import logo from '../assets/logo.png';
import avaImage from '../assets/ava.png'; // Импортируйте аватар
import { Link } from 'react-router-dom';

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние для отслеживания авторизации
  const [limitInfo, setLimitInfo] = useState(null); // Состояние для информации о лимите
  const [loading, setLoading] = useState(false); // Состояние для загрузки данных

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      fetchLimitInfo(token); // Загружаем информацию о лимите при авторизации
    }
  }, []);

  const fetchLimitInfo = async (token) => {
    setLoading(true); // Начинаем загрузку
    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Исправлено: добавлены кавычки
        },
      });

      console.log('Response Status:', response.status); // Логируем статус ответа
      const data = await response.json(); // Получаем данные из ответа
      console.log('Limit Info:', JSON.stringify(data, null, 2)); // Логируем структуру объекта

      if (response.ok) {
        setLimitInfo(data.eventFiltersInfo); // Сохраняем информацию о лимите
      } else {
        console.error('Ошибка при получении информации о лимите');
      }
    } catch (error) {
      console.error('Ошибка сетевого запроса:', error);
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Удаляем токен
    setIsLoggedIn(false); // Сбрасываем состояние авторизации
    setLimitInfo(null); // Очищаем информацию о лимите
  };

  return (
    <footer className="footer">
      <img src={logo} alt="Логотип компании" className="footer-logo" />
      <div className="footer-buttons">
        <Link to="/"> {/* Добавлен Link для перехода на главную страницу */}
          <button>Главная</button>
        </Link>
        <button>Тарифы</button>
        <button>FAQ</button>
      </div>
      <div className="footer-auth">
        {isLoggedIn ? (
          <>
            <img src={avaImage} alt="Аватар" className="user-avatar" />
            {loading ? (
              <p>Загрузка лимита...</p> // Показываем лоадер
            ) : limitInfo ? (
              <div className="limit-info">
                <p>Лимит: {limitInfo.companyLimit !== undefined ? limitInfo.companyLimit : 'Неизвестно'}</p>
                <p>Использовано: {limitInfo.usedCompanyCount !== undefined ? limitInfo.usedCompanyCount : 'Неизвестно'}</p>
              </div>
            ) : null}
            <button className="login-button" onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="register-button">Зарегистрироваться</button>
            </Link>
            <div className="divider"></div>
            <Link to="/login">
              <button className="login-button">Войти</button>
            </Link>
          </>
        )}
      </div>
    </footer>
  );
}

export default Footer;
