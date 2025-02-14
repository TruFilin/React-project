import React from 'react';
import Footer from '../components/Footer';
import InfoBlock from '../components/InfoBlock';
import CardSlider from '../components/CardSlider';
import ImageBlock from '../components/ImageBlock'; // Импортируй новый компонент
import NewImageBlock from '../components/NewImageBlock';
import HeaderBlock from '../components/HeaderBlock';
function HomePage() {
  return (
    <div>
      <Footer />
      <InfoBlock />
      <CardSlider />
      <ImageBlock />
      <div style={{ marginTop: '100px' }}> </div>{/* Добавь отступ сверху */} {/* Добавление нового блока */}
      <NewImageBlock />
      <HeaderBlock />
    </div>
  );
}

export default HomePage;
