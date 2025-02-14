import React from 'react';
import './ImageBlock.css'; // Создай файл стилей для блока
import image from '../assets/block2.png';function ImageBlock() {
  return (
    <div className="image-block">
    <img src={image} alt="Описание изображения" className="info-image" />
    </div>
  );
}

export default ImageBlock;
