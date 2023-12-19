import games from '../json/top_50games.json';
import { IGame } from '../types';
import '../styles/game.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const AllGames = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [filteredGames, setFilteredGames] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const PAGE_SIZE = 20;
    const observer = useRef<IntersectionObserver | null>(null);
  
    useEffect(() => {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('appear');
              observer.current?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -100px 0px' }
      );
  
      document.querySelectorAll('.game').forEach((el) => {
        observer.current?.observe(el);
      });
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        observer.current?.disconnect();
        window.removeEventListener('scroll', handleScroll);
      };
    }, [filteredGames]);
  
    useEffect(() => {
      const sortedGames = games.топ_50_игр.sort(
        (a, b) => b['рейтинг Metacritic'] - a['рейтинг Metacritic']
      );
      setFilteredGames(sortedGames.slice(0, PAGE_SIZE));
    }, []);
  
    const handleScroll = () => {
      const scrollThreshold = 1700;
      const scrolledDown = window.scrollY > scrollThreshold;
      setShowScrollToTop(scrolledDown);
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        const endIndex = nextPage * PAGE_SIZE;
        const gamesToShow = games.топ_50_игр.slice(0, endIndex);
        setFilteredGames(gamesToShow);
        setCurrentPage(nextPage)
    }

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    return (
        <div className='games_container'>
            <div className='games_section'>
                <h2>ЛУЧШИЕ ИГРЫ НА ПК</h2>
                <div className='game_grid'>
                    {filteredGames.map((game: IGame) => (
                        <div className='game' key={game.id}>
                            <Link to={`/game/${game.id}`}>
                                <img src={game.img} alt={game.название} />
                            </Link>
                            <div className='game_text'>
                                <div>
                                    <h4>{game.название}</h4>
                                    <div className='game_genre'>{game.genre.map((a) => (
                                        <div>{a}</div>
                                    ))}</div>
                                    <h3>{game['дата выхода']}</h3>
                                </div>
                                <div>
                                    <span className='metac'>{game['рейтинг Metacritic'].toString().split('').join('.')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredGames.length < games.топ_50_игр.length && (
                    <button className='loadmore' onClick={handleLoadMore}>Загрузить</button>
                )}
            </div>
            {showScrollToTop && (
            <button
                className={`scrollToTop ${showScrollToTop ? 'appear' : 'hide'}`} onClick={handleScrollToTop}>&and;
            </button>
            )}
        </div>
    )
}

export default AllGames;