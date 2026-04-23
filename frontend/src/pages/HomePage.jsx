import { useState } from 'react';
import HeroSection from '../components/sections/HeroSection.jsx';
import AboutSection from '../components/sections/AboutSection.jsx';
import DestinationsSection from '../components/sections/DestinationsSection.jsx';
import BookingSection from '../components/sections/BookingSection.jsx';

export default function HomePage() {
  const [preselectedDest, setPreselectedDest] = useState('');

  const handleReserve = (destId) => {
    setPreselectedDest(destId);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <HeroSection />
      <Divider />
      <AboutSection />
      <Divider />
      <DestinationsSection onReserve={handleReserve} />
      <Divider />
      <BookingSection preselectedDest={preselectedDest} />
    </>
  );
}

function Divider() {
  return (
    <div className="divider">
      <div className="divider-line" />
      <span className="divider-symbol">◆</span>
      <div className="divider-line" />
    </div>
  );
}
