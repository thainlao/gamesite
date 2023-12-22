import '../styles/feedback.css';
import img from '../assets/png.png';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Feedback = () => {
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const serivceId: any = process.env.REACT_APP_SERVICE_ID;
    const templateId: any = process.env.REACT_APP_TEMPLATE_ID;
    const public_key: any = process.env.REACT_APP_PUBLIC_KEY;

    const [loading ,setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            setLoading(true)

            const res = await emailjs.send(
                serivceId,
                templateId,
                {
                    from_name: username,
                    to_name: 'TGames',
                    from_email: email,
                    to_email: 'newdevgeneration@gmail.com',
                    message: message,
                },
                public_key
            );
            console.log('Email sent successfully:', res);
        } catch (e) {
            console.error('Error sending email:', e);
        }
        setEmail('')
        setUsername('')
        setMessage('')
        setLoading(false);
    };

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

                    <form onSubmit={(e) => e.preventDefault()} className='feedback_input'>
                            <input placeholder='Ваш Email...' value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            />
                            <input placeholder='Как ваc зовут...' value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            />
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Ваше сообщение...' />
                            <button onClick={handleSubmit}>
                                Отправить
                            </button>
                    </form>
                </div>
                 
            </div>
            {loading ? <h2>Loading</h2> : ''}
        </div>
    )
}

export default Feedback;