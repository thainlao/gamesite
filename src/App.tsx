import AllGames from './components/AllGames';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameDetailed from './components/GameDetailed';
import Header from './pages/Header';
import Mainbody from './components/Mainbody';
import Footer from './pages/Footer';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Mainbody />}/>
        <Route path='/game/:id' element={<GameDetailed />} />
        <Route path='/games' element={<AllGames />}/>
      </Routes>
      <Footer />
  </Router>
  );
}

export default App;