import { useState } from 'react';
import '../styles/header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const navigate = useNavigate();
    
    return (
        <div>
            <div className='header'>
                <div className='header_left'>
                    <a onClick={() => navigate('/')}>ЛОГОТИП</a>
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
                            <a onClick={() => navigate('/games')}>Топ 50 игр</a>
                            <a onClick={() => navigate('/freegames')}>Топ бесплатных игр</a>
                        </div>
                        : <div></div>}
                    </div>
                    <a onClick={() => navigate('/feedback')}>Обратная связь</a>
                    <a onClick={() => navigate('/about')}>О нас</a>
                </div>
            </div> 
            <div className="horline"></div>           
        </div>

    )
}

export default Header;