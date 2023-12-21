import '../styles/feedback.css';
import img from '../assets/png.png';

const Feedback = () => {
    return (
        <div className='feedback'>
            <div className='feedback_container'>
                <img className='fb_bg' src='https://github.githubassets.com/assets/shape-2-f30dcc9bd35c.svg' loading='lazy'/>
                <div className='bd_section'>
                    <div className='fb_text_section'>
                        <img className='fb_img' src={img} />
                        <h2>Остался вопрос?</h2>
                        <h3>Свяжитесь с нами для коммуникации</h3>
                    </div>

                    <div className='feedback_input'>
                            <input placeholder='Ваш Email...' />
                            <input placeholder='Как ваc зовут...' />
                            <textarea placeholder='Ваше сообщение...' />
                    </div>
                </div>
                 
            </div>
        </div>
    )
}

export default Feedback;