export interface IGame {
    id: number;
    название: string;
    "рейтинг Metacritic": number;
    "рейтинг TLGames": number;
    about: string;
    разработчик: string;
    "сайт игры": string;
    "дата выхода": string;
    платформы: string[];
    img: string;
    online: string[];
    genre: string[];
    screenshots: string[];
    "системные требования": {
      минимальные: {
        видеокарта: string;
        процессор: string;
        ОЗУ: string;
        "место на диске": string;
        сеть: string;
        звук: string;
      };
      рекомендованные: {
        видеокарта: string;
        процессор: string;
        ОЗУ: string;
        "место на диске": string;
        сеть: string;
        звук: string;
      };
    };
  }