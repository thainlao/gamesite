import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Footer = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="horline"></div>
            <div className='footer'>
                <div>
                    <h2>©2023-2024 tgames.inc</h2>
                </div>

                <div>
                    <a onClick={() => navigate('/')}>Главная</a>
                    <a onClick={() => navigate('/feedback')}>О нас</a>
                    <a onClick={() => navigate('/games')} >Подробрки игр</a>
                    <a onClick={() => navigate('/info')} >tgames@gmail.com</a>
                </div>
            </div>            
        </div>

    )
}

export default Footer;