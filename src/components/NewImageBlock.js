import React from 'react';
import './NewImageBlock.css';
import loc1 from '../assets/loc1.png';
import loc2 from '../assets/loc2.png';
import loc3 from '../assets/loc3.png';

function NewImageBlock() {
  return (
    <div className="new-image-block">
    <img src={loc1} alt="Описание изображения 1" className="block-image" style={{ width: '415px', height: '540px', position: 'absolute', top: '0px', left: '60px' }} />
    <img src={loc2} alt="Описание изображения 2" className="block-image" style={{ width: '415px', height: '540px', position: 'absolute', top: '0px', left: '512px', borderRadius: '10px' }} />
    <img src={loc3} alt="Описание изображения 3" className="block-image" style={{ width: '415px', height: '540px', position: 'absolute', top: '0px', left: '965px' }} />

    <div className="tariff-includes" style={{ position: 'absolute', top: '170px', left: '100px' }}>
        <div className="tariff-includes1" style={{ position: 'absolute', marginBottom: '10px' }}>
          <span className="price">799 ₽</span> <span className="old-price" style={{ marginLeft: '10px' }}>1200 ₽</span>
        </div>
        <div className="tariff-includes2" style={{ position: 'absolute', marginBottom: '10px', left: '452px' }}>
          <span className="price">1299 ₽</span> <span className="old-price" style={{ marginLeft: '10px' }}>2600 ₽</span>
        </div>
        <div className="tariff-includes3" style={{ position: 'absolute', marginBottom: '10px', left: '904px' }}>
          <span className="price">2379 ₽</span> <span className="old-price" style={{ marginLeft: '10px' }}>3700 ₽</span>
        </div>

        <div className="tariff-includes4" style={{ position: 'absolute', top: '80px', left: '30px' }}>
          В тариф входит:
        </div>
        <div className="tariff-includes4" style={{ position: 'absolute', top: '80px', left: '490px' }}>
          В тариф входит:
        </div>
        <div className="tariff-includes4" style={{ position: 'absolute', top: '80px', left: '940px' }}>
          В тариф входит:
        </div>
      </div>

      <div className="text-block" style={{ position: 'absolute', top: '450px', left: '40px' }}>
        <div className="check-item">✔️ Безлимитная история запросов</div>
        <div className="check-item">✔️ Безопасная сделка</div>
        <div className="check-item">✔️ Поддержка 24/7</div>
      </div>

      <div className="text-block" style={{ position: 'absolute', top: '450px', left: '480px' }}>
        <div className="check-item">✔️ Все пункты тарифа Beginner</div>
        <div className="check-item">✔️ Экспорт истории</div>
        <div className="check-item">✔️ Рекомендации по приоритетам</div>
      </div>

      <div className="text-block" style={{ position: 'absolute', top: '450px', left: '920px' }}>
        <div className="check-item">✔️ Все пункты тарифа Pro</div>
        <div className="check-item">✔️ Безлимитное количество запросов</div>
        <div className="check-item">✔️ Приоритетная поддержка</div>
      </div>
      <div className="pro-text">Pro</div> {/* Новый блок с текстом */}
      <div className="bus-text">Business</div> {/* Новый блок с текстом */}
      <div className="pro1-text">Для HR и фрилансеров</div> {/* Новый блок с текстом */}
      <div className="bus1-text">Для корпоративных клиентов</div> {/* Новый блок с текстом */}
      <div className="tariff-includes4" style={{ position: 'absolute', top: '180px', left: '230px' }}>
       Текущий тариф
      </div>

      <div className="buttons">
       <button className="cust-button1" style={{ position: 'absolute', top: '325px', left: '-40px' }}>Перейти в личный кабинет</button>
       <button className="cust-button2" style={{ position: 'absolute', top: '425px', left: '640px', backgroundColor: '#5970FF' }}>Подробнее</button>
       <button className="cust-button3" style={{ position: 'absolute', top: '425px', left: '1100px', backgroundColor: '#5970FF' }}>Подробнее</button>
     </div>
    </div>
  );
}

export default NewImageBlock;
