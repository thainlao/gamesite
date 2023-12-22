import games from '../json/freegames.json';
import { IGame } from '../types';
import '../styles/game.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const AllGames = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [filteredGames, setFilteredGames] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(30);
    const observer = useRef<IntersectionObserver | null>(null);

    const [sortBy, setSortBy] = useState<string>('rating');

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
      const sortedGames = games.freeGames.slice().sort((a, b) => {
        if (sortBy === 'rating') {
          return b['рейтинг Metacritic'] - a['рейтинг Metacritic'];
        } else if (sortBy === 'popularity') {
          return b['рейтинг TLGames'] - a['рейтинг TLGames'];
        }
        return 0;
      });
  
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
  
      setFilteredGames(sortedGames.slice(0, endIndex));
    }, [sortBy, currentPage, pageSize]);
  
    const handleScroll = () => {
      const scrollThreshold = 1700;
      const scrolledDown = window.scrollY > scrollThreshold;
      setShowScrollToTop(scrolledDown);
    };

    const handleLoadMore = () => {
      setPageSize((prevPageSize) => prevPageSize + 15);
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortByRating = () => {
      setSortBy('rating');
      setCurrentPage(1);
      setPageSize(30); // Reset page size when changing sorting criteria
    };
  
    const handleSortByPopularity = () => {
      setSortBy('popularity');
      setCurrentPage(1);
      setPageSize(30); // Reset page size when changing sorting criteria
    };

    return (
        <div className='games_container'>
            <div className='games_section'>
                <h2>ЛУЧШИЕ БЕСПЛАТНЫЕ ИГРЫ</h2>

                <div className='sortby'>
                <button className={sortBy === 'rating' ? 'active' : ''} onClick={handleSortByRating}>
                  По рейтингу
                </button>
                <button className={sortBy === 'popularity' ? 'active' : ''} onClick={handleSortByPopularity}>
                  По популярности
                </button>
              </div>

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
                {filteredGames.length < games.freeGames.length && (
                    <button className='loadmore' onClick={handleLoadMore}>&or;</button>
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