import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css';
import Footer from '../components/Footer'; // Импортируй футер
import HeaderBlock from '../components/HeaderBlock';
import adImage from '../assets/ad.png'; // Убедитесь, что путь правильный

function ResultPage() {
  const location = useLocation();
  const { data1, data2 } = location.state || { data1: null, data2: null };
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentCount, setCurrentCount] = useState(2);
  const [chunkedData, setChunkedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data1 || !data2) {
      setLoading(false);
      return;
    }

    const fetchDocuments = async (ids) => {
      const authToken = localStorage.getItem('accessToken');
      const requestData = { ids };

      try {
        setLoading(true);
        const response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error('Ошибка при получении документов');
        }

        const documentsData = await response.json();
        const successfulDocuments = documentsData.map(doc => doc.ok).filter(doc => doc);

        // Обновляем состояние, добавляя только новые документы
        setDocuments(prevDocuments => {
          const newDocuments = successfulDocuments.filter(newDoc =>
            !prevDocuments.some(existingDoc => existingDoc.id === newDoc.id)
          );
          return [...prevDocuments, ...newDocuments];
        });
        console.log('Fetched documents:', successfulDocuments);

        if (successfulDocuments.length === 0) {
          setError('Документы не найдены');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const initialIds = data2.items
      ? data2.items.slice(0, currentCount).map(item => item.encodedId).filter(id => id)
      : [];

    if (initialIds.length > 0) {
      fetchDocuments(initialIds);
    } else {
      setError('Нет доступных ID для запроса');
    }
  }, [data1, data2, currentCount]);

  useEffect(() => {
    if (data1) {
      const arrayData = data1.data[0].data; // Извлекаем массив данных с 40 колонками
      console.log(arrayData); // Выводим массив в консоль
      const chunks = chunkArray(arrayData, 10); // Разбиваем на блоки
      setChunkedData(chunks);
    }
  }, [data1]);

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const nextChunk = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % chunkedData.length);
  };

  const prevChunk = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + chunkedData.length) % chunkedData.length);
  };

  const loadMore = () => {
    setCurrentCount(prevCount => prevCount + 10); // Увеличиваем количество загружаемых документов
  };

  const decodeHtml = (html) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  };

  const stripHtml = (html) => {
    return decodeHtml(html.replace(/<[^>]*>/g, '')); // Удаляем HTML-теги и декодируем сущности
  };

  if (!data1 || !data2) {
    return <div>Нет данныхдля отображения</div>;
  }

  return (
    <>
    <div className="result-page">
<Footer /> {/* Заголовок */}

<div className="histogram-container">
  <div className="histogram-block">
    <div className="special-block">
      <p>Период</p>
      <p>Всего</p>
      <p>Риски</p>
    </div>

    <div className="data-row">
      {chunkedData.length > 0 && (
        chunkedData[currentIndex].map((item, index) => (
          <div key={index} className="histogram-block-item">
            <p>{item.date.split('T')[0]}</p>
            <p>{item.value}</p>
            <p>Риск: 0</p>
          </div>
        ))
      )}
    </div>
  </div>

  <div className="navigation">
    <button className="left-arrow" onClick={prevChunk} disabled={chunkedData.length <= 1}>◀️</button>
    <button className="right-arrow" onClick={nextChunk} disabled={chunkedData.length <= 1}>▶️</button>
  </div>
</div>

<img
  src={adImage}
  alt="Ad"
  style={{
    width: '552.56px',
    height: '369px',
    position: 'absolute',
    top: '118px',
    left: '784px'
  }}
/>

{/* Новый блок текста */}
<div className="text-block">
  <div className="inner-text"> {/* Первый блок текста */}
    Ищем. Скоро будут результаты
  </div>
  <div className="secondary-text"> {/* Второй блок текста */}
    Поиск может занять некоторое время, просим сохранять терпение.
  </div>
</div>

{/* Новый блок общей сводки */}
<div className="summary-block">
  <div className="summary-title">Общая сводка</div>
  <div className="summary-results">
    Найдено {chunkedData.length > 0 ? chunkedData[currentIndex].reduce((acc, item) => acc + item.value, 0) : 0} результатов
  </div>
  </div>

  <div className="documents-title">Список документов</div>


  <div className="documents-container"> {/* Контейнер для документов */}
    {loading ? (
      <p>Загрузка документов...</p>
    ) : error ? (
      <p>{error}</p>
    ) : documents.length > 0 ? (
      <>
        {documents.map((document, index) => ( // Используем метод map для отображения всех документов
          <div key={index} className={`document position-${index + 1}`}>
            <div className="document-content"> {/* Контейнер для содержания документа */}
              {document.imageUrl && (
                <img src={document.imageUrl} alt="Документ" style={{ width: '100%', height: 'auto' }} />
              )}
              <h3>{document.title?.text || 'Нет названия'}</h3>
              <p><strong>Дата:</strong> {document.issueDate ? new Date(document.issueDate).toLocaleDateString() : 'Нет даты'}</p>
              <p><strong>Источник:</strong> {document.source?.name || 'Нет источника'}</p>
              <p>{stripHtml(document.content?.markup || 'Нет текста').substring(0, 300)}{stripHtml(document.content?.markup || 'Нет текста').length > 300 ? '...' : ''}</p>
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                <button className="read-more">Читать в источнике</button>
              </a>
            </div>
          </div>
        ))}
      </>
    ) : (
      <p>Документы не найдены</p>
    )}
  </div>

  <button className="load-more-button" onClick={loadMore}>Загрузить еще</button> {/* Кнопка для загрузки дополнительных документов */}
      <HeaderBlock /> {/* Подвал */}
    </div>
  </>
);
}

export default ResultPage;
