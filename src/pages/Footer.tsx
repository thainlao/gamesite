import '../styles/header.css';

const Footer = () => {
    return (
        <div>
            <div className="horline"></div>
            <div className='footer'>
                <div>
                    <h2>©2023-2024 tgames.inc</h2>
                </div>

                <div>
                    <a href='/'>Главная</a>
                    <a href='/feedback'>О нас</a>
                    <a href='/games'>Подробрки игр</a>
                    <a href='/info'>tgames@gmail.com</a>
                </div>
            </div>            
        </div>

    )
}

export default Footer;