import React, { useState } from 'react';
import './CardSlider.css';

const cards = [
  "Высокая и оперативная скорость обработки заявки",
  "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  "Работаем с крупными компаниями" // Новая карточка
];

function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="card-slider">
      <h2 className="slider-title">Почему именно мы</h2>
      <div className="card-container">
        <div className="cards-row" style={{ transform: `translateX(-${currentIndex * 400}px)` }}>
          {cards.map((card, index) => (
            <div className="card" key={index}>
              {card}
            </div>
          ))}
        </div>
      </div>
      <div className="buttons">
        <button className="slider-button" onClick={prevCard}>←</button>
        <button className="slider-button" onClick={nextCard}>→</button>
      </div>
    </div>
  );
}

export default CardSlider;
