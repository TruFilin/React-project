import React from 'react';
import Footer from '../components/Footer'; // Импортируй футер
import QueryForm from '../components/QueryForm'; // Импортируй форму
import './QueryPage.css'; // Стили для страницы запросов
import pichImage from '../assets/pich.png'; // Импортируйте первое изображение
import docImage from '../assets/doc.png'; // Импортируйте второе изображение
import folImage from '../assets/fol.png'; // Импортируйте третье изображениеport folImage from '../assets/fol.png'; // Импортируйте третье изображение
import HeaderBlock from '../components/HeaderBlock';
function QueryPage() {
  return (
    <div className="query-page">
      <Footer  className="footer-query"/>

      <div className="form-and-images">
              <QueryForm /> {/* Добавляем форму запросов */}
              <img src={pichImage} alt="Описание изображения" className="pich-image" /> {/* Первое изображение */}
              <img src={docImage} alt="Документ" className="doc-image" /> {/* Второе изображение */}
              <img src={folImage} alt="Файл" className="fol-image" /> {/* Третье изображение */}
            </div>

            {/* Новый блок с текстом */}
            <div className="text-block" style={{ top: '162px', left: '60px' }}>
              <p className="info-text">Найдите необходимые данные в пару кликов.</p>
            </div>

            {/* Второй блок с текстом */}
            <div className="search-parameters" style={{ top: '283px', left: '60px' }}>
              <p className="search-text">
                Задайте параметры поиска. <br />
                Чем больше заполните, тем точнее поиск.
              </p>
            </div>

            {/* Новый блок с галочками */}
            <div className="new-block" style={{ top: '414px', left: '480px' }}>
              <div className="checkbox-item">
                <input type="checkbox" id="fullness" />
                <label htmlFor="fullness">Признак максимальной полноты</label>
              </div>
              <div className="checkbox-item" style={{ top: '22px', left: '0' }}>
                <input type="checkbox" id="feature1" />
                <label htmlFor="feature1">Упоминание в бизнес-контексте</label>
              </div>
              <div className="checkbox-item" style={{ top: '44px', left: '0' }}>
                <input type="checkbox" id="feature2" />
                <label htmlFor="feature2">Главная роль в публикации</label>
              </div>
              <div className="checkbox-item" style={{ top: '66px', left: '0' }}>
                <input type="checkbox" id="feature3" />
                <label htmlFor="feature3">Публакации только с риск-факторами</label>
              </div>
              <div className="checkbox-item" style={{ top: '88px', left: '0' }}>
                <input type="checkbox" id="feature4" />
                <label htmlFor="feature4">Включать технические новости рынков</label>
              </div>
              <div className="checkbox-item" style={{ top: '110px', left: '0' }}>
                <input type="checkbox" id="feature5" />
                <label htmlFor="feature5">Включать анонсы и календари</label>
              </div>
              <div className="checkbox-item" style={{ top: '132px', left: '0' }}>
                <input type="checkbox" id="feature6" />
                <label htmlFor="feature6">Включать сводки новостей</label>
              </div>
            </div>


      <HeaderBlock customClass="query-header" /> {/* Добавляем класс для изменения стилей */}
    </div>
  );
}

export default QueryPage;
