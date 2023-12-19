import '../styles/mainpage2.css';
import React, { useEffect, useState } from 'react';

const Mainpage2 = () => {
    const [scrollWidth, setScrollWidth] = useState(20);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const newWidth = Math.min(90, 20 + scrollPercentage);
            setScrollWidth(newWidth);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='mainbody2'>
            <div>
                <h2>Что мы предлагаем?</h2>
                <div className='scrolling-bar' style={{ width: `${scrollWidth}%` }} />
            </div>
        </div>
    )
}

export default Mainpage2;