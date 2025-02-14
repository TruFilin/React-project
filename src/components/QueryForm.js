import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QueryForm.css';

function QueryForm() {
  const [inn, setInn] = useState('');
  const [tone, setTone] = useState('любая');
  const [docCount, setDocCount] = useState('');
  const [searchRange, setSearchRange] = useState('');
  const [searchRange2, setSearchRange2] = useState('');
  const [innError, setInnError] = useState('');
  const [dateError, setDateError] = useState('');

  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const handleSearch = async (e) => {
     e.preventDefault();
     console.log('ИНН:', inn);
     console.log('Количество документов:', docCount);
     console.log('Дата начала:', searchRange);
     console.log('Дата конца:', searchRange2);

    if (!/^\d{10}$/.test(inn)) {
      setInnError('ИНН некорректен');
      return;
    } else {
      setInnError('');
    }

    if (searchRange > searchRange2) {
      setDateError('Дата начала не может быть позже даты конца');
      return;
    } else {
      setDateError('');
    }

    const authToken = localStorage.getItem('accessToken');
    if (!authToken) {
      console.error('Токен авторизации отсутствует');
      return;
    }

    const requestData = {
      intervalType: "day",
      histogramTypes: ["totalDocuments"],
      issueDateInterval: {
        startDate: new Date(searchRange).toISOString(),
        endDate: new Date(searchRange2).toISOString(),
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: Number(inn),
              maxFullness: true,
              inBusinessNews: null,
            }
          ],
          onlyMainRole: true,
          tonality: tone === 'позитивная' ? 'positive' : tone === 'негативная' ? 'negative' : 'any',
          onlyWithRiskFactors: false,
          riskFactors: {
            and: [],
            or: [],
            not: [],
          },
          themes: {
            and: [],
            or: [],
            not: [],
          }
        },
        themesFilter: {
          and: [],
          or: [],
          not: [],
        }
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: true,
        excludeAnnouncements: true,
        excludeDigests: true,
      },
      similarMode: "duplicates",
      limit: Number(docCount) || 1000,
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
    };

    try {
      const response1 = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestData),
      });

      const response2 = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response1.ok || !response2.ok) {
        const errorData1 = response1.ok ? null : await response1.json();
        const errorData2 = response2.ok ? null : await response2.json();
        console.error('Ошибка:', errorData1, errorData2);
        throw new Error('Ошибка сети');
      }

      const data1 = await response1.json();
      const data2 = await response2.json();

      console.log('Результаты запроса 1:', data1);
      console.log('Результаты запроса 2:', data2);

      navigate('/result', { state: { data1, data2 } });

    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };return (
    <div className="query-form-container">
      <form className="query-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="inn">ИНН компании *</label><input
            type="text"
            id="inn"
            placeholder="Введите ИНН компании"
            value={inn}
            onChange={(e) => setInn(e.target.value)}
            required
          />
          {innError && <p className="error-message">{innError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="tone">Тональность</label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="select-tone"
          >
            <option value="позитивная">Позитивная</option>
            <option value="негативная">Негативная</option>
            <option value="любая">Любая</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="docCount">Количество документов к выдаче *</label>
          <input
            type="number"
            id="docCount"
            placeholder="Введите количество документов"
            value={docCount}
            onChange={(e) => setDocCount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="searchRange">Дата начала *</label>
          <input
            type="date"
            id="searchRange"
            value={searchRange}
            onChange={(e) => setSearchRange(e.target.value)}
            max={today}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="searchRange2">Дата конца *</label>
          <input
            type="date"
            id="searchRange2"
            value={searchRange2}
            onChange={(e) => setSearchRange2(e.target.value)}
            max={today}
            required
          />
        </div>
        {dateError && <p className="error-message">{dateError}</p>}
        <button
        className="search-button"
        type="submit"
        style={{ width: '305px', height: '59px', borderRadius: '5px' }}
        >
        Поиск
        </button>
      </form>
      <div className="search-info">
        <p className="info-note">* Обязательные к заполнению поля</p>
      </div>
    </div>
  );
}

export default QueryForm;
