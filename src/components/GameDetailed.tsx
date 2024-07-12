import { Link, useNavigate, useParams } from 'react-router-dom';
import games from '../json/top_50games.json';
import { IGame } from '../types';
import '../styles/gamedetailed.css';
import { useEffect, useState } from 'react';
import ImageModal from '../pages/ImageModel';
import '../styles/game.css';
import freegames from '../json/freegames.json';
import user1 from '../assets/1user.png';
import user2 from '../assets/2user.png';

const GameDetailed = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [mainImageLoaded, setMainImageLoaded] = useState<boolean>(false);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setModalOpen(false);
  };

  const { id } = useParams<{ id: any }>();
  const gameId = parseInt(id);
  const game: IGame | undefined = (games.топ_50_игр.find((g: IGame) => g.id === gameId) || freegames.freeGames.find((g: IGame) => g.id === gameId));

  if (!game) {
    return <div>Игра не найдена</div>;
  }

  const metacriticRating = game['рейтинг Metacritic'];
  const tlgames = game['рейтинг TLGames'];
  
  let circleClass = 'redcircle';
  let fillPercentage = 0;
  
  if (metacriticRating >= 85 || tlgames >= 85) {
    circleClass = 'greencircle';
    fillPercentage = Math.max(metacriticRating, tlgames);
  } else if (metacriticRating >= 70 || tlgames >= 70) {
    circleClass = 'yellowcircle';
    fillPercentage = Math.max(metacriticRating, tlgames);
  }
  
  const circleStyle = {
    background: `linear-gradient(to top, ${circleClass} ${fillPercentage}%, transparent ${fillPercentage}%)`,
  };

  const similarGames = (games.топ_50_игр || freegames.freeGames).filter((g: IGame) => g.id !== gameId && g.genre.some((genre) => game?.genre.includes(genre))).slice(0, 6);
  const freeGames6 = freegames.freeGames.map((g) => g).slice(0, 6);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setImagesLoaded(false);

    const loadImage = new Image();
    loadImage.src = game.img;
    loadImage.onload = () => {
      setImagesLoaded(true);
      setMainImageLoaded(true);
    };
  }, [id, game]);

  const navigate = useNavigate()

  const showingUsers = () => {
    if (game.online.includes('single') && game.online.includes('cooperative')) {
      return (
        <div className="user-images">
          <img className='user1' src={user2} alt="Cooperative User" />
          <img className='user1' src={user1} alt="Single User" />
        </div>
      );
    } else if (game.online.includes('single')) {
      return <img className='user1' src={user1} alt="Single User" />;
    } else if (game.online.includes('cooperative')) {
      return <img className='user1' src={user2} alt="Cooperative User" />;
    } else {
      return null;
    }
  };



  return (
    <div className='game_detailed_body'>

      <div className='navigation'>
        <a onClick={() => navigate('/')}>Главная / </a>
        <a onClick={() => navigate('/games')}>Игры / </a>
        <a>{game.название}</a>
      </div>

      <div className='game_detailed'>
        <div className='game_detailed_component'>
          <img className='hiddenimg' src='https://github.githubassets.com/assets/shape-0-df97fa6b0c27.svg'/> 
          <div>
            <img className={`image_deteiled ${mainImageLoaded ? 'image-loaded' : ''}`} src={game.img}/>
            <div className='rating_images'>
            <div className='reting_inside'>
              <div className={`circle ${circleClass}`}style={circleStyle}><span>{metacriticRating}</span></div>
              <h4>Рейтинг Metacritic</h4>
            </div>

            <div className='reting_inside'>
              <div className={`circle ${circleClass}`} style={circleStyle}><span>{tlgames}</span></div>
              <h4>Рейтинг TLGames</h4>
            </div>
          </div>
          </div>

          <div className='game_detailed_text'>
            <h2>{game.название}</h2>

            <div className='genre'>{game.genre.map((genre) => (
                <div className='genre_thing'>
                  <h3>{genre}</h3>
                </div>
            ))}</div>
          </div>

          <div className='game_detailed_lastpart'>
            <h2><span>Режим игры:</span>{showingUsers()}</h2>
            <h4><span>Дата выхода:</span> {game['дата выхода']}</h4>
            <h5 className='platforms'><span>Платформа:</span> {game.платформы.map((item) => (<section>{item}</section>))}</h5>
            <h6><span>Разработчик:</span> {game.разработчик}</h6>
            <h5><a onClick={() => navigate(`http://${game['сайт игры']}`)} target="_blank">Сайт игры</a></h5>
          </div>
          <div className='swinging'><div className="swingingball"></div></div>
        </div>
      </div>

      <div className="verlinegame"></div> 

      <div className='screenshot_page'>
        <h2>Всего скриншотов ({game.screenshots.length})</h2>
        <div className='screenshot_container'>
          {imagesLoaded ? (
            game.screenshots.map((screenshot, index) => (
              <div key={index} onClick={() => openModal(screenshot)}>
                <img src={screenshot} alt={`Screenshot ${index + 1}`} />
              </div>
            ))
          ) : (
            <div className='loading-animation'></div>
          )}
        </div>
        <div className="verlinegame"></div>
      </div>

      <div className="screenshot_page">
        <h5>Cюжет</h5>
        <h4>{game.about}</h4>
        <div className="verlinegame"></div> 
      </div>


      <div className='requirements'>
        <div className='req_ge'>
            <h3>Рекомендуемые требования</h3>
            <h3><span>Оперативная память: </span>{game['системные требования'].рекомендованные.ОЗУ}</h3>
            <h3><span>Видеокарта: </span>{game['системные требования'].рекомендованные.видеокарта}</h3>
            <h3><span>Процессор: </span>{game['системные требования'].рекомендованные.процессор}</h3>
            <h3><span>Место на диске: </span>{game['системные требования'].рекомендованные['место на диске']}</h3>
            <h3><span>DirectX:</span>{game['системные требования'].рекомендованные.звук}</h3>
          </div>

          <div className='req_ge'>
            <h3>Минимальные требования</h3>
            <h3><span>Оперативная память: </span>{game['системные требования'].минимальные.ОЗУ}</h3>
            <h3><span>Видеокарта: </span>{game['системные требования'].минимальные.видеокарта}</h3>
            <h3><span>Процессор: </span>{game['системные требования'].минимальные.процессор}</h3>
            <h3><span>Место на диске: </span>{game['системные требования'].минимальные['место на диске']}</h3>
            <h3><span>DirectX:</span>{game['системные требования'].минимальные.звук}</h3>
          </div>
      </div>
      <div className="verlinegame"></div>

      <div className='rec_text_section'>
        <h2 className='title_text'>Похожие игры</h2>
        <a className='title_a' onClick={() => navigate('/games')}>Показать еще</a>
      </div>
      <div className='recomandation_section'>
          {similarGames.map((simGame: IGame) => (
            <Link to={`/game/${simGame.id}`} className='rec_game'>
              <h3 className=''>{simGame.название}</h3>
              <img src={simGame.img} alt={simGame.название} />
            </Link>
          ))}
      </div>

      <div className="verlinegame"></div>
      <div className='rec_text_section'>
        <h2 className='title_text'>Бесплатные игры</h2>
        <a className='title_a' onClick={() => navigate('/freegames')}>Показать все</a>
      </div>
      <div className='recomandation_section'>
          {freeGames6.map((simGame: IGame) => (
            <Link to={`/game/${simGame.id}`} className='rec_game'>
              <h3 className=''>{simGame.название}</h3>
              <img src={simGame.img} alt={simGame.название} />
            </Link>
          ))}
      </div>

      {modalOpen && (
        <ImageModal
          images={game.screenshots}
          initialIndex={game.screenshots.indexOf(selectedImage)}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default GameDetailed;