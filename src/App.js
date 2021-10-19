import './App.css';
import TileList from './components/TileList';
import Board from './components/Board';
import { GameProvider } from './context/gameContext';
import Header from './components/Header';

function App() {
  return (
    <>
      <GameProvider>
        <Header />
        <section className='main-container'>
          <div className='list-container'>
            <TileList />
          </div>
          <div className='board-container'>
            <Board />
          </div>
        </section>
      </GameProvider>
    </>
  );
}

export default App;
