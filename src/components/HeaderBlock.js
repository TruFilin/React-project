import React from 'react';
import './HeaderBlock.css'; // Создай файл стилей для заголовка
import headerImage from '../assets/head.png'; // Импортируй изображение для заголовка

function HeaderBlock({ customClass }) {
  return (
    <div className={`header-block ${customClass}`}>
      <img src={headerImage} alt="Заголовок" className="header-image" />
      <div className="header-text">
        <p>г. Москва, Цветной б-р, 40</p>
        <p>+7 495 771 21 11</p>
        <p>info@skan.ru</p>
      </div>
    </div>
  );
}

export default HeaderBlock;
