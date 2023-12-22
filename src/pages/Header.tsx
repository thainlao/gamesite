import { useState } from 'react';
import '../styles/header.css';

const Header = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    return (
        <div>
            <div className='header'>
                <div className='header_left'>
                    <a href='/'>ЛОГОТИП</a>
                </div>

                <div className='header_right'>
                    <div className='modalbut'>
                        <h1 onMouseEnter={() => setModalOpen(true)}>
                            Топ игр
                            <span className={`arrow ${modalOpen ? 'up' : ''}`}></span>
                        </h1>
                        {modalOpen 
                        ? 
                        <div onMouseLeave={() => setModalOpen(false)} className={`modalbut_open ${modalOpen ? 'show' : ''}`}>
                            <a href='/games'>Топ 50 игр</a>
                            <a href='/freegames'>Топ бесплатных игр</a>
                        </div>
                        : <div></div>}
                    </div>
                    <a href='/feedback'>Обратная связь</a>
                    <a href='/about'>О нас</a>
                </div>
            </div> 
            <div className="horline"></div>           
        </div>

    )
}

export default Header;