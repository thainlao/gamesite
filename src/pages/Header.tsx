import '../styles/header.css';

const Header = () => {
    return (
        <div>
            <div className='header'>
                <div className='header_left'>
                    <a href='/'>ЛОГОТИП</a>
                </div>

                <div className='header_right'>
                    <a href='/games'>Подборки игр</a>
                    <a href='/feedback'>Обратная связь</a>
                    <a href='/about'>О нас</a>
                </div>
            </div> 
            <div className="horline"></div>           
        </div>

    )
}

export default Header;