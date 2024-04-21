import { useEffect, useRef, useState } from 'react';
import Balls from '../pages/Balls';
import Mainpage2 from '../pages/Mainpage2';
import '../styles/mainbody.css';
import diamong from '../assets/diamond.png';

const Mainbody = () => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleIntersection = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && !loaded) {
          setLoaded(true);
        }
      });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loaded]);
    
    return (
        <div>
            <div className='mainbody'>
                <div className="mainbody_textsection">
                    <div style={{display: 'flex', flexDirection:'column', padding: '16px'}}>
                        <strong>Добро пожаловать</strong>
                        <strong>Лучший сайт по играм</strong>
                    </div>

                    <div style={{padding: '9px'}}>
                        <h3>Мы создали лучшую платформу, где пользователи могут делиться своим опытом в играх</h3>
                    </div>

                    <div className="bg1"></div>
                    <div className="bg2"></div>
                </div>
            </div> 
            <Mainpage2 />  
            <Balls /> 

            <div className='ecosystem'>
              <div className='ecosystem_cont'>
                <h2>ecosystem TGames</h2>
                <div className='ecoline'></div>
                <div className='eco_cont_pic'>
                  <img src={diamong}/>
                </div>
              </div>
              <div className='bluestamp'></div>
              <div className='bluestamp2'></div>
            </div>


            <div className='last_section' >
              <div className='last_section_one'>
                <h2>24 / 7 Поддержка</h2>
                <div className='div1'></div>
              </div>

              <div className='last_section_one'>
                <h2>17 000 Посещений в день</h2>
                <div className='div2'></div>
              </div>

              <div className='last_section_one'>
                <h2>Современный подход</h2>
                <div className='div3'></div>
              </div>
            </div>

            <div className={`games__section ${loaded ? 'loadedtext' : ''} `}>
              <div className='game__section_' ref={containerRef}>
                <a className={`${loaded ? 'loadedtext' : ''}`} href='/games'>ВСЕ ИГРЫ</a>
                <a className={`${loaded ? 'loadedtext' : ''}`} href='/feedback'>СВЯЗАТЬСЯ С НАМИ</a>
                <a className={`${loaded ? 'loadedtext' : ''}`} href='/about'>О НАС</a>
              </div>
            </div>

        </div>

    )
}

export default Mainbody;