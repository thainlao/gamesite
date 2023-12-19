import { useEffect, useState, useRef } from 'react';
import '../styles/balls.css';

const Balls = () => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setLoaded(true);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`bols_container ${loaded ? 'loaded' : ''}`} ref={containerRef}>
      <div className={`ball1 ${loaded ? 'loaded' : ''}`}><span className='balltext1'>MMO</span></div>
      <div className={`ball2 ${loaded ? 'loaded' : ''}`}><span className='balltext2'>Экшен</span></div>
      <div className={`ball3 ${loaded ? 'loaded' : ''}`}><span className='balltext3'>Хорор</span></div>
      <div className={`ball4 ${loaded ? 'loaded' : ''}`}><span className='balltext4'>ТОП</span></div>
      <div className={`ball5 ${loaded ? 'loaded' : ''}`}><span className='balltext5'>Шутер</span></div>
      <div className={`ball6 ${loaded ? 'loaded' : ''}`}><span className='balltext6'>Гонки</span></div>
      <div className={`ball7 ${loaded ? 'loaded' : ''}`}><span className='balltext7'>Стратегии</span></div>
    </div>
  );
}

export default Balls;