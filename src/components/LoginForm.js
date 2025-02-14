import React, { useState } from 'react';
import './LoginForm.css'; // Стили для формы

function LoginForm({ onLoginSuccess }) { // Добавьте onLoginSuccess как пропс
  const [login, setLogin] = useState(''); // Состояние для логина
  const [password, setPassword] = useState(''); // Состояние для пароля
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }), // Измените на login и password
      });

      if (response.ok) {
        const data = await response.json(); // Получаем данные из ответа
        localStorage.setItem('accessToken', data.accessToken); // Сохраняем токен в localStorage
        localStorage.setItem('expire', data.expire); // Сохраняем дату истечения токена
        onLoginSuccess(data.accessToken); // Вызовите onLoginSuccess с токеном
      } else {
        const errorData = await response.json();
        console.error('Ошибка авторизации:', errorData.message || 'Неверные логин или пароль');
        setIsModalOpen(true); // Открываем модальное окно при ошибке
      }
    } catch (error) {
      console.error('Ошибка сетевого запроса:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            id="login"
            placeholder="Введите ваш логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)} // Обновление состояния при вводе
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Обновление состояния при вводе
            required
          />
        </div>
        <button
          type="submit"
          className="container-login-button"
          disabled={!login || !password} // Деактивируем кнопку, если логин или пароль пустые
        >
          Войти
        </button>
      </form>
      <button className="reset-password-button">Восстановить пароль</button> {/* Кнопка "Восстановить пароль" */}
      <div className="login-with">Войти через:</div> {/* Надпись */}
      <div className="social-buttons">
        <button className="social-button google-button">Google</button>
        <button className="social-button facebook-button">Facebook</button>
        <button className="social-button yandex-button">Яндекс</button>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Неверные логин или пароль. Пожалуйста, попробуйте снова.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
