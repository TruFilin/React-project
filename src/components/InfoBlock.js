import React, { useState } from 'react';
import './InfoBlock.css';
import image from '../assets/block1.jpeg';

function InfoBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном

  const handleRequestData = () => {
    const token = localStorage.getItem('accessToken'); // Проверяем наличие токена
    if (!token) {
      setIsModalOpen(true); // Открываем модальное окно, если не авторизован
    } else {
      // Логика для перехода на страницу запроса данных, если пользователь авторизован
      window.location.href = '/query'; // Переход на страницу запроса данных
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
  };

  return (
    <div className="info-block">
      <div className="text-section">
        <p className="text-title">Сервис по поиску</p>
        <p className="text-title">публикаций</p>
        <p className="text-title">о компании</p>
        <p className="text-title">по его ИНН</p>
        <p className="description-text">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
      </div>
      <div className="image-section">
        <img src={image} alt="Описание изображения" className="info-image" />
        <button className="request-button" onClick={handleRequestData}>Запросить данные</button>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Пожалуйста, авторизуйтесь для запроса данных.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoBlock;
