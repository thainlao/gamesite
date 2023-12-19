import Balls from '../pages/Balls';
import Mainpage2 from '../pages/Mainpage2';
import '../styles/mainbody.css';

const Mainbody = () => {
    return (
        <div>
            <div className='mainbody'>
                <div className="mainbody_textsection">
                    <div style={{display: 'flex', flexDirection:'column'}}>
                        <strong>Добро пожаловать</strong>
                        <strong>Лучший сайт по играм</strong>
                    </div>

                    <div>
                        <h3>Мы создали лучшую платформу, где пользователи могут делиться своим опытом в играх</h3>
                    </div>

                    <div className="bg1"></div>
                    <div className="bg2"></div>
                </div>
            </div> 
        <Mainpage2 />  
        <Balls />         
        </div>

    )
}

export default Mainbody;